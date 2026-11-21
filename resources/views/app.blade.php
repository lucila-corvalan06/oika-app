<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        {{-- favicon --}}
        <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
        {{-- Cargo el CSS y el JS juntos para que las pantallas ya salgan con estilos --}}
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        <x-inertia::head />
    </head>
    <body>
        <x-inertia::app />
    </body>
</html>