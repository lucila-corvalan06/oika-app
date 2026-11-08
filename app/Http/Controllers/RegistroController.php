<?php

namespace App\Http\Controllers;

use App\Enums\Rol;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
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
        return Inertia::render('Registro/Rol', [
            'roles' => $this->rolesPermitidos(),
        ]);
    }

    /**
     * Valida el rol elegido, lo guarda en la sesión y sigue con los datos de la cuenta.
     */
    public function guardarRol(Request $request): RedirectResponse
    {
        $datos = $request->validate([
            'rol' => ['required', Rule::in($this->rolesPermitidos())],
        ]);

        // Todavía no creo la cuenta, guardo el rol en la sesión hasta que lleguen los datos.
        $request->session()->put('registro.rol', $datos['rol']);

        return redirect()->route('registro.datos.form');
    }

    /**
     * Muestra la pantalla de datos de la cuenta, siempre que ya haya un rol elegido.
     */
    public function formularioDatos(Request $request): Response|RedirectResponse
    {
        // Si entra directo a esta URL sin elegir rol, lo mando al paso 1 porque sin eso no sé qué cuenta crear.
        if (! $request->session()->has('registro.rol')) {
            return redirect()->route('registro.rol.form');
        }

        return Inertia::render('Registro/Datos');
    }

    /**
     * Devuelve los roles que se pueden elegir al registrarse.
     *
     * @return array<int, string>
     */
    private function rolesPermitidos(): array
    {
        // Dejo afuera al admin porque su cuenta se crea con un seeder y no desde el registro.
        return [Rol::UsuarioFinal->value, Rol::Profesional->value];
    }
}
