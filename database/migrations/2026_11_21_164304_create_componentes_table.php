<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Crea la tabla con la superficie de referencia de cada ambiente.
     */
    public function up(): void
    {
        Schema::create('componentes', function (Blueprint $table) {
            $table->id();
            // El motor busca por clave, así que tiene que coincidir con lo que guarda el wizard.
            $table->string('clave')->unique();
            $table->string('nombre');
            $table->decimal('m2', 4, 1);
            // Los semicubiertos los cuento al 50 % de su superficie.
            $table->boolean('semicubierto')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Borra la tabla si deshago la migración.
     */
    public function down(): void
    {
        Schema::dropIfExists('componentes');
    }
};
