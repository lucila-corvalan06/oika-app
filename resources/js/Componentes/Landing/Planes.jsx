import {
    ChartBarIcon,
    CheckIcon,
    CrownIcon,
    HardHatIcon,
    StarIcon,
    StorefrontIcon,
    UsersIcon,
} from '@phosphor-icons/react';
import Boton from '../Boton';

// Uso una sombra muy suave en tono café para separar las tarjetas del fondo sin que se note
const sombra = 'shadow-[0_2px_8px_rgba(52,39,31,0.08)]';

const beneficios = [
    {
        icono: <UsersIcon size={32} weight="bold" aria-hidden="true" />,
        titulo: 'Familias que ya tienen proyecto',
        descripcion: 'Con costo estimado y plan de ahorro.',
    },
    {
        icono: <StorefrontIcon size={32} weight="bold" aria-hidden="true" />,
        titulo: 'Un perfil que vende',
        descripcion: 'Fotos de trabajos y calificaciones.',
    },
    {
        icono: <ChartBarIcon size={32} weight="bold" aria-hidden="true" />,
        titulo: 'Medí tus resultados',
        descripcion: 'Vistas y contactos del mes.',
    },
];

const planes = [
    {
        nombre: 'Plan Básico',
        icono: <HardHatIcon size={28} weight="bold" aria-hidden="true" />,
        precio: '6.900',
        boton: 'Empezar con Plan Básico',
        destacado: false,
        incluye: [
            'Perfil visible con datos de contacto.',
            'Botón de contacto por WhatsApp o mail.',
            'Hasta 5 fotos de trabajos.',
            'Calificaciones de usuarios.',
        ],
    },
    {
        nombre: 'Plan Premium',
        icono: <StarIcon size={28} weight="bold" aria-hidden="true" />,
        precio: '14.900',
        boton: 'Elegir Plan Premium',
        destacado: true,
        incluye: [
            'Todo lo del Plan Básico.',
            'Hasta 15 fotos de trabajos.',
            'Estadísticas básicas de visitas y contactos del mes.',
        ],
    },
    {
        nombre: 'Plan Full',
        icono: <CrownIcon size={28} weight="bold" aria-hidden="true" />,
        precio: '29.900',
        boton: 'Elegir Plan Full',
        destacado: false,
        incluye: [
            'Todo lo del Plan Premium.',
            'Fotos e imágenes ilimitadas.',
            'Estadísticas avanzadas y evolución mes a mes.',
        ],
    },
];

export default function Planes() {
    return (
        <section id="planes" aria-labelledby="titulo-planes" className="bg-arena/50">
            {/* Ensancho el contenedor para que las tarjetas no queden angostas con tanto espacio entre ellas */}
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 lg:py-32">
                <div className="mx-auto max-w-5xl text-center">
                    <p className="text-sm font-medium tracking-wide uppercase">
                        Para profesionales, proveedores e inmobiliarias
                    </p>

                    <h2
                        id="titulo-planes"
                        className="mt-6 text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl"
                    >
                        Llegá a familias que ya están <span className="text-terracota">listas para construir</span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-mocha">
                        Conversás con familias que ya definieron qué quieren construir y cuánto pueden ahorrar
                        para&nbsp;empezar.
                    </p>
                </div>

                {/* En celu y tablet van uno debajo del otro en una columna centrada, y en escritorio los tres en fila */}
                <ul className="mx-auto mt-14 flex max-w-md flex-col gap-8 lg:mt-16 lg:max-w-none lg:flex-row lg:gap-12">
                    {beneficios.map((beneficio) => (
                        <li key={beneficio.titulo} className="flex items-center gap-4 lg:flex-1">
                            <span className="shrink-0 text-terracota">{beneficio.icono}</span>
                            <div>
                                <p className="font-semibold">{beneficio.titulo}</p>
                                <p className="mt-1 text-mocha">{beneficio.descripcion}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Las tres tarjetas quedan a la misma altura y el Premium se destaca solo por el color y la etiqueta */}
                <ul className="mx-auto mt-20 grid max-w-sm gap-24 lg:mt-24 lg:max-w-none lg:grid-cols-3 lg:gap-20">
                    {planes.map((plan) => (
                        <li
                            key={plan.nombre}
                            className={`relative flex flex-col rounded-3xl px-7 py-9 lg:px-8 lg:py-10 ${sombra} ${
                                plan.destacado ? 'bg-terracota text-crema' : 'bg-arena'
                            }`}
                        >
                            <h3 className="flex items-center gap-3 text-xl font-semibold">
                                <span className={plan.destacado ? '' : 'text-terracota'}>{plan.icono}</span>
                                {plan.nombre}
                            </h3>

                            {/* Pongo la etiqueta sobre el borde de arriba para que no mueva el contenido y las tres tarjetas queden alineadas */}
                            {plan.destacado && (
                                <span
                                    className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-crema px-4 py-1 text-sm font-medium tracking-wide whitespace-nowrap text-cafe uppercase ${sombra}`}
                                >
                                    Recomendado
                                </span>
                            )}

                            <p className="mt-6">
                                <span className="text-2xl font-semibold">$ </span>
                                <span className="text-5xl font-semibold">{plan.precio}</span>
                                <span className="mt-1 block">por mes</span>
                            </p>

                            <div className="mt-8">
                                <Boton href="/bienvenida" variante={plan.destacado ? 'claro' : 'principal'}>
                                    {plan.boton}
                                </Boton>
                            </div>

                            <p className="mt-8 font-semibold">Incluye:</p>
                            <ul className="mt-4 flex flex-col gap-4">
                                {plan.incluye.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        {/* La tilde es decorativa, la lista ya separa los ítems */}
                                        <CheckIcon
                                            size={20}
                                            weight="bold"
                                            aria-hidden="true"
                                            className={`mt-0.5 shrink-0 ${plan.destacado ? '' : 'text-terracota'}`}
                                        />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}