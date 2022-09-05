<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStatusHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'status_id',
        'created_at'
    ];


    public function order() {
        return $this->belongsTo(Order::class);
    }

    public function status() {
        return $this->belongsTo(Status::class);
    }
}
