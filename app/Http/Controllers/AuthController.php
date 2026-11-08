<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Maneja el ingreso y la salida de las cuentas.
 */
class AuthController extends Controller
{
    /**
     * Muestra la pantalla de inicio de sesión.
     */
    public function formularioLogin(): Response
    {
        return Inertia::render('Auth/Ingresar');
    }

    /**
     * Valida las credenciales y, si son correctas, inicia la sesión.
     */
    public function ingresar(Request $request): RedirectResponse
    {
        $credenciales = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (! Auth::attempt($credenciales, $request->boolean('recordar'))) {
            // Uso el mismo mensaje si falla el correo o la contraseña para no revelar cuál de los dos existe
            return back()->withErrors([
                'email' => 'El correo o la contraseña no son correctos. Revisalos y probá de nuevo.',
            ]);
        }

        $request->session()->regenerate();

        // Mando al inicio por ahora, más adelante el portero decide a qué pantalla va cada cuenta
        return redirect()->intended(route('inicio'));
    }

    /**
     * Cierra la sesión y vuelve a la pantalla de ingreso.
     */
    public function salir(Request $request): RedirectResponse
    {
        Auth::logout();

        // Invalido la sesión y renuevo el token para que nada de la sesión anterior se pueda reutilizar
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('auth.login.form');
    }
}
