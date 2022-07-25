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
        Schema::create('recurrent_events', function (Blueprint $table) {
            $table->id();
            $table->string("repeat", 45);
            $table->unsignedTinyInteger("month")->nullable();
            $table->unsignedTinyInteger("day")->nullable();
            $table->dateTime("until")->nullable();
            $table->dateTime("from")->nullable();
            $table->unsignedInteger("count")->nullable();
            $table->string("weekDay", 100)->nullable();
            $table->string("weekStart", 100)->nullable();
            $table->unsignedInteger("interval")->nullable();
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
        Schema::dropIfExists('recurrent_events');
    }
};
