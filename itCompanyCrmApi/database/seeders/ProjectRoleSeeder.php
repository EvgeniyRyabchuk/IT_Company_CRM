<?php

namespace Database\Seeders;

use App\Models\ProjectRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $models = [
            ['name' => 'member'],
            ['name' => 'supervisor'],
            ['name' => 'observer'],
            ['name' => 'admin'],
        ];

        ProjectRole::insert($models);
    }
}
