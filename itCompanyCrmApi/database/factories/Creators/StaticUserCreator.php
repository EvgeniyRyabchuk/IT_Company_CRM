<?php

namespace Database\Factories\Creators;

use App\Models\Role;
use App\Models\User;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker;

class StaticUserCreator extends StaticCreator
{
    function __construct($model) {
        parent::__construct($model);
    }


    public static function create()
    {

        $userRoleID = Role::create(['name' => 'user'])->id;
        $adminRoleID = Role::create(['name' => 'admin'])->id;
        $super_adminRoleID = Role::create(['name' => 'super_admin'])->id;

        $defaulPassword = hash('sha256', "123456789" . env('APP_SECRET'));

        $faker = Faker\Factory::create("en_EN");


        $userId =  User::create([
            'name' => "Name 1",
            'about' => $faker->text(1000),
            'email' => 'jeka.rubchuk@gmail.com',
            'email_verified_at' => now(),
            'password' => $defaulPassword,
            'remember_token' => Str::random(10),
        ])->id;

        $adminId =  User::create([
            'name' => $faker->name(),
            'about' => $faker->text(1000),
            'email' => $faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => $defaulPassword,
            'remember_token' => Str::random(10),
        ])->id;

        $superUserId = User::create([
            'name' => $faker->name(),
            'about' => $faker->text(1000),
            'email' => $faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => $defaulPassword,
            'remember_token' => Str::random(10),
        ])->id;


        DB::table('user_role')->insert([
            'user_id' => $userId,
            'role_id' => $userRoleID
        ]);


        DB::table('user_role')->insert([
            'user_id' => $adminId,
            'role_id' => $adminRoleID
        ]);

        DB::table('user_role')->insert([
            'user_id' => $superUserId,
            'role_id' => $adminRoleID
        ]);
        DB::table('user_role')->insert([
            'user_id' => $superUserId,
            'role_id' => $super_adminRoleID
        ]);

        $users = [
            User::findOrFail($userId),
            User::findOrFail($adminId),
            User::findOrFail($superUserId),
        ];

        return $users;
    }



}
