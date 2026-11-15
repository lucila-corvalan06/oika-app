<?php

namespace Tests\Feature;

use App\Enums\Rol;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Comprueba qué le manda el inicio a la pantalla según la familia haya guardado o no su proyecto.
 */
class FamiliaInicioTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_sin_proyecto_guardado_el_inicio_lo_avisa(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->get(route('familia.inicio'))
            ->assertOk()
            ->assertInertia(fn (Assert $pagina) => $pagina
                ->component('Familia/Inicio')
                ->where('tieneProyecto', false)
            );
    }

    public function test_con_proyecto_guardado_el_inicio_lo_avisa(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $familia->proyecto()->create([
            'plantas' => 1,
            'dormitorios' => 2,
            'banos' => 1,
            'espacios' => 'integrados',
            'cochera' => 0,
            'extras' => [],
            'terminacion' => 'media',
        ]);

        $this->actingAs($familia)
            ->get(route('familia.inicio'))
            ->assertOk()
            ->assertInertia(fn (Assert $pagina) => $pagina
                ->where('tieneProyecto', true)
            );
    }

    public function test_el_proyecto_de_otra_familia_no_cuenta(): void
    {
        $otra = User::factory()->create(['rol' => Rol::UsuarioFinal]);
        $otra->proyecto()->create([
            'plantas' => 2,
            'dormitorios' => 3,
            'banos' => 1,
            'espacios' => 'separados',
            'cochera' => 1,
            'extras' => ['quincho'],
            'terminacion' => 'superior',
        ]);

        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        // Esta familia no guardó nada, así que el proyecto de la otra no tiene que aparecerle
        $this->actingAs($familia)
            ->get(route('familia.inicio'))
            ->assertInertia(fn (Assert $pagina) => $pagina
                ->where('tieneProyecto', false)
            );
    }
}
