<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderContact;
use App\Models\OrderStatus;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index(Request $request) {
        $defPerPage = 5;
        $perPage = $request->get('perPage') ?? $defPerPage;
        $orders = Order::all()->paginate($perPage);

        return response()->json($orders, 201);
    }

    public function show(Request $request, $orderId) {
        $order = Order::with(['orderStatus', 'orderContact'])->find($orderId);
        return response()->json($order, 201);
    }

    public function store(Request $request) {
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

        $extension = $request->file('extra_file')->getClientOriginalExtension();
        $path = $request->file('extra_file')
            ->storeAs("orders/$order->id", 'extra_file_'. time() . '.' . $extension);
        $order->extra_file = $path;
        $order->save();

        return response()->json(
            ['message' =>
                "opened create page. With does not exist customer = $customer"
            , 201]);
    }

    //TODO: add reason if order undo
    //TODO: create project if order status is Processing

    public function update(Request $request, $orderId) {

        $order = Order::findOrFail($orderId);
        $status = OrderStatus::findOrFail($request->order_status["id"]);

        if($request->customer)
            $customer = Customer::findOrFail($request->customer["id"]);
        if($request->project)
            $project = Project::findOrFail($request->project["id"]); 

        //TODO: validate nested model
        $contact = OrderContact::firstOrCreate([
            'name' => $request->order_contact["name"],
            'email' => $request->order_contact["email"],
            'phone' => $request->order_contact["phone"],
        ]);

        $order->orderStatus()->associate($status);
        $order->orderContact()->associate($contact);
        $order->project()->associate($project ?? null);
        $order->customer()->associate($customer ?? null);
        $order->about = $request->about;

        $order->save();

        return response()->json(['data' => $order, 201]);
    }

    public function destroy() {

        return response()->json(['message' => 'opened destroy page', 201]);
    }
}
