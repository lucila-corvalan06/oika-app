<?php

namespace Database\Seeders;

use App\Models\Etapa;
use Illuminate\Database\Seeder;

class EtapaSeeder extends Seeder
{
    /**
     * Carga las 5 etapas de obra.
     */
    public function run(): void
    {
        // Semanas: sumé por etapa las tareas que me pasó un profesional que trabaja en el rubro (1 semana = 5 días).
        // Cimientos: replanteo 1 día + bases 2 sem + contrapisos 1 sem = 3,2
        // Mampostería: paredes 1,5 sem + marcos 4 días = 2,3
        // Techo y losa: columnas, vigas y losa 3 sem + membrana 1 sem = 4
        // Instalaciones: 2 sem
        // Terminaciones: carpetas 1 sem + revoques 3 sem + pintura 2 sem + ventanas 2 días = 6,4
        $etapas = [
            ['id' => 1, 'orden' => 1, 'nombre' => 'Cimientos y contrapiso', 'porcentaje_costo' => 10, 'semanas_trabajo' => 3.2],
            ['id' => 2, 'orden' => 2, 'nombre' => 'Mampostería', 'porcentaje_costo' => 9, 'semanas_trabajo' => 2.3],
            ['id' => 3, 'orden' => 3, 'nombre' => 'Techo y losa', 'porcentaje_costo' => 25, 'semanas_trabajo' => 4],
            ['id' => 4, 'orden' => 4, 'nombre' => 'Instalaciones', 'porcentaje_costo' => 23, 'semanas_trabajo' => 2],
            ['id' => 5, 'orden' => 5, 'nombre' => 'Terminaciones', 'porcentaje_costo' => 33, 'semanas_trabajo' => 6.4],
        ];

        // Uso upsert para poder volver a correrlo si cambio un número, sin borrar la base.
        Etapa::upsert($etapas, ['id'], ['orden', 'nombre', 'porcentaje_costo', 'semanas_trabajo']);
    }
}
