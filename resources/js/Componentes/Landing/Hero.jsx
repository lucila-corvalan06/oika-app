import { Link } from '@inertiajs/react';
import Boton from '../Boton';
import { ArrowRightIcon } from '@phosphor-icons/react';

export default function Hero() {
    return (
        <section aria-labelledby="hero-titulo" className="px-6 pt-16 pb-20 md:px-12 md:pt-20 lg:pt-28 lg:pb-28">
            <div className="mx-auto max-w-6xl text-center">
                {/* Pongo font-normal a mano porque el título de la marca va en regular y solo "a tu ritmo" en semibold */}
                <h1
                    id="hero-titulo"
                    className="text-5xl leading-[1.05] font-normal tracking-tight text-cafe md:text-7xl xl:text-[5rem]"
                >
                    Tu hogar,{' '}
                    <span className="block font-semibold text-terracota lg:inline">a tu ritmo</span>
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg text-mocha md:mt-7 md:text-xl">
                    Calculá costos y tiempos, ahorrá por etapas y encontrá profesionales de confianza. Aunque nunca
                    hayas construido&nbsp;nada.
                </p>

                {/* Envuelvo cada botón para que en celu ocupe todo el ancho y desde tablet quede del tamaño de su texto */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:mt-10">
                    <div className="sm:shrink-0">
                        <Boton href="/bienvenida">Empezá gratis</Boton>
                    </div>
                    <div className="sm:shrink-0">
                        <Boton href="#como-funciona" variante="secundaria">
                            Ver cómo funciona
                        </Boton>
                    </div>
                </div>
                <p className="mt-6 text-sm text-mocha md:text-base">
                    ¿Sos profesional, proveedor o inmobiliaria?{' '}
                    <Link
                        href="/bienvenida"
                        className="inline-flex items-center gap-1.5 font-medium whitespace-nowrap text-cafe underline"
                    >
                        Sumá tu negocio
                        <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
                    </Link>
                </p>
                {/* Muestro la app real sobre el panel de marca, y el borde de abajo recorta las capturas a propósito */}
                {/* Desde tablet uso porcentajes para que la composición crezca entera con el panel y no se separe */}
                <div className="relative mx-auto mt-14 h-[26rem] max-w-5xl overflow-hidden rounded-3xl bg-terracota md:mt-16 md:aspect-[2/1] md:h-auto lg:mt-20 lg:rounded-[28px]">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: "url('/img/trama.png')" }}
                    />
                    {/* En celu escondo la captura de escritorio porque a ese tamaño su texto no se leería */}
                    <img
                        src="/img/landing/captura-inicio.webp"
                        alt="Pantalla de inicio de oika con el costo, el tiempo y los metros cuadrados de un hogar, y sus cinco etapas de obra"
                        width="1600"
                        height="1201"
                        className="absolute top-12 left-[4%] hidden w-[66%] max-w-none rounded-2xl shadow-[0_24px_60px_rgba(52,39,31,0.35)] md:block lg:top-16"
                    />
                    <img
                        src="/img/landing/captura-etapa-celu.webp"
                        alt="Detalle de la etapa Mampostería en el celular, con su costo y su tiempo estimado"
                        width="780"
                        height="1688"
                        className="absolute top-10 left-1/2 w-60 -translate-x-1/2 rounded-[2rem] shadow-[0_24px_60px_rgba(52,39,31,0.4)] md:top-[18%] md:right-[4%] md:left-auto md:w-[24%] md:translate-x-0 md:rounded-3xl lg:rounded-[2rem]"
                    />
                </div>
            </div> 
            
        </section>
    );
}