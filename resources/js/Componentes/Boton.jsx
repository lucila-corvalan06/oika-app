import { Link } from '@inertiajs/react';

const variantes = {
    principal: 'bg-terracota text-white hover:bg-terracota-oscuro active:bg-terracota-presionado',
    secundaria: 'border-2 border-cafe bg-transparent text-cafe hover:bg-arena/50 active:bg-arena',
};

// Estas clases las comparten las dos variantes para que los botones queden iguales
const base =
    'inline-flex min-h-12 w-full items-center justify-center rounded-xl px-6 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota disabled:pointer-events-none disabled:opacity-50';

export default function Boton({
    variante = 'principal',
    href,
    type = 'button',
    disabled = false,
    className = '',
    children,
    ...resto
}) {
    const clases = `${base} ${variantes[variante]} ${className}`;

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