import { Link } from '@inertiajs/react';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import Boton from '../Boton';
import Imagotipo from '../Imagotipo';

const enlaces = [
    { texto: 'Cómo funciona', href: '#como-funciona' },
    { texto: 'Planificador', href: '#planificador' },
    { texto: 'Marketplace', href: '#marketplace' },
    { texto: 'Preguntas', href: '#preguntas' },
];

// Comparto las clases entre el menú de escritorio y el del panel para que se vean iguales
const clasesEnlace =
    'inline-flex min-h-12 items-center px-3 font-medium text-cafe transition-colors hover:text-terracota focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota';

export default function Cabecera() {
    const [abierto, setAbierto] = useState(false);

    // Cierro el panel con Esc porque es lo que espera quien navega con teclado
    useEffect(() => {
        if (!abierto) return;

        const alApretar = (evento) => {
            if (evento.key === 'Escape') setAbierto(false);
        };

        document.addEventListener('keydown', alApretar);
        return () => document.removeEventListener('keydown', alApretar);
    }, [abierto]);

    return (
        <>
            {/* Este enlace solo se ve al enfocarlo con el teclado, para saltar directo al contenido */}
            <a
                href="#contenido"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-crema focus:px-4 focus:py-3 focus:text-cafe focus:outline-2 focus:outline-terracota"
            >
                Saltar al contenido
            </a>

            {/* El header es relative para que el panel se pegue justo debajo */}
            <header className="relative">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
                    {/* Le doy 48 px de alto al enlace para que sea fácil de tocar y subo todo un poco para alinear las letras con los enlaces */}
                    <Link
                        href="/"
                        aria-label="Ir al inicio de oika"
                        className="inline-flex min-h-12 -translate-y-1 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota"
                    >
                        <Imagotipo className="block h-8 w-auto" />
                    </Link>

                    <nav aria-label="Principal" className="hidden lg:block">
                        <ul className="flex items-center gap-2">
                            {enlaces.map((enlace) => (
                                <li key={enlace.href}>
                                    <a href={enlace.href} className={clasesEnlace}>
                                        {enlace.texto}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Envuelvo cada botón para que no se estire al ancho completo */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <div className="shrink-0">
                            <Boton href="/bienvenida" variante="secundaria">
                                Soy profesional
                            </Boton>
                        </div>
                        <div className="shrink-0">
                            <Boton href="/bienvenida">Empezá gratis</Boton>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setAbierto(!abierto)}
                        aria-expanded={abierto}
                        aria-controls="menu-movil"
                        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
                        className="inline-flex size-12 items-center justify-center rounded-xl text-mocha focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota lg:hidden"
                    >
                        {abierto ? (
                            <XIcon size={28} weight="bold" aria-hidden="true" />
                        ) : (
                            <ListIcon size={28} weight="bold" aria-hidden="true" />
                        )}
                    </button>
                </div>

                {abierto && (
                    /* En celu ocupa todo el ancho y en tablet es una tarjeta anclada a la derecha, cerca del botón que la abre */
                    <div
                        id="menu-movil"
                        className="absolute inset-x-0 top-full z-40 bg-crema sm:inset-x-auto sm:right-6 sm:mt-1 sm:w-80 sm:border sm:border-arena lg:hidden"
                    >
                        {/* Pongo el tinte de arena sobre un fondo crema sólido para que se vea suave y no se transparente lo que hay debajo */}
                        <div className="bg-arena/50 px-6 pt-2 pb-6">
                            <nav aria-label="Menú móvil">
                                <ul>
                                    {enlaces.map((enlace) => (
                                        <li key={enlace.href}>
                                            {/* Cierro el panel al tocar un enlace para que no tape la sección a la que salto */}
                                            <a
                                                href={enlace.href}
                                                onClick={() => setAbierto(false)}
                                                className={`${clasesEnlace} w-full`}
                                            >
                                                {enlace.texto}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="mt-4 flex flex-col gap-3">
                                <Boton href="/bienvenida" variante="secundaria">
                                    Soy profesional
                                </Boton>
                                <Boton href="/bienvenida">Empezá gratis</Boton>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}