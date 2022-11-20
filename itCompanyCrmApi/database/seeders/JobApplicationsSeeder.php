<?php

namespace Database\Seeders;

use App\Models\JobApplication;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobApplicationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        JobApplication::factory()->count(30)->create();
    }
}
