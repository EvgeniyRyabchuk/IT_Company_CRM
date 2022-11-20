<?php

namespace Database\Seeders;

use App\Models\KanbanCard;
use App\Models\KanbanLane;
use App\Models\KanbanPriority;
use App\Models\Project;
use Carbon\Carbon;
use Database\Factories\KanbanCardFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KanbanLaneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run($developers)
    {
        // for all developer for all theme project creating lanes with typical titles
        foreach ($developers as $developer) {

            foreach ($developer->projects as $project) {
                $titles = ['Backlog', 'To do', 'Doing', 'In Review', 'Done'];

                $laneCounter = 0;
                foreach ($titles as $title) {
                    $kanbanLane = new KanbanLane();
                    $kanbanLane->employee_id = $developer->id;
                    $kanbanLane->project_id = $project->id;
                    $kanbanLane->label = Carbon::now()->toDate();
                    $kanbanLane->title = $title;
                    $kanbanLane->color = fake()->hexColor;
                    $kanbanLane->index = $laneCounter++;
                    $kanbanLane->save();
                }

            }
            return;

        }

    }
}

/*


//                    KanbanCard::factory()->count(30)->create()->each(function ($card) use($kanbanLane, $index) {
//                        $priority = KanbanPriority::inRandomOrder()->first();
//
//                        $card->index = $index++;
//                        $card->tags()->attach($priority);
//                        $card->priority = $priority->title;
//                        $card->lane_id = $kanbanLane->id;
//                        $card->save();
//                    });

 */
