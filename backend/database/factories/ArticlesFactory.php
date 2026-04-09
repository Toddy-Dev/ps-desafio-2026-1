<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\articles>
 */
class ArticlesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'name' => fake()->words(3, true),
        'brand' => fake()->randomElement(['Nike', 'Adidas', 'Puma', 'Wilson']),
        'price' => fake()->randomFloat(2, 50, 1500),
        'amount' => fake()->numberBetween(0, 50),
        'year' => fake()->numberBetween(2000, date('Y')),
        'image' => fake()->imageUrl(640, 480, 'sports', true),
        'category_id' => \App\Models\Category::all()->random()->id ?? \App\Models\Category::factory(),
    ];
    }
}
