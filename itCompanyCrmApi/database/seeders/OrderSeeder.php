<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderContact;
use App\Models\OrderStatusHistory;
use App\Models\Status;
use App\Models\Project;
use App\Models\UndoOrder;
use App\Models\UndoOrderCase;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

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

        $reqPath = 'static/files/orders/requirements/SoftwareRequirements.doc';
//        $requirementFile= Storage::disk('public')->files($reqPth);

        $contacts = OrderContact::factory()->count(10)->create()
        ->each(function ($c) use($reqPath) {
            $status = Status::inRandomOrder()->first();
            $created_at = fake()->dateTimeBetween(
                '-1 month',
                '-1 day');

            $order = Order::create([
                'status_id' => $status->id,
                'order_contact_id' => $c->id,
                'about' => fake()->sentence(10),
                'extra_file' => $reqPath,
                'created_at' => $created_at
            ]);
            $c->created_at = $created_at;
            $c->save();

            OrderStatusHistory::create([
                'order_id' => $order->id,
                'status_id' => $status->id,
                'created_at' => $created_at
            ]);
        });

        for ($i = 0; $i < 10; $i++) {
            $status = Status::where('name', 'Finished')->first();
            $project = $projects[$i];
            $project->created_at = fake()->dateTimeBetween(
                '-1 month',
                '-1 day');
            $project->save();

            $created_at = fake()->dateTimeBetween(
                '-1 month',
                '-1 day');

            $order = Order::create([
                'project_id' => $project->id,
                'status_id' => $status->id,
                'customer_id' => $customers[$i]->id,
                'about' => fake()->sentence(10),
                'extra_file' => $reqPath,
                'created_at' => $created_at
            ]);
            OrderStatusHistory::create([
                'order_id' => $order->id,
                'status_id' => $status->id,
                'created_at' => $created_at
            ]);
        }

        Order::all()->each(function ($order) {
            $undoStatus = Status::where('name', 'Undo')->first();

            if($order->order_status_id == $undoStatus->id) {
                $undoCase = UndoOrderCase::inRandomOrder()->first();
                UndoOrder::create([
                    'extra_reason_text' => fake()->sentence(3),
                    'order_id' => $order->id,
                    'order_undo_case_id' => $undoCase->id
                ]);
            }
        });

    }
}
