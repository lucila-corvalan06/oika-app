<?php

namespace Tests\Feature;

use App\Enums\Rol;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Comprueba el paso de cochera y espacios extra del wizard del proyecto.
 */
class ProyectoCocheraTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_una_familia_ve_la_pantalla_de_cochera(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession(['proyecto.espacios' => 'integrados'])
            ->get(route('familia.proyecto.cochera.form'))
            ->assertOk();
    }

    public function test_sin_espacios_elegidos_la_pantalla_manda_al_paso_tres(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->get(route('familia.proyecto.cochera.form'))
            ->assertRedirect(route('familia.proyecto.espacios.form'));
    }

    public function test_guarda_la_cochera_y_los_extras_en_la_sesion(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        // Mando la cochera como texto porque así llega desde el formulario
        $this->actingAs($familia)
            ->withSession(['proyecto.espacios' => 'integrados'])
            ->post(route('familia.proyecto.cochera.guardar'), [
                'cochera' => '2',
                'extras' => ['galeria', 'lavadero'],
            ])
            ->assertRedirect(route('familia.inicio'))
            ->assertSessionHas('proyecto.cochera', 2)
            ->assertSessionHas('proyecto.extras', ['galeria', 'lavadero']);
    }

    public function test_sin_extras_guarda_una_lista_vacia(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        // Sin ningún extra tildado el formulario puede no mandar la lista
        $this->actingAs($familia)
            ->withSession(['proyecto.espacios' => 'integrados'])
            ->post(route('familia.proyecto.cochera.guardar'), ['cochera' => '0'])
            ->assertRedirect(route('familia.inicio'))
            ->assertSessionHas('proyecto.cochera', 0)
            ->assertSessionHas('proyecto.extras', []);
    }

    public function test_rechaza_una_cochera_fuera_de_rango(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession(['proyecto.espacios' => 'integrados'])
            ->post(route('familia.proyecto.cochera.guardar'), ['cochera' => '3'])
            ->assertSessionHasErrors('cochera')
            ->assertSessionMissing('proyecto.cochera');
    }

    public function test_rechaza_un_extra_que_no_existe(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession(['proyecto.espacios' => 'integrados'])
            ->post(route('familia.proyecto.cochera.guardar'), [
                'cochera' => '1',
                'extras' => ['piscina'],
            ])
            ->assertSessionHasErrors('extras.0')
            ->assertSessionMissing('proyecto.extras');
    }

    public function test_sin_espacios_elegidos_no_guarda_nada(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->post(route('familia.proyecto.cochera.guardar'), ['cochera' => '1'])
            ->assertRedirect(route('familia.proyecto.espacios.form'))
            ->assertSessionMissing('proyecto.cochera');
    }

    public function test_un_profesional_no_entra_a_cochera(): void
    {
        $profesional = User::factory()->create(['rol' => Rol::Profesional]);

        $this->actingAs($profesional)
            ->get(route('familia.proyecto.cochera.form'))
            ->assertRedirect(route($profesional->rutaInicio()));
    }

    public function test_sin_sesion_cochera_manda_al_ingreso(): void
    {
        $this->get(route('familia.proyecto.cochera.form'))
            ->assertRedirect(route('auth.login.form'));
    }
}
