<?php

namespace Database\Seeders;

use App\Models\UndoOrderCase;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UndoOrderCaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */


    /*
      ['name' => 'Not contacted'], // Клиент не вышел на связь
        ['name' => 'Customer Failure'], // Отказ клиента
            ['type_name'] => 'Customer Failure'
            ['reason'] => 'too expencive',

            ['type_name'] => 'Customer Failure'
            ['reason'] => 'create time too long',

            ['type_name'] => 'Customer Failure'
            ['reason'] => 'other',

        ['name' => ' Failure'], // Отказ клиента
     */

    public function run()
    {
        $models = [
            [
                'type_name' => 'Customer Failure',
                'reason' => 'too expensive',
            ],
            [
                'type_name' => 'Customer Failure',
                'reason' => 'create time too long',
            ],
            [
                'type_name' => 'Customer Failure',
                'reason' => 'order by mistake',
            ],
            [
                'type_name' => 'Customer Failure',
                'reason' => 'other',
            ],


            [
                'type_name' => 'Not contacted',
                'reason' => 'other',
            ],
        ];

        UndoOrderCase::insert($models);
    }
}
