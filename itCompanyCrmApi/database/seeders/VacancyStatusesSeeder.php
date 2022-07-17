<?php

namespace Database\Seeders;

use App\Models\VacancyStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VacancyStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        VacancyStatus::create(['name' => 'pending']);
        VacancyStatus::create(['name' => 'accept']);
        VacancyStatus::create(['name' => 'deny']);
    }
}
