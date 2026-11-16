import Boton from '../Boton';

export default function Planificador() {
    return (
        <section id="planificador" aria-labelledby="titulo-planificador" className="bg-terracota text-white">
            {/* Uso la misma grilla que Cómo funciona para apilar texto, mockup y botón en celu y acomodarlos en dos columnas en escritorio */}
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0 lg:py-24">
                <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
                    <h2
                        id="titulo-planificador"
                        className="text-3xl leading-tight font-semibold text-balance sm:text-4xl"
                    >
                        Construí a tu ritmo, sin endeudarte
                    </h2>

                    <p className="mt-4 max-w-xl text-lg">
                        Tu obra avanza por etapas, y tu ahorro también. Juntá el dinero de una etapa por vez y empezá
                        cuando su barra esté completa.
                    </p>
                </div>

                {/* Dejo este espacio para el mockup de la pantalla Ahorro, que sumo cuando esté hecho el planificador */}
                <div
                    aria-hidden="true"
                    className="min-h-80 w-full rounded-2xl bg-crema/15 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-96"
                />

                {/* En tablet lo centro y le doy más ancho, y en escritorio lo devuelvo a su tamaño al costado del mockup */}
                <div className="sm:justify-self-start md:w-3/5 md:justify-self-center lg:col-start-1 lg:row-start-2 lg:mt-8 lg:w-auto lg:self-start lg:justify-self-start">
                    <Boton href="/bienvenida" variante="claro">
                        Empezá gratis
                    </Boton>
                </div>
            </div>
        </section>
    );
}