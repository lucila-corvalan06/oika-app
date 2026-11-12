<?php

namespace Tests\Feature;

use App\Enums\Rol;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Comprueba el paso de dormitorios y baños del wizard del proyecto.
 */
class ProyectoDormitoriosTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_una_familia_ve_la_pantalla_de_dormitorios(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession(['proyecto.plantas' => 1])
            ->get(route('familia.proyecto.dormitorios.form'))
            ->assertOk();
    }

    public function test_sin_plantas_elegidas_la_pantalla_manda_al_paso_uno(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->get(route('familia.proyecto.dormitorios.form'))
            ->assertRedirect(route('familia.proyecto.plantas.form'));
    }

    public function test_guarda_dormitorios_y_banos_en_la_sesion(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        // Mando los valores como texto porque así llegan desde el formulario.
        $this->actingAs($familia)
            ->withSession(['proyecto.plantas' => 1])
            ->post(route('familia.proyecto.dormitorios.guardar'), ['dormitorios' => '3', 'banos' => '5'])
            ->assertRedirect(route('familia.inicio'))
            ->assertSessionHas('proyecto.dormitorios', 3)
            ->assertSessionHas('proyecto.banos', 5);
    }

    public function test_rechaza_cantidades_fuera_de_rango(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession(['proyecto.plantas' => 1])
            ->post(route('familia.proyecto.dormitorios.guardar'), ['dormitorios' => '6', 'banos' => '0'])
            ->assertSessionHasErrors(['dormitorios', 'banos'])
            ->assertSessionMissing('proyecto.dormitorios')
            ->assertSessionMissing('proyecto.banos');
    }

    public function test_sin_plantas_elegidas_no_guarda_nada(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->post(route('familia.proyecto.dormitorios.guardar'), ['dormitorios' => '3', 'banos' => '2'])
            ->assertRedirect(route('familia.proyecto.plantas.form'))
            ->assertSessionMissing('proyecto.dormitorios');
    }

    public function test_un_profesional_no_entra_a_dormitorios(): void
    {
        $profesional = User::factory()->create(['rol' => Rol::Profesional]);

        $this->actingAs($profesional)
            ->get(route('familia.proyecto.dormitorios.form'))
            ->assertRedirect(route($profesional->rutaInicio()));
    }

    public function test_sin_sesion_dormitorios_manda_al_ingreso(): void
    {
        $this->get(route('familia.proyecto.dormitorios.form'))
            ->assertRedirect(route('auth.login.form'));
    }
}
