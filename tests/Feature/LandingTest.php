<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

/**
 * Comprueba qué dibuja la raíz y qué dibuja la Bienvenida ahora que viven en direcciones separadas.
 */
class LandingTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_la_raiz_dibuja_la_landing(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $pagina) => $pagina
                ->component('Landing')
            );
    }

    public function test_la_bienvenida_vive_en_su_propia_direccion(): void
    {
        // Pido la URL escrita a mano para que el test falle si alguien la cambia sin querer
        $this->get('/bienvenida')
            ->assertOk()
            ->assertInertia(fn (Assert $pagina) => $pagina
                ->component('Bienvenida')
            );
    }

    public function test_el_nombre_bienvenida_apunta_a_su_direccion(): void
    {
        // Compruebo el nombre aparte porque los botones del registro llegan por la URL y el código por el nombre
        $this->get(route('bienvenida'))
            ->assertOk()
            ->assertInertia(fn (Assert $pagina) => $pagina
                ->component('Bienvenida')
            );
    }
}
