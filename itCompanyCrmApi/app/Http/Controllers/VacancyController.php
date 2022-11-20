<?php

namespace App\Http\Controllers;


use App\Models\Vacancy;
use Illuminate\Http\Request;

class VacancyController extends Controller
{
    public function index(Request $request) {
        $vacancies = Vacancy::with('jobApplications')->get();
        return response()->json($vacancies, 201);
    }

    public function show(Request $request, $vacancyId) {
        $vacancy = Vacancy::findOrFail($vacancyId);
        return response()->json($vacancy, 201);
    }

    public function save(Request $request, $mode) {
        if($mode === 'create')
            $vacancy = new Vacancy();
        else if($mode === 'update')
            $vacancy = Vacancy::findOrFail($request->input('id'));

        $vacancy->title = $request->input('title');
        $vacancy->text = $request->input('text');
        $vacancy->required = $request->input('required') ?? 1;
        $vacancy->save();
    }

    public function store(Request $request) {
        $this->save($request, 'create');
        return response()->json(Vacancy::all(), 201);
    }

    public function update(Request $request, $vacancyId) {
        $this->save($request, 'update');
        return response()->json(Vacancy::all(), 201);
    }

    public function destroy(Request $request, $vacancyId) {
        $vacancy = Vacancy::findOrFail($vacancyId);
        $vacancy->delete(); 
        return response()->json(Vacancy::all(), 201);
    }
}
