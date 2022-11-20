<?php

namespace Database\Seeders;

use App\Models\PersonalNotification;
use App\Models\PersonalNotificationType;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PersonalNotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $notificationTypesModels = [
            [
                'name' => 'chat',
                'color' => 'primary',
            ],
            [
                'name' => 'notifications',
                'color' => 'error',
            ],
            [
                'name' => 'info',
                'color' => 'secondary',
            ],
        ];

        PersonalNotificationType::insert($notificationTypesModels);

        $users = User::all()->each(function ($user) {
            $notifications = PersonalNotification::factory()->count(10)
                ->create()->each(function ($not) use($user) {
                    $not->user_id = $user->id;
                });
        });



    }
}
