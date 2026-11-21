<?php

namespace Tests\Feature;

use App\Models\Parametro;
use Database\Seeders\ParametroSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Comprueba los números que usa el motor de cálculo.
 */
class ParametroSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_carga_todos_los_parametros_que_usa_el_motor(): void
    {
        $this->seed(ParametroSeeder::class);

        // Son las claves que busca el motor, así que no puede faltar ninguna.
        $this->assertEqualsCanonicalizing([
            'costo_m2', 'factor_economica', 'factor_media', 'factor_superior',
            'circulacion_porcentaje', 'semicubierto_porcentaje', 'factor_tiempo',
            'm2_base_tiempo', 'factor_dos_plantas_cimientos', 'factor_dos_plantas_resto',
        ], Parametro::pluck('clave')->all());
    }

    public function test_solo_el_costo_por_m2_tiene_fecha(): void
    {
        $this->seed(ParametroSeeder::class);

        $this->assertSame(['costo_m2'], Parametro::whereNotNull('fecha')->pluck('clave')->all());
    }

    public function test_correr_el_seeder_dos_veces_no_duplica_parametros(): void
    {
        $this->seed(ParametroSeeder::class);
        $this->seed(ParametroSeeder::class);

        $this->assertSame(10, Parametro::count());
    }
}
