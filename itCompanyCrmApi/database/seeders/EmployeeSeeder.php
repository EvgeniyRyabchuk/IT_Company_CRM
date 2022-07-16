<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run($count, $roleId)
    {
        $users = \App\Models\User::factory($count)->create()
        ->each(function ($user) use ($roleId) {
            $user->roles()->attach($roleId);
            Employee::create(
                [
                    'user_id' => $user->id,
                    'position_id' => 1,
                    'level_id' => 1
                ]
            );
        });

    }
}
