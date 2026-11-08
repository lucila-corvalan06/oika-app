<?php

use App\Http\Controllers\RegistroController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Uso Inertia::render para que la raíz dibuje la pantalla de React y no la vista vieja de Blade.
Route::get('/', function () {
    return Inertia::render('Bienvenida');
})->name('inicio');

// Dejo la URL en español y el nombre con punto, como se lee el flujo registro, rol, formulario.
Route::get('/registrarse', [RegistroController::class, 'formularioRol'])->name('registro.rol.form');
