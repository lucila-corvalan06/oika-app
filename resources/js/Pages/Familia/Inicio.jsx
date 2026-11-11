import Boton from '../../Componentes/Boton';
import LayoutFamilia from '../../Componentes/LayoutFamilia';

// Dejo las etapas en una lista para cambiar el texto en un solo lugar cuando las validen
const etapas = ['Cimientos y contrapiso', 'Mampostería', 'Techo y losa', 'Instalaciones', 'Terminaciones'];

export default function Inicio({ nombre }) {
    return (
        <LayoutFamilia activa="inicio">
            <h1 className="text-3xl font-semibold">Hola, {nombre}</h1>
            <p className="mt-2">Armemos tu casa etapa por etapa, a tu ritmo.</p>

            <section className="mt-6 rounded-3xl bg-arena/50 p-6">
                <h2 className="text-xl font-semibold">Armá tu proyecto</h2>
                <p className="mt-2">
                    Contanos cómo imaginás tu casa y te armamos un plan con costos y tiempos.
                </p>

                <h3 className="mt-6 text-sm font-semibold">Tu obra se organiza en 5 etapas</h3>
                <ol className="mt-3">
                    {etapas.map((etapa, indice) => (
                        <li key={etapa} className="relative flex items-center gap-4 py-1.5">
                            {/* El conector es decorativo, por eso lo escondo de los lectores de pantalla. */}
                            {indice < etapas.length - 1 && (
                                <span
                                    aria-hidden="true"
                                    className="absolute left-4 top-1/2 h-full w-px -translate-x-1/2 bg-mocha/40"
                                />
                            )}
                            <span className="relative flex size-8 items-center justify-center rounded-full bg-crema text-sm font-semibold ring-1 ring-mocha/25">
                                {indice + 1}
                            </span>
                            {etapa}
                        </li>
                    ))}
                </ol>

                <div className="mt-6">
                    <Boton href="/familia/proyecto/plantas">Empezar</Boton>
                </div>
            </section>
        </LayoutFamilia>
    );
}