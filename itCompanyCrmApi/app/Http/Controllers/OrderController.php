<?php

namespace App\Http\Controllers;

use App\_SL\FileManager;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderContact;
use App\Models\OrderStatus;
use App\Models\Project;
use App\Models\Role;
use App\Models\UndoOrder;
use App\Models\UndoOrderCase;
use App\Models\User;
use App\Notifications\AccountCreatedNotification;
use App\Notifications\PasswordResetNotification;
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

        $orderStatus = json_decode($request->input('orderStatus') ?? '[]');

        $query = Order::with('project.projectType',
            'orderStatus',
            'customer.user',
            'orderContact');
//        if(!is_null($orderStatus)) {
//            $stIdsArr = explode(',', $status);
//            foreach ($stIdsArr as $st) {
//                $query = $query->orWhere('order_status_id', "=", $st);
//            }
//        }

        $query = $query->orderBy($sort, $sortOrder);
        $orders = $query->paginate($perPage);

        return response()->json($orders, 201);
    }

    public function show(Request $request, $orderId) {
        $order = Order::with(['orderStatus', 'orderContact'])->find($orderId);
        return response()->json($order, 201);
    }

    public function store(Request $request) {
//TODO: check if customer already registered
        $email = $request->input('email');
        // if customer with such email already exist
        $customer = Customer::whereHas('user', function ($q) use($email) {
            $q->where('email', $email);
        })->first();

        $orderStatus = OrderStatus::where(['name' => 'pending'])->first();
        $order = new Order();

        // if account exist redirect to log in page
        if($customer) {
            if (!Auth::check()) {
                return response()->json('401',
                    'Account with such email already exist.
                      Please log in to make order');
            }

            $order->orderStatus()->associate($orderStatus);
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
        $order->orderStatus()->associate($orderStatus);
        $order->about = $request->input('about') ?? '';
        $order->save();

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

    public function update(Request $request, $orderId) {
        $order = Order::findOrFail($orderId);
        $oldStatus = $order->orderStatus;

        $status = OrderStatus::findOrFail($request->order_status_id);

        if($request->customer)
            $customer = Customer::findOrFail($request->customer["id"]);
        if($request->project)
            $project = Project::findOrFail($request->project["id"]);

        //TODO: validate nested model

        if(!is_null($request->order_contact)) {
            $contact = OrderContact::firstOrCreate([
                'name' => $request->order_contact["name"],
                'email' => $request->order_contact["email"],
                'phone' => $request->order_contact["phone"],
            ]);
            $order->orderContact()->associate($contact);
        }

        $order->orderStatus()->associate($status);
        $order->project()->associate($project ?? null);
        $order->customer()->associate($customer ?? null);
        $order->about = $request->about;
        $order->save();

        // if order status already does not undo, then remove entry in undo_order table
        if($oldStatus->name = 'Undo' && $order->orderStatus->id != $oldStatus->id) {
            $undoOrderEntry = UndoOrder::where("order_id", $order->id)->first();
            $undoOrderEntry->delete();
        }
        else if ($order->orderStatus->name == 'Undo') {
            UndoOrder::create([
                'order_id' => $order->id,
                'order_undo_case_id' => null
            ]);
        }

//        switch ($order->orderStatus) {
//            case ""
//        }
        return response()->json(['data' => $order, 201]);
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
        $order = Order::with("orderContact")->findOrFail($orderId);

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


}
