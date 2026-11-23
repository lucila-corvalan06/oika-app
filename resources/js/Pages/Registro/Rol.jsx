import { Head, Link, useForm } from '@inertiajs/react';
import { BuildingsIcon, HardHatIcon, HouseIcon, TruckIcon } from '@phosphor-icons/react';
import Boton from '../../Componentes/Boton';
import IndicadorPaso from '../../Componentes/IndicadorPaso';
import TarjetaRol from '../../Componentes/TarjetaRol';

// Para la demo dejo solo la familia habilitada, el servidor igual valida el rol que llega
// Cambio solo los textos que se ven; el valor queda igual porque es lo que recibe el servidor
const opciones = [
    {
        valor: 'usuario_final',
        titulo: 'Familia',
        descripcion: 'Quiero construir mi hogar.',
        icono: <HouseIcon size={24} weight="bold" />,
        disponible: true,
    },
    {
        valor: 'profesional',
        titulo: 'Oficio o profesión',
        descripcion: 'Ofrezco mis servicios para obras.',
        icono: <HardHatIcon size={24} weight="bold" />,
        disponible: false,
    },
    {
        valor: 'proveedor',
        titulo: 'Proveedor',
        descripcion: 'Vendo materiales e insumos.',
        icono: <TruckIcon size={24} weight="bold" />,
        disponible: false,
    },
    {
        valor: 'inmobiliaria',
        titulo: 'Inmobiliaria',
        descripcion: 'Publico terrenos y propiedades.',
        icono: <BuildingsIcon size={24} weight="bold" />,
        disponible: false,
    },
];

export default function Rol() {
    // Dejo el rol vacío para que no haya ninguna opción preseleccionada
    const { data, setData, post, processing, errors } = useForm({
        rol: '',
    });

    function enviar(evento) {
        evento.preventDefault();
        post('/registrarse');
    }

    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6 md:max-w-none md:px-12 md:py-10 xl:max-w-5xl xl:px-0 xl:py-12">
            <Head title="Elegí tu rol" />
            <IndicadorPaso actual={1} total={2} />

            {/* Desde tablet centro la pregunta, las opciones y los botones en el alto que queda */}
            <main className="mt-8 flex flex-1 flex-col md:mt-0 md:justify-center">
                <h1 className="text-3xl font-semibold md:text-center md:text-5xl md:leading-tight md:font-medium md:tracking-tight">
                    ¿Cómo vas a usar oika?
                </h1>
                <p className="mt-2 md:mt-3 md:text-center md:text-xl md:text-mocha">
                    Elegí la opción que mejor te describe.
                </p>

                {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col md:mt-10 md:flex-none">
                    {/* En celu las opciones van en lista; desde tablet en grilla para compararlas de un vistazo */}
                    <fieldset className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4 xl:grid-cols-4">
                        <legend className="sr-only">Tipo de cuenta</legend>
                        {opciones.map((opcion) => (
                            <TarjetaRol
                                key={opcion.valor}
                                id={`rol-${opcion.valor}`}
                                name="rol"
                                value={opcion.valor}
                                titulo={opcion.titulo}
                                descripcion={opcion.descripcion}
                                icono={opcion.icono}
                                checked={data.rol === opcion.valor}
                                onChange={(evento) => setData('rol', evento.target.value)}
                                deshabilitada={!opcion.disponible}
                            />
                        ))}
                    </fieldset>

                    {errors.rol && (
                        <p role="alert" className="mt-2 text-sm text-negativo md:text-base">
                            {errors.rol}
                        </p>
                    )}

                    {/* En compu centro los botones en una columna angosta para que no queden como barras */}
                    <div className="mt-auto flex gap-3 pt-8 md:pt-16 xl:mx-auto xl:w-full xl:max-w-lg xl:pt-18">
                        {/* Vuelvo a la Bienvenida y no a la raíz porque la raíz ahora es la Landing */}
                        <Boton href="/bienvenida" variante="secundaria" className="flex-1">
                            Volver
                        </Boton>
                        <Boton type="submit" disabled={processing} className="flex-1">
                            Continuar
                        </Boton>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm md:text-base xl:mt-6">
                    ¿Ya tenés cuenta?{' '}
                    <Link href="/ingresar" className="font-medium underline">
                        Iniciá sesión
                    </Link>
                </p>
            </main>
        </div>
    );
}