<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Factories\Creators\StaticCreator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $usersCreator = new StaticCreator(User::class);

         $users = \App\Models\User::factory(10)->create();

         $roles = \App\Models\Role::factory()->createMany([
             ['name' => 'customer'],
             ['name' => 'developer'],
             ['name' => 'manager'],
             ['name' => 'admin']
         ]);

        $users[0]->roles()->attach($roles[0]->id);
        $users[1]->roles()->attach($roles[1]->id);
        $users[2]->roles()->attach($roles[2]->id);
        $users[3]->roles()->attach($roles[3]->id);



    }
}
