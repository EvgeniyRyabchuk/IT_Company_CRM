<?php


namespace App\_SL;




use App\Http\Controllers\Controller;
use App\Models\ProjectFile;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class FileManager {


    public static function getFileNameFromArgs($request) {
        $args = $request->input('arguments');
        $d = json_decode($args, true, 100);
        $chunkMeta = json_decode($d["chunkMetadata"],true, 100);
        return $chunkMeta["FileName"];
    }

    public static function getLocationFromPath($path) {
        $arr = explode('/', $path);
        array_pop($arr);
        return implode("/", $arr);
    }

    public static function getArgsFromRequest($request, $command, $path) {
        if ($request->input('arguments')) {
            if ($command == "UploadChunk") {
                $args = json_decode($request->input('arguments'), true, 100);
                $meta = json_decode($args["chunkMetadata"], true, 100);

                return [
                    "name" => $meta["FileName"] ?? null,
                    "pathInfo" => $args["destinationPathInfo"] ?? []
                ];
            }
            else if ($command == "Move" || $command == "Copy") {
                $args = json_decode($request->input('arguments'), true, 100);
                $destinationPathInfo = $args["destinationPathInfo"];
                $sourcePathInfo = $args["sourcePathInfo"];

                $destPath = $path;
                $sourcePath = $path;

                if (count($destinationPathInfo) > 0) {
                    foreach ($destinationPathInfo as $info) {
                        $destPath .= '/' . $info["name"];
                    }
                }

                if (count($sourcePathInfo) > 0) {
                    foreach ($sourcePathInfo as $info) {
                        $sourcePath .= '/' . $info["name"];
                    }
                }

                return [
                    "destinationPath" => $destPath ?? null,
                    "sourceIsDirectory" => $args["sourceIsDirectory"] ?? null,
                    "sourcePath" => $sourcePath ?? []
                ];
            }
            else if($command == "Download") {
                $args = json_decode($request->input('arguments'), true, 100);
                $pathInfoList = $args["pathInfoList"];
                $paths = [];
                foreach ($pathInfoList as $item) {
                    $path = "";
                    if (count($item) > 0) {
                        $counter = 0;
                        foreach ($item as $info) {
                            $counter++;
                            $path .= $info["name"];
                            if (count($item) > 1 && $counter != count($item)) {
                                $path .= "/";
                            }
                        }
                        $paths[] = $path;
                    }
                }

                return [
                    "paths" => $paths ?? null,
                    "pathInfoList" => $pathInfoList ?? []
                ];
            }
            else {
                $args = json_decode($request->input('arguments'), true, 100);

                return [
                    "name" => $args["name"] ?? null,
                    "pathInfo" => $args["pathInfo"] ?? []
                ];
            }

        }
    }




    public static function createDirectory($path) {
        $fullPath = storage_path("app/public" . "/" . $path);
        return File::makeDirectory($fullPath, 0777, true, true);
    }



    public static function save($request, $requestBinaryFileName, $fileName, $distPath) {

        $extension = $request->file($requestBinaryFileName)
            ->getClientOriginalExtension();

        $path = $request->file($requestBinaryFileName)
            ->storeAs($distPath,
                $fileName . "_". time() . '.' . $extension);

        return $path;
    }

    public static function saveMany() {

    }


    public static function saveOneChunk(Request $request, $path)
    {
        $args = $request->input('arguments');
        $d = json_decode($args, true, 100);
        $chunkMeta = json_decode($d["chunkMetadata"],true, 100);

        $fileName = $chunkMeta["FileName"];
        $chunk = $chunkMeta["Index"];
        $chunks = $chunkMeta["TotalCount"];

        $filePath = storage_path("app/public/$path");

        // create directory if not exist
        if (!file_exists($filePath)) {

            if (!mkdir($filePath, 0777, true)) {
                return response()->json(["ok"=>0, "info"=>"Failed to create $filePath"]);
            }
        }

        $fileName = $fileName ?? $_FILES["chunk"]["name"];
        $filePath = $filePath . DIRECTORY_SEPARATOR . $fileName;
        $fileSize = 0;
        $out = fopen("{$filePath}.part", $chunk == 0 ? "wb" : "ab");
        if ($out) {
            $in = fopen($_FILES['chunk']['tmp_name'], "rb");
            if ($in) {
                while ($buff = fread($in, 4096)) { fwrite($out, $buff); }
            } else {
                return response()->json(["ok"=>0, "info"=>'Failed to open input stream']);
            }
            $fileSize = $_FILES['chunk']["size"];
            fclose($in);
            fclose($out);
            unlink($_FILES['chunk']['tmp_name']);
        }

        // CHECK IF FILE HAS BEEN UPLOADED
        if (!$chunks || $chunk == $chunks - 1) {
            rename("{$filePath}.part", $filePath);
            $ext = pathinfo($path, PATHINFO_EXTENSION);
            return [
                "status" => "Saved",
                'meta' => [
                    "name" => $fileName,
                    "dateModified" => Carbon::now(),
                    "hasSubDirectories" => 0,
                    "isDirectory" => 0,
                    "size" => $fileSize,
                    "path" => $path,
                    "extension" => $ext
                ]
            ];

        }

        $info = "Upload OK";
        $ok =1;

        return ["status" => "Chunked"];
    }

    public static function saveChunk(Request $request, $path)
    {
        //TODO: check if file already exist
        //TODO: multiple file loading

        $chunkMeta = json_decode($request->input("chunkMetadata"),true, 100);

        $fileName = $chunkMeta["FileName"];
        $chunk = $chunkMeta["Index"];
        $chunks = $chunkMeta["TotalCount"];

        $filePath = storage_path("app/public/$path");

        // create directory if not exist
        if (!file_exists($filePath)) {

            if (!mkdir($filePath, 0777, true)) {
                return response()->json(["ok"=>0, "info"=>"Failed to create $filePath"]);
            }
        }

        $fileName = $fileName ?? $_FILES["file"]["name"];
        $filePath = $filePath . DIRECTORY_SEPARATOR . $fileName;
        $fileSize = 0;
        $out = fopen("{$filePath}.part", $chunk == 0 ? "wb" : "ab");
        if ($out) {
            $in = fopen($_FILES['file']['tmp_name'], "rb");
            if ($in) {
                while ($buff = fread($in, 4096)) { fwrite($out, $buff); }
            } else {
                return response()->json(["ok"=>0, "info"=>'Failed to open input stream']);
            }
            $fileSize = $_FILES['file']["size"];
            fclose($in);
            fclose($out);
            unlink($_FILES['file']['tmp_name']);
        }

        // CHECK IF FILE HAS BEEN UPLOADED
        if (!$chunks || $chunk == $chunks - 1) {
            rename("{$filePath}.part", $filePath);
            return [
                "status" => "Saved",
                'meta' => [
                    "name" => $fileName,
                    "dateModified" => Carbon::now(),
                    "hasSubDirectories" => 0,
                    "isDirectory" => 0,
                    "size" => $fileSize,
                    "path" => $path
                ]
            ];

        }

        $info = "Upload OK";
        $ok =1;

        return ["status" => "Chunked"];
    }

}
