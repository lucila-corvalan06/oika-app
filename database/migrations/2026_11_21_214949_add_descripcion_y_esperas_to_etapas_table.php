<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Agrega a las etapas la frase que explica qué es cada una y las esperas de la obra.
     */
    public function up(): void
    {
        Schema::table('etapas', function (Blueprint $table) {
            // La dejo nullable porque la agrego a una tabla que ya tiene filas; las completa el seeder.
            $table->string('descripcion')->nullable()->after('nombre');
            // Guardo las esperas como lista porque son pocas por etapa y solo se leen junto con ella.
            $table->json('esperas')->nullable()->after('descripcion');
        });
    }

    /**
     * Saca las dos columnas si deshago la migración, sin tocar el resto de la tabla.
     */
    public function down(): void
    {
        Schema::table('etapas', function (Blueprint $table) {
            $table->dropColumn(['descripcion', 'esperas']);
        });
    }
};
