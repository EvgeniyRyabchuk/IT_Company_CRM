<?php

namespace App\Http\Controllers;

use App\_Sl\DbHelper;
use App\Models\JobApplication;
use App\Models\Vacancy;
use App\Models\VacancyStatus;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    public function index(Request $request) {
        $jobApplications = JobApplication::all();
        return response()->json($jobApplications, 201);
    }

    public function show(Request $request, $jobApplicationId) {
        $jobApplication = JobApplication::
            with('vacancy', 'vacancyStatus')
            ->findOrFail($jobApplicationId);
        return response()->json($jobApplication, 201);
    }

    public function store(Request $request) {
        $nextId = DbHelper::nextId('job_applications');
        $vacancyId = $request->input('vacancy_id');

        $vacancyStatus = VacancyStatus::where('name', 'pending')->first();
        if(is_null($vacancyStatus))
            return response()->json(["message" => 'status not found'], 201);

        $vacancy = Vacancy::findOrFail($vacancyId);

        $jobApplication = new JobApplication();
        $jobApplication->name = $request->input('name');
        $jobApplication->email = $request->input('email');
        $jobApplication->vacancy()->associate($vacancy);
        $jobApplication->vacancyStatus()->associate($vacancyStatus);
        //TODO: check if file exist
        $extension = $request->file('resume_path')->getClientOriginalExtension();
        $path = $request->file('resume_path')
            ->storeAs("jobApplication/$nextId", 'resume_path_'. time() . '.' . $extension);
        $jobApplication->resume_path = $path;

        $jobApplication->save();

        return response()->json(JobApplication::all(), 201);
    }

    public function update(Request $request, $jobApplicationId) {

        $vacancyId = $request->input('vacancy_id');
        $vacancyStatusId = $request->input('vacancy_status_id');

        $vacancy = Vacancy::findOrFail($vacancyId);
        $vacancyStatus = VacancyStatus::findOrFail($vacancyStatusId);

        $jobApplication = JobApplication::findOrFail($jobApplicationId);
        $jobApplication->name = $request->input('name');
        $jobApplication->email = $request->input('email');
        $jobApplication->vacancy()->associate($vacancy);
        $jobApplication->vacancyStatus()->associate($vacancyStatus);
        //TODO: delete old file
        $extension = $request->file('resume_path')->getClientOriginalExtension();
        $path = $request->file('resume_path')
            ->storeAs("jobApplication/$jobApplication->id", 'resume_path_'. time() . '.' . $extension);
        $jobApplication->resume_path = $path;

        $jobApplication->save();

        return response()->json(JobApplication::all(), 201);
    }

    public function destroy(Request $request, $jobApplicationId) {
        $jobApplication = JobApplication::findOrFail($jobApplicationId);
        $jobApplication->delete();
        return response()->json(JobApplication::all(), 201);
    }
}
