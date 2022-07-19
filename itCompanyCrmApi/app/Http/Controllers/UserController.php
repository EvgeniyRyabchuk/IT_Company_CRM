<?php

namespace App\Http\Controllers;

use App\Mail\HelloMail;
use App\Models\Customer;
use App\Models\UndoOrder;
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

    public function index() {
        $to = User::findOrFail(1);
        $someData = [ 'hello' => 'hello world message '];
//
        Notification::send($to, new HelloNot($someData));
/*
//
//        Mail::to('jeka.rubchuk@yahoo.com')
//            ->send(new HelloMail());

//        $user = User::findOrFail(1);
//
//        return response()->json($user->roles()->get(), 201);
*/
    }


    public function test() {

        $entry = UndoOrder::find(1);
        return response()->json([$entry], 201);

        $c = User::with('phones')->first();
        $customer = DB::table('customers')->with('user')->where('id', 5)->first();
        dd($customer);
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
