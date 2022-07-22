<?php

namespace App\Http\Controllers;

use App\_Sl\DbHelper;
use App\_SL\FileManager;
use App\_Sl\ProjectHistoryHandler;
use App\_Sl\ProjectRoleHandler;
use App\_Sl\TagAttacher;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\Project;
use App\Models\ProjectFile;
use App\Models\ProjectLink;
use App\Models\ProjectRole;
use App\Models\ProjectType;
use Carbon\Carbon;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;

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

    //TODO: vacanies

    public function store(Request $request) {
        //TODO: check project role rights

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
        if(!is_null($projectLinks)) {
            foreach ($projectLinks as $link) {
                $pl = new ProjectLink(['title' => $link['title'], 'link' => $link['link']]);
                $project->projectLinks()->save($pl);
            }
        }

        // temp
        $employee = Employee::inRandomOrder()->first();
        ProjectHistoryHandler::commit($project, $employee,"created project");

        //TODO: files

        return response()->json($project, 201);
    }


    public function addMember(Request $request, $projectId, $memberId) {
        $employee = Employee::findOrFail($memberId);
        $project = Project::findOrFail($projectId);

        // try to find such member in the project
        $exist = $project->employees->where('id', $memberId)->all();

        // if employee already include in the project then throw error
        if(count($exist) > 0) {
            return response()->json(["message" => "member already exist"], 201);
        }

        $project->employees()->attach($employee, ['project_role_id' => 2]);
        $project->save();

        // getting role in mediocre table and inject to project as property
        $members = Project::find($projectId)->employees->each(function($e) {
           $role = ProjectRole::findOrFail($e->pivot->project_role_id);
           $e->projectRole = $role;
        });

        return response()->json(['message' => 'member added successfully', 'data' => $members], 201);
    }

    public function deleteMember(Request $request, $projectId, $memberId) {
        $employee = Employee::findOrFail($memberId);
        $project = Project::findOrFail($projectId);

        $project->employees()->detach($employee);
        $project->save();

        $members = $project->employees->each(function($e) {
            $role = ProjectRole::findOrFail($e->pivot->project_role_id);
            $e->projectRole = $role;
        });
        return response()->json(['message' => 'member deleted successfully', 'data' => $members], 201);
    }

    public function getMembers(Request $request, $projectId) {
        $members = Project::findOrFail($projectId)->employees->each(function($e) {
            $role = ProjectRole::findOrFail($e->pivot->project_role_id);
            $e->projectRole = $role;
        });

        return response()->json($members, 201);
    }

    public function createDirectory(Request $request) {
        return response()->json($request);
        dd($request->all());
    }

    public function fileUploader(Request $request, $projectId)
    {
        $command = $request->get('command');
        $project = Project::findOrFail($projectId);

        $path = "projects/$projectId/data";

        if($command == "UploadChunk") {
            if ($request->input('arguments')) {
                $args = json_decode($request->input('arguments'), true, 100);
                $pathInfo = $args["destinationPathInfo"] ?? null;
                $meta = json_decode($args["chunkMetadata"], true, 100);
                $name = $meta["FileName"] ?? null;
            }

            if($pathInfo) {
                if(count($pathInfo) > 0) {
                    foreach ($pathInfo as $info) {
                        $path .= '/' . $info["name"];
                    }
                }
            }
        }
        else {
            if ($request->input('arguments')) {
                $args = json_decode($request->input('arguments'), true, 100);
                $pathInfo = $args["pathInfo"] ?? null;
                $name = $args["name"] ?? null;
            }

            if($pathInfo) {
                if(count($pathInfo) > 0) {
                    foreach ($pathInfo as $info) {
                        $path .= '/' . $info["name"];
                    }
                }
            }
        }


        if($command == "UploadChunk") {
            $result = FileManager::saveOneChunk($request, $path);
            if($result["status"] == "Saved") {
                $projectFile = new ProjectFile();
                $projectFile->name = $result["meta"]["name"];
                $projectFile->created_at = $result["meta"]["dateModified"];
                $projectFile->hasSubDirectories = $result["meta"]["hasSubDirectories"];
                $projectFile->isDirectory = $result["meta"]["isDirectory"];
                $projectFile->size = $result["meta"]["size"];
                $projectFile->path = $result["meta"]["path"];
                $projectFile->project()->associate($project);
                $projectFile->save();

                return response()->json([
                    "success" => true,
                    "result" => $projectFile,
                    "errorCode" => null,
                    "errorText" => ""
                ]);
            }

            return response()->json([
                "success" => true,
                "errorCode" => null,
                "errorText" => ""
            ]);
        }
        else {
            switch ($command) {

                case "CreateDir":
                    FileManager::createDirectory($path);
                    $projectFile = new ProjectFile();
                    $projectFile->name = $name;
                    $projectFile->created_at = Carbon::now();
                    $projectFile->hasSubDirectories = 0;
                    $projectFile->isDirectory = 1;
                    $projectFile->size = 0;
                    $projectFile->path = $path;
                    $projectFile->project()->associate($project);
                    $projectFile->save();
                    return response()->json([
                        "success" => true,
                        "result" => null,
                        "errorCode" => null,
                        "errorText" => ""
                    ]);
            }
        }
    }

    public function fileManager(Request $request, $projectId) {

        $command = $request->get('command');
        $project = Project::findOrFail($projectId);

        $path = "projects/$projectId/data";



        if($request->input('arguments')) {
            $args =  json_decode($request->input('arguments'), true, 100);
            $pathInfo = $args["pathInfo"] ?? null;
            $name = $args["name"] ?? null;
        }
//        return response()->json($pathInfo);

        if($pathInfo) {
            if(count($pathInfo) > 0) {
                foreach ($pathInfo as $info) {
                    $path .= '/' . $info["name"];
                }
            }
        }



        switch ($command) {
            case "GetDirContents":
                $files = ProjectFile::where([
                    "project_id" => $projectId,
                    "path" => $path
                ])->get();

                return response()->json([
                    "success" => true,
                    "result" => $files,
                    "errorCode" => null,
                    "errorText" => ""
                ]);

            case "CreateDir":
                FileManager::createDirectory($path);
                $projectFile = new ProjectFile();
                $projectFile->name = $name;
                $projectFile->created_at = Carbon::now();
                $projectFile->hasSubDirectories = 0;
                $projectFile->isDirectory = 1;
                $projectFile->size = 0;
                $projectFile->path = $path;
                $projectFile->project()->associate($project);
                $projectFile->save();
                return response()->json([
                    "success" => true,
                    "result" => null,
                    "errorCode" => null,
                    "errorText" => ""
                ]);

            case "SimpleUpload":

//                $fileName = FileManager::getFileNameFromArgs($request);
//                $request->file("chunk")->storeAs($path, $fileName);
                break;
            case "UploadChunk":
                $result = FileManager::saveOneChunk($request, $path);
                if($result["status"] == "Saved") {
                    $projectFile = new ProjectFile();
                    $projectFile->name = $result["meta"]["name"];
                    $projectFile->created_at = $result["meta"]["dateModified"];
                    $projectFile->hasSubDirectories = $result["meta"]["hasSubDirectories"];
                    $projectFile->isDirectory = $result["meta"]["isDirectory"];
                    $projectFile->size = $result["meta"]["size"];
                    $projectFile->path = $result["meta"]["path"];
                    $projectFile->project()->associate($project);
                    $projectFile->save();

                    return response()->json([
                        "success" => true,
                        "result" => $projectFile,
                        "errorCode" => null,
                        "errorText" => ""
                    ]);
                }
            break;

            default:
                return response()->json(["message" => "command not found"], 404);
        }

        return response()->json(["message" => "OK = $command"]);
//        dd($request->all());
    }












    public function update() {

    }

    public function destroy(Request $request, $projectId) {
        $project = Project::findOrFail($projectId);
        $project->delete();
        return response()->json('project deleted success', 201);
    }




}
