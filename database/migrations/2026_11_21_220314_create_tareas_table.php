<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la tabla de las tareas de cada etapa de obra.
     * Es una tabla de referencia, igual para todas las familias.
     */
    public function up(): void
    {
        Schema::create('tareas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('etapa_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('orden');
            $table->string('nombre');
            $table->string('descripcion');
            $table->timestamps();

            // Una etapa no puede tener dos tareas con el mismo número.
            $table->unique(['etapa_id', 'orden']);
        });
    }

    /**
     * Borra la tabla si deshago la migración.
     */
    public function down(): void
    {
        Schema::dropIfExists('tareas');
    }
};
