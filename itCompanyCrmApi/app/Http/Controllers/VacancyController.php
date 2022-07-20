<?php

namespace App\Http\Controllers;


use App\Models\Vacancy;
use Illuminate\Http\Request;

class VacancyController extends Controller
{
    public function index(Request $request) {
        $vacancies = Vacancy::all();
        return response()->json($vacancies, 201);
    }

    public function show(Request $request, $vacancyId) {
        $vacancy = Vacancy::findOrFail($vacancyId);
        return response()->json($vacancy, 201);
    }

    public function store(Request $request) {
        $vacancy = new Vacancy();
        $vacancy->title = $request->input('title');
        $vacancy->text = $request->input('text');
        $vacancy->required = $request->input('required') ?? 1;
        $vacancy->save();

        return response()->json(Vacancy::all(), 201);
    }

    public function update(Request $request, $vacancyId) {

        $vacancy = Vacancy::findOrFail($vacancyId);
        $vacancy->title = $request->input('title');
        $vacancy->text = $request->input('text');
        $vacancy->required = $request->input('required') ?? true;
        $vacancy->save();

        return response()->json(Vacancy::all(), 201);
    }

    public function destroy(Request $request, $vacancyId) {
        $vacancy = Vacancy::findOrFail($vacancyId);
        $vacancy->delete();
        return response()->json(Vacancy::all(), 201);
    }
}
