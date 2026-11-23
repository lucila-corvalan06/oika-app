import { Link } from '@inertiajs/react';
import BarraLateral from './BarraLateral';
import Imagotipo from './Imagotipo';
import NavegacionInferior from './NavegacionInferior';

export default function LayoutFamilia({ activa, children }) {
    return (
        <div className="flex min-h-dvh flex-col lg:flex-row">
            {/* Envuelvo la barra lateral para ocultarla por debajo de lg sin tocar sus clases */}
            <div className="hidden lg:block">
                <BarraLateral activa={activa} />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="mx-auto w-full max-w-md px-6 py-6 md:max-w-3xl md:px-12 md:pt-10 lg:hidden">
                    {/* Hago que el logo lleve al inicio igual que en la barra lateral */}
                    <Link
                        href="/familia/inicio"
                        aria-label="oika, ir al inicio"
                        className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracota"
                    >
                        <Imagotipo />
                    </Link>
                </header>

                {/* Dejo el main con flex-1 para que la navegación quede al pie aunque haya poco contenido */}
                <main className="mx-auto w-full max-w-md flex-1 px-6 pb-6 md:max-w-3xl md:px-12 md:pb-10 lg:max-w-5xl lg:px-12 lg:pt-12">
                    {children}
                </main>

                {/* Uso sticky y no fixed para que la barra quede siempre a la vista sin tapar el final del contenido */}
                <div className="sticky bottom-0 z-10 lg:hidden">
                    <NavegacionInferior activa={activa} />
                </div>
            </div>
        </div>
    );
}