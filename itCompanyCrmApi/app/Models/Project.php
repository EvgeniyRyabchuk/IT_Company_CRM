<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public function employees() {
        return $this->belongsToMany(Employee::class);
    }

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }
}
