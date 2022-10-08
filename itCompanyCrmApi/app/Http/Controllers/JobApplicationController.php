<?php

namespace App\Http\Controllers;

use App\_Sl\DbHelper;
use App\Models\JobApplication;
use App\Models\JobApplicationStatus;
use App\Models\Order;
use App\Models\Vacancy;
use Carbon\Carbon;
use Illuminate\Http\Request;

class JobApplicationController extends Controller
{
    public function index(Request $request) {
        $perPage = $request->input('limit') ?? 10;
        $search = $request->input('search') ?? '';

        $sort = $request->input('sort') ?? 'created_at';
        $sortOrder = $request->input('order') ?? 'desc';

        $jobApplicationStatus = json_decode($request->input('jobApplicationStatus') ?? '[]');
        $vacancies = json_decode($request->input('vacancies') ?? '[]');
        $createdAtRange = json_decode($request->input('createdAtRange') ?? '[]');


        $query = JobApplication::with('vacancy', 'jobApplicationStatus');

        if(count($jobApplicationStatus) > 0) {
            $query->select('job_applications.*');
            $query->join('job_application_statuses',
                'job_applications.job_application_status_id',
                'job_application_statuses.id')
                ->whereIn('job_application_statuses.id', $jobApplicationStatus);
        }

        if(count($vacancies) > 0) {
            $query->select('job_applications.*');
            $query->join('vacancies', 'job_applications.vacancy_id', 'vacancies.id')
                ->whereIn('vacancies.id', $vacancies);
        }

        if(count($createdAtRange) >= 2) {
            $from = Carbon::parse($createdAtRange[0]);
            $to = Carbon::parse($createdAtRange[1]);
            $from->setTime(0, 0);
            $to->setTime(23, 59);

            $query->whereBetween('job_applications.created_at', [$from, $to]);
        }



        if($search && $search !== '') {
            $query
                ->where('name', 'LIKE', "%$search%")
                ->orWhere('email', 'LIKE', "%$search%");
        }

        switch ($sort) {
            case "status":
                $query->select('job_applications.*');
                $query->join('job_application_statuses as statuses_table',
                    'job_applications.job_application_status_id',
                    '=', 'statuses_table.id')
                    ->orderBy('statuses_table.index', $sortOrder);
                break;
            case "vacancy":
                $query->select('job_applications.*');
                $query->join('vacancies', 'job_applications.vacancy_id', 'vacancies.id')
                    ->orderBy('vacancies.title', $sortOrder);
                break;
            default:
                $query = $query->orderBy("job_applications.$sort", $sortOrder);
                break;
        }

        $jobApplications = $query->paginate($perPage);

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

        $jobApplicationStatus = JobApplicationStatus::where('name', 'pending')->first();
        if(is_null($jobApplicationStatus))
            return response()->json(["message" => 'status not found'], 201);

        $vacancy = Vacancy::findOrFail($vacancyId);

        $jobApplication = new JobApplication();
        $jobApplication->name = $request->input('name');
        $jobApplication->email = $request->input('email');

        $phoneDecode = json_decode($request->input('phone'), true);
        $phoneNumber = $phoneDecode['number'];
        $jobApplication->phone = $phoneNumber;

        $jobApplication->vacancy()->associate($vacancy);
        $jobApplication->jobApplicationStatus()->associate($jobApplicationStatus);


        if($request->hasFile('resume_path')) {
            $extension = $request->file('resume_path')
                ->getClientOriginalExtension();
            $path = $request->file('resume_path')
                ->storeAs("jobApplication/$nextId",
                    'resume_path_'. time() . '.' . $extension);
            $jobApplication->resume_path = $path;
        }

        $jobApplication->save();

        return response()->json(JobApplication::all(), 201);
    }

    public function update(Request $request, $jobApplicationId) {

        $jobApplicationStatusId = $request->input('job_application_status.id');
        $status = JobApplicationStatus::findOrFail($jobApplicationStatusId);

        $jobApplication = JobApplication::findOrFail($jobApplicationId);

        $jobApplication->jobApplicationStatus()->associate($status);
        $jobApplication->save();
        $jobApplication->load('vacancy', 'jobApplicationStatus');

        return response()->json($jobApplication, 201);
    }

    public function destroy(Request $request, $jobApplicationId) {
        $jobApplication = JobApplication::findOrFail($jobApplicationId);
        $jobApplication->delete();
        ViewController::deleteAllViews($jobApplication);
        return response()->json(JobApplication::all(), 201);
    }

    public function getStatuses(Request $request) {
        $statuses = JobApplicationStatus::orderBy('index', 'asc')->get();
        return response()->json($statuses);
    }

    public function getMinMaxValues() {
        $minMaxCreatedAtRange = [
            JobApplication::max('created_at'),
            JobApplication::min('created_at'),
        ];

        return response()->json(compact('minMaxCreatedAtRange'));
    }
}
