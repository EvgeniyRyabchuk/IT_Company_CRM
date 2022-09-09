<?php

namespace App\Http\Controllers;

use App\_SL\FileManager;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderContact;
use App\Models\OrderStatusHistory;
use App\Models\Status;
use App\Models\Project;
use App\Models\Role;
use App\Models\UndoOrder;
use App\Models\UndoOrderCase;
use App\Models\User;
use App\Notifications\AccountCreatedNotification;
use App\Notifications\PasswordResetNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use function GuzzleHttp\Promise\all;

class OrderController extends Controller
{

    //TODO: fillter handler class

    public function index(Request $request) {

        $perPage = $request->input('limit') ?? 10;
        $search = $request->input('search') ?? '';

        $sort = $request->input('sort') ?? 'created_at';
        $sortOrder = $request->input('order') ?? 'desc';

        $orderStatus = json_decode($request->input('orderStatuses') ?? '[]');
        $deadlineRange = json_decode($request->input('deadlineRange') ?? '[]');
        $createdAtOrderRange = json_decode($request->input('createdAtOrderRange') ?? '[]');

        $projectExistMode = $request->input('projectExistMode') ?? 0;

        $query = Order::with('project.projectType',
            'status',
            'customer.user.phones',
            'orderContact');

        switch ($projectExistMode) {
            case 1:
                $query->whereNotNull('orders.project_id');
                break;
            case 2:
                $query->whereNull('orders.project_id');
                break;
            default:
                break;
        }

        if(count($orderStatus) > 0) {
            $query->select('orders.*');
            $query->join('statuses', 'orders.status_id', 'statuses.id')
                ->whereIn('statuses.id', $orderStatus);
        }


        if(count($deadlineRange) >= 2) {
            $deadlineRange = [
                Carbon::parse($deadlineRange[0]),
                Carbon::parse($deadlineRange[1]),
            ];

            $query->leftJoin('projects', 'orders.project_id', 'projects.id')
            ->whereBetween('projects.deadline', $deadlineRange);
        }

        if(count($createdAtOrderRange) >= 2) {
            $from = Carbon::parse($createdAtOrderRange[0]);
            $to = Carbon::parse($createdAtOrderRange[1]);
            $from->setTime(0, 0);
            $to->setTime(23, 59);

            $query->whereBetween('orders.created_at', [$from, $to]);
        }

        if($search && $search !== '') {
            $query
                ->leftJoin('order_contacts', 'orders.order_contact_id', 'order_contacts.id')
                ->join('customers', 'orders.customer_id', 'customers.id')
                ->join('users', 'customers.user_id', 'users.id')
                ->join('phones', 'users.id', 'phones.user_id')
                ->where('full_name', 'LIKE', "%$search%")
                ->orWhere('phones.phone_number', 'LIKE', "%$search%")

                ->orWhere('order_contacts.name', 'LIKE', "%$search%")
                ->orWhere('order_contacts.phone', 'LIKE', "%$search%")
            ;
        }

        switch ($sort) {
            case "status":
                $query->select('orders.*');
                $query->join('statuses as statuses_table',
                    'orders.status_id',
                    '=', 'statuses_table.id')
                ->orderBy('statuses_table.index', $sortOrder);
                break;
            case "deadline":
                $query->select('orders.*');
                $query->join('projects', 'orders.project_id', 'projects.id')
                ->orderBy('projects.deadline', $sortOrder);
                break;
            default:
                $query = $query->orderBy("orders.$sort", $sortOrder);
                break;
        }

        $orders = $query->paginate($perPage);

        return response()->json($orders, 201);
    }

    public function show(Request $request, $orderId) {
        $order = Order::with('project.projectType',
            'status',
            'customer.user.phones',
            'orderContact',
            'statusHistory.status',
            'customer.user.tags'
        )
            ->find($orderId);

        return response()->json($order, 201);
    }

