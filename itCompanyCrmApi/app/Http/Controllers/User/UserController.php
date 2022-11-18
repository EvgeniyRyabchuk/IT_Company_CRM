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
        }
        else {
            $users = User::all();
        }
        return response()->json($users);
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
