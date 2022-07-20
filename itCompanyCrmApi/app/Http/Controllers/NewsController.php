<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index(Request $request) {
        $news = News::all();
        return response()->json($news, 201);
    }

    public function show(Request $request, $newsId) {
        $news = News::with('employee')->findOrFail($newsId);
        return response()->json($news, 201);
    }

    public function store(Request $request) {
        //TODO: current auth user
        $employeeId = $request->input("employee_id");
        $employee = Employee::findOrFail($employeeId);
        $news = new News();
        $news->title = $request->input('title');
        $news->text = $request->input('text');
        $news->employee()->associate($employee);
        $news->save();

        return response()->json(News::all(), 201);
    }

    public function update(Request $request, $newsId) {
        $employeeId = $request->input("employee_id");
        $employee = Employee::findOrFail($employeeId);
        $news = News::findOrFail($newsId);
        $news->title = $request->input('title');
        $news->text = $request->input('text');
        $news->employee()->associate($employee);
        $news->save();
        return response()->json(News::all(), 201);
    }

    public function destroy(Request $request, $newsId) {
        $news = News::findOrFail($newsId);
        $news->delete();
        return response()->json(News::all(), 201);
    }
}
