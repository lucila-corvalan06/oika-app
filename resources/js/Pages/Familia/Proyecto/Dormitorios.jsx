import { useForm } from '@inertiajs/react';
import Boton from '../../../Componentes/Boton';
import Contador from '../../../Componentes/Contador';
import IndicadorPaso from '../../../Componentes/IndicadorPaso';

export default function Dormitorios({ dormitorios, banos }) {
    const { data, setData, post, processing, errors } = useForm({
        dormitorios,
        banos,
    });

    function enviar(evento) {
        evento.preventDefault();
        post('/familia/proyecto/dormitorios');
    }

    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6">
            <IndicadorPaso actual={2} total={5} />

            <main className="mt-8 flex flex-1 flex-col">
                <h1 className="text-3xl font-semibold">¿Cuántos dormitorios y baños tendrá tu casa?</h1>
                <p className="mt-2">Sumá o quitá según lo que necesites.</p>

                {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col">
                    <div className="flex flex-col gap-3">
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
                            <p role="alert" className="text-sm text-negativo">
                                {errors.dormitorios}
                            </p>
                        )}

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
                            <p role="alert" className="text-sm text-negativo">
                                {errors.banos}
                            </p>
                        )}
                    </div>

                    <div className="mt-auto flex gap-3 pt-8">
                        <Boton href="/familia/proyecto/plantas" variante="secundaria" className="flex-1">
                            Volver
                        </Boton>
                        <Boton type="submit" disabled={processing} className="flex-1">
                            Continuar
                        </Boton>
                    </div>
                </form>
            </main>
        </div>
    );
}