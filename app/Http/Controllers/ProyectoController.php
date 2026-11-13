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

        return redirect()->route('familia.proyecto.dormitorios.form');
    }

    /**
     * Muestra la pantalla donde la familia elige cuántos dormitorios y baños tendrá su casa.
     */
    public function formularioDormitorios(Request $request): Response|RedirectResponse
    {
        // Si todavía no eligió las plantas la mando al paso 1 para que no se salte el orden del wizard.
        if (! $request->session()->has('proyecto.plantas')) {
            return redirect()->route('familia.proyecto.plantas.form');
        }

        // Dejo los valores iniciales acá para que el servidor sea quien decide con qué arranca cada contador.
        return Inertia::render('Familia/Proyecto/Dormitorios', [
            'dormitorios' => $request->session()->get('proyecto.dormitorios', 2),
            'banos' => $request->session()->get('proyecto.banos', 1),
        ]);
    }

    /**
     * Valida los dormitorios y baños elegidos, los guarda en la sesión y sigue con el próximo paso.
     */
    public function guardarDormitorios(Request $request): RedirectResponse
    {
        if (! $request->session()->has('proyecto.plantas')) {
            return redirect()->route('familia.proyecto.plantas.form');
        }

        $datos = $request->validate([
            'dormitorios' => ['required', 'integer', 'between:1,5'],
            'banos' => ['required', 'integer', 'between:1,5'],
        ]);

        $request->session()->put('proyecto.dormitorios', (int) $datos['dormitorios']);
        $request->session()->put('proyecto.banos', (int) $datos['banos']);

        return redirect()->route('familia.proyecto.espacios.form');
    }

    /**
     * Muestra la pantalla donde la familia elige si cocina, comedor y living van integrados o separados.
     */
    public function formularioEspacios(Request $request): Response|RedirectResponse
    {
        // Sin dormitorios en la sesión se saltó el paso anterior, así que la mando de vuelta a ese paso.
        if (! $request->session()->has('proyecto.dormitorios')) {
            return redirect()->route('familia.proyecto.dormitorios.form');
        }

        return Inertia::render('Familia/Proyecto/Espacios', [
            'espacios' => $request->session()->get('proyecto.espacios'),
        ]);
    }

    /**
     * Valida cómo quiere los espacios sociales, lo guarda en la sesión y sigue con el próximo paso.
     */
    public function guardarEspacios(Request $request): RedirectResponse
    {
        if (! $request->session()->has('proyecto.dormitorios')) {
            return redirect()->route('familia.proyecto.dormitorios.form');
        }

        $datos = $request->validate([
            'espacios' => ['required', Rule::in(['integrados', 'separados'])],
        ]);

        $request->session()->put('proyecto.espacios', $datos['espacios']);

        return redirect()->route('familia.proyecto.cochera.form');
    }

    /**
     * Muestra la pantalla donde la familia elige la cochera y los espacios extra.
     */
    public function formularioCochera(Request $request): Response|RedirectResponse
    {
        // Sin los espacios elegidos se saltó el paso anterior, así que la mando de vuelta a ese paso.
        if (! $request->session()->has('proyecto.espacios')) {
            return redirect()->route('familia.proyecto.espacios.form');
        }

        // Acá ninguno es una respuesta válida, por eso arranca en cero autos y sin extras.
        return Inertia::render('Familia/Proyecto/Cochera', [
            'cochera' => $request->session()->get('proyecto.cochera', 0),
            'extras' => $request->session()->get('proyecto.extras', []),
        ]);
    }

    /**
     * Valida la cochera y los extras elegidos, los guarda en la sesión y sigue con el próximo paso.
     */
    public function guardarCochera(Request $request): RedirectResponse
    {
        if (! $request->session()->has('proyecto.espacios')) {
            return redirect()->route('familia.proyecto.espacios.form');
        }

        $datos = $request->validate([
            'cochera' => ['required', 'integer', 'between:0,2'],
            'extras' => ['array'],
            'extras.*' => [Rule::in(['galeria', 'quincho', 'lavadero'])],
        ]);

        $request->session()->put('proyecto.cochera', (int) $datos['cochera']);
        // Si no tildó ninguno puede no llegar la lista, así que guardo una vacía en ese caso.
        $request->session()->put('proyecto.extras', $datos['extras'] ?? []);

        // Vuelvo al inicio hasta que exista el paso 5.
        return redirect()->route('familia.inicio');
    }
}
