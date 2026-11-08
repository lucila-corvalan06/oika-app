<?php

use App\Http\Controllers\RegistroController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Uso Inertia::render para que la raíz dibuje la pantalla de React y no la vista vieja de Blade
Route::get('/', function () {
    return Inertia::render('Bienvenida');
})->name('inicio');

// Dejo la URL en español y el nombre con punto, como se lee el flujo: registro, rol, formulario.
Route::get('/registrarse', [RegistroController::class, 'formularioRol'])->name('registro.rol.form');
// Uso la misma URL con POST porque es la que recibe lo que se eligió en ese formulario.
Route::post('/registrarse', [RegistroController::class, 'guardarRol'])->name('registro.rol.guardar');
// Sumo /datos a la URL del registro porque es el segundo paso del mismo flujo.
Route::get('/registrarse/datos', [RegistroController::class, 'formularioDatos'])->name('registro.datos.form');
// Repito la URL de datos con POST, igual que en el primer paso.
Route::post('/registrarse/datos', [RegistroController::class, 'guardarDatos'])->name('registro.datos.guardar');
