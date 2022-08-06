<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller
{
    public function show(Request $request, $path) {
        $full_path = Storage::disk('public')->path($path);
        return response()->file(
            $full_path
        );
    }

    public function showPrivate(Request $request, $path) {
        $full_path = Storage::disk('private')->path($path);
        return response()->file(
            $full_path
        );

    }
}
