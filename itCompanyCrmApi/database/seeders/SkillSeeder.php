<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $models = [
            ['name' => "C#"],
            ['name' => "ASP.NET"],
            ['name' => "PHP"],
            ['name' => "LARAVEL"],
            ['name' => "C++"],
            ['name' => "JavaScript"],
            ['name' => "Ruby"],
            ['name' => "SPRING MVC"],
            ['name' => 'Data Science'],
            ['name' => 'Data Analyst'],
            ['name' => 'Data Science'],
            ['name' => 'PostgreSQL'],
            ['name' => 'MySql'],
            ['name' => 'Python'],
            ['name' => 'Django']
        ];

        Skill::insert($models);

    }
}
