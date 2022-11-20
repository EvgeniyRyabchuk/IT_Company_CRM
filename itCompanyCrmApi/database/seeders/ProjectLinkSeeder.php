<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectLink;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectLinkSeeder extends Seeder
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
            $models = [
                [
                    'title' => 'GitHub',
                    'project_id' => $project->id,
                    'link' => 'https://github.com/EvgeniyRyabchuk/IT_Company_CRM',
                    'created_at' => Carbon::now()
                ],
                [
                    'title' => 'Jira',
                    'project_id' => $project->id,
                    'link' => 'https://jekaxray.atlassian.net/jira/software/projects/US/boards/1',
                    'created_at' => Carbon::now()
                ]
            ];

            ProjectLink::insert($models);
        }
    }
}
