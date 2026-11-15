import Cabecera from '../Componentes/Landing/Cabecera';

export default function Landing() {
    return (
        <>
            <Cabecera />

            {/* Dejo el id para que el enlace de saltar al contenido tenga a dónde ir */}
            <main id="contenido">{/* Las secciones las sumo de a una */}</main>
        </>
    );
}