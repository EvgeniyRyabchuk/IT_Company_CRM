<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $employee = Employee::inRandomOrder()->first();
        $start = $this->faker->dateTimeBetween("now", "+90 days");
        $end = $this->faker->dateTimeBetween($start, "+90 days");

        return [
            'uid' => $employee->id,
            "start" => $start,
            "end" => $end,
            "title" => $this->faker->sentence(3),
            "color" => $this->faker->hexColor()
        ];
    }
}
