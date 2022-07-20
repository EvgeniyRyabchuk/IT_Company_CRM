<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectToDo;
use App\Models\ToDoStatus;
use App\Models\ToDoType;
use Illuminate\Http\Request;

class TaskController extends Controller
{

    public function index() {
        $todos = ProjectToDo::all();
        return response()->json($todos, 201);
    }

    public function getProjectTasks(Request $request, $projectId) {
        //TODO: sort by priority

        $project = Project::with(
            'projectTodos.employee',
            'projectTodos.todoStatus',
            'projectTodos.todoType')
            ->findOrFail($projectId);

        $project->projectTodos->each(function ($todo) {
            $todo->setHidden(['project_id', 'todo_status_id', 'todo_type_id']);
        });

        return response()->json($project, 201);
    }
    public function getProjectTasksByMember(Request $request, $projectId, $memberId) {

        $tasks = ProjectToDo::
            with('employee', 'todoStatus', 'todoType')
            ->where('project_id', $projectId)
            ->where('employee_id', $memberId)
            ->get();

        $tasks->each(function ($todo) {
            $todo->setHidden(['project_id', 'todo_status_id', 'todo_type_id']);
        });

        return response()->json($tasks, 201);
    }

    public function addProjectTask(Request $request, $projectId) {
        //TODO: check if auth user connected to project

        $project = Project::findOrFail($projectId);
        $employee = $request->input('employee_id');
        $todoStatusId = $request->input('todo_status_id');
        $todoTypeid = $request->input('todo_type_id');

        $status = ToDoStatus::findOrFail($todoStatusId);
        $type = ToDoType::findOrFail($todoTypeid);

        $task = new ProjectToDo();
        $task->text = $request->input('text');
        $task->color = $request->input('color');
        $task->priority = $request->input('priority');
        $task->todoStatus()->associate($status);
        $task->todoType()->associate($type);
        $task->employee()->associate($employee);
        $task->project()->associate($project);
        $task->save();

        //TODO: add history entry

        return response()->json(ProjectToDo::where('project_id', $project->id)->get(), 201);
    }

    public function update(Request $request, $projectId, $taskId) {
        //TODO: check if task owner is current auth user
        $project = Project::findOrFail($projectId);

        $todoStatusId = $request->input('todo_status_id');
        $todoTypeid = $request->input('todo_type_id');

        $status = ToDoStatus::findOrFail($todoStatusId);
        $type = ToDoType::findOrFail($todoTypeid);

        $task = ProjectToDo::findOrFail($taskId);
        $task->text = $request->input('text');
        $task->color = $request->input('color');
        $task->priority = $request->input('priority');
        $task->todoStatus()->associate($status);
        $task->todoType()->associate($type);
        $task->save();

        return response()->json(ProjectToDo::where('project_id', $project->id)->get(), 201);
    }

    public function deleteProjectTask(Request $request, $projectId, $taskId) {
        $task = ProjectToDo::where([
            'project_id' => $projectId,
            'id' => $taskId
        ])->first();

        if(!$task) {
            return response()->json(['message' => 'task not found'], 404);
        }

        $task->delete();

        return response()->json(ProjectToDo::where('project_id', $projectId)->get(),
            201);
    }

}
