<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    /*
        E5CB9F +
        0275dB +
        5cb85c +
        5bc0de +
        0ad4e 6B94DE +
        d9534f +
        292b2c

     */

    public function run()
    {
        $models = [
            // в ожидании
            ['name' => 'Pending', 'bgColor' => '#E5CB9F', 'index' => 0],


            // Постановка целей и задач сайта; согласование требований Разработка ➡️️ технического задания (ТЗ)
            ['name' => 'Approval of Customer Requirements', 'bgColor' => '#0275dB', 'index' => 1],
            // Разработка ТЗ
            ['name' => 'Development Technical Requirements', 'bgColor' => '#5cb85c', 'index' => 2],
            // Ожидание оплаты
            ['name' => 'Waiting for payment', 'bgColor' => '#5bc0de', 'index' => 3],
            // в разработке
            ['name' => 'Processing', 'bgColor' => '#6B94DE', 'index' => 4],
            // завершен
            ['name' => 'Finished', 'bgColor' => '#292b2c', 'index' => 5],

            // отменен (с указанием причины)
            ['name' => 'Undo', 'bgColor' => '#d9534f', 'index' => 6],
        ];

        Status::insert($models);
    }
}
