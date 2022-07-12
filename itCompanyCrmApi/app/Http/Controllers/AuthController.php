<?php

namespace App\Http\Controllers;


use App\Models\AccessToken;
use App\Models\RefreshToken;
use App\Models\Role;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',
            ['except' => ['login','register']]);
    }


    public function login(Request $request)
    {
        $newDateTimeRefreshToken = Carbon::now()->addMonth(10);
        $newDateTimeAccessToken = Carbon::now()->addMinutes(20);
//        $request->validate([
//            'email' => 'required|string|email',
//            'password' => 'required|string',
//        ]);
        $credentials = $request->only('email', 'password');


        $token = Auth::attempt($credentials);
        $refreshToken = Auth::guard()->refresh();

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();

        $user->refreshTokens()->save(
            new RefreshToken([
                'token' => $refreshToken,
                'expired_at' => $newDateTimeRefreshToken,
            ])
        );
        $user->accessTokens()->save(
            new AccessToken([
                'token' => $token,
                'expired_at' => $newDateTimeAccessToken,
            ])
        );

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
                'refreshToken' => $refreshToken
            ]
        ])
            ->withCookie(cookie('refresh_token', $refreshToken, 2));

    }

    public function register(Request $request){

        $newDateTimeRefreshToken = Carbon::now()->addMonth(10);
        $newDateTimeAccessToken = Carbon::now()->addMinutes(20);

//        $request->validate([
//            'name' => 'required|string|max:255',
//            'email' => 'required|string|email|max:255|unique:users',
//            'password' => 'required|string|min:6',
//        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->roles()->attach(Role::where('name', 'customer')->first()->id);

        $token = Auth::login($user);

        $refreshToken = Auth::guard()->refresh();

        $user->refreshTokens()->save(
            new RefreshToken([
                'token' => $refreshToken,
                'expired_at' => $newDateTimeRefreshToken,
            ])
        );
        $user->accessTokens()->save(
            new AccessToken([
                'token' => $token,
                'expired_at' => $newDateTimeAccessToken,
            ])
        );

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ])
            ->withCookie(cookie('refresh_token', $refreshToken, 2));;
    }

    public function logout(Request $request)
    {
        $accessToken = $request->headers->get('authorization');
//        $accessToken = $token = JWTAuth::getToken();
;

        $dbToken = AccessToken::where('token', str_replace("Bearer ", "", $accessToken))->first();
        $dbToken->delete();

        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

}
