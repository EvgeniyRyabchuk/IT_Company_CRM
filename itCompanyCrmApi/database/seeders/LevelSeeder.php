<?php

namespace Database\Seeders;

use App\Models\Level;
use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $models = [
            ['name' => 'intern'],
            ['name' => 'junior'],
            ['name' => 'middle'],
            ['name' => 'senior']
        ];

        Level::insert($models);

    }
}
