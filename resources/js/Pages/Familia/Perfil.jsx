import { router } from '@inertiajs/react';
import Boton from '../../Componentes/Boton';
import LayoutFamilia from '../../Componentes/LayoutFamilia';

export default function Perfil({ nombre, email }) {
    // Salgo con POST porque la ruta de salida no acepta GET
    function cerrarSesion() {
        router.post('/salir');
    }

    return (
        <LayoutFamilia activa="perfil">
            <h1 className="text-3xl font-semibold">Perfil</h1>

            <dl className="mt-6 flex flex-col gap-4">
                <div>
                    <dt className="text-sm text-mocha">Nombre</dt>
                    <dd className="mt-0.5 text-lg">{nombre}</dd>
                </div>
                <div>
                    <dt className="text-sm text-mocha">Correo</dt>
                    <dd className="mt-0.5 break-all text-lg">{email}</dd>
                </div>
            </dl>

            <div className="mt-10">
                <Boton variante="secundaria" onClick={cerrarSesion}>
                    Cerrar sesión
                </Boton>
            </div>
        </LayoutFamilia>
    );
}