import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import inertia from '@inertiajs/vite';

export default defineConfig({
    plugins: [
        laravel({
            // Cambio app.js por app.jsx porque escribo el frontend con React
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
            // Uso Outfit en tres pesos, respetando mi manual de marca.
            fonts: [
                bunny('Outfit', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        react(),
        inertia(),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});