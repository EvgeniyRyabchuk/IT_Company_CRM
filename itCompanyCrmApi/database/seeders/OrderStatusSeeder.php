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
            // в ожидании
            ['name' => 'Pending'],
            // отменен (с указанием причины)
            ['name' => 'Undo'],

            // Постановка целей и задач сайта; согласование требований Разработка ➡️️ технического задания (ТЗ)
            ['name' => 'Approval of Customer Requirements'],
            // Разработка ТЗ
            ['name' => 'Development Technical Requirements'],
            // Ожидание поплаты
            ['name' => 'Waiting for payment'],
            // в разработке
            ['name' => 'Processing'],
            // завершен
            ['name' => 'Finished'],
        ];

        OrderStatus::insert($models);
    }
}
