<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\UndoOrder;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    // TODO: test

    //TODO: refersh/access token expired in .env
    //TODO: remember me
/*
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

    public function index(Request $request) {
        $nonExistChatWithUserId =
            $request->input('non-existent-chat-with-user-id');

        // get users with whom there is no chat
        if($nonExistChatWithUserId !== null) {
            $me = Auth::user();
            $myChatsWithUserIds = $me->chats->load('users')->pluck('users.id')->toArray();
            $query = User::doesntHave('chats')
            ->where('id', '!=', $me->id)
            ->orWhereHas('chats', function ($q) use($nonExistChatWithUserId, $myChatsWithUserIds) {
                $q->whereHas('users', function ($qq) use($nonExistChatWithUserId, $myChatsWithUserIds) {
                    $qq->where('users.id', $myChatsWithUserIds);
                });
            });
            $users = $query->get();
//            $users = new Collection();
//            foreach (User::all() as $user) {
//                if ($user->id != $nonExistChatWithUserId) {
//                    $isChatExist = false;
//                    foreach ($user->chats as $chat) {
//                        foreach ($chat->users as $user) {
//                            if ($user->id == $nonExistChatWithUserId) {
//                                $isChatExist = true;
//                            }
//                        }
//                    }
//                    if($isChatExist == false) {
//                        $users->add($user);
//                    }
//                }
//            }
        }
        else {
            $users = User::all();
        }
        return response()->json($users);
    }

    public function test() {
        $entry = UndoOrder::find(1);
        return response()->json([$entry], 201);

        $c = User::with('phones')->first();
        $customer = DB::table('customers')->with('user')->where('id', 5)->first();
        dd($customer);
    }

    public function show(Request $request, $userId) {
        $user = User::findOrFail($userId);
        return response()->json($user);
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
