<?php

namespace Tests\Feature;

use App\Enums\Rol;
use App\Models\User;
use Database\Seeders\ComponenteSeeder;
use Database\Seeders\EtapaSeeder;
use Database\Seeders\ParametroSeeder;
use Database\Seeders\TareaSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Comprueba el detalle de una etapa, donde la familia ve qué se hace y cuánto cuesta.
 */
class ProyectoEtapaTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();

        // El detalle usa el motor y las tareas, así que cargo las cuatro tablas
        $this->seed([EtapaSeeder::class, TareaSeeder::class, ComponenteSeeder::class, ParametroSeeder::class]);
    }

    // Uso el mismo hogar de una planta con el que probé Mi proyecto en el navegador
    private function familiaConProyecto(int $plantas = 1): User
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);
        $familia->proyecto()->create([
            'plantas' => $plantas,
            'dormitorios' => 3,
            'banos' => 2,
            'espacios' => 'integrados',
            'cochera' => 1,
            'extras' => ['galeria'],
            'terminacion' => 'media',
        ]);

        return $familia;
    }

    public function test_una_familia_ve_la_etapa_con_sus_tareas_y_su_costo(): void
    {
        $this->actingAs($this->familiaConProyecto())
            ->get(route('familia.proyecto.etapa', 3))
            ->assertOk()
            ->assertInertia(fn (Assert $pagina) => $pagina
                ->component('Familia/Proyecto/Etapa')
                ->where('etapa.nombre', 'Techo y losa')
                ->has('etapa.esperas', 2)
                ->has('tareas', 2)
                ->where('tareas.0.nombre', 'Columnas, vigas y losa')
                ->where('costo', 55373983)
                ->where('semanas', 10.4)
                ->where('porcentaje', 25)
                ->where('precioActualizado', 'noviembre 2026')
                ->has('recorrido', 5)
            );
    }

    public function test_con_dos_plantas_el_porcentaje_sale_del_calculo(): void
    {
        // En la tabla Cimientos es el 10 %, pero con dos plantas cuesta la mitad y pasa a ser el 5 %
        $this->actingAs($this->familiaConProyecto(2))
            ->get(route('familia.proyecto.etapa', 1))
            ->assertOk()
            ->assertInertia(fn (Assert $pagina) => $pagina
                ->where('costo', 11074797)
                ->where('porcentaje', 5)
            );
    }

    public function test_una_etapa_que_no_existe_da_404(): void
    {
        $this->actingAs($this->familiaConProyecto())
            ->get(route('familia.proyecto.etapa', 9))
            ->assertNotFound();
    }

    public function test_sin_proyecto_guardado_manda_al_inicio(): void
    {
        $familia = User::factory()->create(['rol' => Rol::UsuarioFinal]);

        $this->actingAs($familia)
            ->get(route('familia.proyecto.etapa', 1))
            ->assertRedirect(route('familia.inicio'));
    }

    public function test_un_profesional_no_entra_al_detalle_de_etapa(): void
    {
        $profesional = User::factory()->create(['rol' => Rol::Profesional]);

        $this->actingAs($profesional)
            ->get(route('familia.proyecto.etapa', 1))
            ->assertRedirect(route($profesional->rutaInicio()));
    }

    public function test_sin_sesion_el_detalle_manda_al_ingreso(): void
    {
        $this->get(route('familia.proyecto.etapa', 1))
            ->assertRedirect(route('auth.login.form'));
    }
}
