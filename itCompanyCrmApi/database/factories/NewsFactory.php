<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $employee = Employee::inRandomOrder()->first();

        return [
            'title' => $this->faker->sentence(3),
            'text' => $this->faker->text(1000),
            'employee_id' => $employee->id,
        ];
    }
}
