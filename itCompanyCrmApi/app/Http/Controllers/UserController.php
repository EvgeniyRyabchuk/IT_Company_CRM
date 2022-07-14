<?php

namespace App\Http\Controllers;

use App\Mail\HelloMail;
use App\Models\User;
use App\Models\UserVerification;
use App\Notifications\EmailVerificationNotification;
use App\Notifications\HelloNot;
use App\Notifications\PasswordResetNotification;
use Carbon\Carbon;
use Faker\Core\Number;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

class UserController extends Controller
{

    // TODO: test

    //TODO: refersh/access token expired in .env
    //TODO: remember me

    public function sendVerifyEmailNotification(Request $request) {

        $verification = UserVerification::create([
            'verification_type' => 'email',
            'token' => rand(100000, 999999),
            'expired_at' => Carbon::now()->addDays(3),
            'user_id' => Auth::user()->id
        ]);

        Notification::send(Auth::user(), new EmailVerificationNotification($verification));

        return ['message'=> 'OK.'];
    }

    public function verifyEmail(Request $request)
    {
        $veritication = UserVerification::where('token', $request->input('token'))->first();

        if(is_null($veritication))
            abort(403, 'is null');
        $user = Auth::user();

        abort_if(!$user, 403);
        if($user->id != $veritication->user->id)
            abort(403, 'no match');


        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();

            $veritication->delete();
//            UserVerification::destroy($veritication->id);

            //TODO: read doc
            event(new Verified($user));
        }

        return response()->json(['status' => 'success', 'data' => $veritication], 201);
    }

    public function sendEmailForResetPassword(Request $request) {

        //TODO: only email if not auth

        $user = Auth::user();
        $token = Str::random(30);

        $verification = DB::table('password_resets')->insert([
            'email' => $user->email,
            'token' => $token
        ]);

        Notification::send($user, new PasswordResetNotification($token));

        return ['message'=> 'OK.'];
    }

    public function resetPassword(Request $request, $id, $token)
    {
        $user = User::findOrFail($id);

        $token = DB::table('password_resets')
            ->where(['token' => $token, 'email' => $user->email]);

        abort_if(!$token, 403, 'token not exist');

        $token->delete();

        $newPasswordHash = Hash::make($request->input('password'));

        $user->password = $newPasswordHash;

        $user->save();

    }


    public function index() {
        $to = User::findOrFail(1);
        $someData = [ 'hello' => 'hello world message '];
//
        Notification::send($to, new HelloNot($someData));

//
//        Mail::to('jeka.rubchuk@yahoo.com')
//            ->send(new HelloMail());

//        $user = User::findOrFail(1);
//
//        return response()->json($user->roles()->get(), 201);

    }

    public function show() {

        // check permissions
//        $this->authorize('user_create');

        $user = Auth::user();
        $roles = $user->roles()->get();

        return response()->json(["message' => 'opened show page.
        User = $user->id has roles $roles", 201]);
    }

    public function create() {

        return response()->json(['message' => 'opened create page', 201]);
    }

    public function edit() {

        return response()->json(['message' => 'opened edit page', 201]);
    }

    public function update() {

        return response()->json(['message' => 'opened update page', 201]);
    }

    public function store() {

        return response()->json(['message' => 'opened store page', 201]);
    }

    public function destroy() {

        return response()->json(['message' => 'opened destroy page', 201]);
    }
}
