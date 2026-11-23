import { Head, useForm } from '@inertiajs/react';
import BotonesPie from '../../../Componentes/BotonesPie';
import Contador from '../../../Componentes/Contador';
import IndicadorPaso from '../../../Componentes/IndicadorPaso';

export default function Dormitorios({ dormitorios, banos, volverAlResumen }) {
    const { data, setData, post, processing, errors } = useForm({
        dormitorios,
        banos,
    });

    function enviar(evento) {
        evento.preventDefault();
        // Mando el volver en la dirección para que el servidor sepa que estoy editando.
        post(volverAlResumen ? '/familia/proyecto/dormitorios?volver=resumen' : '/familia/proyecto/dormitorios');
    }

    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6 md:max-w-none md:px-12 md:py-10 xl:max-w-5xl xl:px-0 xl:py-12">
            <Head title="Dormitorios y baños" />
            <IndicadorPaso actual={2} total={6} editando={volverAlResumen} />

            {/* Desde tablet centro la pregunta, los contadores y los botones en el alto que queda, igual que en plantas */}
            <main className="mt-8 flex flex-1 flex-col md:mt-10 md:justify-center">
                {/* Uno las palabras cortas con la que sigue para que ninguna quede colgada al final de la línea */}
                <h1 className="text-3xl font-semibold md:text-center md:text-5xl md:leading-tight md:font-medium md:tracking-tight">
                    ¿Cuántos dormitorios y&nbsp;baños tendrá tu&nbsp;hogar?
                </h1>
                <p className="mt-2 md:mt-3 md:text-center md:text-xl md:text-mocha">Sumá o quitá según lo que necesites.</p>

                {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col md:mt-10 md:flex-none">
                    {/* Los dejo siempre uno abajo del otro porque lado a lado se leen de corrido; en compu los angosto y centro */}
                    <div className="flex flex-col gap-3 md:gap-4 xl:mx-auto xl:w-full xl:max-w-xl">
                        {/* Envuelvo cada contador con su error para que en la grilla el mensaje quede siempre debajo de su contador */}
                        <div>
                            <Contador
                                id="dormitorios"
                                etiqueta="Dormitorios"
                                singular="dormitorio"
                                valor={data.dormitorios}
                                minimo={1}
                                maximo={5}
                                onChange={(valor) => setData('dormitorios', valor)}
                            />
                            {errors.dormitorios && (
                                <p role="alert" className="mt-2 text-sm text-negativo md:text-base">
                                    {errors.dormitorios}
                                </p>
                            )}
                        </div>

                        <div>
                            <Contador
                                id="banos"
                                etiqueta="Baños"
                                singular="baño"
                                valor={data.banos}
                                minimo={1}
                                maximo={5}
                                onChange={(valor) => setData('banos', valor)}
                            />
                            {errors.banos && (
                                <p role="alert" className="mt-2 text-sm text-negativo md:text-base">
                                    {errors.banos}
                                </p>
                            )}
                        </div>
                    </div>

                    <BotonesPie volverA="/familia/proyecto/plantas" editando={volverAlResumen} desactivado={processing} />
                </form>
            </main>
        </div>
    );
}