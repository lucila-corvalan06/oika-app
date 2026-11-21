import { Head, Link, useForm } from '@inertiajs/react';
import Boton from '../../../Componentes/Boton';
import IndicadorPaso from '../../../Componentes/IndicadorPaso';

export default function Resumen({ filas }) {
    // No mando datos porque las respuestas ya están en la sesión, solo uso el formulario para el POST
    const { post, processing } = useForm({});

    function guardar(evento) {
        evento.preventDefault();
        post('/familia/proyecto/resumen');
    }

    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6">
            <Head title="Tu hogar en una mirada" />
            <IndicadorPaso actual={6} total={6} />

            <main className="mt-8 flex flex-1 flex-col">
                <h1 className="text-3xl font-semibold">Tu hogar en una mirada</h1>
                <p className="mt-2">Revisá tus respuestas antes de guardar tu proyecto.</p>

                {/* Uso una lista y no una lista de descripción porque cada fila tiene su propio enlace */}
                <ul className="mt-6 divide-y divide-mocha/20 rounded-3xl bg-arena/50 px-4">
                    {filas.map((fila) => (
                        <li key={fila.titulo} className="flex items-center justify-between gap-4 py-3">
                            <div>
                                <p className="text-sm">{fila.titulo}</p>
                                <p className="font-medium">{fila.valor}</p>
                                {/* Muestro el detalle solo si la fila lo trae y con el mismo estilo que el valor, porque también es una respuesta */}
                                {fila.detalle && <p className="font-medium">{fila.detalle}</p>}
                            </div>

                            {/* El enlace va en café con subrayado porque el terracota en texto chico no llega al contraste */}
                            <Link
                                href={fila.editar}
                                aria-label={`Editar ${fila.titulo.toLowerCase()}`}
                                className="inline-flex min-h-12 items-center rounded-md px-2 font-medium text-cafe underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota"
                            >
                                Editar
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                <form onSubmit={guardar} noValidate className="mt-auto flex flex-col gap-3 pt-8">
                    <Boton type="submit" disabled={processing}>
                        Guardar mi proyecto
                    </Boton>
                    <Boton href="/familia/proyecto/terminacion" variante="secundaria">
                        Volver
                    </Boton>
                </form>
            </main>
        </div>
    );
}