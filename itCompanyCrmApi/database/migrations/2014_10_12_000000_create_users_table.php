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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 300);
            $table->string('last_name', 300);
            $table->string('middle_name', 300)->nullable();
            $table->string('full_name', 900);

            //->unique();
            $table->string('email', 320);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            $table->string('avatar', 4096)
                ->default('static/images/users/avatars/80x80/default-avatar.png');


            $table->rememberToken();
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
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        Schema::dropIfExists('users');
    }
};
