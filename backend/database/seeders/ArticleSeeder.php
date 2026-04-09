<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    $categories = \App\Models\Category::all();
    \App\Models\articles::factory(15)->create([
        'category_id' => fn() => $categories->random()->id,
    ]);
    }
}
