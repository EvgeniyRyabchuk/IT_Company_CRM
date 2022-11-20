<?php

namespace Database\Factories;

use App\_Sl\Utils;
use App\Models\PersonalNotificationType;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PersonalNotification>
 */
class PersonalNotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $user = User::inRandomOrder()->first();
        $type = PersonalNotificationType::inRandomOrder()->first();

        switch ($type->name) {
            case 'chat': $title = 'Some user sent message'; $heading = 'Message'; break;
            case 'notifications': $title = 'increase user influx';  $heading = 'Alert'; break;
            default: $title = 'new message'; $heading = 'Notification';
        }

        return [
            'user_id' => $user->id,
            'type_id' => $type->id,
            'heading' => $heading,
            'timestamp' => Carbon::now()->timestamp,
            'title' => $title,
            'subtitle' => $this->faker->sentence(3),
            'path' => Utils::getNotificationPath($type, $user->id)
        ];
    }
}
