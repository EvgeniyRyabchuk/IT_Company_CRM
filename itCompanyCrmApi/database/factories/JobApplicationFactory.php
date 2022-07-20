<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Vacancy;
use App\Models\VacancyStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class JobApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $vacancy = Vacancy::inRandomOrder()->first();
        $vacancyStatus = VacancyStatus::inRandomOrder()->first();

        return [
            'name' => $this->faker->firstName,
            'email' => $this->faker->email,
            'vacancy_id' => $vacancy->id,
            'resume_path' => $this->faker->filePath(),
            'vacancy_status_id' => $vacancyStatus->id
        ];
    }
}
