import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon, HourglassIcon } from '@phosphor-icons/react';
import LayoutFamilia from '../../../Componentes/LayoutFamilia';
import { meses, numero, pesos } from '../../../formato';


// Pego la palabra corta al nombre que sigue para que no quede colgada al final de una línea
function pegarConectores(texto) {
    return texto.replace(/ (y|de|la|el) /g, ' $1\u00A0');
}

export default function Etapa({ etapa, tareas, costo, semanas, porcentaje, precioActualizado, recorrido }) {
    const mesesEtapa = meses(semanas);

    // Busco las vecinas en el recorrido; en la primera no hay anterior y en la última no hay siguiente
    const anterior = recorrido.find((paso) => paso.orden === etapa.orden - 1);
    const siguiente = recorrido.find((paso) => paso.orden === etapa.orden + 1);

    return (
        <LayoutFamilia activa="proyecto">
            <Head title={etapa.nombre} />

            <Link
                href="/familia/proyecto"
                className="inline-flex items-center gap-1.5 text-sm text-mocha hover:underline"
            >
                <ArrowLeftIcon size={18} weight="bold" aria-hidden="true" />
                Volver a Mi proyecto
            </Link>

            <nav aria-label="Etapas de la obra" className="mt-4">
                <ol className="flex flex-wrap gap-2">
                    {recorrido.map((paso) => {
                        const esActual = paso.orden === etapa.orden;

                        return (
                            <li key={paso.orden}>
                                <Link
                                    href={`/familia/proyecto/etapas/${paso.orden}`}
                                    aria-current={esActual ? 'step' : undefined}
                                    className={`block rounded-full px-4 py-2 text-sm ${
                                        esActual ? 'bg-terracota font-semibold text-crema' : 'bg-arena/50 hover:bg-arena'
                                    }`}
                                >
                                    {paso.orden} · {paso.nombre}
                                </Link>
                            </li>
                        );
                    })}
                </ol>
            </nav>

            <p className="mt-8 text-sm text-mocha">
                Etapa {etapa.orden} de {recorrido.length}
            </p>
            <h1 className="mt-1 text-3xl font-semibold">{etapa.nombre}</h1>
            <p className="mt-2 text-lg">{etapa.descripcion}</p>

            {/* Repito el formato de las tarjetas de Mi proyecto para que la familia ya sepa leerlas */}
            <dl className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
                <div className="rounded-3xl bg-terracota p-6 text-crema lg:col-span-2">
                    <dt className="text-sm">Costo de esta etapa</dt>
                    <dd className="mt-1 text-4xl font-semibold">{pesos(costo)}</dd>
                    <dd className="mt-1 text-sm">Es el {porcentaje} % del costo total de tu hogar</dd>
                    <dd className="mt-3 text-sm">
                        Estimación de referencia
                        {precioActualizado && ` · Precios actualizados en ${precioActualizado}`}
                    </dd>
                </div>

                <div className="rounded-3xl bg-arena/50 p-6">
                    <dt className="flex items-center gap-1.5 text-sm">
                        <ClockIcon size={18} weight="bold" aria-hidden="true" />
                        Tiempo estimado
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold">{numero(semanas)} semanas</dd>
                    {mesesEtapa && <dd className="text-sm text-mocha">{mesesEtapa}</dd>}
                </div>
            </dl>

            <section aria-labelledby="titulo-tareas" className="mt-8">
                <h2 id="titulo-tareas" className="text-lg font-semibold">
                    Qué se hace en esta etapa
                </h2>

                <ol className="mt-3 flex flex-col gap-2">
                    {tareas.map((tarea) => (
                        <li key={tarea.orden} className="flex gap-4 rounded-2xl bg-arena/50 px-5 py-4">
                            <span className="w-5 font-semibold text-terracota-oscuro">{tarea.orden}</span>
                            <div>
                                <p className="font-semibold">{tarea.nombre}</p>
                                <p className="mt-1 text-mocha">{tarea.descripcion}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Si la etapa no tiene esperas no muestro el recuadro, en vez de dejarlo vacío */}
            {etapa.esperas?.length > 0 && (
                <section aria-labelledby="titulo-esperas" className="mt-4 rounded-3xl p-5 ring-2 ring-terracota ring-inset">
                    <h2
                        id="titulo-esperas"
                        className="flex items-center gap-1.5 text-sm font-semibold text-terracota-oscuro"
                    >
                        <HourglassIcon size={18} weight="bold" aria-hidden="true" />
                        Tené en cuenta
                    </h2>
                    <ul className="mt-2 flex list-disc flex-col gap-2 pl-5">
                        {etapa.esperas.map((espera) => (
                            <li key={espera}>{espera}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Con borde y sin relleno, para que no se confundan con las tareas, que no se pueden tocar */}
            {/* La flecha va en la línea chica para que un nombre largo no la empuje afuera */}
            <nav aria-label="Etapa anterior y siguiente" className="mt-10 grid grid-cols-2 gap-3">
                {anterior && (
                    <Link
                        href={`/familia/proyecto/etapas/${anterior.orden}`}
                        className="flex flex-col rounded-2xl px-4 py-4 ring-2 ring-arena ring-inset hover:bg-arena/50 md:px-5"
                    >
                        <span className="flex items-center gap-1.5 text-sm text-mocha">
                            <ArrowLeftIcon size={16} weight="bold" aria-hidden="true" />
                            Etapa anterior
                        </span>
                        <span className="mt-1 font-semibold">{pegarConectores(anterior.nombre)}</span>
                    </Link>
                )}

                {/* col-start-2 la deja siempre en la mitad derecha, aunque no haya anterior */}
                {siguiente && (
                    <Link
                        href={`/familia/proyecto/etapas/${siguiente.orden}`}
                        className="col-start-2 flex flex-col items-end rounded-2xl px-4 py-4 text-right ring-2 ring-arena ring-inset hover:bg-arena/50 md:px-5"
                    >
                        <span className="flex items-center gap-1.5 text-sm text-mocha">
                            Etapa siguiente
                            <ArrowRightIcon size={16} weight="bold" aria-hidden="true" />
                        </span>
                        <span className="mt-1 font-semibold">{pegarConectores(siguiente.nombre)}</span>
                    </Link>
                )}
            </nav>
        </LayoutFamilia>
    );
}