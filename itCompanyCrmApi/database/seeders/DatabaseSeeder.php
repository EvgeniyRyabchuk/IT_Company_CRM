<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Employee;
use App\Models\Level;
use App\Models\Role;
use App\Models\Skill;
use App\Models\Tag;
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

         $adminRoleId = Role::where('name', 'admin')->first()->id;
         $developerRoleId = Role::where('name', 'developer')->first()->id;
         $manageRoleId = Role::where('name', 'manager')->first()->id;
         $customerRoleId = Role::where('name', 'customer')->first()->id;

         $this->call([LevelSeeder::class]);
         $this->call([PositionSeeder::class]);

         $this->call([EmployeeSeeder::class], false, ['count' => 10, 'roleId' => $developerRoleId]);
         $this->call([EmployeeSeeder::class], false, ['count' => 3, 'roleId' => $manageRoleId]);
         $this->call([CustomerSeeder::class], false, ['count' => 5, 'roleId' => $customerRoleId]);

         $this->call([PhoneSeeder::class]);
         $this->call([SkillSeeder::class]);

         // select only developers
         $developers = Employee::whereHas('user.roles', function ($q) use($developerRoleId) {
            $q->where('role_id', $developerRoleId);
        })->get();

        $skills = Skill::all();

        foreach ($developers as $developer) {
            $randCount = rand(1, count($skills));
            $randSkills = Skill::inRandomOrder()->take($randCount)->get();
            foreach ($randSkills as $skill) {
                $developer->skills()->attach($skill);
            }
        }

        $this->call(TagSeeder::class);


        $users = User::all();
        $tags = Tag::all();
        //TODO: tags seed for projects

        foreach ($users as $user) {
            $randCount = rand(1, count($tags));
            $randTags = Tag::inRandomOrder()->take($randCount)->get();
            foreach ($randTags as $tag) {
                $users->tags()->attach($tag);
            }
        }




    }
}
