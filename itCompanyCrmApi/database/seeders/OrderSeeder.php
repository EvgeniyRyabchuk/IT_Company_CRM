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
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class OrderSeeder extends Seeder
{

    public static function createFullHistory($stIndex, $orderId, $created_at) {
        $undoStatus = Status::where('name', 'Undo')->first();
        if($stIndex === $undoStatus->id) return;

        while ($stIndex > -1) {
            $st = Status::where('index', $stIndex)->first();
            OrderStatusHistory::create([
                'order_id' => $orderId,
                'status_id' => $st->id,
                'created_at' => $created_at
            ]);
            $stIndex--;
        }
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $customer_count = 100;
        $projects_count = 100;

        $order_contact_count = 100;

        $created_at_order_for_unauth_users = ['-9 month', '-1 day'];
        $created_at_order_for_auth_users = ['-9 month', '-1 day'];


        $customers = Customer::take($customer_count)->get();
        $projects = Project::take($projects_count)->get();

        $reqPath = 'static/files/orders/requirements/SoftwareRequirements.doc';
//        $requirementFile= Storage::disk('public')->files($reqPth);

        $contacts = OrderContact::factory()->count($order_contact_count)->create()
        ->each(function ($c)
                use($reqPath, $created_at_order_for_unauth_users) {

            $status = Status::inRandomOrder()->first();
            $created_at = fake()->dateTimeBetween(
                $created_at_order_for_unauth_users[0],
                $created_at_order_for_unauth_users[1]
            );

            $order = Order::create([
                'status_id' => $status->id,
                'order_contact_id' => $c->id,
                'about' => fake()->sentence(10),
                'extra_file' => $reqPath,
                'created_at' => $created_at
            ]);
            $c->created_at = $created_at;
            $c->save();

            $this::createFullHistory($status->index, $order->id, $created_at);


        });

        for ($i = 0; $i < $projects_count; $i++) {
            $status = Status::where('name', 'Finished')->first();
            $project = $projects[$i];
            $project->created_at = fake()->dateTimeBetween(
                $created_at_order_for_auth_users[0],
                $created_at_order_for_auth_users[1]
            );

            $project->save();

            $created_at = fake()->dateTimeBetween(
                $created_at_order_for_auth_users[0],
                $created_at_order_for_auth_users[1]
            );

            $order = Order::create([
                'project_id' => $project->id,
                'status_id' => $status->id,
                'customer_id' => $customers[$i]->id,
                'about' => fake()->sentence(10),
                'extra_file' => $reqPath,
                'created_at' => $created_at
            ]);

            $this::createFullHistory($status->index, $order->id, $created_at);
        }

        Order::all()->each(function ($order) {
            $undoStatus = Status::where('name', 'Undo')->first();

            if($order->status_id == $undoStatus->id) {
                $undoCase = UndoOrderCase::inRandomOrder()->first();

                UndoOrder::create([
                    'extra_reason_text' => fake()->sentence(3),
                    'order_id' => $order->id,
                    'order_undo_case_id' => $undoCase->id
                ]);
//
//                $this::createFullHistory($undoStatus->index, $order->id,
//                    Carbon::now());

            }
        });

    }
}
