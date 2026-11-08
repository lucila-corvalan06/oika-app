<?php

namespace App\Http\Controllers;

use App\Enums\Rol;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Maneja el registro de cuentas en dos pasos, primero el rol y después los datos.
 */
class RegistroController extends Controller
{
    /**
     * Muestra la pantalla donde la persona elige cómo va a usar Oika.
     */
    public function formularioRol(): Response
    {
        // Ofrezco solo estos dos roles porque el admin se crea con un seeder y no desde el registro.
        return Inertia::render('Registro/Rol', [
            'roles' => [Rol::UsuarioFinal->value, Rol::Profesional->value],
        ]);
    }
}
