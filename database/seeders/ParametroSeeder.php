<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Carga los números que usa el motor de cálculo.
 */
class ParametroSeeder extends Seeder
{
    /**
     * Carga o actualiza los parámetros en la tabla parametros.
     */
    public function run(): void
    {
        // Uso upsert y no insert para poder volver a correrlo si cambio un valor, sin borrar la base.
        DB::table('parametros')->upsert([
            [
                'id' => 1,
                'clave' => 'costo_m2',
                'nombre' => 'Costo por m²',
                'valor' => 2534060.94,
                // Guardo cuándo cargué el precio, para que la app pueda mostrar cuándo se actualizó.
                'fecha' => '2026-11-21',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'clave' => 'factor_economica',
                'nombre' => 'Factor de terminación económica',
                'valor' => 0.6,
                'fecha' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'clave' => 'factor_media',
                'nombre' => 'Factor de terminación media',
                'valor' => 1,
                'fecha' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'clave' => 'factor_superior',
                'nombre' => 'Factor de terminación superior',
                'valor' => 1.25,
                'fecha' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'clave' => 'circulacion_porcentaje',
                'nombre' => 'Circulación (%)',
                'valor' => 4.5,
                'fecha' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'clave' => 'semicubierto_porcentaje',
                'nombre' => 'Semicubiertos (%)',
                'valor' => 50,
                'fecha' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'clave' => 'factor_tiempo',
                'nombre' => 'Factor de tiempo',
                'valor' => 1.9,
                'fecha' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'clave' => 'm2_base_tiempo',
                'nombre' => 'Superficie base para el tiempo (m²)',
                'valor' => 64,
                'fecha' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'clave' => 'factor_dos_plantas_cimientos',
                'nombre' => 'Dos plantas: factor de cimientos',
                'valor' => 0.5,
                'fecha' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'clave' => 'factor_dos_plantas_resto',
                'nombre' => 'Dos plantas: factor de las otras etapas',
                'valor' => 1.15,
                'fecha' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ], ['id'], ['clave', 'nombre', 'valor', 'fecha', 'updated_at']);
    }
}
