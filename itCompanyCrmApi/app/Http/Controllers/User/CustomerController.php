<?php

namespace App\Http\Controllers\User;

use App\Exports\CustomerExport;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Status;
use App\Models\Position;
use App\Models\Skill;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Facades\Excel;
use function Symfony\Component\String\b;

class CustomerController extends Controller
{
    public function index(Request $request) {
        $perPage = $request->input('perPage') ?? 10;
        $filters = $request->input('filters') ?? null;
        $search = $request->input('search') ?? '';
        $sort = $request->input('sort') ?? null;


        if(!is_null($filters)) {
            $filters = json_decode($filters, true, 3);
        }
        else {
            $filters = [];
        }

        if(!is_null($sort)) {
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
        }
        else {
            $sort = [
                "id" => "created_at",
                "desc" => false
            ];
        }


        $doneOrderStatus = Status::where('name', 'Finished')->first();

        $query = Customer::with('user', 'user.phones', 'user.tags', 'user.phones')
            ->withCount([
                'orders as order_count' => function($q) {
                    $q->join('orders as order_table', 'customers.id', 'order_table.customer_id');
                },
                'orders as finished_order_count' => function($q) use($doneOrderStatus) {
                    $q->join('orders as _orders', 'customers.id', '_orders.customer_id')
                        ->join('statuses', '_orders.status_id', 'statuses.id')
                        ->where('statuses.id', $doneOrderStatus->id);
                }
            ])
            ->whereHas('user', function ($q) use ($search) {
                if($search !== '')
                    $q->where('full_name','LIKE', "%$search%")
                        ->orWhere('email', 'LIKE', "%$search%");
            });

        $sortDirect = $sort['desc'] ? 'desc' : 'asc';

        switch ($sort['id']) {
            case 'user.full_name':
                $query->join('users', 'customers.user_id', '=', 'users.id');
                $query->orderBy('users.full_name', $sortDirect);
                break;
            case 'user.created_at':
                $query->join('users', 'customers.user_id', '=', 'users.id');
                $query->orderBy('users.created_at', $sortDirect);
                break;
            case 'order_count':
                $query->orderBy('order_count', $sortDirect);
                break;
            case 'vip':
                $query->orderBy('vip', $sortDirect);
                break;
            case 'user.id':
                $query->join('users', 'customers.user_id', '=', 'users.id');
                $query->orderBy('users.id', $sortDirect);
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
                case 'order_count':
                    $query->having('order_count', $value);
                    break;
                case 'user.id':
                    $query->whereHas('user', function ($q) use ($value) {
                        $q->where('id', $value);
                    });
                    break;
                case 'user.phones':
                    $query->whereHas('user', function ($q) use ($value) {
                        $q->whereHas('phones', function ($q) use ($value) {
                            $q->where('phone_number', 'LIKE', "%$value%");
                        });
                    });
                    break;
            }
        }

        $customers = $query->paginate($perPage);
        return response()->json($customers);
    }

    protected function saveCustomers(Request $request, $mode) {
        if($mode === 'update')
            $customerId =  $request->input('id');

        $firstName = $request->input('first_name');
        $lastName = $request->input('last_name');
        $middleName = $request->input('middle_name') ?? null;
        $email = $request->input('email');

        $positionId = $request->input('position_id');
        $levelId = $request->input('level_id');

        $skills = explode(',', $request->input('skills'));


        $position = Position::findOrFail($positionId);
        $level = $position->levels->filter(function($item) use($levelId) {
            return $item->id == $levelId;
        })->first();

        if(is_null($level)) {
            return response()->json(['message' => 'Such level does not exist on that position'], 404);
        }

        if($mode === 'create') {
            $user = new User();
            $customer= new Customer();
            $user->password = Str::random(10);
        } else {
            $customer = Customer::findOrFail($customerId);
            $user = $customer->user;
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


        $customer->user()->associate($user);
        $customer->save();

//        if($mode === 'update') $customer->skills()->detach();
//        foreach ($skills as $skill) {
//            $skillDb = Skill::firstOrCreate(['name' => strtoupper($skill)]);
//            $employee->skills()->attach($skillDb);
//
//        }
        $customer->save();
        return $customer;
    }

    public function store(Request $request) {
        $customer = $this->saveCustomers($request, 'create');
        $addedCustomer = Customer::with('user', 'position', 'level', 'skills')
            ->withCount(['projects as order_count'])
            ->findOrFail($customer->id);
        return response()->json($addedCustomer);
    }

    public function update(Request $request, $customerId) {
        $customer = $this->saveCustomers($request, 'update');
        $addedCustomer = Customer::with('user', 'position', 'level', 'skills')
            ->withCount(['projects as project_count'])
            ->findOrFail($customer->id);
        return response()->json($addedCustomer);
    }


    public function destroy(Request $request, $customerId) {

        $customer = Customer::findOrFail($customerId);
        $user = $customer->user;
        $user->delete();

        return response()->json(['message' => 'employee was destroyed'], 201);
    }

    public function exportExcel(Request $request)
    {
        if($request->input('ids')) {
            $ids = json_decode($request->input('ids') ?? []);
            return Excel::download(new CustomerExport(count($ids) > 0 ? $ids : []), 'customers.xlsx');
        }
        return Excel::download(new CustomerExport([]), 'customers.xlsx');

    }

    public function changeFavorite(Request $request, $customerId) {
        $customer = Customer::findOrFail($customerId);
        $value = $request->input('isFavorite');

        $customer->vip = $value;
        $customer->save();
        return response()->json(['message' => 'OK']);
    }
}
