<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class _ChunkFileController extends Controller
{
//TODO: depth not work
    public function chunkStore(Request $request)
    {
//        return response()->json($request->all());

//        $args = $request->input('arguments');
//        $d = json_decode($args, true, 100);

        $chunkMeta = json_decode($request->input("chunkMetadata"),true, 100);

        $fileName = $chunkMeta["FileName"];
        $chunk = $chunkMeta["Index"];
        $chunks = $chunkMeta["TotalCount"];

        $filePath = storage_path('app/public/upload/testChunk');

        if (!file_exists($filePath)) {

            if (!mkdir($filePath, 0777, true)) {
                return response()->json(["ok"=>0, "info"=>"Failed to create $filePath"]);
            }
        }

        $fileName = $fileName ?? $_FILES["file"]["name"];
        $filePath = $filePath . DIRECTORY_SEPARATOR . $fileName;

        // DEAL WITH CHUNKS

//        $chunk = isset($_REQUEST["chunk"]) ? intval($_REQUEST["chunk"]) : 0;
//        $chunks = isset($_REQUEST["chunks"]) ? intval($_REQUEST["chunks"]) : 0;


        $out = fopen("{$filePath}.part", $chunk == 0 ? "wb" : "ab");

        if ($out) {
            $in = fopen($_FILES['file']['tmp_name'], "rb");

            if ($in) {
                while ($buff = fread($in, 4096)) { fwrite($out, $buff); }
            } else {
                return response()->json(["ok"=>0, "info"=>'Failed to open input stream']);
            }

            fclose($in);
            fclose($out);
            unlink($_FILES['file']['tmp_name']);
        }

        // CHECK IF FILE HAS BEEN UPLOADED

        if (!$chunks || $chunk == $chunks - 1) {
            rename("{$filePath}.part", $filePath);
            $array = ['file' => $fileName];
//            return response()->json("end");
//            ChunkFile::create($array);
        }

        $info = "Upload OK";
        $ok =1;

//        return response()->json(["ok"=>$ok, "info"=>$info]);
    }

}
