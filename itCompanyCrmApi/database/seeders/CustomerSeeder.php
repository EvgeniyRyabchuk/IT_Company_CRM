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
                $created_at =
                    fake()->dateTimeBetween('-9 month', '-1 day');

                $user->roles()->attach($roleId);
                $user->created_at = $created_at;
                $user->save();

                Customer::create(
                    [
                        'user_id' => $user->id,
                        'vip' => rand(0, 1),
                        'created_at' => $created_at
                    ]
                );

            });
    }
}
