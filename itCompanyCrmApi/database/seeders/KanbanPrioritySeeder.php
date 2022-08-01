<?php

namespace Database\Seeders;

use App\Models\KanbanPriority;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KanbanPrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $models = [
            ['title' => "A"],
            ['title' => "B"],
            ['title' => "C"],
            ['title' => "D"],
            ['title' => "E"],
        ];

        KanbanPriority::insert($models);
    }
}
