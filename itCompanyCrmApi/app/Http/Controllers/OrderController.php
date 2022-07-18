<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderContact;
use App\Models\OrderStatus;
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

    //TODO: save extra file

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

        return response()->json(
            ['message' =>
                "opened create page. With does not exist customer = $customer"
            , 201]);
    }

    public function edit() {

        return response()->json(['message' => 'opened edit page', 201]);
    }

    public function update() {

        return response()->json(['message' => 'opened update page', 201]);
    }

    public function destroy() {

        return response()->json(['message' => 'opened destroy page', 201]);
    }
}
