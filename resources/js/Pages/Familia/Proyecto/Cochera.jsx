import { useForm } from '@inertiajs/react';
import Boton from '../../../Componentes/Boton';
import IndicadorPaso from '../../../Componentes/IndicadorPaso';
import OpcionCorta from '../../../Componentes/OpcionCorta';
import TarjetaCasilla from '../../../Componentes/TarjetaCasilla';

// Dejo las opciones en listas para cambiar los textos en un solo lugar
const opcionesCochera = [
    { valor: 0, etiqueta: 'Ninguna' },
    { valor: 1, etiqueta: '1 auto' },
    { valor: 2, etiqueta: '2 autos' },
];

const extrasDisponibles = [
    { valor: 'galeria', titulo: 'Galería', descripcion: 'Espacio techado, abierto al exterior.' },
    { valor: 'quincho', titulo: 'Quincho', descripcion: 'Espacio cubierto para reuniones y parrilla.' },
    { valor: 'lavadero', titulo: 'Lavadero', descripcion: 'Lugar para lavar y secar la ropa.' },
];

export default function Cochera({ cochera, extras }) {
    // Los valores iniciales los decide el servidor, acá solo los uso como punto de partida
    const { data, setData, post, processing, errors } = useForm({
        cochera,
        extras,
    });

    // Si el extra ya estaba tildado lo saco de la lista y si no, lo sumo
    function alternarExtra(valor) {
        const nuevos = data.extras.includes(valor)
            ? data.extras.filter((extra) => extra !== valor)
            : [...data.extras, valor];

        setData('extras', nuevos);
    }

    function enviar(evento) {
        evento.preventDefault();
        post('/familia/proyecto/cochera');
    }

    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6">
            <IndicadorPaso actual={4} total={6} />

            <main className="mt-8 flex flex-1 flex-col">
                <h1 className="text-3xl font-semibold">¿Qué más va a tener tu hogar?</h1>
                <p className="mt-2">Elegí lo que quieras sumar a tu hogar.</p>

                {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col">
                    <section>
                        <h2 id="titulo-cochera" className="text-lg font-semibold">
                            Cochera
                        </h2>
                        <div
                            role="radiogroup"
                            aria-labelledby="titulo-cochera"
                            className="mt-2 grid grid-cols-3 gap-2"
                        >
                            {opcionesCochera.map((opcion) => (
                                <OpcionCorta
                                    key={opcion.valor}
                                    id={`cochera-${opcion.valor}`}
                                    name="cochera"
                                    value={opcion.valor}
                                    etiqueta={opcion.etiqueta}
                                    checked={data.cochera === opcion.valor}
                                    onChange={() => setData('cochera', opcion.valor)}
                                />
                            ))}
                        </div>
                        {errors.cochera && (
                            <p role="alert" className="mt-2 text-sm text-negativo">
                                {errors.cochera}
                            </p>
                        )}
                    </section>

                    <section className="mt-6">
                        <h2 id="titulo-extras" className="text-lg font-semibold">
                            Espacios extra
                        </h2>
                        <p className="text-sm">Podés elegir más de uno, o ninguno.</p>
                        <div role="group" aria-labelledby="titulo-extras" className="mt-2 flex flex-col gap-2">
                            {extrasDisponibles.map((extra) => (
                                <TarjetaCasilla
                                    key={extra.valor}
                                    id={`extra-${extra.valor}`}
                                    titulo={extra.titulo}
                                    descripcion={extra.descripcion}
                                    checked={data.extras.includes(extra.valor)}
                                    onChange={() => alternarExtra(extra.valor)}
                                />
                            ))}
                        </div>
                        {errors.extras && (
                            <p role="alert" className="mt-2 text-sm text-negativo">
                                {errors.extras}
                            </p>
                        )}
                    </section>

                    <div className="mt-auto flex gap-3 pt-8">
                        <Boton href="/familia/proyecto/espacios" variante="secundaria" className="flex-1">
                            Volver
                        </Boton>
                        <Boton type="submit" disabled={processing} className="flex-1">
                            Continuar
                        </Boton>
                    </div>
                </form>
            </main>
        </div>
    );
}