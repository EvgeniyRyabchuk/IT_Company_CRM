<?php

namespace App\Http\Controllers\User;

use App\Exports\EmployeeExport;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\Position;
use App\Models\Role;
use App\Models\Skill;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;


class EmployeeController extends Controller
{
    public function index(Request $request) {
        $perPage = $request->input('perPage') ?? 10;
        if($perPage === 'all') {
            $perPage = Employee::all()->count();
        }

        $filters = $request->input('filters') ?? [];
        $search = $request->input('search') ?? '';
        $sort = $request->input('sort') ?? [];
        $nonExistInProjectId =
            $request->input('non-exist-in-project-id') ?? null;

        if($filters !== [])
            $filters = json_decode($filters, true, 3);
        if($sort !== [])
            $sort = json_decode($sort, true, 3);
        // default sort
        if(count($sort) === 0) {
            $sort = [
                "id" => "created_at",
                "desc" => false
            ];
        } else {
            $sort = $sort[0];
        }
//        dd($filters);


        //$doneStatus = OrderStatus::where('name', 'Finished')->first();

        $query = Employee::with('user.roles', 'level', "position", 'skills')
            ->withCount(['projects as project_count'])
            ->whereHas('user', function ($q) use ($search) {
                if($search !== '')
                    $q->where('full_name','LIKE', "%$search%")
                        ->orWhere('email', 'LIKE', "%$search%");
             });

            if(!is_null($nonExistInProjectId)) {
                $query->whereDoesntHave('projects', function ($q) use($nonExistInProjectId) {
                    $q->where('projects.id', '=', $nonExistInProjectId);
                });
//                $query->join('employee_project',
//                    'employees.id', '=',
//                    'employee_project.employee_id')
//                    ->where('employee_project.project_id', '!=', $nonExistInProject);

//                $query->whereHas('projects', function($q) use($nonExistInProject) {
//                    $q->where('projects.id', '!=', $nonExistInProject);
//                });
            }

            $sortDirect = $sort['desc'] ? 'desc' : 'asc';

            switch ($sort['id']) {
                case 'user.full_name':
                    $query->join('users', 'employees.user_id', '=', 'users.id');
                    $query->orderBy('users.full_name', $sortDirect);
                    break;
                case 'user.created_at':
                    $query->join('users', 'employees.user_id', '=', 'users.id');
                    $query->orderBy('users.created_at', $sortDirect);
                    break;
                case 'project_count':
                    $query->orderBy('project_count', $sortDirect);
                    break;
            }

            foreach ($filters as $filter) {
                $value = $filter['value'];
                switch ($filter['id']) {
                    case 'user.full_name':
                        $query->whereHas('user', function ($q) use ($value) {
                            $q->where('full_name', 'LIKE', "%$value%");
                        });
                        break;
                    case 'user.created_at':
                        $date = Carbon::parse($value)->toDateString();
                        $query->whereHas('user', function ($q) use ($date) {
                            $q->whereDate('created_at', '=', $date);
                        });
                        break;
                    case 'project_count':
                        $query->having('project_count', $value);
                        break;
                    case 'id':
                        $query->whereHas('user', function ($q) use ($value) {
                            $q->where('id', $value);
                        });
                        break;
                }
            }

            /*
            ->map(function ($employee) use($doneStatus) {
                $doneCount = 0;
                foreach ($employee->projects as $project) {
                    $exist = Order::where([
                        ['project_id', $project->id],
                        ['order_status_id', $doneStatus->id]
                    ])->first();
                    if(!is_null($exist))
                        $doneCount++;
                }
                 $employee->finished_project_count = $doneCount;

                return $employee;
        });
        $employees->map(function($i) { return $i->unsetRelation('projects'); });
*/

        $employees = $query->paginate($perPage);
        return response()->json($employees);
    }

    protected function saveEmployee(Request $request, $mode) {
        if($mode === 'update')
            $employeeId =  $request->input('id');

        $firstName = $request->input('first_name');
        $lastName = $request->input('last_name');
        $middleName = $request->input('middle_name') ?? null;
        $email = $request->input('email');

        $positionId = $request->input('position_id');
        $levelId = $request->input('level_id');

        $skills = explode(',', $request->input('skills'));
        $roles = explode(',', $request->input('roles'));


        $position = Position::findOrFail($positionId);
        $level = $position->levels->filter(function($item) use($levelId) {
            return $item->id == $levelId;
        })->first();

        if(is_null($level)) {
            return response()->json(['message' => 'Such level does not exist on that position'], 404);
        }

        if($mode === 'create') {
            $user = new User();
            $employee = new Employee();
            $user->password = Str::random(10);
        } else {
            $employee = Employee::findOrFail($employeeId);
            $user = $employee->user;
        }

        $user->first_name = $firstName;
        $user->last_name = $lastName;
        $user->middle_name = $middleName;
        $user->full_name = "$lastName $firstName $middleName";
        $user->email = $email;


        //TODO: send email with credentials
        $user->save();

        if($request->hasFile('newAvatar')) {
            $milliseconds = round(microtime(true) * 1000);
            $newName = "avatar_$milliseconds." .
                $request->file('newAvatar')->extension();

            $avatarPath = $request
                ->file('newAvatar')
                ->storeAs("users/$user->id/images/avatars", $newName);
            $user->avatar = $avatarPath;
            $user->save();
        }


        //TODO: social links


        $employee->user()->associate($user);
        $employee->position()->associate($position);
        $employee->level()->associate($level);
        $employee->save();

        if($mode === 'update') {
            $employee->skills()->detach();
            $employee->user->roles()->detach();
        }
        foreach ($skills as $skill) {
            $skillDb = Skill::firstOrCreate(['name' => strtoupper($skill)]);
            $employee->skills()->attach($skillDb);
        }
        foreach ($roles as $role) {
            $roleDb = Role::where('name', strtolower($role))->first();
            if($roleDb === null)
                return response()->json(['message' => 'Such role does not exist'], 404);
            $employee->user->roles()->attach($roleDb);
        }
        $employee->save();
        return $employee;
    }

    public function store(Request $request) {

        $employee =  $this->saveEmployee($request, 'create');
        $addedEmployee = Employee::with('user.roles', 'position', 'level', 'skills')
            ->withCount(['projects as project_count'])
            ->findOrFail($employee->id);
        return response()->json($addedEmployee);
    }

    public function update(Request $request, $employeeId) {
        $employee = $this->saveEmployee($request, 'update');
        $addedEmployee = Employee::with('user.roles', 'position', 'level', 'skills')
            ->withCount(['projects as project_count'])
            ->findOrFail($employee->id);
        return response()->json($addedEmployee);
    }


    public function destroy(Request $request, $employeeId) {

        $employee = Employee::findOrFail($employeeId);
        $user = $employee->user;
        $user->delete();

        return response()->json(['message' => 'employee was destroyed'], 201);
    }

    public function getPositions(Request $request) {
        $positions = Position::all();
        return response()->json($positions);
    }

    public function getLevels(Request $request, $positionId) {
        $position = Position::findOrFail($positionId);
        return response()->json($position->levels);
    }

    public function getSkills(Request $request) {
        $skills = Skill::all();
        return response()->json($skills);
    }

    public function exportExcel(Request $request)
    {
        if($request->input('ids')) {
            $ids = json_decode($request->input('ids') ?? []);
            return Excel::download(new EmployeeExport(count($ids) > 0 ? $ids : []), 'employees.xlsx');
        }
        return Excel::download(new EmployeeExport([]), 'employees.xlsx');

    }



}
