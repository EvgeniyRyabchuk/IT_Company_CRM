<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Event;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(Request $request, $employeeId) {
        $events = Event::with("recurring")->where("uid", $employeeId)->get();
        return response()->json($events, 201);
    }

    public function store(Request $request, $employeeId) {

        $employee = Employee::findOrFail($employeeId);

        $event = new Event();
        $event->title = $request->input('title');
        $event->description = $request->input('description');
        $event->start = Carbon::parse($request->input('start'));
        $event->end =Carbon::parse($request->input('end') ?? $event->start);
        $event->color = $request->input('color') ?? "#000000";
        $event->allDay = filter_var($request->input('allDay'), FILTER_VALIDATE_BOOLEAN);
        $event->isPublic = filter_var($request->input('isPublic'), FILTER_VALIDATE_BOOLEAN);
        $event->tooltip = $request->input('tooltip');
        $event->status = $request->input('status');

        $event->employee()->associate($employee);
        $event->save();

        return response()->json($event);
    }

    public function update(Request $request, $employeeId, $eventId) {

        $employee = Employee::findOrFail($employeeId);

        $event = Event::where(["uid" => $employee->id, "id" => $eventId])->first();
        $event->title = $request->input('title');
        $event->description = $request->input('description');

        $event->start = Carbon::parse($request->input('start'));
        $event->end =Carbon::parse($request->input('end') ?? $event->start);

        $event->color = $request->input('color') ?? "#000000";

        $event->allDay = filter_var($request->input('allDay'), FILTER_VALIDATE_BOOLEAN);
        $event->isPublic = filter_var($request->input('isPublic'), FILTER_VALIDATE_BOOLEAN);

        $event->tooltip = $request->input('tooltip');
        $event->status = $request->input('status');

        $event->employee()->associate($employee);
        $event->save();
        return response()->json($event);
    }

    public function destroy(Request $request, $employeeId, $eventId) {
        $event = Event::findOrFail($eventId);
        $event->delete();
        return response()->json('OK');
//        return redirect()->action([EventController::class, 'index'], ['employeeId' => $employeeId]);
    }
}
