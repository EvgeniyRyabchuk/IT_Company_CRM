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
        Schema::create('project_to_dos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('projects')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('employee_id')->constrained('employees')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('todo_status_id')->constrained('order_statuses')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('todo_type_id')->constrained('order_statuses')->onUpdate('cascade')->onDelete('cascade');
            $table->string('text', 1000);
            $table->string('color');
            $table->string('priority', 1)->default('A');
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
        Schema::dropIfExists('project_to_dos');
    }
};
