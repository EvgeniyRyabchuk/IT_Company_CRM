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
            ['name' => 'Undo'], // отменен (с указанием причины)

            // Постановка целей и задач сайта; согласование требований Разработка ➡️ ➡️ технического задания (ТЗ)
            ['name' => 'Approval of Customer Requirements'],
            // Разработка ТЗ
            ['name' => 'Development Technical Requirements'],

            ['name' => 'Processing'], // в разработке
            ['name' => 'Finished'], // завершен
        ];

        OrderStatus::insert($models);
    }
}
