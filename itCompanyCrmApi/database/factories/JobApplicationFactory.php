<?php

namespace Database\Factories;

use App\Models\JobApplication;
use App\Models\Project;
use App\Models\Vacancy;
use App\Models\JobApplicationStatus;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

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
        $vacancyStatus = JobApplicationStatus::inRandomOrder()->first();

        $resume_path = 'static/files/jobApplications/resumeExample.doc';

        return [
            'name' => $this->faker->firstName,
            'email' => $this->faker->email,
            'phone' => fake()->e164PhoneNumber(),
            'vacancy_id' => $vacancy->id,
            'resume_path' => $resume_path,
            'job_application_status_id' => $vacancyStatus->id
        ];
    }



}
