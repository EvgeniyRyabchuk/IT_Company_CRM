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
        Schema::create('events', function (Blueprint $table) {
            $table->id();

            $table->foreignId("uid")
                ->constrained("users")
                ->onUpdate("cascade")
                ->onDelete("cascade");

            $table->foreignId("recurrent_event_id")
                ->nullable()
                ->constrained("recurrent_events")
                ->onUpdate("cascade")
                ->onDelete("cascade");


            $table->dateTime("start");
            $table->dateTime("end");
            $table->string("title", 500);
            $table->string("description", 500)->nullable();
            $table->string("color", 45)->default("#000000");
            $table->boolean("allDay")->default(false);
            $table->string("tooltip", 300)->nullable();
            $table->boolean("isPublic")->default(false);

            $table->string("status", 100)->default("busy");

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

        Schema::dropIfExists('events');
    }
};
