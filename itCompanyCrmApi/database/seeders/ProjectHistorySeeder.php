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
            ProjectHistory::factory()->count(100)->create()
                ->each(function ($ph) use ($project) {
                    $employee = $project->employees->random(1);
                    $ph->employee()->associate($employee[0]);
                    $ph->project()->associate($project);
                    $ph->save();
                });
        }
    }
}