    public function store(Request $request) {
//TODO: check if customer already registered
        $email = $request->input('email');
        // if customer with such email already exist
        $customer = Customer::whereHas('user', function ($q) use($email) {
            $q->where('email', $email);
        })->first();

        $orderStatus = Status::where(['name' => 'pending'])->first();
        $order = new Order();

        // if account exist redirect to log in page
        if($customer) {
            if (!Auth::check()) {
                return response()->json('401',
                    'Account with such email already exist.
                      Please log in to make order');
            }

            $order->status()->associate($orderStatus);
            $order->customer()->associate($customer);
            $order->about = $request->input('about') ?? '';
            $order->save();

            return response()->json(
                ['message' =>
                    "opened create page. With exist customer = $customer"
                    , 201]);
        }

        $contact = OrderContact::create([
            'name' => $email,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        $order->orderContact()->associate($contact);
        $order->status()->associate($orderStatus);

        $order->about = $request->input('about') ?? '';
        $order->save();

        OrderStatusHistory::create(['order_id' => $order->id, 'status_id' => $orderStatus->id]);
//        $extension = $request->file('extra_file')->getClientOriginalExtension();
//        $path = $request->file('extra_file')
//            ->storeAs("orders/$order->id", 'extra_file_'. time() . '.' . $extension);

        $path = FileManager::save($request, "extra_file",
            "extra_file_", "orders/$order->id");

        $order->extra_file = $path;
        $order->save();

        return response()->json(
            ['message' => "opened create page. With does not exist customer = $customer", 201]);
    }

    //TODO: create project if order status is Processing
    // TODO: status change history
    public function update(Request $request, $orderId) {
        $order = Order::findOrFail($orderId);

        $oldStatus = Status::findOrFail($request->input('order_status_id'));
        $newStatus = Status::findOrFail($request->input('new_order_status_id'));

        // if order status already does not undo, then remove entry in undo_order table
        if($oldStatus->name == 'Undo' && $newStatus->id != $oldStatus->id) {
            $undoOrderEntry = UndoOrder::where("order_id", $order->id)->first();
            $undoOrderEntry->delete();
        }
        else if ($newStatus->name == 'Undo') {
            $caseId = $request->input('order_undo_case_id');
            UndoOrder::create([
                'order_id' => $order->id,
                'order_undo_case_id' => $caseId
            ]);
        }

        $order->status()->associate($newStatus);
        OrderStatusHistory::create(['order_id' => $order->id, 'status_id' => $newStatus->id]);
        $order->save();

        $resOrder = Order::with(
    'project.projectType',
            'status',
            'customer.user',
            'orderContact')
            ->findOrFail($order->id);
        return response()->json($resOrder, 201);
    }

    public function addUndoCaseEntry(Request $request, $orderId, $caseId) {
        $undoOrder = UndoOrder::where('order_id', $orderId)->first();

        abort_if(!$undoOrder, 404, 'order status is not undo');

        $case = UndoOrderCase::findOrFail($caseId);
        /*
//        $case = new UndoOrderCase();
//        $case->type_name = $request->input('type_name');
//        $case->reason = $request->input('reason');
        */
        $undoOrder->extra_reason_text = $request->input('extra_reason_text');
        $undoOrder->orderUndoCase()->associate($case);
        $undoOrder->save();

        return response()->json("undo case added success $undoOrder", 201);
    }

    public function destroy(Request $request, $orderId) {
        Order::destroy($orderId);
        return response()->json(['message' => 'opened destroy page', 201]);
    }

    public function createCustomerAccount($orderId) {
        $order = Order::with("orderContact")
            ->findOrFail($orderId);

        $pwd = Str::random(10);

        $user = User::create([
            'first_name' => $order->orderContact->name,
            'last_name' => "",
            'middle_name' => "",
            'full_name' => $order->orderContact->name,
            'email' =>$order->orderContact->email,
            'password' => Hash::make($pwd)
        ]);
        $user->roles()->attach(Role::where('name', 'customer')->first()->id);
        $user->save();

        Notification::send($user, new AccountCreatedNotification($user, $pwd));

        return response()->json(['data' => $order, 201]);
    }


    public function getStatuses(Request $request) {
        $statuses = Status::orderBy('index', 'asc')->get();
        return response()->json($statuses);
    }

    public function getMinMaxValues(Request $request) {
        $minMaxProjectDeadline = [Project::min('deadline'), Project::max('deadline')];
        $minMaxOrderCreatedDate = [Order::min('created_at'), Order::max('created_at')];

        return response()->json(
            compact('minMaxOrderCreatedDate', 'minMaxProjectDeadline')
        );
    }

}
