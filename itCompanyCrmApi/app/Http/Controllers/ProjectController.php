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
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use ZipArchive;
use ZipStream\ZipStream;
use function Symfony\Component\String\b;

class ProjectController extends Controller
{
    public function index(Request $request) {
        $perPage = $request->input('limit') ?? 10;
        $filters = $request->input('filters') ?? null;
        $search = $request->input('search') ?? '';

        $sort = $request->input('sort') ?? 'created_at';
        $order = $request->input('order') ?? 'desc';

        $projects = Project::with(
            'projectType',
            'order',
            'projectLinks',
            'lanes'
        )
        ->withCount(['employees as member_count'])
        ->orderBy($sort, $order)
        ->paginate($perPage);

        return response()->json($projects, 201);

    }

    public function show(Request $request, $projectId) {
        $project = Project::with('tags')->findOrFail($projectId);
        return response()->json($project, 201);
    }

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

    public function fileManager(Request $request, $projectId)
    {

        $command = $request->get('command');
        $project = Project::findOrFail($projectId);
        $location = "projects/$projectId/data";

        $requestProcessedData = FileManager::getArgsFromRequest($request, $command, $location);
        $pathInfo = $requestProcessedData["pathInfo"] ?? null;
        $name = $requestProcessedData["name"] ?? null;

        if($command != "Download") {
            if($pathInfo) {
                if (count($pathInfo) > 0) {
                    foreach ($pathInfo as $info) {
                        $location .= '/' . $info["name"];
                    }
                }
            }
        }

        if($command == "UploadChunk") {

            if(FileManager::checkIfFilesExist($location, $name)) {
                return response()->json([
                    "success" => false,
                    "errorCode" => 404,
                    "errorText" => "Item with such name already exist"
                ]);
            }

            $result = FileManager::saveOneChunk($request, $location);

            if($result["status"] == "Saved") {
                $projectFile = new ProjectFile();
                $projectFile->name = $result["meta"]["name"];
                $projectFile->created_at = $result["meta"]["dateModified"];
                $projectFile->hasSubDirectories = $result["meta"]["hasSubDirectories"];
                $projectFile->isDirectory = $result["meta"]["isDirectory"];
                $projectFile->size = $result["meta"]["size"];
                $projectFile->path = $result["meta"]["path"] . "/" . $result["meta"]["name"];
                $projectFile->location = $result["meta"]["path"];
                $projectFile->extension = $result["meta"]["extension"];
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
                case "Download":
                    $query = ProjectFile::query();
                    foreach ($requestProcessedData["paths"] as $requestPath) {
                        $query->orWhere("path", $location . "/" . $requestPath);
                    }
                    $projects = $query->get();


                    $zipFileName = Carbon::now()->valueOf() . 'AllDocuments.zip';

                    // Create ZipArchive Obj
                    $zip = new ZipArchive;
                    if ($zip->open(storage_path($zipFileName), ZipArchive::CREATE) === TRUE) {

                        foreach ($projects as $project) {
                            logs()->warning('zip = ' . storage_path("app/private/" . $project->path));
                            $zip->addFile(storage_path("app/private/" . $project->path), $project->name);
                        }
                        $zip->close();
                    }

                    $headers = array(
                        'Content-Type' => 'application/octet-stream',
                    );

                    $filetopath = storage_path($zipFileName);

                    // Create Download Response
                    if (file_exists($filetopath)) {
                        return response()->
                        download($filetopath, $zipFileName, $headers)
                            ->deleteFileAfterSend(true);
                    }

                    return response()->json('zip not exist', 404);

                case "GetDirContents":
                    $files = ProjectFile::where([
                        "project_id" => $projectId,
                        "location" => $location
                    ])->get();

                    return response()->json([
                        "success" => true,
                        "result" => $files,
                        "errorCode" => null,
                        "errorText" => ""
                    ]);

                case "CreateDir":
                    //TODO: has sub directory

                    if(FileManager::checkIfFilesExist($location, $name)) {
                        return response()->json([
                            "success" => false,
                            "errorCode" => 404,
                            "errorText" => "Item with such name already exist"
                        ]);
                    }

                    $isCreated = FileManager::createDirectory($location . "/" . $name);
                    $projectFile = new ProjectFile();
                    $projectFile->name = $name;
                    $projectFile->created_at = Carbon::now();
                    $projectFile->hasSubDirectories = 0;
                    $projectFile->isDirectory = 1;
                    $projectFile->size = 0;
                    $projectFile->location = $location;
                    $projectFile->path = $location . "/" . $name;
                    $projectFile->project()->associate($project);
                    $projectFile->save();
                    return response()->json([
                        "success" => true,
                        "result" => $projectFile,
                        "errorCode" => null,
                        "errorText" => "",
                        "more" => $isCreated
                    ]);
                case "Rename":
                    //TODO: check if same file name not exist
                    if(FileManager::checkIfFilesExist(FileManager::getLocationFromPath($location), $name)) {
                        return response()->json([
                            "success" => false,
                            "errorCode" => 404,
                            "errorText" => "Item with such name already exist ==="
                        ]);
                    }


                    // in this place location using as old path
                    $projectFile = ProjectFile::where([
                        "project_id" => $projectId,
                        "path" => $location,
                    ])->first();
                    $oldPath = $projectFile->path;
                    $projectFile->name = $name;
                    $projectFile->path = $projectFile->location . "/" . $name;
                    Storage::disk('private')->move($location, $projectFile->path);
                    $projectFile->save();
                    if($projectFile->isDirectory == 1)
                        DbHelper::changeNestedProjectFilePaths($oldPath, $projectFile->path);

                    return response()->json([
                        "success" => true,
                        "result" => $projectFile,
                        "errorCode" => null,
                        "errorText" => ""
                    ]);

                case "Remove":
                    $projectFile = ProjectFile::where([
                        "project_id" => $projectId,
                        "path" => $location,
                    ])->first();

                    $fullPath = storage_path('app/private' . "/" . $location);
                    if ($projectFile->isDirectory == 1) {
                        DbHelper::removeNestedProjectFile($location);
                        File::deleteDirectory($fullPath);
                        $projectFile->delete();

                    } else {
                        File::delete($fullPath);
                        $projectFile->delete();
                    }

                    return response()->json([
                        "success" => true,
                        "result" => null,
                        "errorCode" => null,
                        "errorText" => ""
                    ]);
                case "Move":
                    $projectFile = ProjectFile::where([
                        "project_id" => $projectId,
                        "path" => $requestProcessedData["sourcePath"],
                    ])->first();

                    if(FileManager::checkIfFilesExist($requestProcessedData["destinationPath"], $projectFile->name)) {
                        return response()->json([
                            "success" => false,
                            "errorCode" => 404,
                            "errorText" => "Item with such name already exist"
                        ]);
                    }

                    $oldPath = $projectFile->path;
                    $projectFile->path = $requestProcessedData["destinationPath"] . "/" . $projectFile->name;
                    $projectFile->location = $requestProcessedData["destinationPath"];

                    Storage::disk('private')->move( $requestProcessedData["sourcePath"],
                        $requestProcessedData["destinationPath"] . "/" . $projectFile->name
                    );
                    $projectFile->save();
                    if($projectFile->isDirectory == 1)
                        DbHelper::changeNestedProjectFilePaths($oldPath, $projectFile->path);

                    return response()->json([
                        "success" => true,
                        "result" => $projectFile,
                        "errorCode" => null,
                        "errorText" => ""
                    ]);
                case "Copy":
                    $projectFile = ProjectFile::where([
                        "project_id" => $projectId,
                        "path" => $requestProcessedData["sourcePath"],
                    ])->first();

                    if(FileManager::checkIfFilesExist($requestProcessedData["destinationPath"], $projectFile->name)) {
                        return response()->json([
                            "success" => false,
                            "errorCode" => 404,
                            "errorText" => "Item with such name already exist"
                        ]);
                    }

                    $oldPath = $projectFile->path;

                    $newProjectFile = new ProjectFile();
                    /*
//                    $milliseconds = round(microtime(true) * 1000);
//                    $newName =  "Copy_" . $milliseconds . $projectFile->name;
                    */
                    $newName = $projectFile->name;
                    $newProjectFile->name = $newName;
                    $newProjectFile->created_at = Carbon::now();
                    $newProjectFile->hasSubDirectories = $projectFile->hasSubDirectories;
                    $newProjectFile->isDirectory = $projectFile->isDirectory;
                    $newProjectFile->size = $projectFile->size;

                    $newProjectFile->path = $requestProcessedData["destinationPath"] . "/" . $newName;
                    $newProjectFile->location = $requestProcessedData["destinationPath"];
                    $newProjectFile->extension = $projectFile->extension;

                    $newProjectFile->project()->associate($project);

                if($newProjectFile->isDirectory == 0) {

                    if(!Storage::disk('private')->copy($requestProcessedData["sourcePath"],
                        $requestProcessedData["destinationPath"] . "/" . $newName
                    )) {
                        return response()->json([
                            "success" => false,
                            "errorCode" => 404,
                            "errorText" => "Can't copy file item"
                        ]);
                    }
                }
                else {
                    $basePath = storage_path('app/private/');
                    if(!File::copyDirectory($basePath . $requestProcessedData["sourcePath"],
                        $basePath . $requestProcessedData["destinationPath"] . "/" . $newName
                    )) {
                        return response()->json([
                            "success" => false,
                            "errorCode" => 404,
                            "errorText" => "Can't copy folder item"
                        ]);
                    }
                    DbHelper::copyNestedProjectFile($oldPath, $newProjectFile->path, $project);
                }

                $newProjectFile->save();

                return response()->json([
                    "success" => true,
                    "result" => $projectFile,
                    "errorCode" => null,
                    "errorText" => ""
                ]);

                default:
                    return response()->json([
                        "success" => false,
                        "errorCode" => 404,
                        "errorText" => "command not found"
                    ]);
            }
        }
    }

    public function update() {

    }

    public function destroy(Request $request, $projectId) {
        $project = Project::findOrFail($projectId);
        $project->delete();
        return response()->json('project deleted success', 201);
    }

}

