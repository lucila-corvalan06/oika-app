import { Head, useForm } from '@inertiajs/react';
import BotonesPie from '../../../Componentes/BotonesPie';
import IndicadorPaso from '../../../Componentes/IndicadorPaso';
import TarjetaRol from '../../../Componentes/TarjetaRol';

// Dejo las opciones en una lista para cambiar los textos en un solo lugar
const opciones = [
    { valor: 'integrados', titulo: 'Integrados', descripcion: 'Cocina, comedor y living en un solo espacio abierto.' },
    // Separados es cocina y comedor juntos con el living aparte, así lo calcula el motor
    { valor: 'separados', titulo: 'Separados', descripcion: 'Cocina y comedor juntos, y el living en otro ambiente.' },
];

export default function Espacios({ espacios, volverAlResumen }) {
    // Arranco con lo que ya eligió, y si no con vacío para que ninguna opción venga preseleccionada
    const { data, setData, post, processing, errors } = useForm({
        espacios: espacios ?? '',
    });

    function enviar(evento) {
        evento.preventDefault();
        // Mando el volver en la dirección para que el servidor sepa que estoy editando
        post(volverAlResumen ? '/familia/proyecto/espacios?volver=resumen' : '/familia/proyecto/espacios');
    }

    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6 md:max-w-none md:px-12 md:py-10 xl:max-w-5xl xl:px-0 xl:py-12">
            <Head title="Cocina, comedor y living" />
            <IndicadorPaso actual={3} total={6} editando={volverAlResumen} />

            {/* Desde tablet centro la pregunta, las opciones y los botones en el alto que queda, igual que en plantas */}
            <main className="mt-8 flex flex-1 flex-col md:mt-10 md:justify-center">
                {/* Uno las palabras cortas con la que sigue para que ninguna quede colgada al final de la línea */}
                <h1 className="text-3xl font-semibold md:text-center md:text-5xl md:leading-tight md:font-medium md:tracking-tight">
                    ¿Cómo querés la&nbsp;cocina, el&nbsp;comedor y&nbsp;el&nbsp;living?
                </h1>
                <p className="mt-2 md:mt-3 md:text-center md:text-xl md:text-mocha">Elegí cómo preferís repartirlos.</p>

                {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col md:mt-10 md:flex-none">
                    {/* Sin íconos las dejo acostadas y una abajo de la otra; en compu las angosto y centro como en dormitorios */}
                    <fieldset className="flex flex-col gap-3 md:gap-4 xl:mx-auto xl:w-full xl:max-w-xl">
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
                                paradaDesde="nunca"
                            />
                        ))}
                    </fieldset>

                    {errors.espacios && (
                        <p role="alert" className="mt-2 text-sm text-negativo md:text-base">
                            {errors.espacios}
                        </p>
                    )}

                    <BotonesPie
                        volverA="/familia/proyecto/dormitorios"
                        editando={volverAlResumen}
                        desactivado={processing || data.espacios === ''}
                    />
                </form>
            </main>
        </div>
    );
}