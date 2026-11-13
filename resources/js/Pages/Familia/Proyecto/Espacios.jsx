import { useForm } from '@inertiajs/react';
import Boton from '../../../Componentes/Boton';
import IndicadorPaso from '../../../Componentes/IndicadorPaso';
import TarjetaRol from '../../../Componentes/TarjetaRol';

// Dejo las opciones en una lista para cambiar los textos en un solo lugar
const opciones = [
    { valor: 'integrados', titulo: 'Integrados', descripcion: 'Todo junto, en un solo espacio abierto.' },
    { valor: 'separados', titulo: 'Separados', descripcion: 'Cada uno con sus propias paredes.' },
];

export default function Espacios({ espacios }) {
    // Arranco con lo que ya eligió, y si no con vacío para que ninguna opción venga preseleccionada
    const { data, setData, post, processing, errors } = useForm({
        espacios: espacios ?? '',
    });

    function enviar(evento) {
        evento.preventDefault();
        post('/familia/proyecto/espacios');
    }

    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6">
            <IndicadorPaso actual={3} total={6} />

            <main className="mt-8 flex flex-1 flex-col">
                <h1 className="text-3xl font-semibold">¿Cómo querés la cocina, el comedor y el living?</h1>
                <p className="mt-2">Elegí cómo preferís repartirlos.</p>

                {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col">
                    <fieldset className="flex flex-col gap-3">
                        <legend className="sr-only">Cocina, comedor y living</legend>
                        {opciones.map((opcion) => (
                            <TarjetaRol
                                key={opcion.valor}
                                id={`espacios-${opcion.valor}`}
                                name="espacios"
                                value={opcion.valor}
                                titulo={opcion.titulo}
                                descripcion={opcion.descripcion}
                                checked={data.espacios === opcion.valor}
                                onChange={() => setData('espacios', opcion.valor)}
                            />
                        ))}
                    </fieldset>

                    {errors.espacios && (
                        <p role="alert" className="mt-2 text-sm text-negativo">
                            {errors.espacios}
                        </p>
                    )}

                    <div className="mt-auto flex gap-3 pt-8">
                        <Boton href="/familia/proyecto/dormitorios" variante="secundaria" className="flex-1">
                            Volver
                        </Boton>
                        <Boton type="submit" disabled={processing || data.espacios === ''} className="flex-1">
                            Continuar
                        </Boton>
                    </div>
                </form>
            </main>
        </div>
    );
}