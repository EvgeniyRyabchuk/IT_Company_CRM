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
        Schema::create('kanban_card_kanban_priority', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kanban_card_id')->constrained('kanban_cards')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('kanban_priority_id')->constrained('kanban_priorities')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('kanban_card_kanban_priority');
    }
};
