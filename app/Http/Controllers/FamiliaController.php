<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Pantallas de la familia que usa Oika para construir su casa.
 */
class FamiliaController extends Controller
{
    /**
     * Muestra el inicio de la familia con su nombre.
     */
    public function inicio(Request $request): Response
    {
        // Mando solo el nombre porque es lo único que la pantalla necesita mostrar
        return Inertia::render('Familia/Inicio', [
            'nombre' => $request->user()->name,
        ]);
    }
}
