<?php

namespace App\Http\Controllers;

use App\Enums\Estado;
use App\Enums\Rol;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        if (! $this->rolElegido($request)) {
            return redirect()->route('registro.rol.form');
        }

        return Inertia::render('Registro/Datos');
    }

    /**
     * Valida los datos, crea la cuenta con el rol elegido y deja a la persona con la sesión iniciada.
     */
    public function guardarDatos(Request $request): RedirectResponse
    {
        // Repito la guardia porque alguien puede mandar este POST sin haber pasado por el paso 1.
        $rol = $this->rolElegido($request);

        if (! $rol) {
            return redirect()->route('registro.rol.form');
        }

        $datos = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'terminos' => ['accepted'],
        ]);

        // Armo el usuario campo por campo porque rol y estado no están en fillable y los pongo yo.
        $usuario = new User([
            'name' => $datos['name'],
            'email' => $datos['email'],
            'password' => $datos['password'],
        ]);
        $usuario->rol = $rol;
        $usuario->estado = $rol === Rol::UsuarioFinal ? Estado::Activa : Estado::SinDocumentacion;
        $usuario->save();

        Auth::login($usuario);
        // Cambio el identificador de la sesión al iniciar para que no se pueda reutilizar uno anterior.
        $request->session()->regenerate();
        $request->session()->forget('registro.rol');

        // Mando al inicio por ahora, más adelante el portero lo manda a la pantalla que le toca.
        return redirect()->route('inicio');
    }

    /**
     * Devuelve el rol guardado en la sesión, o null si todavía no eligió ninguno.
     */
    private function rolElegido(Request $request): ?Rol
    {
        return Rol::tryFrom($request->session()->get('registro.rol', ''));
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
