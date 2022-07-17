<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\ToDoStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ToDoStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ToDoStatus::create(['name' => 'To do']);
        ToDoStatus::create(['name' => 'Doing']);
        ToDoStatus::create(['name' => 'Done']);
    }
}
