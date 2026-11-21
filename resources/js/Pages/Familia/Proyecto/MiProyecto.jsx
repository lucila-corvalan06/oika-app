import { Head } from '@inertiajs/react';
import LayoutFamilia from '../../../Componentes/LayoutFamilia';
import ListaEtapas from '../../../Componentes/ListaEtapas';

export default function MiProyecto({ filas }) {
    return (
        <LayoutFamilia activa="proyecto">
            <Head title="Mi proyecto" />

            <h1 className="text-3xl font-semibold">Mi proyecto</h1>
            <p className="mt-2">Tu hogar, etapa por etapa.</p>

            {/* Agrupo las dos secciones en una grilla para que el espacio entre ellas lo ponga el gap y no un margen en cada una */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-2 lg:items-start lg:gap-12">
                <section className="rounded-3xl bg-arena/50 p-6 lg:p-8">
                    <h2 className="text-lg font-semibold">Las etapas de tu obra</h2>
                    <ListaEtapas className="mt-3" />
                </section>

                <section aria-labelledby="titulo-respuestas">
                    <h2 id="titulo-respuestas" className="text-base font-semibold">
                        Lo que elegiste
                    </h2>

                    {/* Uso una lista de descripción porque son pares de título y valor que acá no se editan */}
                    <dl className="mt-3 grid grid-cols-2 gap-2.5">
                        {filas.map((fila, indice) => (
                            <div
                                key={fila.clave}
                                className={`min-w-0 rounded-2xl bg-arena/50 px-3.5 py-3 ${indice === filas.length - 1 ? 'col-span-2' : ''}`}
                            >
                                <dt className="text-xs">{fila.titulo}</dt>
                                <dd className="mt-0.5 font-medium">{fila.valor}</dd>
                                {fila.detalle && <dd className="font-medium">{fila.detalle}</dd>}
                            </div>
                        ))}
                    </dl>
                </section>
            </div>
        </LayoutFamilia>
    );
}