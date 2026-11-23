import Boton from '../Boton';

export default function Planificador() {
    return (
        // Uso el arena suave de Problema para que no queden tres secciones crema seguidas
        <section id="planificador" aria-labelledby="titulo-planificador" className="bg-arena/50">
            {/* Uso la misma grilla que Cómo funciona para apilar texto, captura y botón en celu y acomodarlos en dos columnas en escritorio */}
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0 lg:py-32">
                <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
                    <h2
                        id="titulo-planificador"
                        className="text-3xl leading-tight font-semibold text-cafe sm:text-4xl lg:text-5xl"
                    >
                        Construí a tu ritmo,{' '}
                        <span className="block text-terracota">sin endeudarte</span>
                    </h2>

                    <p className="mt-6 max-w-xl text-lg text-mocha">
                        Tu obra avanza por etapas, y tu ahorro también. Juntá el dinero de una etapa por vez y empezá
                        cuando su barra esté&nbsp;completa.
                    </p>
                </div>

                <div className="relative h-80 w-full overflow-hidden rounded-3xl bg-terracota sm:h-96 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[28rem] lg:rounded-[28px]">
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: "url('/img/trama.png')" }}
                    />
                    {/* Con picture el navegador elige un solo recorte según el ancho, así el celu no descarga el de escritorio */}
                    {/* Va con carga diferida porque la sección está más abajo y no compite con lo primero que se ve */}
                    <picture>
                        <source media="(min-width: 1024px)" srcSet="/img/landing/captura-etapas.webp" width="1000" height="744" />
                        <img
                            src="/img/landing/captura-etapas-celu.webp"
                            alt="Las cinco etapas de obra de un hogar en oika, con el costo y las semanas de cada una"
                            width="780"
                            height="949"
                            loading="lazy"
                            className="absolute top-8 left-1/2 w-[85%] max-w-sm -translate-x-1/2 rounded-2xl shadow-[0_24px_60px_rgba(52,39,31,0.35)] lg:top-14 lg:w-[90%] lg:max-w-none"
                        />
                    </picture>
                </div>

                {/* En tablet lo centro y le doy más ancho, y en escritorio lo devuelvo a su tamaño al costado de la captura */}
                <div className="sm:w-3/5 sm:justify-self-center lg:col-start-1 lg:row-start-2 lg:mt-8 lg:w-auto lg:self-start lg:justify-self-start">
                    <Boton href="/bienvenida">Empezá gratis</Boton>
                </div>
            </div>
        </section>
    );
}