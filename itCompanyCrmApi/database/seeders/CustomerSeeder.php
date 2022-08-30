<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run($count, $roleId, $isVip = 0)
    {
        $users = \App\Models\User::factory($count)->create()
            ->each(function ($user) use ($roleId, $isVip) {
                $user->roles()->attach($roleId);
                Customer::create(
                    [
                        'user_id' => $user->id,
                        'vip' => rand(0, 1)
                    ]
                );

            });
    }
}
