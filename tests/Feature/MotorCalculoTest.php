<?php

namespace Tests\Feature;

use App\Models\Proyecto;
use App\Services\MotorCalculo;
use Database\Seeders\ComponenteSeeder;
use Database\Seeders\EtapaSeeder;
use Database\Seeders\ParametroSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Comprueba las cuentas del motor con hogares de ejemplo.
 */
class MotorCalculoTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // El motor necesita sus tres tablas cargadas para hacer las cuentas
        $this->seed([EtapaSeeder::class, ComponenteSeeder::class, ParametroSeeder::class]);
    }

    public function test_la_circulacion_va_solo_sobre_los_interiores(): void
    {
        $resultado = (new MotorCalculo)->calcular(new Proyecto([
            'plantas' => 1,
            'dormitorios' => 3,
            'banos' => 2,
            'espacios' => 'separados',
            'cochera' => 1,
            'extras' => ['galeria', 'quincho', 'lavadero'],
            'terminacion' => 'media',
        ]));

        // Si la circulación también se sumara a la cochera y a los semicubiertos daría 105,0
        $this->assertEqualsWithDelta(103.0, $resultado['superficie'], 0.01);
    }

    public function test_calcula_costo_y_tiempo_de_un_hogar_de_una_planta(): void
    {
        $resultado = (new MotorCalculo)->calcular($this->hogarChico(1));

        $this->assertEqualsWithDelta(44.4, $resultado['superficie'], 0.01);
        $this->assertSame(112543981, $resultado['costo_total']);
        $this->assertEqualsWithDelta(23.5, $resultado['semanas_total'], 0.01);
        $this->assertSame(28135995, $this->etapa($resultado, 'Techo y losa')['costo']);
    }

    public function test_con_dos_plantas_cambian_costo_y_tiempo(): void
    {
        $resultado = (new MotorCalculo)->calcular($this->hogarChico(2));

        // Los cimientos cuestan la mitad que en una planta
        $this->assertSame(5627199, $this->etapa($resultado, 'Cimientos y contrapiso')['costo']);
        $this->assertSame(122110220, $resultado['costo_total']);
        $this->assertEqualsWithDelta(24.4, $resultado['semanas_total'], 0.01);
    }

    /**
     * Arma el hogar de ejemplo de 44,4 m² con la cantidad de plantas que le pido.
     */
    private function hogarChico(int $plantas): Proyecto
    {
        return new Proyecto([
            'plantas' => $plantas,
            'dormitorios' => 2,
            'banos' => 1,
            'espacios' => 'integrados',
            'cochera' => 0,
            'extras' => [],
            'terminacion' => 'media',
        ]);
    }

    /**
     * Busca una etapa del resultado por su nombre.
     */
    private function etapa(array $resultado, string $nombre): array
    {
        return collect($resultado['etapas'])->firstWhere('nombre', $nombre);
    }
}
