<?php

namespace Tests\Feature;

use App\Enums\Estado;
use App\Enums\Rol;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Comprueba que el portero cuenta.lugar deje pasar o redirija a cada cuenta.
 */
class PorteroTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Apago Vite para que los tests no dependan de tener el build o el servidor de desarrollo
        $this->withoutVite();
    }

    public function test_una_familia_entra_a_su_inicio(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->get(route('familia.inicio'))
            ->assertOk();
    }

    public function test_un_profesional_no_entra_al_inicio_de_la_familia(): void
    {
        $profesional = User::factory()->create(['rol' => Rol::Profesional]);

        $this->actingAs($profesional)
            ->get(route('familia.inicio'))
            ->assertRedirect(route($profesional->rutaInicio()));
    }

    public function test_sin_sesion_se_manda_al_ingreso(): void
    {
        $this->get(route('familia.inicio'))
            ->assertRedirect(route('auth.login.form'));
    }

    public function test_el_destino_de_cada_cuenta_no_vuelve_a_redirigir(): void
    {
        // Pruebo todas las combinaciones porque un bucle puede aparecer en cualquiera de ellas
        foreach (Rol::cases() as $rol) {
            foreach (Estado::cases() as $estado) {
                $cuenta = User::factory()->create(['rol' => $rol, 'estado' => $estado]);

                $respuesta = $this->actingAs($cuenta)->get(route($cuenta->rutaInicio()));

                $this->assertSame(
                    200,
                    $respuesta->getStatusCode(),
                    "Con rol {$rol->value} y estado {$estado->value} el destino vuelve a redirigir"
                );
            }
        }
    }
}
