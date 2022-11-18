<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StaticUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(
        $adminRoleId, $managerRoleId, $developerRoleId, $customerRoleId
    ) {

        // Admin
        $testAdmiinEmployeeAcoount = User::create([
            'first_name' => 'Evgeniy',
            'last_name' => 'Ryabchuk',
            'middle_name' => 'Andreevich',
            'full_name' => 'Ryabchuk Evgeniy Andreevich',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'),
            'about' => fake()->sentence(100)
        ]);

        $testAdmiinEmployeeAcoount->roles()->attach($adminRoleId);

        Employee::create([
            'position_id' => 1,
            'level_id' => 1,
            'user_id' => $testAdmiinEmployeeAcoount->id,
        ]);

        //Manager

        $managerAccount = User::create([
            'first_name' => 'Amelia',
            'last_name' => 'Cowan',
            'middle_name' => 'Grace',
            'full_name' => 'Amelia Grace Cowan',
            'email' => 'manager@gmail.com',
            'password' => Hash::make('password'),
            'about' => fake()->sentence(100)
        ]);

        $managerAccount->roles()->attach($managerRoleId);

        Employee::create([
            'position_id' => 4,
            'level_id' => 1,
            'user_id' => $managerAccount->id,
        ]);

        // Developer

        $developerAccount = User::create([
            'first_name' => 'Christopher',
            'last_name' => 'Combs',
            'middle_name' => '',
            'full_name' => 'Christopher Combs',
            'email' => 'developer@gmail.com',
            'password' => Hash::make('password'),
            'about' => fake()->sentence(100)
        ]);

        $developerAccount->roles()->attach($developerRoleId);

        Employee::create([
            'position_id' => 2,
            'level_id' => 2,
            'user_id' => $developerAccount->id,
        ]);

        // Customer

        $customerAccount = User::create([
            'first_name' => 'Elisa',
            'last_name' => 'Robinson',
            'middle_name' => '',
            'full_name' => 'Elisa Robinson',
            'email' => 'customer@gmail.com',
            'password' => Hash::make('password'),
            'about' => fake()->sentence(100)
        ]);

        $customerAccount->roles()->attach($customerRoleId);

        Customer::create([
            'user_id' => $customerRoleId,
        ]);

    }
}
