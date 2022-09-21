<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\News;
use App\Models\User;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(Request $request) {
        $news = News::with('employee.user')
            ->orderBy('created_at', 'desc')->get();
        return response()->json($news, 201);
    }

    public function show(Request $request, $newsId) {
        $news = News::with('employee')->findOrFail($newsId);
        return response()->json($news, 201);
    }

    public static function save(Request $request, $mode) {
        $userId = $request->input("user_id");
        $employee = Employee::where('user_id', $userId)->first();

        if($mode === 'create') {
            $news = new News();
        }
        else {
            $id = $request->input('id');
            $news = News::findOrFail($id);
        }

        $news->title = $request->input('title');
        $news->text = $request->input('text');
        if($mode === 'create')
            $news->employee()->associate($employee);
        $news->save();
        $dbNews = News::with('employee.user')
            ->find($news->id);
        return $dbNews;
    }

    public function store(Request $request) {
        //TODO: current auth user
        $news = $this->save($request, 'create');
        return response()->json($news, 201);
    }

    public function update(Request $request, $newsId) {
        $news = $this->save($request, 'update');
        return response()->json($news, 201);
    }

    public function destroy(Request $request, $newsId) {
        $news = News::findOrFail($newsId);
        $news->delete();
        return response()->json(News::all(), 201);
    }
}
