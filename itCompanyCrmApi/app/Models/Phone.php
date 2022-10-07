<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    use HasFactory;

    protected $fillable = [
        'code_1',
        'code_2',
        'number',
        'phone_number',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}
