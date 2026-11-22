import { Head, Link } from '@inertiajs/react';
import { CaretRightIcon, ClockIcon, FlagIcon, PiggyBankIcon, RulerIcon } from '@phosphor-icons/react';
import Boton from '../../Componentes/Boton';
import LayoutFamilia from '../../Componentes/LayoutFamilia';
import ListaEtapas from '../../Componentes/ListaEtapas';
import { meses, numero, pesos } from '../../formato';

export default function Inicio({ nombre, tieneProyecto, calculo, proximaEtapa }) {
    return (
        <LayoutFamilia activa="inicio">
            <Head title="Inicio" />
            <h1 className="text-3xl font-semibold">Hola, {nombre}</h1>
            <p className="mt-2">Armemos tu hogar etapa por etapa, a tu ritmo.</p>

            {/* Cambio lo que muestro según haya proyecto guardado para no pedirle que lo arme de nuevo */}
            {tieneProyecto ? (
                <ConProyecto calculo={calculo} proximaEtapa={proximaEtapa} />
            ) : (
                <>
                    <SinProyecto />
                    <PlanDeAhorro className="mt-8" />
                </>
            )}
        </LayoutFamilia>
    );
}

function ConProyecto({ calculo, proximaEtapa }) {
    // Si la etapa dura menos de un mes, meses() viene vacío, así que muestro las semanas
    const tiempoEtapa = meses(proximaEtapa.semanas) || `${numero(proximaEtapa.semanas)} semanas`;

    // Uso la misma grilla que Mi proyecto para que las dos pantallas se sientan de la misma familia
    return (
        <div className="mt-6 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-2">
                <section aria-labelledby="titulo-proximo" className="rounded-3xl bg-terracota p-6 text-crema">
                    <p className="flex items-center gap-1.5 text-sm">
                        <FlagIcon size={18} weight="bold" aria-hidden="true" />
                        Tu próximo paso · Etapa {proximaEtapa.orden} de {calculo.etapas.length}
                    </p>
                    <h2 id="titulo-proximo" className="mt-2 text-2xl font-semibold">
                        Empezá por {proximaEtapa.nombre}
                    </h2>
                    <p className="mt-1">
                        {pesos(proximaEtapa.costo)} · {tiempoEtapa}
                    </p>
                    <div className="mt-5 sm:max-w-xs">
                        <Boton variante="claro" href={`/familia/proyecto/etapas/${proximaEtapa.orden}`}>
                            Ver la etapa {proximaEtapa.orden}
                        </Boton>
                    </div>
                </section>

                <h2 className="mt-8 text-lg font-semibold">Tu obra, etapa por etapa</h2>

                <ol className="mt-3 flex flex-col gap-2">
                    {calculo.etapas.map((etapa) => {
                        // Marco la etapa que decide el servidor, así cuando haya ahorro la pantalla no cambia
                        const esProxima = etapa.orden === proximaEtapa.orden;

                        return (
                            <li key={etapa.orden}>
                                <Link
                                    href={`/familia/proyecto/etapas/${etapa.orden}`}
                                    className="flex items-center gap-4 rounded-2xl bg-arena/50 px-5 py-4 hover:bg-arena"
                                >
                                    <span className="w-5 font-semibold text-terracota-oscuro">{etapa.orden}</span>
                                    <span className={`flex-1 ${esProxima ? 'font-semibold' : ''}`}>{etapa.nombre}</span>
                                    {esProxima && (
                                        <span className="rounded-full bg-terracota/15 px-2 py-0.5 text-xs font-medium text-terracota-presionado">
                                            Empezá acá
                                        </span>
                                    )}
                                    <CaretRightIcon size={18} weight="bold" aria-hidden="true" />
                                </Link>
                            </li>
                        );
                    })}
                </ol>
            </div>

            <div className="flex flex-col gap-4">
                <ResumenProyecto calculo={calculo} />
                <PlanDeAhorro />
            </div>
        </div>
    );
}

function ResumenProyecto({ calculo }) {
    const mesesTotales = meses(calculo.semanas_total);

    return (
        <section aria-labelledby="titulo-resumen" className="rounded-3xl bg-arena/50 p-5">
            <h2 id="titulo-resumen" className="font-semibold">
                Tu proyecto
            </h2>

            {/* Uso una lista de descripción como en Mi proyecto, porque cada dato es un par de título y valor */}
            <dl className="mt-3 flex flex-col gap-3">
                <div>
                    <dt className="text-sm text-mocha">Costo estimado</dt>
                    <dd className="text-xl font-semibold">{pesos(calculo.costo_total)}</dd>
                </div>

                <div>
                    <dt className="flex items-center gap-1.5 text-sm text-mocha">
                        <RulerIcon size={18} weight="bold" aria-hidden="true" />
                        Tu hogar
                    </dt>
                    <dd className="text-xl font-semibold">{numero(calculo.superficie)} m²</dd>
                </div>

                <div>
                    <dt className="flex items-center gap-1.5 text-sm text-mocha">
                        <ClockIcon size={18} weight="bold" aria-hidden="true" />
                        Tiempo estimado
                    </dt>
                    <dd className="text-xl font-semibold">{numero(calculo.semanas_total)} semanas</dd>
                    {mesesTotales && <dd className="text-sm text-mocha">{mesesTotales}</dd>}
                </div>
            </dl>

            <p className="mt-4 text-sm text-mocha">
                Estimación de referencia
                {calculo.precio_actualizado && ` · Precios actualizados en ${calculo.precio_actualizado}`}
            </p>

            <Link
                href="/familia/proyecto"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-terracota-oscuro hover:underline"
            >
                Ver mi proyecto
                <CaretRightIcon size={18} weight="bold" aria-hidden="true" />
            </Link>
        </section>
    );
}

function SinProyecto() {
    return (
        <section className="mt-6 rounded-3xl bg-arena/50 p-6 lg:mt-10 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:p-10">
            <div className="lg:col-start-1">
                <h2 className="text-xl font-semibold">Armá tu proyecto</h2>
                <p className="mt-2">Contanos cómo imaginás tu hogar y armamos tu proyecto, etapa por etapa.</p>
            </div>

            <div className="mt-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
                <h3 className="text-sm font-semibold">Tu obra se organiza en 5 etapas</h3>
                <ListaEtapas className="mt-3" />
            </div>

            <div className="mt-6 lg:col-start-1 lg:max-w-xs lg:self-start">
                <Boton href="/familia/proyecto/plantas">Empezar</Boton>
            </div>
        </section>
    );
}

// Recibo className porque al lado de "Tu proyecto" no lleva margen y sola debajo de la otra tarjeta sí
function PlanDeAhorro({ className = '' }) {
    return (
        <section
            aria-labelledby="titulo-ahorro"
            className={`rounded-3xl border-2 border-dashed border-mocha p-5 ${className}`}
        >
            <h2 id="titulo-ahorro" className="flex flex-wrap items-center gap-2 font-semibold">
                <PiggyBankIcon size={24} weight="bold" className="text-mocha" aria-hidden="true" />
                Tu plan de ahorro
                <span className="rounded-full bg-arena px-2 py-0.5 text-xs font-medium text-mocha">Pronto</span>
            </h2>
            <p className="mt-2 text-sm text-mocha">
                Vas a poder anotar lo que ahorrás y ver cuánto te falta para cada etapa.
            </p>
        </section>
    );
}