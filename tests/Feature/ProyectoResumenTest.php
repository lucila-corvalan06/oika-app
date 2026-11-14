<?php

namespace Tests\Feature;

use App\Enums\Rol;
use App\Models\Proyecto;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Comprueba el resumen del wizard del proyecto y el guardado del proyecto.
 */
class ProyectoResumenTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    // Dejo las respuestas completas en un solo lugar para no repetirlas en cada test
    private function respuestasCompletas(): array
    {
        return [
            'proyecto.plantas' => 2,
            'proyecto.dormitorios' => 3,
            'proyecto.banos' => 1,
            'proyecto.espacios' => 'separados',
            'proyecto.cochera' => 1,
            'proyecto.extras' => ['galeria', 'quincho'],
            'proyecto.terminacion' => 'media',
        ];
    }

    public function test_sin_respuestas_el_resumen_manda_al_primer_paso(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->get(route('familia.proyecto.resumen'))
            ->assertRedirect(route('familia.proyecto.plantas.form'));
    }

    public function test_con_una_respuesta_faltante_manda_a_ese_paso(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $respuestas = $this->respuestasCompletas();
        unset($respuestas['proyecto.terminacion']);

        $this->actingAs($familia)
            ->withSession($respuestas)
            ->get(route('familia.proyecto.resumen'))
            ->assertRedirect(route('familia.proyecto.terminacion.form'));
    }

    public function test_el_resumen_muestra_las_filas_con_sus_textos(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession($this->respuestasCompletas())
            ->get(route('familia.proyecto.resumen'))
            ->assertOk()
            ->assertInertia(fn (Assert $pagina) => $pagina
                ->component('Familia/Proyecto/Resumen')
                ->has('filas', 5)
                ->where('filas.0.valor', 'Dos plantas')
                ->where('filas.1.valor', '3 dormitorios y 1 baño')
                ->where('filas.2.valor', 'Separados')
                ->where('filas.3.valor', '1 auto')
                ->where('filas.3.detalle', 'Extras: Galería y Quincho')
                ->where('filas.4.valor', 'Media')
            );
    }

    public function test_cada_fila_tiene_su_enlace_para_editar_con_volver(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession($this->respuestasCompletas())
            ->get(route('familia.proyecto.resumen'))
            ->assertInertia(fn (Assert $pagina) => $pagina
                ->where('filas.0.editar', '/familia/proyecto/plantas?volver=resumen')
                ->where('filas.4.editar', '/familia/proyecto/terminacion?volver=resumen')
            );
    }

    public function test_un_profesional_no_entra_al_resumen(): void
    {
        $profesional = User::factory()->create(['rol' => Rol::Profesional]);

        $this->actingAs($profesional)
            ->get(route('familia.proyecto.resumen'))
            ->assertRedirect(route($profesional->rutaInicio()));
    }

    public function test_sin_sesion_el_resumen_manda_al_ingreso(): void
    {
        $this->get(route('familia.proyecto.resumen'))
            ->assertRedirect(route('auth.login.form'));
    }

    public function test_guardar_crea_el_proyecto_y_limpia_la_sesion(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->withSession($this->respuestasCompletas())
            ->post(route('familia.proyecto.resumen.guardar'))
            ->assertRedirect(route('familia.inicio'))
            ->assertSessionMissing('proyecto.plantas');

        // Leo el proyecto de la base para comprobar que el cast devuelve los extras como lista
        $proyecto = $familia->proyecto;

        $this->assertSame(2, $proyecto->plantas);
        $this->assertSame(3, $proyecto->dormitorios);
        $this->assertSame('separados', $proyecto->espacios);
        $this->assertSame(['galeria', 'quincho'], $proyecto->extras);
        $this->assertSame('media', $proyecto->terminacion);
    }

    public function test_si_ya_tenia_un_proyecto_lo_reemplaza(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $familia->proyecto()->create([
            'plantas' => 1,
            'dormitorios' => 1,
            'banos' => 1,
            'espacios' => 'integrados',
            'cochera' => 0,
            'extras' => [],
            'terminacion' => 'economica',
        ]);

        $this->actingAs($familia)
            ->withSession($this->respuestasCompletas())
            ->post(route('familia.proyecto.resumen.guardar'))
            ->assertRedirect(route('familia.inicio'));

        // Tiene que seguir habiendo un solo proyecto, con las respuestas nuevas
        $this->assertDatabaseCount('proyectos', 1);
        $this->assertSame('media', $familia->proyecto->terminacion);
    }

    public function test_sin_respuestas_guardar_manda_al_primer_paso_y_no_crea_nada(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->post(route('familia.proyecto.resumen.guardar'))
            ->assertRedirect(route('familia.proyecto.plantas.form'));

        $this->assertDatabaseCount('proyectos', 0);
    }

    public function test_un_profesional_no_puede_guardar_un_proyecto(): void
    {
        $profesional = User::factory()->create(['rol' => Rol::Profesional]);

        $this->actingAs($profesional)
            ->withSession($this->respuestasCompletas())
            ->post(route('familia.proyecto.resumen.guardar'))
            ->assertRedirect(route($profesional->rutaInicio()));

        $this->assertDatabaseCount('proyectos', 0);
    }

    public function test_sin_sesion_guardar_manda_al_ingreso(): void
    {
        $this->post(route('familia.proyecto.resumen.guardar'))
            ->assertRedirect(route('auth.login.form'));
    }
}
