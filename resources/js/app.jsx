import { createInertiaApp } from '@inertiajs/react';

// Dejo que el plugin de Inertia busque las páginas en resources/js/Pages y arme el arranque solo.
createInertiaApp({
    // Agrego el nombre de la app una sola vez para no repetirlo en cada pantalla.
    title: (titulo) => (titulo ? `${titulo} · oika` : 'oika'),
});