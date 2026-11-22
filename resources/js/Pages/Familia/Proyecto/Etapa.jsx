import { Head } from '@inertiajs/react';
import LayoutFamilia from '../../../Componentes/LayoutFamilia';

// Pantalla mínima para que la ruta ya funcione; el diseño aprobado llega en el próximo paso.
export default function Etapa({ etapa }) {
    return (
        <LayoutFamilia activa="proyecto">
            <Head title={etapa.nombre} />
            <h1 className="text-3xl font-semibold">{etapa.nombre}</h1>
        </LayoutFamilia>
    );
}