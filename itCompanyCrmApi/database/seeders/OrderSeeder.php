<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projects = Project::take(10)->get();
        $customers = Customer::take(10)->get();

        for ($i = 0; $i < 10; $i++) {
            $status = OrderStatus::inRandomOrder()->first();

            Order::create([
                'project_id' => $projects[$i]->id,
                'order_status_id' => $status->id,
                'customer_id' => $customers[$i]->id
            ]);

        }

    }
}
