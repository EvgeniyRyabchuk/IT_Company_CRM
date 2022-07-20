<?php

namespace App\_Sl;


use App\Models\Employee;
use App\Models\Project;
use App\Models\ProjectHistory;
use App\Models\Tag;
use Illuminate\Support\Str;

class ProjectHistoryHandler
{

    public static function commit(Project $project, Employee $initiator, string $action) {

        $history = new ProjectHistory();
        $history->project()->associate($project);
        $history->employee()->associate($initiator);
        $history->action = $action;
        $history->save();

    }



}
