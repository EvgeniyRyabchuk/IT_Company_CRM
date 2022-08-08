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
        // user_to_user
        // user_to_managers
        // user_to_support_teams

        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->boolean('isPenned')->default(0);
            $table->string('type')->default('user_to_user');
            $table->foreignId('with_user_id')->constrained('users')->onUpdate('cascade')->onDelete('cascade');
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
        Schema::dropIfExists('chats');
    }
};
