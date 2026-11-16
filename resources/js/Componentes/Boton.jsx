import { Link } from '@inertiajs/react';

// Cada variante lleva su propio color de foco porque sobre un fondo terracota el contorno terracota no se vería
const variantes = {
    principal:
        'bg-terracota text-white hover:bg-terracota-oscuro active:bg-terracota-presionado focus-visible:outline-terracota',
    secundaria: 'border-2 border-cafe bg-transparent text-cafe hover:bg-arena/50 active:bg-arena focus-visible:outline-terracota',
    // La variante clara es para fondos terracota, donde el botón principal se perdería
    claro: 'bg-crema text-cafe hover:bg-arena active:bg-arena focus-visible:outline-crema',
};

// Separo el tamaño del resto de las clases para poder agrandar un botón sin que se pisen dos clases de texto
const tamanos = {
    normal: 'min-h-12 text-base',
    grande: 'min-h-14 text-lg sm:min-h-16 sm:text-xl',
};

// Estas clases las comparten todas las variantes para que los botones queden iguales
const base =
    'inline-flex w-full items-center justify-center rounded-xl px-6 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50';

export default function Boton({
    variante = 'principal',
    tamano = 'normal',
    href,
    type = 'button',
    disabled = false,
    className = '',
    children,
    ...resto
}) {
    const clases = `${base} ${variantes[variante]} ${tamanos[tamano]} ${className}`;

    // Uso un enlace solo si hay href y el botón está habilitado, porque un enlace no se puede deshabilitar
    if (href && !disabled) {
        return (
            <Link href={href} className={clases} {...resto}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} disabled={disabled} className={clases} {...resto}>
            {children}
        </button>
    );
}