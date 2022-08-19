<?php

namespace App\Http\Controllers;


use App\Models\AccessToken;
use App\Models\PersonalNotification;
use App\Models\PersonalNotificationType;
use App\Models\RefreshToken;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Token;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => ['login','register', 'refresh']]);
    }

    public function getProfile(Request $request) {
        // check permissions
//        $this->authorize('user_create');
        $userId = Auth::user()->id;
        $user = User::with('roles')->findOrFail($userId);

        return response()->json($user);

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
        $rememberMe = $request->input('rememberMe') ?? false;


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

        $user->roles()->attach(Role::where('name', 'customer')->first()->id);

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
        $accessToken = JWTAuth::getToken();
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

        $newAccessToken = new AccessToken([
            'token' => Auth::refresh(),
            'expired_at' => Carbon::now()->addMinutes(config('jwt.ttl')),
        ]);

        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => $newAccessToken->token,
                'type' => 'bearer',
            ]
        ]);
    }

}
