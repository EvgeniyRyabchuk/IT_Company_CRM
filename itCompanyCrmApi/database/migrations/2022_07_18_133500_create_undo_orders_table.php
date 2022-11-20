<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('undo_orders', function (Blueprint $table) {
            $table->id();
            $table->string('extra_reason_text', 3000)->nullable();
            $table->foreignId('order_id')->constrained('orders')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('order_undo_case_id')->nullable()->constrained('undo_order_cases')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('undo_orders');
    }
};
