<?php

namespace Database\Seeders;

use App\Models\JobApplicationStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobApplicationStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        JobApplicationStatus::create(['name' => 'pending', 'index' => 0, 'bgColor' => '#E7D276']);
        JobApplicationStatus::create(['name' => 'accept', 'index' => 1, 'bgColor' => '#54E768']);
        JobApplicationStatus::create(['name' => 'deny', 'index' => 2, 'bgColor' => '#E77166']);
    }
}
