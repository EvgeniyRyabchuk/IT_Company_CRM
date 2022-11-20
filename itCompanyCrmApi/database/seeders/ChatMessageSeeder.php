<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChatMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run($users)
    {

        foreach ($users as $fromUser) {

            $toUsers = User::inRandomOrder()
                ->where('id', '!=', $fromUser->id)
                ->take(5)
                ->get();

            foreach ($toUsers as $toUser) {

                $chat = null;

                // check if chat already exist
                foreach ($fromUser->chats as $existChat) {
                    foreach ($existChat->users as $user) {
                        if($user->id == $toUser->id) {
                            $chat = $existChat;
                        }
                    }
                }

                if(is_null($chat)) {
                    $chat = Chat::create(['last_message_at' => Carbon::now()]);
                    $fromUser->chats()->attach($chat);
                    $toUser->chats()->attach($chat);
                }


                ChatMessage::factory()
                    ->count(20)
                    ->create()
                    ->each(function ($e) use($fromUser, $toUser, $chat) {
                        $e->chat_id = $chat->id;
                        $e->from_id = $fromUser->id;
                        $e->to_id = $toUser->id;
                        $e->save();
                    });

            }

        }


    }
}
