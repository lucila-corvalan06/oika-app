import { router } from '@inertiajs/react';

// Dejo esta pantalla sin estilo hasta la Fase 2, ahora solo sirve para probar la sesión y la salida
export default function Inicio({ nombre }) {
    function salir() {
        router.post('/salir');
    }

    return (
        <main>
            <h1>Hola, {nombre}</h1>
            <button type="button" onClick={salir}>
                Salir
            </button>
        </main>
    );
}