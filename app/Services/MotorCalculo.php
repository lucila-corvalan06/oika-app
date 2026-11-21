<?php

namespace App\Services;

use App\Models\Componente;
use App\Models\Etapa;
use App\Models\Parametro;
use App\Models\Proyecto;
use Illuminate\Support\Collection;

/**
 * Calcula la superficie del hogar y el costo y el tiempo de cada etapa de obra.
 */
class MotorCalculo
{
    public function calcular(Proyecto $proyecto): array
    {
        // Leo cada tabla una sola vez y después busco cada número por su clave.
        $parametros = Parametro::all()->keyBy('clave');
        $componentes = Componente::all()->keyBy('clave');

        $superficie = $this->superficie($proyecto, $componentes, $parametros);

        $costoTotal = $superficie
            * $parametros['costo_m2']->valor
            * $parametros['factor_'.$proyecto->terminacion]->valor;

        // El tiempo crece con los m².
        $factorTiempo = $parametros['factor_tiempo']->valor * $superficie / $parametros['m2_base_tiempo']->valor;

        $etapas = [];

        foreach (Etapa::orderBy('orden')->get() as $etapa) {
            $factorPlantas = $this->factorPlantas($proyecto, $etapa, $parametros);

            // Redondeo recién acá, al final de cada cuenta, para no arrastrar errores.
            $etapas[] = [
                'orden' => $etapa->orden,
                'nombre' => $etapa->nombre,
                'costo' => (int) round($costoTotal * $etapa->porcentaje_costo / 100 * $factorPlantas),
                'semanas' => round($etapa->semanas_trabajo * $factorTiempo * $factorPlantas, 1),
            ];
        }

        return [
            'superficie' => round($superficie, 1),
            'etapas' => $etapas,
            // Sumo las etapas ya redondeadas para que el total coincida con lo que se ve en cada una.
            'costo_total' => array_sum(array_column($etapas, 'costo')),
            'semanas_total' => round(array_sum(array_column($etapas, 'semanas')), 1),
            'precio_actualizado' => $parametros['costo_m2']->fecha,
        ];
    }

    private function superficie(Proyecto $proyecto, Collection $componentes, Collection $parametros): float
    {
        $interiores = $proyecto->dormitorios * $componentes['dormitorio']->m2
            + $proyecto->banos * $componentes['bano']->m2;

        // Separados no tiene fila propia, es la cocina con comedor más el living.
        if ($proyecto->espacios === 'integrados') {
            $interiores += $componentes['integrados']->m2;
        } else {
            $interiores += $componentes['cocina_comedor']->m2 + $componentes['living']->m2;
        }

        $semicubiertos = 0;

        foreach ($proyecto->extras as $extra) {
            $componente = $componentes[$extra];

            if ($componente->semicubierto) {
                $semicubiertos += $componente->m2 * $parametros['semicubierto_porcentaje']->valor / 100;
            } else {
                $interiores += $componente->m2;
            }
        }

        // La circulación va solo sobre los interiores, a la cochera y a la galería no se llega por pasillos.
        $superficie = $interiores * (1 + $parametros['circulacion_porcentaje']->valor / 100);

        // La cochera cuenta entera porque es cubierta, y con 0 autos no suma nada.
        $cocheras = [1 => 'cochera_1_auto', 2 => 'cochera_2_autos'];

        if (isset($cocheras[$proyecto->cochera])) {
            $superficie += $componentes[$cocheras[$proyecto->cochera]]->m2;
        }

        return $superficie + $semicubiertos;
    }

    private function factorPlantas(Proyecto $proyecto, Etapa $etapa, Collection $parametros): float
    {
        if ($proyecto->plantas === 1) {
            return 1;
        }

        // Con dos plantas los cimientos ocupan la mitad del terreno, y el resto de la obra se hace en altura.
        if ($etapa->orden === 1) {
            return $parametros['factor_dos_plantas_cimientos']->valor;
        }

        return $parametros['factor_dos_plantas_resto']->valor;
    }
}
