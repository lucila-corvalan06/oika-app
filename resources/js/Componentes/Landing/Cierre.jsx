import Boton from '../Boton';
import { ArrowRightIcon } from '@phosphor-icons/react';

export default function Cierre() {
    return (
        // Pongo text-crema en la sección para que todos los textos de adentro salgan en crema
        <section aria-labelledby="titulo-cierre" className="bg-terracota text-crema">
            {/* Cierro centrado y sin imagen, como el hero, para que la única acción sea el botón */}
            <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-28 lg:py-36">
                <h2
                    id="titulo-cierre"
                    className="text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl lg:text-6xl"
                >
                    Tu hogar empieza con cinco&nbsp;preguntas
                </h2>

                {/* En escritorio la llevo a 24 px para que cuente como texto grande y llegue al contraste mínimo */}
                <p className="mx-auto mt-6 max-w-xl text-lg md:text-xl lg:text-2xl">
                    Respondelas sin apuro y mirá tu obra dividida en etapas, con lo que cuesta y lo que tarda
                    cada&nbsp;una. Es gratis para&nbsp;familias.
                </p>

                {/* Envuelvo el botón para que en celu ocupe todo el ancho y desde tablet quede del tamaño de su texto */}
                <div className="mt-10 flex justify-center">
                    <div className="w-full sm:w-fit">
                        <Boton href="/bienvenida" variante="claro" tamano="grande">
                            Armá tu proyecto
                        </Boton>
                    </div>
                </div>

                {/* Dejo a los profesionales como enlace y no como botón para que no compita con la acción principal */}
                <p className="mt-8">
                    ¿Sos profesional, proveedor o inmobiliaria?{' '}
                    <a
                        href="#planes"
                        className="inline-flex items-center gap-1.5 font-medium whitespace-nowrap underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema"
                    >
                        Mirá los planes
                        <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
                    </a>
                </p>
            </div>
        </section>
    );
}