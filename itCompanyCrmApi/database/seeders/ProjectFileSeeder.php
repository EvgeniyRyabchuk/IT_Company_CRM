<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\ProjectFile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectFileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (Project::all() as $project) {
            ProjectFile::factory()->count(10)->create()->each(function ($pf) use($project) {
                $pf->project()->associate($project);
            });
        }

    }
}
