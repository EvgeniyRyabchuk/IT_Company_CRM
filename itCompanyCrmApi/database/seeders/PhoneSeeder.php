<?php

namespace Database\Seeders;

use App\Models\Phone;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PhoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();

        foreach ($users as $user) {
            $phoneCount = rand(1, 3);
            Phone::factory()->count($phoneCount)->create()
                ->each(function ($phone) use($user) {
                    $phone->user()->associate($user);
                    $phone->save();
                });
        }

    }
}
