<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function orderStatus() {
        return $this->belongsTo(Order::class);
    }

    public function customer() {
        return $this->belongsTo(Customer::class);
    }
}
