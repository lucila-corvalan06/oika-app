<?php

namespace Tests\Feature;

use App\Models\Etapa;
use App\Models\Tarea;
use Database\Seeders\EtapaSeeder;
use Database\Seeders\TareaSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Comprueba las tareas de cada etapa de obra.
 */
class TareaSeederTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Las tareas necesitan que las etapas ya existan
        $this->seed([EtapaSeeder::class, TareaSeeder::class]);
    }

    public function test_cada_etapa_tiene_sus_tareas(): void
    {
        $etapas = Etapa::orderBy('orden')->get();

        // Cuento las tareas de cada etapa, de la 1 a la 5
        $cantidades = $etapas->map(fn ($etapa) => $etapa->tareas->count())->all();

        $this->assertSame([3, 2, 2, 4, 5], $cantidades);
    }

    public function test_correr_el_seeder_dos_veces_no_duplica_tareas(): void
    {
        $this->seed(TareaSeeder::class);

        $this->assertSame(16, Tarea::count());
    }

    public function test_las_tareas_llegan_en_orden_y_conocen_su_etapa(): void
    {
        $etapa = Etapa::where('orden', 3)->first();

        $this->assertSame(['Columnas, vigas y losa', 'Membrana'], $etapa->tareas->pluck('nombre')->all());
        $this->assertSame('Techo y losa', $etapa->tareas->first()->etapa->nombre);
    }
}
