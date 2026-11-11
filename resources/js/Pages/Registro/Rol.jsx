import { Link, useForm } from '@inertiajs/react';
import { BuildingsIcon, HardHatIcon, HouseIcon, TruckIcon } from '@phosphor-icons/react';
import Boton from '../../Componentes/Boton';
import IndicadorPaso from '../../Componentes/IndicadorPaso';
import TarjetaRol from '../../Componentes/TarjetaRol';

// Para la demo dejo solo usuario final habilitado, el servidor igual valida el rol que llega
const opciones = [
    {
        valor: 'usuario_final',
        titulo: 'Usuario final',
        descripcion: 'Quiero construir mi vivienda por etapas.',
        icono: <HouseIcon size={24} weight="bold" />,
        disponible: true,
    },
    {
        valor: 'profesional',
        titulo: 'Profesional',
        descripcion: 'Ofrezco servicios de obra o diseño.',
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
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6">
            <IndicadorPaso actual={1} total={2} />

            <main className="mt-8 flex flex-1 flex-col">
                <h1 className="text-3xl font-semibold">¿Cómo vas a usar oika?</h1>
                <p className="mt-2">Elegí la opción que mejor te describe.</p>

                {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col">
                    <fieldset className="flex flex-col gap-3">
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
                        <p role="alert" className="mt-2 text-sm text-negativo">
                            {errors.rol}
                        </p>
                    )}

                    <div className="mt-auto flex gap-3 pt-8">
                        <Boton href="/" variante="secundaria" className="flex-1">
                            Volver
                        </Boton>
                        <Boton type="submit" disabled={processing} className="flex-1">
                            Continuar
                        </Boton>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm">
                    ¿Ya tenés cuenta?{' '}
                    <Link href="/ingresar" className="font-medium underline">
                        Iniciá sesión
                    </Link>
                </p>
            </main>
        </div>
    );
}