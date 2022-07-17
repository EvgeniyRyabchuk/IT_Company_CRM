<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectHistory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projects = Project::all();

        foreach ($projects as $project) {
            ProjectHistory::factory()->count(10)->create()
                ->each(function ($ph) use ($project) {

                    $employeeCount = $project->employees->count();
                    $employees = $project->employees->random($employeeCount);

                    foreach ($employees as $employee) {
                        $ph->employee()->associate($employee);
                    }
                    $ph->project()->associate($project);
                    $ph->save();
                });
        }
    }
}
