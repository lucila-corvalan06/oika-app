import { Head } from '@inertiajs/react';
import Boton from '../Componentes/Boton';
import Imagotipo from '../Componentes/Imagotipo';

export default function Bienvenida() {
    return (
        <div className="flex min-h-dvh flex-col bg-terracota xl:flex-row">
            <Head title="Bienvenida" />

            {/* Hasta tablet le fijo el alto al bloque de marca, así la hoja con la acción gana protagonismo */}
            <header className="relative flex h-[40dvh] min-h-72 shrink-0 flex-col justify-between overflow-hidden px-6 pt-7 pb-10 md:px-12 md:pt-10 md:pb-14 xl:h-auto xl:w-1/2 xl:px-16 xl:pt-14 xl:pb-18">
                {/* La trama es decoración, por eso va como fondo y no como imagen que lea el lector de pantalla */}
                {/* Paso la ruta en línea para que llegue tal cual al navegador, sin que la procese el armado de estilos */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('/img/trama.png')" }}
                />
                <Imagotipo claro className="relative h-9 w-auto self-start md:h-11" />
                <p className="relative text-5xl leading-none text-crema md:text-7xl">
                    <span className="block">Tu hogar,</span>
                    <span className="block font-semibold">a tu ritmo</span>
                </p>
            </header>

            {/* La hoja se monta 20 px sobre el terracota, arriba hasta tablet y a la izquierda en escritorio */}
            <main className="relative -mt-5 flex flex-1 flex-col rounded-t-[20px] bg-crema px-6 pt-12 pb-10 md:px-12 md:pt-16 md:pb-14 xl:mt-0 xl:-ml-5 xl:justify-center xl:rounded-l-[20px] xl:rounded-tr-none xl:px-24">
                {/* Hasta tablet separo el texto arriba y los botones al pie; en escritorio van juntos y centrados */}
                <div className="flex flex-1 flex-col justify-between gap-10 xl:max-w-lg xl:flex-none xl:justify-start xl:gap-18">
                    <div>
                        {/* Uno "la" con "bienvenida" con un espacio que no corta, así "la" nunca queda colgada */}
                        <h1 className="text-4xl leading-[1.1] tracking-tight md:text-6xl xl:text-5xl">
                            <span className="font-medium">Te damos la</span>&nbsp;
                            <span className="font-semibold">bienvenida</span>
                        </h1>
                        <p className="mt-3 text-lg text-mocha md:mt-4 md:text-2xl xl:mt-5">
                            Organizá tu obra por etapas y&nbsp;avanzá según lo que podés ahorrar.
                        </p>
                    </div>

                    {/* En escritorio pongo los botones lado a lado, para que no queden como barras larguísimas */}
                    <div className="flex flex-col gap-3 xl:flex-row xl:gap-4">
                        <Boton href="/registrarse" tamano="grande" className="xl:min-h-13 xl:text-[17px]">
                            Crear cuenta
                        </Boton>
                        <Boton
                            href="/ingresar"
                            variante="secundaria"
                            tamano="grande"
                            className="xl:min-h-13 xl:text-[17px]"
                        >
                            Ya tengo cuenta
                        </Boton>
                    </div>
                </div>
            </main>
        </div>
    );
}