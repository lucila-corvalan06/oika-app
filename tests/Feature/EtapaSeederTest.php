<?php

namespace Tests\Feature;

use App\Models\Etapa;
use Database\Seeders\EtapaSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Comprueba los datos de las 5 etapas de obra.
 */
class EtapaSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_las_etapas_suman_100_por_ciento(): void
    {
        $this->seed(EtapaSeeder::class);

        // Sumo sobre las etapas ya traídas para que los casts me den números y no texto
        $etapas = Etapa::all();

        $this->assertCount(5, $etapas);
        $this->assertSame(100, $etapas->sum('porcentaje_costo'));
    }

    public function test_correr_el_seeder_dos_veces_no_duplica_etapas(): void
    {
        $this->seed(EtapaSeeder::class);
        $this->seed(EtapaSeeder::class);

        $this->assertSame(5, Etapa::count());
    }

    public function test_cada_etapa_tiene_su_descripcion(): void
    {
        $this->seed(EtapaSeeder::class);

        $this->assertSame(0, Etapa::whereNull('descripcion')->count());
    }

    public function test_solo_techo_instalaciones_y_terminaciones_tienen_esperas(): void
    {
        $this->seed(EtapaSeeder::class);

        // Si el cast no funcionara, las esperas llegarían como texto y assertCount fallaría
        $etapas = Etapa::orderBy('orden')->get();

        $this->assertNull($etapas[0]->esperas);
        $this->assertNull($etapas[1]->esperas);
        $this->assertCount(2, $etapas[2]->esperas);
        $this->assertCount(2, $etapas[3]->esperas);
        $this->assertCount(1, $etapas[4]->esperas);
    }
}
