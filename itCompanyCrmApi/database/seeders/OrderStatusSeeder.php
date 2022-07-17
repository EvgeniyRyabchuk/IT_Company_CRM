<?php

namespace Database\Seeders;

use App\Models\OrderStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $models = [
            ['name' => 'Pending'], // в ожидании
            ['name' => 'Approval of Requirements'], // согласование требований
            ['name' => 'Processing'], // в разработке
            ['name' => 'Finished'], // завершен
        ];

        OrderStatus::insert($models);
    }
}
