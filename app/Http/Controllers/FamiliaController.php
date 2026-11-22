<?php

namespace App\Http\Controllers;

use App\Services\MotorCalculo;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Pantallas de la familia que usa Oika para construir su casa.
 */
class FamiliaController extends Controller
{
    /**
     * Muestra el inicio de la familia con su primer nombre, su próximo paso y el resumen de su proyecto.
     */
    public function inicio(Request $request, MotorCalculo $motor): Response
    {
        $proyecto = $request->user()->proyecto;

        // Sin proyecto guardado no hay nada que calcular, así que la pantalla recibe null y muestra cómo empezar
        $calculo = null;
        $proximaEtapa = null;

        if ($proyecto !== null) {
            $calculo = $motor->calcular($proyecto);
            $calculo['precio_actualizado'] = $calculo['precio_actualizado']?->locale('es')->translatedFormat('F Y');

            // Por ahora la obra arranca siempre por la primera etapa. Cuando haya ahorro, acá va la primera que no esté cubierta
            $proximaEtapa = $calculo['etapas'][0];
        }

        // Mando solo el primer nombre y lo normalizo para que el saludo se vea igual aunque lo hayan escrito en minúsculas o en mayúsculas
        return Inertia::render('Familia/Inicio', [
            'nombre' => Str::ucfirst(Str::lower(Str::before($request->user()->name, ' '))),
            'tieneProyecto' => $proyecto !== null,
            'calculo' => $calculo,
            'proximaEtapa' => $proximaEtapa,
        ]);
    }

    /**
     * Muestra el perfil de la familia con su nombre y su correo.
     */
    public function perfil(Request $request): Response
    {
        // Mando el nombre completo porque acá sí se muestra entero, y no mando nada más de la cuenta
        return Inertia::render('Familia/Perfil', [
            'nombre' => $request->user()->name,
            'email' => $request->user()->email,
        ]);
    }
}
