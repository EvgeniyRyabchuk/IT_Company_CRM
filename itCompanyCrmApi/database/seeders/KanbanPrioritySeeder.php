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
            ['title' => "A", "bgcolor" => '#FF461F'],
            ['title' => "B", "bgcolor" => '#FFC33F'],
            ['title' => "C", "bgcolor" => '#93FD50'],
            ['title' => "D", "bgcolor" => '#50C1FD'],
            ['title' => "E", "bgcolor" => '#5948FF'],
        ];

        KanbanPriority::insert($models);
    }
}
