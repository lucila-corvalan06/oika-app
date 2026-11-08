<?php

use App\Http\Middleware\CuentaLugar;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Registro el middleware de Inertia en el grupo web
        // para que cada página que armo lo atraviese y pueda cambiar sin recargar la app.
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);

        // Mando a la pantalla de ingreso a quien entra sin sesión a una ruta protegida
        $middleware->redirectGuestsTo(fn () => route('auth.login.form'));

        // Le pongo un nombre corto al portero para escribirlo en las rutas sin la clase completa
        $middleware->alias([
            'cuenta.lugar' => CuentaLugar::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );
    })->create();
