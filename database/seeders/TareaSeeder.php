<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Carga las tareas de cada etapa de obra.
 */
class TareaSeeder extends Seeder
{
    /**
     * Carga las tareas en la tabla tareas, o las actualiza si ya estaban cargadas.
     *
     * Los etapa_id son los ids fijos de EtapaSeeder, por eso ese seeder corre antes.
     */
    public function run(): void
    {
        // Uso upsert y no insert para poder volver a correrlo si cambio un texto, sin borrar la base.
        DB::table('tareas')->upsert([
            [
                'id' => 1,
                'etapa_id' => 1, // Cimientos y contrapiso.
                'orden' => 1,
                'nombre' => 'Replanteo',
                'descripcion' => 'Se limpia el terreno y se marca, con hilos y estacas, dónde va cada pared de tu hogar.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'etapa_id' => 1, // Cimientos y contrapiso.
                'orden' => 2,
                'nombre' => 'Bases o platea',
                'descripcion' => 'Se hacen los cimientos de hormigón que sostienen el peso de tu hogar. Pueden ser bases unidas entre sí o una platea (una losa apoyada sobre el suelo).',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'etapa_id' => 1, // Cimientos y contrapiso.
                'orden' => 3,
                'nombre' => 'Contrapiso',
                'descripcion' => 'Se hace una capa de hormigón sobre el suelo, que es la base firme de los pisos.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 4,
                'etapa_id' => 2, // Mampostería.
                'orden' => 1,
                'nombre' => 'Paredes',
                'descripcion' => 'Se levantan las paredes y se dejan los huecos donde después van las columnas, las puertas y las ventanas.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 5,
                'etapa_id' => 2, // Mampostería.
                'orden' => 2,
                'nombre' => 'Marcos',
                'descripcion' => 'Mientras se levantan las paredes, se fijan los marcos de las puertas.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 6,
                'etapa_id' => 3, // Techo y losa.
                'orden' => 1,
                'nombre' => 'Columnas, vigas y losa',
                'descripcion' => 'Se llenan con hormigón las columnas y las vigas que rodean las paredes, y se hace la losa (el techo de hormigón).',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 7,
                'etapa_id' => 3, // Techo y losa.
                'orden' => 2,
                'nombre' => 'Membrana',
                'descripcion' => 'Sobre la losa se arma una pendiente para que corra el agua y se coloca una membrana que no deja pasar la lluvia.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 8,
                'etapa_id' => 4, // Instalaciones.
                'orden' => 1,
                'nombre' => 'Electricidad',
                'descripcion' => 'Se colocan los caños por donde pasan los cables de la luz y los enchufes.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 9,
                'etapa_id' => 4, // Instalaciones.
                'orden' => 2,
                'nombre' => 'Agua y desagües',
                'descripcion' => 'Se colocan el tanque y los caños que llevan el agua a la cocina y al baño, y los que se llevan el agua usada y la de lluvia.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 10,
                'etapa_id' => 4, // Instalaciones.
                'orden' => 3,
                'nombre' => 'Gas',
                'descripcion' => 'Se colocan los caños del gas para la cocina y el calefón.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 11,
                'etapa_id' => 4, // Instalaciones.
                'orden' => 4,
                'nombre' => 'Baño y cocina',
                'descripcion' => 'Se colocan el inodoro, el bidet, el lavamanos, las piletas de la cocina y del lavadero, y sus canillas.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 12,
                'etapa_id' => 5, // Terminaciones.
                'orden' => 1,
                'nombre' => 'Revoques',
                'descripcion' => 'Se cubren las paredes con una mezcla que las deja lisas y listas para pintar.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 13,
                'etapa_id' => 5, // Terminaciones.
                'orden' => 2,
                'nombre' => 'Carpetas',
                'descripcion' => 'Se hace una capa fina y pareja sobre el contrapiso, donde después va el piso.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 14,
                'etapa_id' => 5, // Terminaciones.
                'orden' => 3,
                'nombre' => 'Pisos y cerámicos',
                'descripcion' => 'Se colocan los pisos, los zócalos y los cerámicos de las paredes del baño y la cocina. Afuera se hacen las veredas.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 15,
                'etapa_id' => 5, // Terminaciones.
                'orden' => 4,
                'nombre' => 'Puertas, ventanas y rejas',
                'descripcion' => 'Se colocan las ventanas, las rejas y las puertas en sus marcos.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 16,
                'etapa_id' => 5, // Terminaciones.
                'orden' => 5,
                'nombre' => 'Pintura',
                'descripcion' => 'Se pintan las paredes y los techos por dentro y por fuera.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ], ['id'], ['etapa_id', 'orden', 'nombre', 'descripcion', 'updated_at']);
    }
}
