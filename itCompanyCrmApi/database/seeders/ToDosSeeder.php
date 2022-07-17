<?php

namespace Database\Seeders;

use App\Models\ProjectToDo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ToDosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        ProjectToDo::factory()->count(30)->create()->each(function ($todo) {

        });


    }
}
