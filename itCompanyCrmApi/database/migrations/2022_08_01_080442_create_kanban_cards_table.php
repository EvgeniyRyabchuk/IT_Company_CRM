<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('kanban_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lane_id')->constrained('kanban_lanes')->onUpdate('cascade')->onDelete('cascade');
            $table->string('title');
            $table->string('description')->nullable();
            $table->unsignedSmallInteger('index');
            $table->string('label');
            $table->string('cardColor', 10)->default("#ffffff");
            $table->string('priority', 1)->default("A");

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

        Schema::dropIfExists('kanban_cards');
    }
};
