<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\User;
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
                $chat = Chat::create([
                    'with_user_id' => $toUser->id
                ]);

//                $toUser->chats()->attach($chat);
                $fromUser->chats()->attach($chat);


                ChatMessage::factory()
                    ->count(10)
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
