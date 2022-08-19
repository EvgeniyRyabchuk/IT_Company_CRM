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
        Schema::create('personal_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('type_id')->constrained('personal_notification_types')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->string('heading', 100);
            $table->unsignedBigInteger('timestamp');
            $table->string('title', 100);
            $table->string('subtitle', 100);
            $table->string('path', 255)->default('');
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
        Schema::dropIfExists('personal_notifications');
    }
};
