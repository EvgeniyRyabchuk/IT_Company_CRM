<?php

namespace App\_Sl;


use App\Models\ProjectFile;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DbHelper
{

    public static function nextId($tableName) {
        $statement = DB::select("show table status like '$tableName'");
        return $statement[0]->Auto_increment;
    }

    public static function removeNestedProjectFile($location) {
        $projectFiles = ProjectFile::where([
            "location" => $location
        ])->get();

        logs()->warning("========= REMOVE =============");
        logs()->warning("location = $location");
        $count = count($projectFiles);
        logs()->warning("projectFiles count = $count");

        foreach ($projectFiles as $file) {
            if($file->isDirectory == 0) {
                $file->delete();
            }
            else {
                $nestedFiles = ProjectFile::where([ 'location' => $file->path ])->get();
                if(count($nestedFiles) > 0) {
                    DbHelper::removeNestedProjectFile($file->path);
                }
                $file->delete();
            }
        }
    }

    public static function changeNestedProjectFilePaths($oldPath, $newPath)
    {
        $projectFiles = ProjectFile::where(['location' => $oldPath])->get();

        logs()->warning("========= CHANGE PATH =============");
        logs()->warning("oldPath = $oldPath | newPath = $newPath");
        $count = count($projectFiles);
        logs()->warning("projectFiles count = $count");

        foreach ($projectFiles as $projectFile) {
            $oldPath = $projectFile->path;

            $projectFile->location = $newPath;
            $projectFile->path = $newPath . '/' . $projectFile->name;

            if($projectFile->isDirectory == 1) {
                DbHelper::changeNestedProjectFilePaths($oldPath, $projectFile->path);
            }
            $projectFile->save();
        }
    }


    public static function copyNestedProjectFile($oldPath, $newPath, $project)
    {
        $nestedProjectFiles = ProjectFile::where(["location" => $oldPath])->get();

        logs()->warning("========= PROJECT FILE COPY =============");
        $count = count($nestedProjectFiles);
        logs()->warning("nestedProjectFiles count = $count");

        foreach ($nestedProjectFiles as $nestedProjectFile) {
            $oldPath = $nestedProjectFile->path;
            $copy = new ProjectFile();
            $copy->name = $nestedProjectFile->name;
            $copy->created_at = Carbon::now();
            $copy->hasSubDirectories = $nestedProjectFile->hasSubDirectories;
            $copy->isDirectory = $nestedProjectFile->isDirectory;
            $copy->size = $nestedProjectFile->size;
            $copy->path = $newPath . "/" . $nestedProjectFile->name;
            $copy->location = $newPath;
            $copy->extension = $nestedProjectFile->extension;
            $copy->project()->associate($project);
            $copy->save();

            logs()->warning("========= NEW PROJECT FILE COPY $copy =============");

            if($nestedProjectFile->isDirectory == 1) {
                DbHelper::copyNestedProjectFile($oldPath, $copy->path, $project);
            }

        }
    }

}
