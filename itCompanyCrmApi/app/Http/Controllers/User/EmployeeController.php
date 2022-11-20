<?php

namespace App\Http\Controllers\User;

use App\Exports\EmployeeExport;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\EmployeeLink;
use App\Models\Position;
use App\Models\Role;
use App\Models\Skill;
use App\Models\User;
use App\Notifications\EmployeeAccountCreatedNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;


class EmployeeController extends Controller
{
    public function index(Request $request) {
        $perPage = $request->input('perPage') ?? 15;
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

        //$doneStatus = OrderStatus::where('name', 'Finished')->first();

        $query = Employee::with('user.roles', 'user.phones', 'level', "position", 'skills')
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
            $randPassword = Str::random(10);
            $user->password =  Hash::make($randPassword);

        } else {
            $employee = Employee::findOrFail($employeeId);
            $user = $employee->user;
        }

        $user->first_name = $firstName;
        $user->last_name = $lastName;
        $user->middle_name = $middleName;
        $user->full_name = "$lastName $firstName $middleName";
        $user->email = $email;

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

        if($mode === 'create') {
            Notification::send($user, new EmployeeAccountCreatedNotification($user, $randPassword));
        }

        return $employee;
    }

    public function store(Request $request) {
        $employee =  $this->saveEmployee($request, 'create');
        $addedEmployee = Employee::with('user.roles', 'user.phones', 'position', 'level', 'skills')
            ->withCount(['projects as project_count'])
            ->findOrFail($employee->id);
        return response()->json($addedEmployee);
    }

    public function update(Request $request, $employeeId) {
        $employee = $this->saveEmployee($request, 'update');
        $addedEmployee = Employee::with('user.roles', 'user.phones', 'position', 'level', 'skills')
            ->withCount(['projects as project_count'])
            ->findOrFail($employee->id);
        return response()->json($addedEmployee);
    }

    public function updateInfo(Request $request, $employeeId) {
        $user = Auth::user();

        $email = $request->input('email');
        $about = $request->input('about');

        $skills = explode(',',
            $request->input('skills') ?? []);

        $employee = Employee::where('user_id', $user->id)->first();

        if(!$employee) {
            return response()->json(['message' => 'employee does not exist'], 404);
        }

        if($user->email !== $email) {
            $userExist = User::where('email', $email)->first();

            if($userExist) {
                return response()->json(['message' => 'user with such email already exist'], 405);
            }
        }

        $user = $employee->user;
        $user->email = $email;
        $user->about = $about;
        $user->save();

        $employee->skills()->detach();
        foreach ($skills as $skill) {
            $skillDb = Skill::firstOrCreate(['name' => strtoupper($skill)]);
            $employee->skills()->attach($skillDb);
        }

        $employee->save();

        return response()->json(['message' => 'success']);
    }

    public function updateLinks(Request $request, $employeeId) {
        $links = $request->input('links');

        $userId = Auth::user()->id;
        $employee = Employee::where('user_id', $userId)->first();
        if(!$employee) {
            return response()->json(['message' => 'employee does not exist'], 404);
        }

        $employee->employeeLinks()->delete();

        foreach ($links as $link) {
            $linkDB = new EmployeeLink();
            $linkDB->title = $link["title"];
            $linkDB->link = $link['link'];
            $employee->employeeLinks()->save($linkDB);
        }
        $employee->save();
        $employee->load('employeeLinks');

        return response()->json($employee->employeeLinks);
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

    public function changeAvatar(Request $request, $employeeId) {

        $user = Auth::user();

        $milliseconds = round(microtime(true) * 1000);
        $ext = $request->file('file')->extension();
        $imgName = $newName = "avatar_$milliseconds." . $ext;

        $avatarUserFolder = "/users/$user->id/images/avatars";

        //delete old avatar
        $oldFile = Storage::allFiles($avatarUserFolder);
        Storage::delete($oldFile);
        // save new avatar
        $imagePath = $request->file('file')
            ->storeAs($avatarUserFolder, $imgName);
        $user->avatar = $imagePath;
        $user->save();

        return response()->json($imagePath);
    }

}
