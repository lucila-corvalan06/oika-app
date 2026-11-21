<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la tabla de las 5 etapas de obra.
     * Es una tabla de referencia, igual para todas las familias.
     */
    public function up(): void
    {
        Schema::create('etapas', function (Blueprint $table) {
            $table->id();
            // La hago única para que no se puedan cargar dos etapas con el mismo número.
            $table->unsignedTinyInteger('orden')->unique();
            $table->string('nombre');
            // Uso enteros para que los porcentajes sumen 100 exacto.
            $table->unsignedTinyInteger('porcentaje_costo');
            // Uso decimal y no float para guardar 3,2 o 6,4 sin redondeos raros.
            $table->decimal('semanas_trabajo', 4, 1);
            $table->timestamps();
        });
    }

    /**
     * Borra la tabla si deshago la migración.
     */
    public function down(): void
    {
        Schema::dropIfExists('etapas');
    }
};
