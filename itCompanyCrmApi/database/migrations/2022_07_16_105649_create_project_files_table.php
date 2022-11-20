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
        Schema::create('project_files', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('extension', 255)->nullable();

            $table->boolean('isDirectory')->default(0);
            $table->boolean('hasSubDirectories')->default(0);
            $table->foreignId('project_id')->constrained('projects')->onUpdate('cascade')->onDelete('cascade');
            $table->string('path', 4096);
            $table->string("location", 4096);

            $table->unsignedInteger('size');
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
        Schema::dropIfExists('project_files');
    }
};
