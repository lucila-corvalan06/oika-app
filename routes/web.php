<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Uso Inertia::render para que la raíz dibuje la pantalla de React y no la vista vieja de Blade
Route::get('/', function () {
    return Inertia::render('Bienvenida');
})->name('inicio');
