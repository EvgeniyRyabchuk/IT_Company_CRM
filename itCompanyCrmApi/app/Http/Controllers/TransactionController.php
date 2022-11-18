<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function index(Request $request) {
        $orderId = $request->input('orderId');
        $query = Transaction::with('order');
        if($orderId) {
            $query->where('order_id', $orderId)
            ->orderBy('created_at', 'desc');
        }
        $transactions = $query->get();
        return response()->json($transactions, 201);
    }

    public function getByCustomer(Request $request) {

        $user = Auth::user();
        $customer = Customer::where('user_id', $user->id)->first();

        if(!$customer) {
            return response()->json
            (['alertMessage' => 'no such customer'],404);
        }

        $transactions =
            Transaction::with('order')
            ->whereHas('order', function ($q) use($customer) {
                  $q->where('customer_id', $customer->id);
            })
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json($transactions, 201);
    }

    public function getByOrder(Request $request, $orderId) {
        $transactions =
            Transaction::with('order')
                ->where('order_id', $orderId)
                ->orderBy('created_at', 'desc')
                ->get();
        return response()->json($transactions, 201);
    }


    public function pay(Request $request) {
        //TODO: payment system

        $card = $request->input('card');
        $order_id = $request->input('orderId');
        $summa = $request->input('summa');

        $order = Order::with('project')
            ->findOrFail($order_id);
        $transaction = new Transaction();

        $transaction->summa = $summa;
        $transaction->order_id = $order_id;
        $transaction->issuer = $card['issuer'];
        $transaction->last_card_digits = substr($card['number'], -4);
        $transaction->save();

        if($order->project) {
            $project = $order->project;
            $project->paid += $summa;
            $project->save();
        }
        else {
            return response()->json(['alertMessage' => 'no created project yet']);
        }

        return response()->json($transaction);
    }
}
