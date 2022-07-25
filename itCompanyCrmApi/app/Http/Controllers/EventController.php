<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request, $employeeId) {
        $events = Event::with("recurring")->where("uid", $employeeId)->get();

        return response()->json($events, 201);
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
