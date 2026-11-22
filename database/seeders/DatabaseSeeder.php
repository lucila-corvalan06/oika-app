<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

/**
 * Carga los datos que Oika necesita para funcionar.
 */
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Llama a los seeders en orden, primero las etapas y después sus tareas.
     */
    public function run(): void
    {
        $this->call([
            EtapaSeeder::class,
            TareaSeeder::class,
            ComponenteSeeder::class,
            ParametroSeeder::class,
        ]);
    }
}
