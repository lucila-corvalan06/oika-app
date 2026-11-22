<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FamiliaController;
use App\Http\Controllers\ProyectoController;
use App\Http\Controllers\RegistroController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Dibujo la Landing en la raíz porque es lo primero que ve quien llega a oika y no hace falta tener cuenta
Route::get('/', function () {
    return Inertia::render('Landing');
})->name('inicio');

// Muevo la Bienvenida a su propia URL para dejar libre la raíz y que los botones de la Landing lleguen acá
Route::get('/bienvenida', function () {
    return Inertia::render('Bienvenida');
})->name('bienvenida');

// Dejo la URL en español y el nombre con punto, como se lee el flujo: registro, rol, formulario.
Route::get('/registrarse', [RegistroController::class, 'formularioRol'])->name('registro.rol.form');
// Uso la misma URL con POST porque es la que recibe lo que se eligió en ese formulario.
Route::post('/registrarse', [RegistroController::class, 'guardarRol'])->name('registro.rol.guardar');
// Sumo /datos a la URL del registro porque es el segundo paso del mismo flujo.
Route::get('/registrarse/datos', [RegistroController::class, 'formularioDatos'])->name('registro.datos.form');
// Repito la URL de datos con POST, igual que en el primer paso.
Route::post('/registrarse/datos', [RegistroController::class, 'guardarDatos'])->name('registro.datos.guardar');

// Uso /ingresar con GET para mostrar el formulario y con POST para recibir las credenciales.
Route::get('/ingresar', [AuthController::class, 'formularioLogin'])->name('auth.login.form');
Route::post('/ingresar', [AuthController::class, 'ingresar'])->name('auth.login.ingresar');
// Dejo la salida solo con POST porque cambia algo en el servidor y no tiene que poder dispararse con un enlace.
Route::post('/salir', [AuthController::class, 'salir'])->name('auth.logout');

// Pongo auth y después el portero para que solo entre una familia con la sesión iniciada.
Route::get('/familia/inicio', [FamiliaController::class, 'inicio'])
    ->middleware(['auth', 'cuenta.lugar:usuario_final'])
    ->name('familia.inicio');

// Repito auth y el portero para que el perfil también lo vea solo una familia con la sesión iniciada.
Route::get('/familia/perfil', [FamiliaController::class, 'perfil'])
    ->middleware(['auth', 'cuenta.lugar:usuario_final'])
    ->name('familia.perfil');

// Agrupo las rutas del wizard porque todas piden sesión iniciada y una cuenta de familia.
Route::middleware(['auth', 'cuenta.lugar:usuario_final'])->group(function () {
    Route::get('/familia/proyecto/plantas', [ProyectoController::class, 'formularioPlantas'])->name('familia.proyecto.plantas.form');
    Route::post('/familia/proyecto/plantas', [ProyectoController::class, 'guardarPlantas'])->name('familia.proyecto.plantas.guardar');
    Route::get('/familia/proyecto/dormitorios', [ProyectoController::class, 'formularioDormitorios'])->name('familia.proyecto.dormitorios.form');
    Route::post('/familia/proyecto/dormitorios', [ProyectoController::class, 'guardarDormitorios'])->name('familia.proyecto.dormitorios.guardar');
    Route::get('/familia/proyecto/espacios', [ProyectoController::class, 'formularioEspacios'])->name('familia.proyecto.espacios.form');
    Route::post('/familia/proyecto/espacios', [ProyectoController::class, 'guardarEspacios'])->name('familia.proyecto.espacios.guardar');
    Route::get('/familia/proyecto/cochera', [ProyectoController::class, 'formularioCochera'])->name('familia.proyecto.cochera.form');
    Route::post('/familia/proyecto/cochera', [ProyectoController::class, 'guardarCochera'])->name('familia.proyecto.cochera.guardar');
    Route::get('/familia/proyecto/terminacion', [ProyectoController::class, 'formularioTerminacion'])->name('familia.proyecto.terminacion.form');
    Route::post('/familia/proyecto/terminacion', [ProyectoController::class, 'guardarTerminacion'])->name('familia.proyecto.terminacion.guardar');
    Route::get('/familia/proyecto/resumen', [ProyectoController::class, 'resumen'])->name('familia.proyecto.resumen');
    // Uso la misma URL del resumen con POST porque es la que recibe la confirmación de la familia.
    Route::post('/familia/proyecto/resumen', [ProyectoController::class, 'guardarResumen'])->name('familia.proyecto.resumen.guardar');
    // Dejo /familia/proyecto sin paso al final porque es el proyecto ya guardado, el que abre la sección Mi proyecto.
    Route::get('/familia/proyecto', [ProyectoController::class, 'miProyecto'])->name('familia.proyecto.ver');
    // Busco la etapa por su orden y no por el id porque es el número que ve la familia; si no existe, Laravel da 404.
    Route::get('/familia/proyecto/etapas/{etapa:orden}', [ProyectoController::class, 'etapa'])->name('familia.proyecto.etapa');
});
