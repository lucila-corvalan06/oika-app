import { Link } from '@inertiajs/react';
import { secciones } from './secciones';

// nowrap para que el semibold de la sección activa no parta el texto y cambie el alto de la barra
const clasesItem =
    'flex min-h-12 w-full flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs font-medium whitespace-nowrap text-cafe focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota disabled:opacity-50 md:text-sm';

function Item({ seccion, activa }) {
    const Icono = seccion.Icono;

    const contenido = (
        <>
            {/* Relleno solo en la sección activa, como pide el manual, así marca dónde estoy sin cargar el resto */}
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