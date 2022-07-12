<?php

namespace App\Http\Controllers;

use App\Mail\HelloMail;
use App\Models\User;
use App\Notifications\HelloNot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

class UserController extends Controller
{

    //TODO: verify user by email
    //TODO: refersh/access token expired in .env

    public function __construct()
    {
//        $user = User::findOrFail(4);
//        Auth::login($user);
    }

    public function index() {
//        $to = User::findOrFail(1);
//        $someData = [ 'hello' => 'hello world message '];
//
//        Notification::send($to, new HelloNot($someData));

//
//        Mail::to('jeka.rubchuk@yahoo.com')
//            ->send(new HelloMail());

        $user = User::findOrFail(1);

        return response()->json($user->roles()->get(), 201);

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
