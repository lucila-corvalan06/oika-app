<?php

namespace Tests\Feature;

use App\Models\Componente;
use Database\Seeders\ComponenteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Comprueba los ambientes del hogar y sus superficies de referencia.
 */
class ComponenteSeederTest extends TestCase
{
    use RefreshDatabase;

    public function test_hay_un_componente_por_cada_ambiente_del_wizard(): void
    {
        $this->seed(ComponenteSeeder::class);

        // Son las claves que busca el motor, así que tienen que coincidir con lo que guarda el wizard
        $this->assertEqualsCanonicalizing([
            'dormitorio', 'bano', 'cocina_comedor', 'living', 'integrados',
            'cochera_1_auto', 'cochera_2_autos', 'galeria', 'quincho', 'lavadero',
        ], Componente::pluck('clave')->all());
    }

    public function test_solo_la_galeria_y_el_quincho_son_semicubiertos(): void
    {
        $this->seed(ComponenteSeeder::class);

        $this->assertEqualsCanonicalizing(
            ['galeria', 'quincho'],
            Componente::where('semicubierto', true)->pluck('clave')->all(),
        );
    }

    public function test_correr_el_seeder_dos_veces_no_duplica_componentes(): void
    {
        $this->seed(ComponenteSeeder::class);
        $this->seed(ComponenteSeeder::class);

        $this->assertSame(10, Componente::count());
    }
}
