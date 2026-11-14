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
            'volverAlResumen' => $this->vieneDelResumen($request),
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

        return $this->proximoPaso($request, 'familia.proyecto.dormitorios.form');
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
            'volverAlResumen' => $this->vieneDelResumen($request),
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

        return $this->proximoPaso($request, 'familia.proyecto.espacios.form');
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
            'volverAlResumen' => $this->vieneDelResumen($request),
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

        return $this->proximoPaso($request, 'familia.proyecto.cochera.form');
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
            'volverAlResumen' => $this->vieneDelResumen($request),
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

        return $this->proximoPaso($request, 'familia.proyecto.terminacion.form');
    }

    /**
     * Muestra la pantalla donde la familia elige el nivel de terminación de su casa.
     */
    public function formularioTerminacion(Request $request): Response|RedirectResponse
    {
        // Sin la cochera en la sesión se saltó el paso anterior, así que la mando de vuelta a ese paso.
        if (! $request->session()->has('proyecto.cochera')) {
            return redirect()->route('familia.proyecto.cochera.form');
        }

        return Inertia::render('Familia/Proyecto/Terminacion', [
            'terminacion' => $request->session()->get('proyecto.terminacion'),
            'volverAlResumen' => $this->vieneDelResumen($request),
        ]);
    }

    /**
     * Valida el nivel de terminación elegido, lo guarda en la sesión y sigue con el resumen.
     */
    public function guardarTerminacion(Request $request): RedirectResponse
    {
        if (! $request->session()->has('proyecto.cochera')) {
            return redirect()->route('familia.proyecto.cochera.form');
        }

        $datos = $request->validate([
            'terminacion' => ['required', Rule::in(['economica', 'media', 'superior'])],
        ]);

        $request->session()->put('proyecto.terminacion', $datos['terminacion']);

        return $this->proximoPaso($request, 'familia.proyecto.resumen');
    }

    /**
     * Muestra el resumen con todas las respuestas de la familia y un enlace para editar cada una.
     */
    public function resumen(Request $request): Response|RedirectResponse
    {
        // Si falta alguna respuesta mando a la familia al primer paso que quedó sin contestar.
        $pasos = [
            'proyecto.plantas' => 'familia.proyecto.plantas.form',
            'proyecto.dormitorios' => 'familia.proyecto.dormitorios.form',
            'proyecto.espacios' => 'familia.proyecto.espacios.form',
            'proyecto.cochera' => 'familia.proyecto.cochera.form',
            'proyecto.terminacion' => 'familia.proyecto.terminacion.form',
        ];

        foreach ($pasos as $clave => $ruta) {
            if (! $request->session()->has($clave)) {
                return redirect()->route($ruta);
            }
        }

        $proyecto = $request->session()->get('proyecto');

        // Armo acá los textos para que la pantalla solo tenga que dibujarlos.
        $plantas = [1 => 'Una planta', 2 => 'Dos plantas'][$proyecto['plantas']];

        $dormitorios = $proyecto['dormitorios'] === 1 ? '1 dormitorio' : $proyecto['dormitorios'].' dormitorios';
        $banos = $proyecto['banos'] === 1 ? '1 baño' : $proyecto['banos'].' baños';

        $espacios = ['integrados' => 'Integrados', 'separados' => 'Separados'][$proyecto['espacios']];

        $autos = [0 => 'Sin cochera', 1 => '1 auto', 2 => '2 autos'][$proyecto['cochera']];
        $nombresExtras = ['galeria' => 'Galería', 'quincho' => 'Quincho', 'lavadero' => 'Lavadero'];
        $extras = array_map(fn ($extra) => $nombresExtras[$extra], $proyecto['extras']);

        if ($extras === []) {
            $detalleExtras = 'Sin espacios extra';
        } else {
            // Uno los extras con comas y pongo la y antes del último para que se lea natural.
            $ultimo = array_pop($extras);
            $detalleExtras = 'Extras: '.($extras === [] ? $ultimo : implode(', ', $extras).' y '.$ultimo);
        }

        $terminacion = ['economica' => 'Económica', 'media' => 'Media', 'superior' => 'Superior'][$proyecto['terminacion']];

        // Paso false como tercer parámetro para que el enlace salga relativo y no con el dominio.
        return Inertia::render('Familia/Proyecto/Resumen', [
            'filas' => [
                [
                    'titulo' => 'Plantas',
                    'valor' => $plantas,
                    'editar' => route('familia.proyecto.plantas.form', ['volver' => 'resumen'], false),
                ],
                [
                    'titulo' => 'Dormitorios y baños',
                    'valor' => $dormitorios.' y '.$banos,
                    'editar' => route('familia.proyecto.dormitorios.form', ['volver' => 'resumen'], false),
                ],
                [
                    'titulo' => 'Cocina, comedor y living',
                    'valor' => $espacios,
                    'editar' => route('familia.proyecto.espacios.form', ['volver' => 'resumen'], false),
                ],
                [
                    'titulo' => 'Cochera y extras',
                    'valor' => $autos,
                    'detalle' => $detalleExtras,
                    'editar' => route('familia.proyecto.cochera.form', ['volver' => 'resumen'], false),
                ],
                [
                    'titulo' => 'Nivel de terminación',
                    'valor' => $terminacion,
                    'editar' => route('familia.proyecto.terminacion.form', ['volver' => 'resumen'], false),
                ],
            ],
        ]);
    }

    /**
     * Indica si la familia llegó a esta pantalla desde el resumen para editar una respuesta.
     */
    private function vieneDelResumen(Request $request): bool
    {
        return $request->query('volver') === 'resumen';
    }

    /**
     * Sigue con el próximo paso del wizard, o vuelve al resumen si la familia estaba editando.
     */
    private function proximoPaso(Request $request, string $ruta): RedirectResponse
    {
        if ($this->vieneDelResumen($request)) {
            return redirect()->route('familia.proyecto.resumen');
        }

        return redirect()->route($ruta);
    }
}
