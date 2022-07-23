<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectFile>
 */
class ProjectFileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $project = Project::inRandomOrder()->first();
        return [
            'name' => $this->faker->word() . '.' . $this->faker->fileExtension(),
            'project_id' => $project->id,
            'path' => $this->faker->filePath(),
            'location' => $this->faker->filePath(),
            "extension" => $this->faker->fileExtension(),
            'size' => $this->faker->numerify("#######")
        ];
    }
}
