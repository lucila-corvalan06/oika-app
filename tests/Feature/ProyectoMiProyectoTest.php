<?php

namespace Tests\Feature;

use App\Enums\Rol;
use App\Models\User;
use Database\Seeders\ComponenteSeeder;
use Database\Seeders\EtapaSeeder;
use Database\Seeders\ParametroSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Comprueba la pantalla Mi proyecto, donde la familia ve lo que ya guardó.
 */
class ProyectoMiProyectoTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();

        // Mi proyecto usa el motor, que necesita sus tres tablas cargadas
        $this->seed([EtapaSeeder::class, ComponenteSeeder::class, ParametroSeeder::class]);
    }

    // Dejo las respuestas de un proyecto guardado en un solo lugar para no repetirlas en cada test
    private function respuestasGuardadas(): array
    {
        return [
            'plantas' => 2,
            'dormitorios' => 3,
            'banos' => 1,
            'espacios' => 'separados',
            'cochera' => 1,
            'extras' => ['galeria', 'quincho'],
            'terminacion' => 'media',
        ];
    }

    public function test_una_familia_con_proyecto_ve_sus_respuestas(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);
        $familia->proyecto()->create($this->respuestasGuardadas());

        $this->actingAs($familia)
            ->get(route('familia.proyecto.ver'))
            ->assertOk()
            ->assertInertia(fn (Assert $pagina) => $pagina
                ->component('Familia/Proyecto/MiProyecto')
                ->has('filas', 5)
                ->where('filas.0.valor', 'Dos plantas')
                ->where('filas.1.valor', '3 dormitorios y 1 baño')
                ->where('filas.3.detalle', 'Extras: Galería y Quincho')
                ->where('filas.4.valor', 'Media')
                ->has('calculo.etapas', 5)
                ->where('calculo.superficie', 95.7)
                ->where('calculo.costo_total', 263074835)
                ->where('calculo.semanas_total', 52.5)
                ->where('calculo.precio_actualizado', 'noviembre 2026')
                ->where('dosPlantas', true)
            );
    }

    public function test_sin_proyecto_guardado_manda_al_inicio(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->get(route('familia.proyecto.ver'))
            ->assertRedirect(route('familia.inicio'));
    }

    public function test_una_familia_no_ve_el_proyecto_de_otra(): void
    {
        $otra = User::factory()->create(['rol' => Rol::UsuarioFinal]);
        $otra->proyecto()->create($this->respuestasGuardadas());

        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        // Esta familia no guardó nada, así que no tiene que ver el proyecto de la otra
        $this->actingAs($familia)
            ->get(route('familia.proyecto.ver'))
            ->assertRedirect(route('familia.inicio'));
    }

    public function test_un_profesional_no_entra_a_mi_proyecto(): void
    {
        $profesional = User::factory()->create(['rol' => Rol::Profesional]);

        $this->actingAs($profesional)
            ->get(route('familia.proyecto.ver'))
            ->assertRedirect(route($profesional->rutaInicio()));
    }

    public function test_sin_sesion_mi_proyecto_manda_al_ingreso(): void
    {
        $this->get(route('familia.proyecto.ver'))
            ->assertRedirect(route('auth.login.form'));
    }
}
