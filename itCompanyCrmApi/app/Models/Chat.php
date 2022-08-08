<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;

    // for simple chat type(user_to_user) it's 2 length user list (user1, user2)
    // for group it's may be more than 2 users
    public function users() {
        return $this->belongsToMany(User::class);
    }

    public function withUser() {
        return $this->belongsTo(User::class);
    }

    public function messages() {
        return $this->hasMany(ChatMessage::class);
    }
}
