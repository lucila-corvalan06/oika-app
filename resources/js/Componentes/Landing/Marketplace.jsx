import { CheckIcon } from '@phosphor-icons/react';

const beneficios = [
    'Profesionales, proveedores e inmobiliarias en un solo lugar.',
    'Perfiles con fotos de trabajos y calificaciones.',
    'Contacto por WhatsApp o mail, con un toque.',
];

export default function Marketplace() {
    return (
        <section id="marketplace" aria-labelledby="titulo-marketplace">
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
                {/* Dejo el texto primero en el código para que el lector de pantalla lo lea antes que el espacio de la imagen, y en escritorio lo paso a la derecha con la grilla */}
                <div className="md:mx-auto md:w-full md:max-w-2xl lg:col-start-2 lg:row-start-1 lg:max-w-none">
                    <h2
                        id="titulo-marketplace"
                        className="text-3xl leading-tight font-semibold text-balance sm:text-4xl"
                    >
                        Un marketplace de <span className="text-terracota">confianza</span>
                    </h2>

                    <p className="mt-4 max-w-xl text-lg">
                        Las familias encuentran quién construya y los profesionales encuentran familias listas para
                        empezar.
                    </p>

                    <ul className="mt-6 flex flex-col gap-3">
                        {beneficios.map((beneficio) => (
                            <li key={beneficio} className="flex items-start gap-3">
                                {/* La tilde es decorativa, la lista ya separa los ítems */}
                                <CheckIcon size={24} weight="bold" aria-hidden="true" className="shrink-0 text-terracota" />
                                <span>{beneficio}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Dejo este espacio para la imagen de la sección, que sumo más adelante */}
                <div
                    aria-hidden="true"
                    className="min-h-80 w-full rounded-2xl bg-arena md:mx-auto md:max-w-2xl lg:col-start-1 lg:row-start-1 lg:min-h-96 lg:max-w-none"
                />
            </div>
        </section>
    );
}