<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Portero de Oika: deja pasar solo a las cuentas del rol que corresponde a cada pantalla.
 */
class CuentaLugar
{
    /**
     * Recibe los roles que pueden ver la pantalla, por ejemplo cuenta.lugar:usuario_final.
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $usuario = $request->user();

        // No cuento con que auth haya corrido antes, sin sesión mando al ingreso
        if ($usuario === null) {
            return redirect()->route('auth.login.form');
        }

        // Mando a cada cuenta a su lugar, que nunca es una pantalla donde este portero la vuelva a frenar
        if (! in_array($usuario->rol->value, $roles, true)) {
            return redirect()->route($usuario->rutaInicio());
        }

        return $next($request);
    }
}
