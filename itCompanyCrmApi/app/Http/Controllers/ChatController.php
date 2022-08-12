<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\ChatMessageContent;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function showChats(Request $request, $userId) {
        $user = User::findOrFail($userId);
        $chats = Chat::with('users.roles',
            'messages.content', 'messages.fromUser', 'messages.toUser')
            ->whereIn('id', $user->chats->pluck('id')->toArray())
            ->orderBy('last_message_at', 'desc')
            ->get();

        return response()->json($chats, 201);
    }


    public function deleteChat(Request $request, $userId, $chatId) {
        $chat = Chat::findOrFail($chatId);
        $chat->delete();
        return response('Ok');
    }


    public function showMessagesByChat(Request $request, $userId, $chatId) {
        $chat = Chat::findOrFail($chatId);
        $messages = ChatMessage::where('chat_id', $chat->id)
            ->with("content", "toUser", "fromUser")
            ->orderBy('created_at', 'desc')
            ->paginate(10);



        return response()->json($messages, 201);
    }

    public function createChat(Request $request, $userId) {
        $fromUser = User::findOrFail($userId);
        $toUser = User::findOrFail($request->input('toUserId'));

        $chat = new Chat();
        $chat->last_message_at = Carbon::now();
        $chat->save();
        $chat->users()->attach($fromUser);
        $chat->users()->attach($toUser);

        $resChat = Chat::with('users.roles',
            'messages.content', 'messages.fromUser', 'messages.toUser')
            ->where('id', $chat->id)
            ->first();

        return response()->json($resChat);
    }


    public function sendMessage(Request $request, $userId) {

        $fromUser = User::findOrFail($userId);
        $toUser = User::findOrFail($request->input('toUserId'));

        $chatId = $request->input('chat_id');

        if(is_null($chatId)) {
            $chat = new Chat();
            $chat->save();
            $chat->users()->attach($fromUser);
            $chat->users()->attach($toUser);
        }
        else {
            $chat = Chat::findOrFail($chatId);
        }

        $chat->last_message_at = Carbon::now();
        $chat->save();

        $content = new ChatMessageContent();
        $content->message = $request->input('message');
        $content->save();

        $message = new ChatMessage();
        $message->content()->associate($content);
        $message->fromUser()->associate($fromUser);
        $message->toUser()->associate($toUser);
        $message->chat()->associate($chat);
        $message->save();


        return response()->json(
            ChatMessage::with('content', 'fromUser', 'toUser', 'chat.users')
                ->findOrFail($message->id)
        );
    }

    public function updateMessage(Request $request, $userId, $chatId, $messageId) {

        $message = ChatMessage::findOrFail($messageId);
        $content = ChatMessageContent::findOrFail($message->content_id);
        $content->message = $request->input('message');
        $content->save();

        $chat = Chat::with("messages.content")->findOrFail($chatId);
        return response()->json($chat->messages);

    }

    public function deleteMessage(Request $request, $userId, $chatId, $messageId) {
        $message = ChatMessage::findOrFail($messageId);
        $message->delete();
        return response('Ok');
    }

    public function allMessageSeen(Request $request, $userId, $chatId) {
        $chat = Chat::findOrFail($chatId);
        $chat->messages->each(function ($message) {
            $message->isSeen = 1;
            $message->save();
        });

        return response()->json($chat);
    }

}
