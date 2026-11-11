<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Maneja el wizard donde la familia arma su proyecto, paso por paso.
 */
class ProyectoController extends Controller
{
    /**
     * Muestra la pantalla donde la familia elige cuántas plantas tendrá su casa.
     */
    public function formularioPlantas(Request $request): Response
    {
        // Mando lo que ya eligió para que al volver o editar la opción siga marcada.
        return Inertia::render('Familia/Proyecto/Plantas', [
            'plantas' => $request->session()->get('proyecto.plantas'),
        ]);
    }

    /**
     * Valida las plantas elegidas, las guarda en la sesión y sigue con el próximo paso.
     */
    public function guardarPlantas(Request $request): RedirectResponse
    {
        $datos = $request->validate([
            'plantas' => ['required', Rule::in([1, 2])],
        ]);

        // Todavía no creo el proyecto, guardo la respuesta en la sesión hasta que confirme el resumen.
        $request->session()->put('proyecto.plantas', (int) $datos['plantas']);

        // Vuelvo al inicio hasta que exista el paso 2.
        return redirect()->route('familia.inicio');
    }
}
