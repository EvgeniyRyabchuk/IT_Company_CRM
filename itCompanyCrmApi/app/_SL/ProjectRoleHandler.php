<?php

namespace App\_Sl;


use App\Models\Employee;
use App\Models\Project;
use App\Models\ProjectHistory;
use App\Models\ProjectRole;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;


class ProjectRoleHandler
{

    public static function injectRoleToCollection($project, $memberId) {
        $employeeWithRoles = $project->employees->each(function ($e) use($memberId, $project) {
            $project_employee = DB::table('employee_project')
                ->where(['project_id' => $project->id])
                ->where(['employee_id' => $memberId])
                ->select('project_role_id')
                ->first();
            $projectRoleId = $project_employee->project_role_id;
            $projectRole = ProjectRole::findOrFail($projectRoleId);
            $e->projectRole = $projectRole;
        });
        return $employeeWithRoles;
    }



}
