import Boton from '../Boton';

export default function Cierre() {
    return (
        <section aria-labelledby="titulo-cierre" className="bg-terracota text-white">
            {/* Uso la misma grilla que Planificador para apilar texto, mockup y botón en celu y acomodarlos en dos columnas en escritorio */}
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0 lg:py-32">
                <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
                    <h2
                        id="titulo-cierre"
                        className="text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl"
                    >
                        Tu proyecto empieza con cinco preguntas
                    </h2>

                    <p className="mt-6 max-w-xl text-lg">
                        Respondé sin apuro y mirá tu proyecto dividido en las cinco etapas de obra. Es gratis para
                        familias.
                    </p>
                </div>

                {/* Dejo este espacio para el mockup de la app, que sumo cuando esté hecho el planificador */}
                <div
                    aria-hidden="true"
                    className="min-h-80 w-full rounded-2xl bg-crema/15 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-96"
                />

                <div className="lg:col-start-1 lg:row-start-2 lg:mt-10 lg:self-start">
                    {/* Envuelvo el botón para que en celu ocupe todo el ancho y desde tablet quede del tamaño de su texto */}
                    <div className="sm:w-fit">
                        <Boton href="/bienvenida" variante="claro">
                            Armá tu proyecto gratis
                        </Boton>
                    </div>

                    {/* Dejo a los profesionales como enlace y no como botón para que no compita con la acción principal */}
                    <p className="mt-6">
                        ¿Sos profesional, proveedor o inmobiliaria?{' '}
                        <a
                            href="#planes"
                            className="font-medium whitespace-nowrap underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crema"
                        >
                            Mirá los planes <span aria-hidden="true">→</span>
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
}