<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Carga las 5 etapas de obra de Oika.
 */
class EtapaSeeder extends Seeder
{
    /**
     * Carga o actualiza las etapas en la tabla etapas.
     */
    public function run(): void
    {
        // Semanas: sumé por etapa las tareas que me pasó un profesional que trabaja en el rubro (1 semana = 5 días).
        // Cimientos: replanteo 1 día + bases 2 sem + contrapisos 1 sem = 3,2
        // Mampostería: paredes 1,5 sem + marcos 4 días = 2,3
        // Techo y losa: columnas, vigas y losa 3 sem + membrana 1 sem = 4
        // Instalaciones: 2 sem
        // Terminaciones: carpetas 1 sem + revoques 3 sem + pintura 2 sem + ventanas 2 días = 6,4
        // Uso upsert y no insert para poder volver a correrlo si cambio un número, sin borrar la base.
        DB::table('etapas')->upsert([
            [
                'id' => 1,
                'orden' => 1,
                'nombre' => 'Cimientos y contrapiso',
                'descripcion' => 'Es la base de tu hogar: lo que va bajo tierra y sostiene todo lo demás.',
                'esperas' => null,
                'porcentaje_costo' => 10,
                'semanas_trabajo' => 3.2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'orden' => 2,
                'nombre' => 'Mampostería',
                'descripcion' => 'Se levantan las paredes de tu hogar.',
                'esperas' => null,
                'porcentaje_costo' => 9,
                'semanas_trabajo' => 2.3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'orden' => 3,
                'nombre' => 'Techo y losa',
                'descripcion' => 'Se hace el techo de tu hogar y se lo protege de la lluvia.',
                'esperas' => json_encode([
                    'La losa queda sostenida con puntales (soportes de madera o metal) hasta que el hormigón se endurece. No se sacan antes, aunque parezca firme.',
                    'La membrana se coloca recién cuando lo que está debajo está bien seco.',
                ]),
                'porcentaje_costo' => 25,
                'semanas_trabajo' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'orden' => 4,
                'nombre' => 'Instalaciones',
                'descripcion' => 'Se colocan los caños por dentro de las paredes para que tu hogar tenga luz, agua y gas.',
                'esperas' => json_encode([
                    'Los caños tienen que estar terminados antes de revocar, porque quedan dentro de las paredes. Arreglar algo después obliga a romper.',
                    'Los artefactos del baño y la cocina se colocan al final de la obra, cuando las paredes ya tienen sus cerámicos.',
                ]),
                'porcentaje_costo' => 23,
                'semanas_trabajo' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'orden' => 5,
                'nombre' => 'Terminaciones',
                'descripcion' => 'Es la última etapa: se dejan lisas las paredes, se colocan los pisos, las puertas y las ventanas, y se pinta.',
                'esperas' => json_encode([
                    'La pintura va al final, con todo lo demás terminado, para no mancharla ni tener que repetirla.',
                ]),
                'porcentaje_costo' => 33,
                'semanas_trabajo' => 6.4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ], ['id'], ['orden', 'nombre', 'descripcion', 'esperas', 'porcentaje_costo', 'semanas_trabajo', 'updated_at']);
    }
}
