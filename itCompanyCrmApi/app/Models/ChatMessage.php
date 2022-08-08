<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    use HasFactory;

    public function fromUser() {
        return $this->belongsTo(User::class);
    }

    public function toUser() {
        return $this->belongsTo(User::class);
    }

    public function content() {
        return $this->belongsTo(ChatMessageContent::class);
    }

    public function chat() {
        return $this->belongsTo(Chat::class);
    }

}
