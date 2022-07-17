<?php

namespace Database\Seeders;

use App\Models\ToDoType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ToDoTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ToDoType::create(['name' => 'create features']);
        ToDoType::create(['name' => 'fix bag']);
    }
}
