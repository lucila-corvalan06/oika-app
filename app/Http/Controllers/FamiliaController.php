<?php

namespace App\Http\Controllers;

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
     * Muestra el inicio de la familia con su primer nombre.
     */
    public function inicio(Request $request): Response
    {
        // Mando solo el primer nombre y lo normalizo para que el saludo se vea igual aunque lo hayan escrito en minúsculas o en mayúsculas
        return Inertia::render('Familia/Inicio', [
            'nombre' => Str::ucfirst(Str::lower(Str::before($request->user()->name, ' '))),
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
