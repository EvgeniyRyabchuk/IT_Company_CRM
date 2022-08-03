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
            with(['employee', 'cards' => function($c) {
                $c->orderBy('index', 'asc');
            }])
            ->where('project_id', $projectId)
            ->where('employee_id', $employee->id)
            ->orderBy('index', 'asc')
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
        $lane->index = KanbanLane::where('project_id', $projectId)
            ->where('employee_id', $employeeId)->count();

        $lane->employee()->associate($employee);
        $lane->project()->associate($project);
        $lane->save();

//        $developerRoleId = Role::where('name', 'developer')->first()->id;
//        $developer = Employee::whereHas('user.roles', function ($q) use($developerRoleId) {
//            $q->where('role_id', $developerRoleId);
//        })->first();
        $lanes = KanbanLane::
        with(['employee', 'cards' => function($c) {
            $c->orderBy('index', 'asc');
        }])
            ->where('project_id', $projectId)
            ->where('employee_id', $employee->id)
            ->orderBy('index', 'asc')
            ->get();

        return response()->json(['lanes' => $lanes], 201);
    }



    public function updateKanbanLane(Request $request, $projectId, $laneId) {
        //TODO: check if task owner is current auth user
        $project = Project::findOrFail($projectId);
        $lane = KanbanLane::findOrFail($laneId);
        $lane->title = $request->input('title') ?? $lane->title;
        $lane->label = $request->input('label') ?? $lane->label;
        $lane->color = $request->input('color') ?? $lane->color;
        $lane->index = $request->input('index') ?? $lane->index;
        $lane->save();

        return response()->json($lane, 201);
    }

    public function swapKanbanLanes(Request $request, $projectId) {

        $project = Project::findOrFail($projectId);

        $lanes = $request->input("lanes");

        foreach ($lanes as $requestLane) {
            $lane = KanbanLane::findOrFail($requestLane["id"]);
            $lane->index = $requestLane["index"] ?? $lane->index;
            $lane->save();
        }

        return response()->json(["message" => 'swapped success'], 201);
    }

    public function deleteKanbanLane(Request $request, $projectId, $laneId) {
        $lane = KanbanLane::where([
            'project_id' => $projectId,
            'id' => $laneId
        ])->first();

        if(!$lane) {
            return response()->json(['message' => 'task not found'], 404);
        }

        $lane->delete();

        return response()->json(["message" => 'lane deleted success'],
            201);
    }


    public function addKanbanCard(Request $request, $projectId, $laneId) {

        $lane = KanbanLane::findOrFail($laneId);

        $card = new KanbanCard();
        $card->lane()->associate($lane);
        $card->title = $request->input('title');
        $card->description = $request->input('description') ?? '';
        $card->label = Carbon::now();
        $card->cardColor = $request->input('cardColor') ?? '#ffffff';

        $card->index = KanbanCard::where('lane_id', $lane->id)->count();
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
        return response()->json($card, 201);
    }



    public function updateKanbanCard(Request $request, $projectId, $laneId, $cardId) {
        $index = $request->input('index');

        $lane = KanbanLane::findOrFail($laneId);
        $card = KanbanCard::findOrFail($cardId);
        $cards = KanbanCard::where("lane_id", $laneId)->orderBy('index', "asc")->get();
        $oldIndex = $card->index;

        $card->lane()->associate($lane);
        $card->title = $request->input('card.title');
        $card->description = $request->input('card.description') ?? '';
        $card->cardColor = $request->input('card.cardColor');
        $card->index = $index;
        $tags = $request->input('card.tags');
        $card->save();

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

        $lane = KanbanLane::findOrFail($laneId);

        $counter = 0;
        foreach ($cards as $laneCard) {
            if($laneCard->id != $cardId) {
                if($laneCard->index == $index) {
                    if($oldIndex < $index && $laneCard->index > 0)
                        $laneCard->index = $laneCard->index - 1;
                    else
                        $laneCard->index = $laneCard->index + 1;
                }
                else {
                    if($laneCard->index > $index) {
                        $laneCard->index = $laneCard->index + 1;
                    }
                    else if($laneCard->index < $index && $laneCard->index > 0) {
                        $laneCard->index = $laneCard->index - 1;
                    }
                }


                $laneCard->save();
            }

            logs()->warning("laneCard = $laneCard->title | counter = $counter | index = $index");

        }

        $cards = KanbanCard::where("lane_id", $laneId)->orderBy('index', "asc")->get();
        return response()->json($cards, 201);
    }

    public function swapKanbanCards(Request $request, $projectId, $laneId, $cardId) {
        $employee = Employee::findOrFail(11);
        $requestFromLane = $request->input('fromLane');
        $fromLane = KanbanLane::findOrFail($requestFromLane["id"]);
        $requestFromCards = $requestFromLane["cards"];

        foreach ($requestFromCards as $requestFromCard) {
            $card = KanbanCard::findOrFail($requestFromCard["id"]);
            $card->index = $requestFromCard["index"];
            $fromLane->cards()->save($card);
        }
        $fromLane->save();

        $requestToLane = $request->input('toLane');
        $toLane = KanbanLane::findOrFail($requestToLane["id"]);
        $requestToCards = $requestToLane["cards"];

        foreach ($requestToCards as $requestToCard) {
            $card = KanbanCard::findOrFail($requestToCard["id"]);
            $card->index = $requestToCard["index"];
            $toLane->cards()->save($card);
        }
        $toLane->save();

        $lanes = KanbanLane::
        with(['employee', 'cards' => function($c) {
            $c->orderBy('index', 'asc');
        }])
            ->where('project_id', $projectId)
            ->where('employee_id', $employee->id)
            ->orderBy('index', 'asc')
            ->get();
        return response()->json([$fromLane->cards, $toLane->cards], 201);
    }


    public function deleteKanbanCard(Request $request, $projectId, $laneId, $cardId) {

        $card = KanbanCard::findOrFail($cardId);

        if(!$card) {
            return response()->json(['message' => 'task not found'], 404);
        }

        $card->delete();

        $cards = KanbanCard::with('tags')
            ->where("lane_id", $laneId)
            ->orderBy('index', 'asc')
            ->get();


        return response()->json($cards,201);
    }


}