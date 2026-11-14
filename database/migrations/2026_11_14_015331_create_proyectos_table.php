<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la tabla donde se guardan los proyectos de las familias.
     */
    public function up(): void
    {
        Schema::create('proyectos', function (Blueprint $table) {
            $table->id();

            // Cada familia tiene un solo proyecto, y si se borra la cuenta se borra también su proyecto
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();

            // Uso números chicos porque ninguna respuesta pasa de 5
            $table->unsignedTinyInteger('plantas');
            $table->unsignedTinyInteger('dormitorios');
            $table->unsignedTinyInteger('banos');

            // Escribo estos valores como texto y no con el enum, igual que rol y estado
            $table->string('espacios');
            $table->unsignedTinyInteger('cochera');

            // Guardo la lista de extras tal cual la elige la familia, y puede quedar vacía
            $table->json('extras');
            $table->string('terminacion');

            $table->timestamps();
        });
    }

    /**
     * Borra la tabla de proyectos si se deshace la migración.
     */
    public function down(): void
    {
        Schema::dropIfExists('proyectos');
    }
};
