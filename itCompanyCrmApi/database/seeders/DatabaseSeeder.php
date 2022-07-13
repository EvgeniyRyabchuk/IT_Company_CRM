<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Database\Factories\Creators\StaticCreator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call([RoleSeeder::class]);

         $adminId = Role::where('name', 'admin')->first()->id;
         $developerId = Role::where('name', 'developer')->first()->id;
         $manageId = Role::where('name', 'manager')->first()->id;
         $customerId = Role::where('name', 'customer')->first()->id;

         $this->call([EmployeeSeeder::class], false, ['count' => 5, 'roleId' => $developerId]);
         $this->call([CustomerSeeder::class], false, ['count' => 5, 'roleId' => $customerId]);

         $users = User::all();

         $this->call([PhoneSeeder::class], false, [
             'user' => $users[0],
             'count' => 20,
         ]);

         $users = User::all();




    }
}
