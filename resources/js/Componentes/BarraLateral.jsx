import { Link } from '@inertiajs/react';
import Imagotipo from './Imagotipo';
import { secciones } from './secciones';

const clasesItem =
    'flex min-h-12 w-full items-center gap-3 rounded-xl px-4 py-2 text-base font-medium text-cafe focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota disabled:opacity-50';

function Item({ seccion, activa }) {
    const Icono = seccion.Icono;

    const contenido = (
        <>
            {/* Relleno solo en la sección activa, igual que en la barra inferior, para que las dos se lean parecido */}
            <Icono
                size={24}
                weight={activa ? 'fill' : 'bold'}
                aria-hidden="true"
                className={activa ? 'text-terracota' : 'text-mocha'}
            />
            <span className={activa ? 'font-semibold' : undefined}>{seccion.nombre}</span>
        </>
    );

    if (seccion.href) {
        return (
            <Link
                href={seccion.href}
                aria-current={activa ? 'page' : undefined}
                className={`${clasesItem} ${activa ? 'bg-terracota/10' : 'hover:bg-mocha/10'}`}
            >
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

export default function BarraLateral({ activa }) {
    return (
        <nav
            aria-label="Navegación principal"
            className="sticky top-0 flex h-dvh w-64 shrink-0 flex-col border-r border-mocha/20 bg-crema px-3 py-6"
        >
            <div className="mb-10 px-4">
                {/* Hago que el logo lleve al inicio porque es lo que se espera al tocarlo */}
                <Link
                    href="/familia/inicio"
                    aria-label="oika, ir al inicio"
                    className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracota"
                >
                    <Imagotipo />
                </Link>
            </div>

            <ul className="flex flex-1 flex-col gap-1">
                {secciones.map((seccion) => (
                    // Mando Perfil al pie con mt-auto porque es mi cuenta y no un lugar de la app
                    <li key={seccion.clave} className={seccion.clave === 'perfil' ? 'mt-auto' : undefined}>
                        <Item seccion={seccion} activa={seccion.clave === activa} />
                    </li>
                ))}
            </ul>
        </nav>
    );
}