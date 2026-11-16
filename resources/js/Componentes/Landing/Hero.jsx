import { Link } from '@inertiajs/react';
import Boton from '../Boton';

export default function Hero() {
    return (
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-16">
            <div>
                {/* Evito que paso a paso se corte en dos renglones para que se lea como una sola idea */}
                <h1 className="text-4xl leading-tight font-semibold text-balance sm:text-5xl">
                    Tu propio hogar, <span className="whitespace-nowrap text-terracota">paso a paso</span> y a tu ritmo
                </h1>

                <p className="mt-4 max-w-xl text-lg">
                    Calculá costos y tiempos, ahorrá por etapas y encontrá profesionales de confianza. Aunque nunca hayas
                    construido nada.
                </p>

                {/* Envuelvo cada botón para que en celu ocupe todo el ancho y desde tablet quede del tamaño de su texto */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <div className="sm:shrink-0">
                        <Boton href="/bienvenida">Empezá gratis</Boton>
                    </div>
                    <div className="sm:shrink-0">
                        <Boton href="#como-funciona" variante="secundaria">
                            Ver cómo funciona
                        </Boton>
                    </div>
                </div>

                <p className="mt-6 text-sm">
                    ¿Sos profesional, proveedor o inmobiliaria?{' '}
                    <Link href="/bienvenida" className="font-medium whitespace-nowrap underline">
                        Sumá tu negocio <span aria-hidden="true">→</span>
                    </Link>
                </p>
            </div>

            {/* Dejo este espacio para el mockup de la app, que sumo cuando esté hecho el planificador */}
            {/* Se ve en todos los tamaños y en celu y tablet queda debajo del texto */}
            <div aria-hidden="true" className="min-h-80 w-full rounded-2xl bg-arena lg:min-h-96" />
        </section>
    );
}