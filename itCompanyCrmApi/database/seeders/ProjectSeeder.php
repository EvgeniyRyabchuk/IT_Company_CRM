<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(Collection $developers)
    {
        Project::factory()->count(50)->create()
        ->each(function ($p) use ($developers) {
            $p->name .= " (#$p->id)";
            // rand count rand developers
            if(count($developers) >= 1) {
                $randCount = rand(1, count($developers));
                $randDevs = $developers->random($randCount);
                $randDevs->each(function ($dev) use ($p) {
                    $dev->projects()->attach($p);
                });
            }

            $p->save();
        });
    }
}
