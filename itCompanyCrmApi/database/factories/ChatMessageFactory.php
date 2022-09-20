<?php

namespace Database\Factories;

use App\Models\ChatMessageContent;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ChatMessage>
 */
class ChatMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $content = ChatMessageContent::create([
            'message' => $this->faker->sentence(20)
        ]);

        return [
            'chat_id' => 1,
            'from_id' => 1,
            "to_id" => 1,
            'isSeen' => rand(0, 1),
            "content_id" => $content->id,
            'created_at' => $this->faker->dateTimeBetween(
                '+1 week',
                '+3 month'),
        ];
    }
}
