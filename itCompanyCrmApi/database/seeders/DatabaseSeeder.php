<?php

namespace Database\Seeders;

use App\_Sl\TagAttacher;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\JobApplication;
use App\Models\KanbanLane;
use App\Models\KanbanPriority;
use App\Models\Level;
use App\Models\PersonalNotification;
use App\Models\Project;
use App\Models\ProjectLink;
use App\Models\ProjectType;
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
         $this->call([CustomerSeeder::class], false, ['count' => 10, 'roleId' => $customerRoleId]);

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

        TagAttacher::attachToManyRandom(User::class);

        $this->call(ProjectTypeSeeder::class);

        $this->call(ProjectSeeder::class, false, ['developers' => $developers]);

        $this->call(ProjectHistorySeeder::class);

        $this->call(ProjectRoleSeeder::class);

        TagAttacher::attachToManyRandom(Project::class);

//        $this->call(ProjectFileSeeder::class);

        $this->call(ProjectLinkSeeder::class);

        $this->call(NewsSeeder::class);

        $this->call(OrderStatusSeeder::class);

        $this->call(UndoOrderCaseSeeder::class);

        $this->call(OrderSeeder::class);


        $this->call(VacancySeeder::class);

        $this->call(VacancyStatusesSeeder::class);

        $this->call(JobApplicationsSeeder::class);

        $this->call(EventSeeder::class);

        /// $this->call(KanbanPrioritySeeder::class);

//        $this->call(KanbanLaneSeeder::class, false, compact('developers'));

        $users = User::all();
        /// $this->call(ChatMessageSeeder::class, false, compact('users'));

        $this->call(PersonalNotificationSeeder::class);
    }
}
