<?php

namespace Tests\Feature;

use App\Enums\Rol;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Comprueba el paso de espacios sociales del wizard del proyecto.
 */
class ProyectoEspaciosTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_una_familia_ve_la_pantalla_de_espacios(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession(['proyecto.dormitorios' => 2])
            ->get(route('familia.proyecto.espacios.form'))
            ->assertOk();
    }

    public function test_sin_dormitorios_elegidos_la_pantalla_manda_al_paso_dos(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->get(route('familia.proyecto.espacios.form'))
            ->assertRedirect(route('familia.proyecto.dormitorios.form'));
    }

    public function test_guarda_los_espacios_en_la_sesion(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession(['proyecto.dormitorios' => 2])
            ->post(route('familia.proyecto.espacios.guardar'), ['espacios' => 'separados'])
            ->assertRedirect(route('familia.proyecto.cochera.form'))
            ->assertSessionHas('proyecto.espacios', 'separados');
    }

    public function test_rechaza_una_opcion_de_espacios_invalida(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession(['proyecto.dormitorios' => 2])
            ->post(route('familia.proyecto.espacios.guardar'), ['espacios' => 'mezclados'])
            ->assertSessionHasErrors('espacios')
            ->assertSessionMissing('proyecto.espacios');
    }

    public function test_sin_dormitorios_elegidos_no_guarda_nada(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->post(route('familia.proyecto.espacios.guardar'), ['espacios' => 'integrados'])
            ->assertRedirect(route('familia.proyecto.dormitorios.form'))
            ->assertSessionMissing('proyecto.espacios');
    }

    public function test_un_profesional_no_entra_a_espacios(): void
    {
        $profesional = User::factory()->create(['rol' => Rol::Profesional]);

        $this->actingAs($profesional)
            ->get(route('familia.proyecto.espacios.form'))
            ->assertRedirect(route($profesional->rutaInicio()));
    }

    public function test_sin_sesion_espacios_manda_al_ingreso(): void
    {
        $this->get(route('familia.proyecto.espacios.form'))
            ->assertRedirect(route('auth.login.form'));
    }
}
