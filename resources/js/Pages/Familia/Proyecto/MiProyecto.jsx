import { Head, Link } from '@inertiajs/react';
import { CaretRightIcon, ClockIcon, FlagIcon, RulerIcon } from '@phosphor-icons/react';
import Boton from '../../../Componentes/Boton';
import LayoutFamilia from '../../../Componentes/LayoutFamilia';
import { meses, numero, pesos } from '../../../formato';

export default function MiProyecto({ filas, calculo, dosPlantas }) {
    const mesesTotales = meses(calculo.semanas_total);
    const primeraEtapa = calculo.etapas[0];

    return (
        <LayoutFamilia activa="proyecto">
            <Head title="Mi proyecto" />

            <h1 className="text-3xl font-semibold">Mi proyecto</h1>
            <p className="mt-2">Tu hogar, etapa por etapa.</p>

            {/* Uso una lista de descripción porque cada tarjeta es un par de título y valor */}
            <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
                <div className="rounded-3xl bg-terracota p-6 text-crema sm:col-span-2">
                    <dt className="text-sm">Costo estimado de tu hogar</dt>
                    <dd className="mt-1 text-4xl font-semibold">{pesos(calculo.costo_total)}</dd>
                    <dd className="mt-1 text-sm">
                        Estimación de referencia
                        {calculo.precio_actualizado && ` · Precios actualizados en ${calculo.precio_actualizado}`}
                    </dd>
                </div>

                <div className="rounded-3xl bg-arena/50 p-6">
                    <dt className="flex items-center gap-1.5 text-sm">
                        <RulerIcon size={18} weight="bold" aria-hidden="true" />
                        Tu hogar
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold">{numero(calculo.superficie)} m²</dd>
                    <dd className="text-sm text-mocha">El tamaño de tu hogar, según lo que elegiste</dd>
                </div>

                <div className="rounded-3xl bg-arena/50 p-6">
                    <dt className="flex items-center gap-1.5 text-sm">
                        <ClockIcon size={18} weight="bold" aria-hidden="true" />
                        Tiempo estimado
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold">{numero(calculo.semanas_total)} semanas</dd>
                    {mesesTotales && <dd className="text-sm text-mocha">{mesesTotales}</dd>}
                </div>
            </dl>

            {dosPlantas && (
                <p className="mt-3 text-sm text-mocha">
                    Como tu hogar tiene dos plantas, los cimientos cuestan menos y las demás etapas un poco más.
                </p>
            )}

            {/* Dejo el título afuera de la grilla para que la etapa 1 y "Por dónde empezar" arranquen a la misma altura */}
            <h2 className="mt-8 text-lg font-semibold">Las etapas de tu obra</h2>

            <div className="mt-3 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
                <ol className="flex flex-col gap-2 lg:col-span-2">
                    {calculo.etapas.map((etapa) => (
                        <li key={etapa.orden}>
                            {/* Hago enlace la tarjeta entera para que el área para tocar sea grande, sobre todo en el celu */}
                            <Link
                                href={`/familia/proyecto/etapas/${etapa.orden}`}
                                className="flex items-center gap-4 rounded-2xl bg-arena/50 px-5 py-4 hover:bg-arena"
                            >
                                <span className="w-5 font-semibold text-terracota-oscuro">{etapa.orden}</span>
                                <span className="flex-1">{etapa.nombre}</span>
                                <span className="text-right">
                                    <span className="block font-medium">{pesos(etapa.costo)}</span>
                                    <span className="block text-sm text-mocha">{numero(etapa.semanas)} semanas</span>
                                </span>
                                <CaretRightIcon size={18} weight="bold" aria-hidden="true" />
                            </Link>
                        </li>
                    ))}
                </ol>

                <div className="flex flex-col gap-4">
                    <section aria-labelledby="titulo-empezar" className="rounded-3xl p-5 ring-2 ring-terracota ring-inset">
                        <h2
                            id="titulo-empezar"
                            className="flex items-center gap-1.5 text-sm font-semibold text-terracota-oscuro"
                        >
                            <FlagIcon size={18} weight="bold" aria-hidden="true" />
                            Por dónde empezar
                        </h2>
                        <p className="mt-2">
                            No tenés que juntar todo junto. Tu obra arranca por {primeraEtapa.nombre}.
                        </p>
                        <Boton href={`/familia/proyecto/etapas/${primeraEtapa.orden}`} className="mt-4">
                            Ver la etapa {primeraEtapa.orden}
                        </Boton>
                    </section>

                    <section aria-labelledby="titulo-respuestas" className="rounded-3xl bg-arena/50 p-5">
                        <h2 id="titulo-respuestas" className="font-semibold">
                            Lo que elegiste
                        </h2>

                        <dl className="mt-3 flex flex-col gap-3">
                            {filas.map((fila) => (
                                <div key={fila.clave}>
                                    <dt className="text-sm text-mocha">{fila.titulo}</dt>
                                    <dd className="font-medium">{fila.valor}</dd>
                                    {fila.detalle && <dd className="font-medium">{fila.detalle}</dd>}
                                </div>
                            ))}
                        </dl>
                    </section>
                </div>
            </div>
        </LayoutFamilia>
    );
}