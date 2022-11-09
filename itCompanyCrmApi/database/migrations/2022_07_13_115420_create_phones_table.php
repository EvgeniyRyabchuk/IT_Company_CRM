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
        Schema::create('phones', function (Blueprint $table) {
            $table->id();
            $table->string('code_1', 5);
            $table->string('code_2', 5);
            $table->string('number', 7);
            $table->string('phone_number', 17);

            $table->string('countryCode', 5)->default('');
            $table->string('name', 100)->default('');
            $table->string('dialCode', 5)->default('');
            $table->string('format', 30)->default('');



            $table->foreignId('user_id')
                ->constrained('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
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
        Schema::dropIfExists('phones');
    }
};
