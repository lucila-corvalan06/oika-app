<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la tabla con los números que usa el motor de cálculo.
     */
    public function up(): void
    {
        Schema::create('parametros', function (Blueprint $table) {
            $table->id();
            // El motor busca cada número por su clave.
            $table->string('clave')->unique();
            $table->string('nombre');
            // Le doy lugar para el costo por m² en pesos y también para factores chicos como 0,6.
            $table->decimal('valor', 14, 4);
            // Solo la usa el costo por m², para saber de qué mes es el precio.
            $table->date('fecha')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Borra la tabla si deshago la migración.
     */
    public function down(): void
    {
        Schema::dropIfExists('parametros');
    }
};
