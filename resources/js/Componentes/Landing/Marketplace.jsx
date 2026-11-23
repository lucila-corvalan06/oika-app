import { BuildingsIcon, CheckIcon, HardHatIcon, TruckIcon } from '@phosphor-icons/react';
import { pegarConectores } from '../../formato';

const beneficios = [
    'Profesionales, proveedores e inmobiliarias en un solo lugar.',
    'Perfiles con fotos de trabajos y calificaciones.',
    'Contacto por WhatsApp o mail, con un toque.',
];

const negocios = [
    { Icono: HardHatIcon, nombre: 'Profesionales', detalle: 'Los oficios que necesita cada etapa de tu obra' },
    { Icono: TruckIcon, nombre: 'Proveedores', detalle: 'Dónde comprar lo que necesita tu obra' },
    { Icono: BuildingsIcon, nombre: 'Inmobiliarias', detalle: 'Para encontrar dónde construir tu hogar' },
];

export default function Marketplace() {
    return (
        <section id="marketplace" aria-labelledby="titulo-marketplace">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-32">
                {/* Pongo el texto primero en el código para que el lector de pantalla lo lea antes que el panel */}
                <div className="md:mx-auto md:w-full md:max-w-2xl lg:col-start-2 lg:row-start-1 lg:max-w-none">
                    <h2
                        id="titulo-marketplace"
                        className="text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl"
                    >
                        Un marketplace de <span className="text-terracota">confianza</span>
                    </h2>

                    <p className="mt-6 max-w-xl text-lg text-mocha">
                        Las familias encuentran quién construya y los profesionales encuentran familias listas
                        para&nbsp;empezar.
                    </p>

                    <ul className="mt-6 flex flex-col gap-3">
                        {beneficios.map((beneficio) => (
                            <li key={beneficio} className="flex items-start gap-3">
                                {/* La tilde es decorativa, la lista ya separa los ítems */}
                                <CheckIcon size={24} weight="bold" aria-hidden="true" className="shrink-0 text-terracota" />
                                <span>{pegarConectores(beneficio)}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Todavía no hay pantalla del marketplace, así que muestro a quién vas a encontrar */}
                {/* Cada ítem va en una tarjeta crema porque el texto crema sobre terracota no tiene buen contraste */}
                <ul
                    aria-label="Negocios que encontrás en oika"
                    className="flex flex-col gap-3 rounded-3xl bg-terracota p-5 sm:gap-4 sm:p-8 md:mx-auto md:w-full md:max-w-2xl lg:col-start-1 lg:row-start-1 lg:max-w-none lg:rounded-[28px] lg:p-12"
                >
                    {negocios.map(({ Icono, nombre, detalle }) => (
                        <li key={nombre} className="flex items-center gap-3 rounded-2xl bg-crema p-4 sm:gap-4 sm:p-5">
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-arena text-terracota sm:size-13">
                                <Icono size={24} weight="bold" aria-hidden="true" />
                            </span>
                            <span>
                                <span className="block text-lg font-semibold text-cafe">{nombre}</span>
                                <span className="block text-mocha">{pegarConectores(detalle)}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}