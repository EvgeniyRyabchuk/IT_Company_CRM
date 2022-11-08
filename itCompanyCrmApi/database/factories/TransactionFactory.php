<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $issuers = ['visa', 'mastercard', 'american-express'];

        $randIssuer = $issuers[rand(0, count($issuers) - 1)];
        $lastDigits = $this->faker->numberBetween(1000, 9999);
        $summa = $this->faker->numberBetween(300, 500);

        $randOrder = Order::inRandomOrder()->whereNotNull('project_id')->first();

        $created_at =
            $this->faker->dateTimeBetween('-3 week', '-1 day');

        return [
            'issuer' => $randIssuer,
            'summa' => $summa,
            'last_card_digits' => $lastDigits,
            'order_id' => $randOrder->id,
            'created_at' => $created_at
        ];
    }
}
