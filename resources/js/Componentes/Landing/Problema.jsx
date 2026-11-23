import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from '@phosphor-icons/react';

const dudas = [
    {
        duda: 'No sé por dónde empezar',
        respuesta: 'Siempre sabés cuál es tu próximo paso.',
    },
    {
        duda: 'No sé a quién contratar',
        respuesta: 'Contactás gente de confianza, sin depender de la suerte.',
    },
    {
        duda: 'No sé cuánto me va a costar',
        respuesta: 'Sabés cuánto necesitás y cuándo, antes de gastar un peso.',
    },
];

export default function Problema() {
    return (
        <section aria-labelledby="titulo-problema" className="bg-arena/50">
            <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 lg:py-32">
                {/* Uso el mismo tamaño de título que el resto de las secciones para que la landing se vea pareja */}
                <h2
                    id="titulo-problema"
                    className="mx-auto max-w-3xl text-center text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl"
                >
                    Construir tu hogar no tiene que ser <span className="text-terracota">abrumador</span>
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-mocha">
                    Es normal tener dudas. oika te ayuda a resolver cada una, paso a paso.
                </p>

                <div className="mt-10 lg:mt-12 lg:flex lg:flex-col lg:gap-0.5 lg:overflow-hidden lg:rounded-3xl lg:bg-crema">
                    {/* Estos títulos solo se ven en escritorio, en celu y tablet cada tarjeta lleva su propia etiqueta */}
                    <div aria-hidden="true" className="hidden lg:grid lg:grid-cols-2">
                        <p className="bg-arena px-8 py-4 text-sm font-medium tracking-wide uppercase">Antes</p>
                        <p className="bg-terracota px-8 py-4 text-sm font-medium tracking-wide text-crema uppercase">
                            Con oika
                        </p>
                    </div>

                    <ul className="flex flex-col gap-6 lg:gap-0.5">{problemas(dudas)}</ul>
                </div>

                {/* Solo la acción es enlace, la pregunta queda como texto, igual que en el hero y el cierre */}
                <p className="mt-10 text-center text-lg font-medium">
                    ¿Te suena alguna?{' '}
                    <Link
                        href="/bienvenida"
                        className="inline-flex items-center gap-1.5 whitespace-nowrap underline underline-offset-4"
                    >
                        Empezá a resolverlas hoy
                        <ArrowRightIcon size={18} weight="bold" aria-hidden="true" />
                    </Link>
                </p>
            </div>
        </section>
    );
}

function problemas(lista) {
    return lista.map((item) => (
        <li key={item.duda} className="grid lg:grid-cols-2">
            {/* Centro el contenido en vertical para que la duda no quede arriba cuando la respuesta ocupa dos renglones */}
            <div className="flex flex-col justify-center gap-2 rounded-t-2xl bg-arena p-6 pb-9 lg:rounded-none lg:p-8">
                <span className="text-sm font-medium tracking-wide uppercase lg:sr-only">Antes</span>
                <p className="text-xl font-semibold lg:text-2xl">“{item.duda}”</p>
            </div>

            <div className="relative flex flex-col justify-center gap-2 rounded-b-2xl bg-terracota p-6 pt-9 text-crema lg:rounded-none lg:p-8">
                {/* Pongo la flecha dentro de la respuesta para que quede justo en el borde con la duda, abajo en celu y al medio en escritorio */}
                <span
                    aria-hidden="true"
                    className="absolute -top-5 left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-crema text-terracota lg:top-1/2 lg:left-0 lg:-translate-y-1/2"
                >
                    {/* Giro la misma flecha para que en celu apunte hacia abajo */}
                    <ArrowRightIcon size={20} weight="bold" className="rotate-90 lg:rotate-0" />
                </span>

                <span className="text-sm font-medium tracking-wide uppercase lg:sr-only">Con oika</span>
                <p className="text-lg font-medium text-balance lg:text-xl">{item.respuesta}</p>
            </div>
        </li>
    ));
}