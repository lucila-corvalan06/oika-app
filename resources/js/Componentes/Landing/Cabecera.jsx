import { Link } from '@inertiajs/react';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import Boton from '../Boton';
import Imagotipo from '../Imagotipo';

const enlaces = [
    { texto: 'Cómo funciona', href: '#como-funciona' },
    { texto: 'Planificador', href: '#planificador' },
    { texto: 'Marketplace', href: '#marketplace' },
    { texto: 'Preguntas', href: '#preguntas' },
];

// Comparto estas clases entre la cabecera y el cajón para que se vean iguales
const clasesEnlace =
    'inline-flex min-h-12 items-center font-medium text-cafe transition-colors hover:text-terracota focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota';

// Le doy 48 px de alto al logo para que sea fácil de tocar y lo subo un poco para alinear las letras con los enlaces
const clasesLogo =
    'inline-flex min-h-12 -translate-y-1 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota';

const clasesBotonMenu =
    'inline-flex size-12 items-center justify-center rounded-xl text-mocha focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota';

export default function Cabecera() {
    const [abierto, setAbierto] = useState(false);
    const dialogo = useRef(null);

    // Abro y cierro el diálogo nativo según el estado y bloqueo el scroll de la página mientras está abierto
    useEffect(() => {
        const elemento = dialogo.current;

        if (abierto && !elemento.open) elemento.showModal();
        if (!abierto && elemento.open) elemento.close();

        document.body.style.overflow = abierto ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [abierto]);

    // Cierro el menú si la pantalla pasa a escritorio, por ejemplo al girar la tablet, para que la página no quede bloqueada
    useEffect(() => {
        const escritorio = window.matchMedia('(min-width: 1024px)');

        const alCambiar = (evento) => {
            if (evento.matches) setAbierto(false);
        };

        escritorio.addEventListener('change', alCambiar);
        return () => escritorio.removeEventListener('change', alCambiar);
    }, []);

    // Cierro el menú si tocan el fondo oscuro, que para el navegador es un clic sobre el propio diálogo
    function alTocarElFondo(evento) {
        if (evento.target === evento.currentTarget) setAbierto(false);
    }

    return (
        <>
            <header className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
                <Link href="/" aria-label="Ir al inicio de oika" className={clasesLogo}>
                    <Imagotipo className="block h-8 w-auto" />
                </Link>

                <nav aria-label="Principal" className="hidden lg:block">
                    <ul className="flex items-center gap-2">
                        {enlaces.map((enlace) => (
                            <li key={enlace.href}>
                                <a href={enlace.href} className={`${clasesEnlace} px-3`}>
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
                    onClick={() => setAbierto(true)}
                    aria-expanded={abierto}
                    aria-controls="menu-movil"
                    aria-haspopup="dialog"
                    aria-label="Abrir menú"
                    className={`${clasesBotonMenu} lg:hidden`}
                >
                    <ListIcon size={28} weight="bold" aria-hidden="true" />
                </button>
            </header>

            {/* Uso el diálogo nativo porque el navegador se ocupa del foco y de la tecla Esc, y lo pego a la derecha para que sea un cajón */}
            <dialog
                ref={dialogo}
                id="menu-movil"
                aria-label="Menú"
                onClose={() => setAbierto(false)}
                onClick={alTocarElFondo}
                className="mt-0 mr-0 mb-0 ml-auto h-dvh max-h-none w-[85%] max-w-sm overflow-y-auto bg-crema p-0 text-cafe backdrop:bg-cafe/50 lg:hidden"
            >
                <div className="flex min-h-full flex-col px-6 pb-16 sm:pb-24">
                    <div className="flex items-center justify-between gap-6 py-4">
                        <Link
                            href="/"
                            onClick={() => setAbierto(false)}
                            aria-label="Ir al inicio de oika"
                            className={clasesLogo}
                        >
                            <Imagotipo className="block h-8 w-auto" />
                        </Link>

                        <button
                            type="button"
                            onClick={() => setAbierto(false)}
                            aria-label="Cerrar menú"
                            className={clasesBotonMenu}
                        >
                            <XIcon size={28} weight="bold" aria-hidden="true" />
                        </button>
                    </div>

                    <nav aria-label="Principal" className="mt-6">
                        {/* Separo los enlaces con una línea fina para que la lista se lea más ordenada */}
                        <ul className="divide-y divide-arena">
                            {enlaces.map((enlace) => (
                                <li key={enlace.href}>
                                    {/* Cierro el menú al tocar un enlace para que no tape la sección a la que salto */}
                                    <a
                                        href={enlace.href}
                                        onClick={() => setAbierto(false)}
                                        className={`${clasesEnlace} w-full py-3 text-[1.625rem] sm:text-[2rem]`}
                                    >
                                        {enlace.texto}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Los botones son lo que tiene que destacar, por eso van grandes y de borde a borde */}
                    <div className="mt-auto flex flex-col gap-3 pt-8">
                        <Boton href="/bienvenida" variante="secundaria" tamano="grande">
                            Soy profesional
                        </Boton>
                        <Boton href="/bienvenida" tamano="grande">
                            Empezá gratis
                        </Boton>
                    </div>
                </div>
            </dialog>
        </>
    );
}