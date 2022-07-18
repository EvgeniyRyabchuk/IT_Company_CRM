<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Phone>
 */
class PhoneFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'code_1' => fake()->numberBetween(0, 99999),
            'code_2' => fake()->numberBetween(0, 99999),
            'number' => fake()->numberBetween(0, 9999999),
            'phone_number' => fake()->e164PhoneNumber(),
            'user_id' => 1
        ];
    }
}
