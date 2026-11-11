<?php

namespace Tests\Feature;

use App\Enums\Rol;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Comprueba el paso de plantas del wizard del proyecto.
 */
class ProyectoPlantasTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Apago Vite para que los tests no dependan de tener el build o el servidor de desarrollo
        $this->withoutVite();
    }

    public function test_una_familia_ve_la_pantalla_de_plantas(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->get(route('familia.proyecto.plantas.form'))
            ->assertOk();
    }

    public function test_guarda_las_plantas_en_la_sesion(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        // Mando el valor como texto porque así llega desde el formulario
        $this->actingAs($familia)
            ->post(route('familia.proyecto.plantas.guardar'), ['plantas' => '2'])
            ->assertRedirect(route('familia.inicio'))
            ->assertSessionHas('proyecto.plantas', 2);
    }

    public function test_rechaza_una_cantidad_de_plantas_invalida(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->post(route('familia.proyecto.plantas.guardar'), ['plantas' => '3'])
            ->assertSessionHasErrors('plantas')
            ->assertSessionMissing('proyecto.plantas');
    }

    public function test_un_profesional_no_entra_al_wizard_de_la_familia(): void
    {
        $profesional = User::factory()->create(['rol' => Rol::Profesional]);

        $this->actingAs($profesional)
            ->get(route('familia.proyecto.plantas.form'))
            ->assertRedirect(route($profesional->rutaInicio()));
    }

    public function test_sin_sesion_el_wizard_manda_al_ingreso(): void
    {
        $this->get(route('familia.proyecto.plantas.form'))
            ->assertRedirect(route('auth.login.form'));
    }
}
