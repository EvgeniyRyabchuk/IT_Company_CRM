<?php

namespace App\Http\Controllers\User;


use App\Http\Controllers\Controller;
use App\Http\Controllers\PersonalNotificationController;
use App\Models\AccessToken;
use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\PersonalNotificationType;
use App\Models\RefreshToken;
use App\Models\Role;
use App\Models\Status;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => ['login','register', 'refresh', 'getRoles']]);
    }

    public function getProfile(Request $request) {
        // check permissions
//        $this->authorize('user_create');
        $detail = boolval($request->input('detail') ?? 'false');

        if($detail === false) {
            $user = Auth::user()->load('roles', 'phones');
            return response()->json(compact('user'));
        }
        else {
            $user = Auth::user()->load('roles', 'phones');
            $roleEntity = [];
            foreach ($user->roles as $role) {
                if($role->name == "developer"
                    || $role->name == "manager"
                    || $role->name === 'admin') {

                    $activeStatus = Status::where('name', 'Processing')->first();
                    $finishedStatus = Status::where('name', 'Finished')->first();

                    $query = Employee::with(
                        'position',
                        'level',
                        'skills',
                        'projects.order.status',
                        'projects.projectType',
                        'projects.employees.user'
                    );

                    $query->where('user_id', $user->id);
                    $query->withCount([
                        'projects as project_count',
                        'projects as active_project_count' => function($q) use($activeStatus) {
                            $q->join('orders as _orders', 'projects.id', '_orders.project_id')
                            ->join('statuses as _statuses', '_orders.status_id', '_statuses.id')
                            ->where('_statuses.id', $activeStatus->id);
                        },
                        'projects as finished_project_count' => function($q) use($finishedStatus) {
                            $q->join('orders as _orders', 'projects.id', '_orders.project_id')
                                ->join('statuses as _statuses', '_orders.status_id', '_statuses.id')
                                ->where('_statuses.id', $finishedStatus->id);
                        }
                    ]);


                    // sort projects by connected employee date
                    $query
                        ->leftJoin('employee_project', 'employees.id', 'employee_project.employee_id')
                        ->leftJoin('projects', 'employee_project.project_id', 'projects.id')
                        ->leftJoin('project_types', 'projects.project_type_id', 'project_types.id')
                        ->orderBy('employee_project.created_at', 'desc');

                    $employee = $query->first();

    //                dd($employee);

                    $roleEntity[] = [
                        'role' => $role,
                        'entity' => $employee
                    ];
                }
                else if($role->name === 'customer') {
                    $customer = Customer::with('orders.project')
                        ->where('user_id', $user->id);

                    $roleEntity[] = [
                        'role' => $role,
                        'entity' => $customer
                    ];
                }
            }

            $chatIds = $user->chats->pluck('id');
            $lastChats = Chat::with('users')
                ->whereIn('chats.id', $chatIds)
                ->take(4)
                ->get()
                ->map(function ($item) {
                    $last = ChatMessage::where('chat_id', $item->id)
                        ->latest()
                        ->first();
                    if($last) $item->messages = [$last];
                    else$item->messages = [];
                   return $item;
                });



            return response()->json(compact('user', 'roleEntity', 'lastChats'));
        }


//        return response()->json(["message' => 'opened show page.
//        User = $user->id has roles $roles", 201]);
    }


    public function login(Request $request)
    {
//        $newDateTimeRefreshToken = Carbon::now()->addMonth(10);
//        $newDateTimeAccessToken = Carbon::now()->addMinutes(20);
//        $request->validate([
//            'email' => 'required|string|email',
//            'password' => 'required|string',
//        ]);

        $credentials = $request->only('email', 'password');
        $rememberMe = $request->input('remember_me') ?? false;


        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = User::with('roles')->findOrFail(Auth::user()->id);

        if($rememberMe) {
            $refreshToken = Auth::guard()->refresh();
            $user->refreshTokens()->save(
                new RefreshToken([
                    'token' => $refreshToken,
                    'expired_at' => Carbon::now()->addMinutes(config('jwt.refresh_ttl')),
                ])
            );
        }


        $user->accessTokens()->save(
            new AccessToken([
                'token' => $token,
                'expired_at' => Carbon::now()->addMinutes(config('jwt.ttl')),
            ])
        );

        $responce = response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
                'refreshToken' => $refreshToken ?? null
            ]
        ]);

        if($rememberMe) {
            $responce->withCookie(cookie('refreshToken', $refreshToken, config('jwt.refresh_ttl')));
        }

        return $responce;
    }

    public function register(Request $request){

//        $request->validate([
//            'name' => 'required|string|max:255',
//            'email' => 'required|string|email|max:255|unique:users',
//            'password' => 'required|string|min:6',
//        ]);

        $isExistWithSuchEmail = User::where('email', $request->input('email'))->first() ?? false;

        if($isExistWithSuchEmail)
        {
            return response()->json([
                'status' => 'error',
                'message' => 'User with such email already exist',
            ], 401);
        }

        $user = User::create([
            'first_name' => $request->input('name'),
            'last_name' => $request->input('name'),
            'middle_name' => $request->input('name'),
            'full_name' => $request->input('name'),
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->roles()->attach(
            Role::where('name', 'developer')->first()->id
        );

        //TODO: temp
        Employee::create([
            'position_id' => 1,
            'level_id' => 1,
            'user_id' => $user->id,
        ]);



        $token = Auth::login($user);

        $refreshToken = Auth::guard()->refresh();

        $user->refreshTokens()->save(
            new RefreshToken([
                'token' => $refreshToken,
                'expired_at' => Carbon::now()->addMinutes(config('jwt.refresh_ttl'))
            ])
        );
        $user->accessTokens()->save(
            new AccessToken([
                'token' => $token,
                'expired_at' => Carbon::now()->addMinutes(config('jwt.ttl')),
            ])
        );

       //  event(new Registered($user));

        $payloadForMessageNot = [
            'type' => PersonalNotificationType::where('name', 'chat')->first(),
            'user' => $user,
            'heading' => 'Message',
            'title' => 'New message from Devid',
            'subtitle' => 'Hello, Any progress'
        ];

        $payloadForVerifyEmailNot = [
            'type' => PersonalNotificationType::where('name', 'notifications')->first(),
            'user' => $user,
            'heading' => 'Secure',
            'title' => 'Confirm email',
            'subtitle' => 'Please go to setting to confirm your email'
        ];

        PersonalNotificationController::store($payloadForMessageNot);
        PersonalNotificationController::store($payloadForVerifyEmailNot);


        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ])
            ->withCookie(cookie('refreshToken', $refreshToken, config('jwt.refresh_ttl')));;
    }

    public function logout(Request $request)
    {
//        $accessToken = JWTAuth::getToken();
        $accessToken = $request->headers->get('authorization');
        $refreshToken = Cookie::get('refreshToken');

        $dbAccessToken = AccessToken::where('token', str_replace("Bearer ", "", $accessToken))->first();
        $dbRefreshToken = RefreshToken::where('token', $refreshToken)->first();

        $dbAccessToken->delete();
        if(!is_null($dbRefreshToken))
            $dbRefreshToken->delete();

        $cookie = \Cookie::forget('refreshToken');

    // TODO: not work
//        Auth::logout();
//        \auth()->logout();


        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ])->withCookie($cookie);
    }

    public function refresh(Request $request)
    {

        $refreshToken = Cookie::get('refreshToken');

        if(is_null($refreshToken))
            throw new HttpResponseException(response()->json(['failure_reason'=>'No refresh token'], 401));

        $dbRefreshToken = RefreshToken::where('token', $refreshToken)->first();

        if(is_null($dbRefreshToken))
            throw new HttpResponseException(response()->json(['failure_reason'=>'Refresh token doesn\'t exist in db'], 401));

        $date1 = Carbon::createFromFormat('Y-m-d H:i:s', $dbRefreshToken->expired_at);
        $date2 = Carbon::createFromFormat('Y-m-d H:i:s', Carbon::now()->toDateTimeString());

        if($date2->gt($date1))
            throw new HttpResponseException(response()->json(['failure_reason'=>'Refresh token is expired'], 401));


        $accessToken = $request->headers->get('authorization');

        $dbAccessToken = AccessToken::where('token', str_replace("Bearer ", "", $accessToken))->first();
        $dbAccessToken->delete();

        $newAccessToken = AccessToken::create([
            'user_id' => $dbRefreshToken->user->id,
            'token' => Auth::refresh(),
            'expired_at' => Carbon::now()->addMinutes(config('jwt.ttl')),
        ]);
        $newAccessToken->save();

        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => $newAccessToken->token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function getRoles() {
        $roles = Role::all();
        return response()->json($roles);
    }

}
