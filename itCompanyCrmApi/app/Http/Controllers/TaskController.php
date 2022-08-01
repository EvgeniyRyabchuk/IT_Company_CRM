<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\KanbanCard;
use App\Models\KanbanPriority;
use App\Models\Project;
use App\Models\KanbanLane;
use App\Models\Role;
use App\Models\Tag;
use App\Models\ToDoStatus;
use App\Models\ToDoType;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    public function index() {
        $todos = KanbanLane::with('cards')->get();
        return response()->json($todos, 201);
    }

    public function getKanbanLanes(Request $request, $projectId) {
        //TODO: sort by priority

        $project = Project::with('lanes.employee',)
            ->findOrFail($projectId);

        $project->lanes->each(function ($todo) {
            $todo->setHidden(['project_id']);
        });

        return response()->json($project, 201);
    }

    public function getKanbanLanesByMember(Request $request, $projectId, $memberId) {

        $employee = Employee::findOrFail($memberId);

        $lanes = KanbanLane::
            with('employee', 'cards')
            ->where('project_id', $projectId)
            ->where('employee_id', $employee->id)
            ->get();

        $lanes->each(function ($todo) {
            $todo->setHidden(['project_id']);
        });

        return response()->json(['lanes' => $lanes], 201);
    }

    public function addKanbanLane(Request $request, $projectId) {
        //TODO: check if auth user connected to project

        $project = Project::findOrFail($projectId);
        $employeeId = $request->input('employee_id');
        $employee = Employee::findOrFail($employeeId);

        $lane = new KanbanLane();
        $lane->title = $request->input('title');
        $lane->label = Carbon::now();
        $lane->color = $request->input('color') ?? 'ffffff';

        $lane->employee()->associate($employee);
        $lane->project()->associate($project);
        $lane->save();

//        $developerRoleId = Role::where('name', 'developer')->first()->id;
//        $developer = Employee::whereHas('user.roles', function ($q) use($developerRoleId) {
//            $q->where('role_id', $developerRoleId);
//        })->first();
        $lanes = KanbanLane::
        with('employee', 'cards')
            ->where('project_id', $projectId)
            ->where('employee_id', $employee->id)
            ->get();

        return response()->json(['lanes' => $lanes], 201);
    }



    public function updateKanbanLane(Request $request, $projectId, $laneId) {
        //TODO: check if task owner is current auth user
        $project = Project::findOrFail($projectId);
        $lane = KanbanLane::findOrFail($laneId);
        $lane->title = $request->input('title');
        $lane->label = $request->input('label');
        $lane->color = $request->input('color');
        $lane->save();

        return response()->json(KanbanLane::where('project_id', $project->id)->get(), 201);
    }

    public function deleteKanbanLane(Request $request, $projectId, $laneId) {
        $task = KanbanLane::where([
            'project_id' => $projectId,
            'id' => $laneId
        ])->first();

        if(!$task) {
            return response()->json(['message' => 'task not found'], 404);
        }

        $task->delete();

        return response()->json(KanbanLane::where('project_id', $projectId)->get(),
            201);
    }





    public function addKanbanCard(Request $request, $projectId, $laneId) {

        $lane = KanbanLane::findOrFail($laneId);

        $card = new KanbanCard();
        $card->lane()->associate($lane);
        $card->title = $request->input('title');
        $card->description = $request->input('description');
        $card->label = Carbon::now();
        $card->cardColor =  $request->input('cardColor');
        $card->index =  $request->input('index');
        $card->save();
        $tags = $request->input('tags');
        if(isset($tags) && count($tags) > 0) {
            $card->tags()->detach();
            foreach ($tags as $tag) {
                $t = KanbanPriority::where([
                    'title' => $tag
                ])->first();
                if(!$t) {
                    return response()->json(['message' => 'tag not found', 404]);
                }
                $card->tags()->attach($t);
            }
        }
        $card->save();

        return response()->json(KanbanCard::with('tags')->get(), 201);
    }

    public function updateKanbanCard(Request $request, $projectId, $laneId, $cardId) {

        $lane = KanbanLane::findOrFail($laneId);
        $card = KanbanCard::findOrFail($cardId);

        $card->lane()->associate($lane);
        $card->title = $request->input('title');
        $card->description = $request->input('description');
        $card->label = Carbon::now();
        $card->cardColor =  $request->input('cardColor');
        $card->index =  $request->input('index');
        $card->save();
        $tags = $request->input('tags');

        if(isset($tags) && count($tags) > 0) {
            $card->tags()->detach();
            foreach ($tags as $tag) {
                $t = KanbanPriority::where([
                    'title' => $tag
                ])->first();
                if(!$t) {
                    return response()->json(['message' => 'tag not found', 404]);
                }
                $card->tags()->attach($t);
            }
        }
        $card->save();
        return response()->json(KanbanCard::with('tags')->get(), 201);
    }


    public function deleteKanbanCard(Request $request, $projectId, $laneId, $cardId) {

        $card = KanbanCard::findOrFail($cardId);

        if(!$card) {
            return response()->json(['message' => 'task not found'], 404);
        }

        $card->delete();

        return response()->json(KanbanCard::with('tags')->get(),201);
    }


}
