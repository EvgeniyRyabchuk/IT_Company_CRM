<?php

namespace App\Http\Controllers;

use App\_SL\FileManager;
use App\Http\Controllers\User\AuthController;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderContact;
use App\Models\OrderStatusHistory;
use App\Models\Phone;
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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use function GuzzleHttp\Promise\all;

class OrderController extends Controller
{
    public function index(Request $request) {
        $perPage = $request->input('limit') ?? 10;
        $search = $request->input('search') ?? '';

        $sort = $request->input('sort') ?? 'created_at';
        $sortOrder = $request->input('order') ?? 'desc';

        $orderStatuses = json_decode($request->input('orderStatuses') ?? '[]');
        $deadlineRange = json_decode($request->input('deadlineRange') ?? '[]');
        $createdAtOrderRange = json_decode($request->input('createdAtOrderRange') ?? '[]');

        $projectExistMode = $request->input('projectExistMode') ?? 0;

        $query = Order::with('project.projectType',
            'status',
            'customer.user.phones',
            'orderContact',
            'project.tags',
            'project.employees.user',
            'project.projectLinks'
        );

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

        if(count($orderStatuses) > 0) {
            $query->join('statuses', 'orders.status_id', 'statuses.id')
                ->whereIn('statuses.id', $orderStatuses);
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

        switch ($sort) {
            case "status":
                $query->join('statuses as statuses_table',
                    'orders.status_id',
                    '=', 'statuses_table.id')
                ->orderBy('statuses_table.index', $sortOrder);
                break;
            case "deadline":
                $query->join('projects', 'orders.project_id', 'projects.id')
                ->orderBy('projects.deadline', $sortOrder);
                break;
            default:
                $query = $query->orderBy("orders.$sort", $sortOrder);
                break;
        }

        $query->select('orders.*');

        if($search && $search !== '') {
            $queryForAuth = clone $query;
            $queryForGuest = clone $query;

            $queryForAuth
                ->leftJoin('customers', 'orders.customer_id', 'customers.id')
                ->leftJoin('users', 'customers.user_id', 'users.id')
//                ->leftJoin('phones', 'users.id', 'phones.user_id')
                ->where('users.full_name', 'LIKE', "%$search%")
//                ->orWhere('phones.phone_number', 'LIKE', "%$search%")
                ->orWhere('users.email', 'LIKE', "%$search%")
            ;


//            $query = $queryForAuth;

//            dd($queryForAuth->get()->map(function ($item) { return $item->id; }));

            $queryForGuest
                ->leftJoin('order_contacts', 'orders.order_contact_id', 'order_contacts.id')
                ->orWhere('order_contacts.name', 'LIKE', "%$search%")
                ->orWhere('order_contacts.phone', 'LIKE', "%$search%")
                ->orWhere('order_contacts.email', 'LIKE', "%$search%")
            ;

//            $query
//                ->join('order_contacts', 'orders.order_contact_id', 'order_contacts.id')
//                ->join('customers', 'orders.customer_id', 'customers.id')
//                ->join('users', 'customers.user_id', 'users.id')
////                ->join('phones', 'users.id', 'phones.user_id')
//                ->where('full_name', 'LIKE', "%$search%")
////                ->orWhere('phones.phone_number', 'LIKE', "%$search%")
//
//                ->orWhere('order_contacts.name', 'LIKE', "%$search%")
////                ->orWhere('order_contacts.phone', 'LIKE', "%$search%")
//            ;

            $query = $queryForAuth;
//            $query = $queryForAuth->unionAll($queryForGuest);
//            $query->groupBy('id');
//            return response()->json($query->toSql(), 201);
        }

        // fetching customer orders
        $userId = $request->input('userId');
        $user = Auth::user();
        if(!$user) {
            return response()->json
            (['alertMessage' => 'please log in'],401);
        }
        if($user->customer) {
            if($userId) {
                $customer = Customer::where('user_id', $userId)->first();
                if(!$customer) {
                    return response()->json
                    (['alertMessage' => 'no such customer'],404);
                }
                $query->where('customer_id', $customer->id);
            } else {
                return response()->json
                (['alertMessage' => 'no user id in query'],404);
            }
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
            'customer.user.tags',
            'project.tags',
            'project.employees.user',
            'transactions'
        )->find($orderId);
        return response()->json($order, 201);
    }

    public function store(Request $request) {
        $email = $request->input('email');
        // if customer with such email already exist
        $dbUser = User::where('email', $email)->first();

        $orderStatus = Status::where(['name' => 'pending'])->first();
        $order = new Order();


        if($dbUser) {
            // if account exist redirect to log in page
            if (!Auth::check()) {
                return response()->json(['alertMessage' => 'Account with such email already exist.
                      Please log in to make order'], 401);
            }

            $user = Auth::user();
            $customer = Customer::where('user_id', $user->id)->first();

            if(!$customer) {
                return response()->json(['alertMessage' => 'Such customer does not exist'], 404);
            }

            $order->customer()->associate($customer);
        }
        else {
            $phoneDecode = json_decode($request->input('phone'), true);
            $phoneNumber = $phoneDecode['number'];
            $phoneExist = Phone::where('phone_number', $phoneNumber)->first();

            if($phoneExist) {
                return response()->json(['alertMessage' => 'Customer with such phone number already exist'],
                    404);
            }

            $contact = OrderContact::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $phoneNumber,
            ]);

            $order->orderContact()->associate($contact);
        }

        $order->status()->associate($orderStatus);
        $order->about = $request->input('about') ?? '';
        $order->save();

        OrderStatusHistory::create([
            'order_id' => $order->id,
            'status_id' => $orderStatus->id
        ]);

        // save file if exist

        if($request->hasFile('extra_file')) {
            $path = FileManager::save($request, "extra_file",
                "extra_file_", "orders/$order->id");
            $order->extra_file = $path;
            $order->save();
        }

        return response()->json($order);
    }

    public function update(Request $request, $orderId) {
        $order = Order::findOrFail($orderId);

        $oldStatus = Status::findOrFail($request->input('order_status_id'));
        $newStatus = Status::findOrFail($request->input('new_order_status_id'));

        // check if user has account, if not then create
        if($newStatus->name !== 'Undo' && !$order->customer && $order->order_contact_id) {
            $createdCustomer = AuthController::createCustomerAccount($order->orderContact);
            $createdCustomer->load('user.phones');

            if($createdCustomer) {
                $order->customer()->associate($createdCustomer);
                $order->orderContact()->dissociate();
            }
            else {
                return response()->json(['alertMessage' => 'Fail to create employee'], 404);
            }
        }

        // if order status already does not undo, then remove entry from undo_order table
        if($oldStatus->name == 'Undo' && $newStatus->id != $oldStatus->id) {
            $undoOrderEntry = UndoOrder::where("order_id", $order->id)->first();
            $undoOrderEntry->delete();
        }
        else if ($newStatus->name == 'Undo') {
            $extraReasonText = $request->input('undoReason.extra_reason_text');
            $type =  $request->input('undoReason.orderUndoCase.type_name');
            $reason =  $request->input('undoReason.orderUndoCase.reason');

            $case = UndoOrderCase::where(['type_name' => $type, 'reason' => $reason])->first();

            if(!$case) {
                return response()->json(['message' => 'case does not exist'], 201);
            }

            UndoOrder::create([
                'order_id' => $order->id,
                'order_undo_case_id' => $case->id,
                'extra_reason_text' => $extraReasonText
            ]);
        }

        $order->status()->associate($newStatus);
        OrderStatusHistory::create(['order_id' => $order->id, 'status_id' => $newStatus->id]);
        $order->save();

        $resOrder = Order::with(
    'project.projectType',
            'status',
            'customer.user.phones',
            'orderContact')
            ->findOrFail($order->id);
        return response()->json($resOrder, 201);
    }

    public function addUndoCaseEntry(Request $request, $orderId, $caseId) {
        $undoOrder = UndoOrder::where('order_id', $orderId)->first();

        abort_if(!$undoOrder, 404, 'order status is not undo');

        $case = UndoOrderCase::findOrFail($caseId);
        $undoOrder->extra_reason_text = $request->input('extra_reason_text');
        $undoOrder->orderUndoCase()->associate($case);
        $undoOrder->save();

        return response()->json("undo case added success $undoOrder", 201);
    }

    public function getUndoReasonCases(Request $request) {

        $undoCases = DB::table('undo_order_cases')
            ->selectRaw('type_name, reason')
            ->get()
            ->groupBy('type_name')
            ->map(function ($items) {
                $newItem = [];
                for ($i = 0; $i < count($items); $i++) {
                    $newItem[] = $items[$i]->reason;
                }
                return $newItem;
            });

        return response()->json($undoCases);
    }

    public function destroy(Request $request, $orderId) {
        $order = Order::findOrFail($orderId);
        $order->delete();
        ViewController::deleteAllViews($order);
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
