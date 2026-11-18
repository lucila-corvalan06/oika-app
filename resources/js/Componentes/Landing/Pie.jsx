import { Link } from '@inertiajs/react';
import Imagotipo from '../Imagotipo';

const secciones = [
    { texto: 'Cómo funciona', href: '#como-funciona' },
    { texto: 'Planificador', href: '#planificador' },
    { texto: 'Marketplace', href: '#marketplace' },
    { texto: 'Planes', href: '#planes' },
    { texto: 'Preguntas', href: '#preguntas' },
];

const cuenta = [
    { texto: 'Iniciar sesión', href: '/ingresar' },
    { texto: 'Crear cuenta', href: '/registrarse' },
];

// Dejo las direcciones de las redes juntas para reemplazar los # por mis perfiles reales antes de entregar
const redes = [
    { texto: 'Instagram', href: '#' },
    { texto: 'Facebook', href: '#' },
];

// Comparto las clases de los enlaces para que las columnas se vean iguales
const clasesEnlace =
    'inline-flex min-h-12 items-center text-cafe hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota';

// Pinto los títulos en mocha para que resalten de los enlaces sin usar terracota, que como texto chico no cumple el contraste
const clasesTitulo = 'text-base font-semibold text-mocha';

export default function Pie() {
    return (
        <footer className="bg-crema">
            <div className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
                <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
                    <div>
                        <Link
                            href="/"
                            aria-label="Ir al inicio de oika"
                            className="inline-flex min-h-12 items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota"
                        >
                            <Imagotipo className="block h-9 w-auto" />
                        </Link>
                        <p className="mt-4 text-lg">Tu hogar, a tu ritmo.</p>
                    </div>

                    {/* En tablet achico el bloque a lo que ocupan los textos y lo centro para que los costados queden parejos, y en escritorio lo devuelvo a la derecha */}
                    <div className="grid grid-cols-1 gap-8 sm:mx-auto sm:w-fit sm:grid-cols-[repeat(3,auto)] sm:gap-x-12 lg:mx-0">
                        <nav aria-labelledby="pie-secciones">
                            <h2 id="pie-secciones" className={clasesTitulo}>
                                Secciones
                            </h2>
                            <ul className="mt-2">
                                {secciones.map((enlace) => (
                                    <li key={enlace.href}>
                                        <a href={enlace.href} className={clasesEnlace}>
                                            {enlace.texto}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <nav aria-labelledby="pie-redes">
                            <h2 id="pie-redes" className={clasesTitulo}>
                                Redes
                            </h2>
                            <ul className="mt-2">
                                {redes.map((enlace) => (
                                    <li key={enlace.texto}>
                                        <a href={enlace.href} className={clasesEnlace}>
                                            {enlace.texto}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Destaco los enlaces de la cuenta con más peso porque son las acciones de esta zona */}
                        <nav aria-labelledby="pie-cuenta">
                            <h2 id="pie-cuenta" className={clasesTitulo}>
                                Tu cuenta
                            </h2>
                            <ul className="mt-2">
                                {cuenta.map((enlace) => (
                                    <li key={enlace.href}>
                                        <Link href={enlace.href} className={`${clasesEnlace} font-medium`}>
                                            {enlace.texto}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* Calculo el año para no tener que cambiarlo a mano cada vez */}
                <p className="mt-12 border-t border-arena pt-8 text-center text-sm">
                    © {new Date().getFullYear()} oika. Hecho en Argentina.
                </p>
            </div>
        </footer>
    );
}