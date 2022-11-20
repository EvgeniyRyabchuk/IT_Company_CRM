<?php

namespace App\_Sl;

use App\Models\Employee;
use App\Models\Project;
use App\Models\ProjectHistory;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Support\Str;

class ProjectHistoryHandler
{

    public static function commit(Project $project, User $initiator, string $action) : bool {

        $employee = Employee::with('user')->where('user_id', $initiator->id)->first();

        if(!$employee) {
            return false;
        }

        $history = new ProjectHistory();
        $history->project()->associate($project);
        $history->employee()->associate($employee);
        $history->action = $action;
        $history->save();
        return true;
    }

}
