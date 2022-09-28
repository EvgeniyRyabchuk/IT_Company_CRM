<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    use HasFactory;

    public function viewable() {
        return $this->morphTo();
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

}
