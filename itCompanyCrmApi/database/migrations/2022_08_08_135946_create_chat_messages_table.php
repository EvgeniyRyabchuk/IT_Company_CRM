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
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id')->constrained('chats')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('from_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId("to_id")->nullable()->constrained('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('content_id')->constrained('chat_message_contents')->onUpdate('cascade')->onDelete('cascade');
            $table->boolean("isSeen");
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
        Schema::dropIfExists('chat_messages');
    }
};
