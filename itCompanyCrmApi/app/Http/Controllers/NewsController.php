<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\News;
use App\Models\User;
use App\Models\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsController extends Controller
{
    public function index(Request $request) {

        $order = $request->input('order');
        $page = $request->input('page');
        $perPage = $request->input('limit');

        $news = News::with('employee.user')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
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
