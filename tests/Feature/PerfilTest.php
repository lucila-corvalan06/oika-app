<?php

namespace Tests\Feature;

use App\Enums\Rol;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Comprueba quién puede entrar al perfil de la familia.
 */
class PerfilTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Apago Vite para que los tests no dependan de tener el build o el servidor de desarrollo
        $this->withoutVite();
    }

    public function test_una_familia_entra_a_su_perfil(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->get(route('familia.perfil'))
            ->assertOk();
    }

    public function test_un_profesional_no_entra_al_perfil_de_la_familia(): void
    {
        $profesional = User::factory()->create(['rol' => Rol::Profesional]);

        $this->actingAs($profesional)
            ->get(route('familia.perfil'))
            ->assertRedirect(route($profesional->rutaInicio()));
    }

    public function test_sin_sesion_el_perfil_manda_al_ingreso(): void
    {
        $this->get(route('familia.perfil'))
            ->assertRedirect(route('auth.login.form'));
    }
}
