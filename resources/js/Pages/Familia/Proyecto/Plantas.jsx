import { useForm } from '@inertiajs/react';
import Boton from '../../../Componentes/Boton';
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

export default function Plantas({ plantas }) {
    // Arranco con lo que ya eligió, y si no con vacío para que ninguna opción venga preseleccionada
    const { data, setData, post, processing, errors } = useForm({
        plantas: plantas ?? '',
    });

    function enviar(evento) {
        evento.preventDefault();
        post('/familia/proyecto/plantas');
    }

    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6">
            <IndicadorPaso actual={1} total={5} />

            <main className="mt-8 flex flex-1 flex-col">
                <h1 className="text-3xl font-semibold">¿Cuántas plantas tendrá tu casa?</h1>
                <p className="mt-2">Elegí la que más se parezca a tu idea.</p>

                {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col">
                    <fieldset className="flex flex-col gap-3">
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
                            />
                        ))}
                    </fieldset>

                    {errors.plantas && (
                        <p role="alert" className="mt-2 text-sm text-negativo">
                            {errors.plantas}
                        </p>
                    )}

                    <div className="mt-auto flex gap-3 pt-8">
                        <Boton href="/familia/inicio" variante="secundaria" className="flex-1">
                            Volver
                        </Boton>
                        <Boton type="submit" disabled={processing || data.plantas === ''} className="flex-1">
                            Continuar
                        </Boton>
                    </div>
                </form>
            </main>
        </div>
    );
}