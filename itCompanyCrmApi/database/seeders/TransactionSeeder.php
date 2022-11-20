<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Transaction::factory()
            ->count(30)
            ->create()
            ->each(function ($transaction) {
                $order = Order::find($transaction->order_id);
                $project = $order->project;
                if($project) {
                    $project->paid += $transaction->summa;
                    $project->save();
                }
        });
    }
}
