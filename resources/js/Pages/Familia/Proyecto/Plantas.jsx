import { Head, useForm } from '@inertiajs/react';
import BotonesPie from '../../../Componentes/BotonesPie';
import IndicadorPaso from '../../../Componentes/IndicadorPaso';
import TarjetaRol from '../../../Componentes/TarjetaRol';

const esquemaUnaPlanta = (
    <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-10 text-terracota"
    >
        <polyline points="6,29 24,15 42,29" />
        <path d="M10 27 V43 H38 V27" />
        <path d="M17 43 V34 H23 V43" />
        <rect x="28" y="32" width="5" height="5" strokeWidth="3" />
    </svg>
);

const esquemaDosPlantas = (
    <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="size-10 text-terracota"
    >
        <polyline points="6,17 24,4 42,17" />
        <path d="M10 15 V43 H38 V15" />
        <path d="M10 29 H38" strokeWidth="3" />
        <rect x="16" y="19" width="5" height="5" strokeWidth="3" />
        <rect x="27" y="19" width="5" height="5" strokeWidth="3" />
        <path d="M17 43 V35 H23 V43" />
        <rect x="28" y="33" width="4" height="4" strokeWidth="3" />
    </svg>
);

const opciones = [
    { valor: 1, titulo: 'Una planta', descripcion: 'Todo en un solo nivel.', icono: esquemaUnaPlanta },
    { valor: 2, titulo: 'Dos plantas', descripcion: 'Planta baja y planta alta.', icono: esquemaDosPlantas },
];

export default function Plantas({ plantas, volverAlResumen }) {
    // Arranco con lo que ya eligió, y si no con vacío para que ninguna opción venga preseleccionada
    const { data, setData, post, processing, errors } = useForm({
        plantas: plantas ?? '',
    });

    function enviar(evento) {
        evento.preventDefault();
        // Mando el volver en la dirección para que el servidor sepa que estoy editando
        post(volverAlResumen ? '/familia/proyecto/plantas?volver=resumen' : '/familia/proyecto/plantas');
    }

    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6 md:max-w-none md:px-12 md:py-10 xl:max-w-5xl xl:px-0 xl:py-12">
            <Head title="Plantas" />
            <IndicadorPaso actual={1} total={6} editando={volverAlResumen} />

            {/* Desde tablet centro la pregunta, las opciones y los botones en el alto que queda, igual que en elegir rol */}
            <main className="mt-8 flex flex-1 flex-col md:mt-10 md:justify-center">
                {/* Uno "tu" con "hogar" para que "hogar?" no quede sola en la última línea */}
                <h1 className="text-3xl font-semibold md:text-center md:text-5xl md:leading-tight md:font-medium md:tracking-tight">
                    ¿Cuántas plantas tendrá tu&nbsp;hogar?
                </h1>
                <p className="mt-2 md:mt-3 md:text-center md:text-xl md:text-mocha">
                    Elegí la que más se parezca a tu idea.
                </p>

                {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col md:mt-10 md:flex-none">
                    {/* Hasta tablet van una abajo de la otra; en compu lado a lado porque son solo dos */}
                    <fieldset className="flex flex-col gap-3 md:gap-4 xl:mx-auto xl:grid xl:w-full xl:max-w-3xl xl:grid-cols-2">
                        <legend className="sr-only">Cantidad de plantas</legend>
                        {opciones.map((opcion) => (
                            <TarjetaRol
                                key={opcion.valor}
                                id={`plantas-${opcion.valor}`}
                                name="plantas"
                                value={opcion.valor}
                                titulo={opcion.titulo}
                                descripcion={opcion.descripcion}
                                icono={opcion.icono}
                                checked={data.plantas === opcion.valor}
                                onChange={() => setData('plantas', opcion.valor)}
                                paradaDesde="xl"
                            />
                        ))}
                    </fieldset>

                    {errors.plantas && (
                        <p role="alert" className="mt-2 text-sm text-negativo md:text-base">
                            {errors.plantas}
                        </p>
                    )}

                    <BotonesPie
                        volverA="/familia/inicio"
                        editando={volverAlResumen}
                        desactivado={processing || data.plantas === ''}
                    />
                </form>
            </main>
        </div>
    );
}