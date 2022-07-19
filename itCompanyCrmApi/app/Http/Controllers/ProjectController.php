<?php

namespace App\Http\Controllers;

use App\_Sl\DbHelper;
use App\_Sl\TagAttacher;
use App\Models\Project;
use App\Models\ProjectLink;
use App\Models\ProjectType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function index() {
        $projects = Project::all();
        return response()->json($projects, 201);

    }

    public function show(Request $request, $projectId) {
        $project = Project::with('tags')->findOrFail($projectId);

        return response()->json($project, 201);
    }

    public function store(Request $request) {

        $nextId = DbHelper::nextId('projects');
        $projectType = ProjectType::findOrFail($request->input('project_type_id'));
        $projectLinks = $request->input('project_links');

        // add project
        $project = new Project();
        $project->name = $request->input('name') ?? $projectType->name . " (#$nextId)";
        $project->projectType()->associate($projectType);
        $project->deadline = $request->input('deadline') ?? Carbon::now()->toDateTime();
        $project->budget = $request->input('budget');
        $project->paid = $request->input('paid') ?? 0;
        $project->save();

        // add project links
        foreach ($projectLinks as $link) {
            $pl = new ProjectLink(['title' => $link['title'], 'link' => $link['link']]);
            $project->projectLinks()->save($pl);
        }

        //TODO: files
        //TODO: todos
        //TODO: members



        return response()->json($project, 201);
    }



    public function update() {

    }

    public function destroy(Request $request, $projectId) {
        $project = Project::findOrFail($projectId);
        $project->delete();
        return response()->json('project deleted success', 201);
    }


}
