<?php

namespace Tests\Feature;

use App\Enums\Rol;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Comprueba el paso del nivel de terminación del wizard del proyecto.
 */
class ProyectoTerminacionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_una_familia_ve_la_pantalla_de_terminacion(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession(['proyecto.cochera' => 0])
            ->get(route('familia.proyecto.terminacion.form'))
            ->assertOk();
    }

    public function test_sin_cochera_elegida_la_pantalla_manda_al_paso_cuatro(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->get(route('familia.proyecto.terminacion.form'))
            ->assertRedirect(route('familia.proyecto.cochera.form'));
    }

    public function test_guarda_la_terminacion_en_la_sesion(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession(['proyecto.cochera' => 0])
            ->post(route('familia.proyecto.terminacion.guardar'), ['terminacion' => 'media'])
            ->assertRedirect(route('familia.inicio'))
            ->assertSessionHas('proyecto.terminacion', 'media');
    }

    public function test_rechaza_una_terminacion_invalida(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession(['proyecto.cochera' => 0])
            ->post(route('familia.proyecto.terminacion.guardar'), ['terminacion' => 'lujosa'])
            ->assertSessionHasErrors('terminacion')
            ->assertSessionMissing('proyecto.terminacion');
    }

    public function test_sin_cochera_elegida_no_guarda_nada(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->post(route('familia.proyecto.terminacion.guardar'), ['terminacion' => 'superior'])
            ->assertRedirect(route('familia.proyecto.cochera.form'))
            ->assertSessionMissing('proyecto.terminacion');
    }

    public function test_un_profesional_no_entra_a_terminacion(): void
    {
        $profesional = User::factory()->create(['rol' => Rol::Profesional]);

        $this->actingAs($profesional)
            ->get(route('familia.proyecto.terminacion.form'))
            ->assertRedirect(route($profesional->rutaInicio()));
    }

    public function test_sin_sesion_terminacion_manda_al_ingreso(): void
    {
        $this->get(route('familia.proyecto.terminacion.form'))
            ->assertRedirect(route('auth.login.form'));
    }
}
