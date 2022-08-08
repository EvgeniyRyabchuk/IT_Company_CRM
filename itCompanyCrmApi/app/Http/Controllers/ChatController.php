<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function showChats(Request $request, $userId) {
        $user = User::with("chats.withUser")->findOrFail($userId);
        return response()->json($user->chats, 201);
    }

    public function updateChat(Request $request, $userId, $chatId) {

    }

    public function deleteChat(Request $request, $userId, $chatId) {

    }


    public function showMessagesByChat(Request $request, $userId, $chatId) {
        $chat = Chat::with("messages.content")->findOrFail($chatId);

        return response()->json($chat->messages, 201); 
    }

    public function addMessage(Request $request, $userId, $chatId) {

    }

    public function updateMessage(Request $request, $userId, $chatId) {

    }

    public function deleteMessage(Request $request, $userId, $chatId) {

    }


}
