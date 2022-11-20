<?php

namespace App\Http\Controllers;

use App\_Sl\TagAttacher;
use App\Models\Project;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function attachTag(Request $request, $targetId) {
        $tagbleTableName = $request->input('type');

        $model = TagAttacher::getModelByTableName($tagbleTableName);

        if(is_null($model)) {
            return response()->json(['message' => "model does not available"]);
        }

        TagAttacher::attachToModel($model::class, $targetId, $request->input('name'));

        return response()->json(Tag::all(), 201);
    }

    public function detachTag(Request $request, $targetId) {
        $tagbleTableName = $request->input('type');

        $model = TagAttacher::getModelByTableName($tagbleTableName);

        if(is_null($model)) {
            return response()->json(['message' => "model does not available"]);
        }

        TagAttacher::detachToModel($model::class, $targetId, $request->input('name'));

        return response()->json(Tag::all(), 201);
    }

    public function show(Request $request, $tagId) {
        $tag = Tag::findOrFail($tagId);
        return response()->json($tag, 201);
    }
}
