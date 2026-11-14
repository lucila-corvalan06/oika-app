import { useForm } from '@inertiajs/react';
import BotonesPie from '../../../Componentes/BotonesPie';
import IndicadorPaso from '../../../Componentes/IndicadorPaso';
import TarjetaRol from '../../../Componentes/TarjetaRol';

// Dejo las opciones en una lista para cambiar los textos en un solo lugar.
const opciones = [
    { valor: 'economica', titulo: 'Económica', descripcion: 'Materiales simples para cuidar el presupuesto.' },
    { valor: 'media', titulo: 'Media', descripcion: 'Un punto medio entre costo y calidad.' },
    { valor: 'superior', titulo: 'Superior', descripcion: 'Materiales y detalles de mayor calidad.' },
];

export default function Terminacion({ terminacion, volverAlResumen }) {
    // Arranco con lo que ya eligió, y si no con vacío para que ninguna opción venga preseleccionada.
    const { data, setData, post, processing, errors } = useForm({
        terminacion: terminacion ?? '',
    });

    function enviar(evento) {
        evento.preventDefault();
        // Mando el volver en la dirección para que el servidor sepa que estoy editando
        post(volverAlResumen ? '/familia/proyecto/terminacion?volver=resumen' : '/familia/proyecto/terminacion');
    }

    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6">
            <IndicadorPaso actual={5} total={6} editando={volverAlResumen} />

            <main className="mt-8 flex flex-1 flex-col">
                <h1 className="text-3xl font-semibold">¿Qué nivel de terminación querés?</h1>
                <p className="mt-2">Elegí el que más se acerque a lo que imaginás.</p>

                {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col">
                    <fieldset className="flex flex-col gap-3">
                        <legend className="sr-only">Nivel de terminación</legend>
                        {opciones.map((opcion) => (
                            <TarjetaRol
                                key={opcion.valor}
                                id={`terminacion-${opcion.valor}`}
                                name="terminacion"
                                value={opcion.valor}
                                titulo={opcion.titulo}
                                descripcion={opcion.descripcion}
                                checked={data.terminacion === opcion.valor}
                                onChange={() => setData('terminacion', opcion.valor)}
                            />
                        ))}
                    </fieldset>

                    {errors.terminacion && (
                        <p role="alert" className="mt-2 text-sm text-negativo">
                            {errors.terminacion}
                        </p>
                    )}

                    <BotonesPie
                    volverA="/familia/proyecto/cochera"
                    editando={volverAlResumen}
                    desactivado={processing || data.terminacion === ''}
                    />
                </form>
            </main>
        </div>
    );
}