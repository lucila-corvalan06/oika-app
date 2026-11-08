<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Escribo los valores como texto y no con el enum para que la migración no dependa de él si algún día cambia
            $table->string('rol')->default('usuario_final');
            $table->string('estado')->default('activa');

            // Queda en null hasta que la familia responde la pantalla 5
            $table->boolean('tiene_terreno')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['rol', 'estado', 'tiene_terreno']);
        });
    }
};
