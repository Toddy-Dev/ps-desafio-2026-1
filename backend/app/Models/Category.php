<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Types\Model\Article;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory, HasUuids;
    protected $fillable = [
    'name'
    ];


    public function articles(){
        return $this->hasMany(Articles::class, 'category_id', 'id');
    }
}