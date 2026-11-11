import { Link } from '@inertiajs/react';
import { HouseIcon, WallIcon, PiggyBankIcon, StorefrontIcon, UserIcon } from '@phosphor-icons/react';

// Dejo las secciones en una lista para sumar una con una sola línea
const secciones = [
    { clave: 'inicio', nombre: 'Inicio', Icono: HouseIcon, href: '/familia/inicio' },
    { clave: 'proyecto', nombre: 'Mi proyecto', Icono: WallIcon },
    { clave: 'ahorro', nombre: 'Ahorro', Icono: PiggyBankIcon },
    { clave: 'marketplace', nombre: 'Marketplace', Icono: StorefrontIcon },
    { clave: 'perfil', nombre: 'Perfil', Icono: UserIcon, href: '/familia/perfil' },
];

const clasesItem =
    'flex min-h-12 w-full flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs font-medium text-cafe focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota disabled:opacity-50';

function Item({ seccion, activa }) {
    const Icono = seccion.Icono;

    const contenido = (
        <>
            <Icono
                size={24}
                weight={activa ? 'fill' : 'bold'}
                aria-hidden="true"
                className={activa ? 'text-terracota' : 'text-mocha'}
            />
            {seccion.nombre}
        </>
    );

    if (seccion.href) {
        return (
            <Link href={seccion.href} aria-current={activa ? 'page' : undefined} className={clasesItem}>
                {contenido}
            </Link>
        );
    }

    return (
        <button type="button" disabled className={clasesItem}>
            {contenido}
        </button>
    );
}

export default function NavegacionInferior({ activa }) {
    return (
        <nav aria-label="Navegación principal" className="border-t border-mocha/20 bg-crema">
            <ul className="mx-auto flex max-w-md">
                {secciones.map((seccion) => (
                    <li key={seccion.clave} className="flex-1">
                        <Item seccion={seccion} activa={seccion.clave === activa} />
                    </li>
                ))}
            </ul>
        </nav>
    );
}