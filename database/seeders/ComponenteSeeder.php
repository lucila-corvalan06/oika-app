<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Carga la superficie de referencia de cada ambiente del hogar.
 */
class ComponenteSeeder extends Seeder
{
    /**
     * Carga o actualiza los ambientes en la tabla componentes.
     */
    public function run(): void
    {
        // Superficies: rangos que me pasó un profesional que trabaja en el rubro.
        // Cuando me dio un rango uso el promedio, y cuando me dio un solo valor uso ese.
        // Dormitorio 7 a 9, living 10 a 15, integrados 20 a 27, cochera para 2 autos 45 a 50,
        // galería 18 a 24, quincho 24 a 30. Baño 3, cocina y comedor 9, cochera para 1 auto 21, lavadero 4.
        //
        // "Separados" no tiene fila propia: el motor suma cocina_comedor + living.
        //
        // Semicubierto: tiene techo pero no cierra del todo (hasta 3 lados construidos), y cuenta al 50 %.

        // Uso upsert y no insert para poder volver a correrlo si cambio un valor, sin borrar la base.
        // Todas las filas llevan las mismas columnas porque upsert las carga juntas en una sola consulta.
        DB::table('componentes')->upsert([
            [
                'id' => 1,
                'clave' => 'dormitorio',
                'nombre' => 'Dormitorio',
                'm2' => 8,
                'semicubierto' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'clave' => 'bano',
                'nombre' => 'Baño',
                'm2' => 3,
                'semicubierto' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'clave' => 'cocina_comedor',
                'nombre' => 'Cocina y comedor',
                'm2' => 9,
                'semicubierto' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'clave' => 'living',
                'nombre' => 'Living',
                'm2' => 12.5,
                'semicubierto' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'clave' => 'integrados',
                'nombre' => 'Cocina, comedor y living integrados',
                'm2' => 23.5,
                'semicubierto' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'clave' => 'cochera_1_auto',
                'nombre' => 'Cochera para 1 auto',
                'm2' => 21,
                'semicubierto' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'clave' => 'cochera_2_autos',
                'nombre' => 'Cochera para 2 autos',
                'm2' => 47.5,
                'semicubierto' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'clave' => 'galeria',
                'nombre' => 'Galería',
                'm2' => 21,
                'semicubierto' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'clave' => 'quincho',
                'nombre' => 'Quincho',
                'm2' => 27,
                'semicubierto' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'clave' => 'lavadero',
                'nombre' => 'Lavadero',
                'm2' => 4,
                'semicubierto' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ], ['id'], ['clave', 'nombre', 'm2', 'semicubierto', 'updated_at']);
    }
}
