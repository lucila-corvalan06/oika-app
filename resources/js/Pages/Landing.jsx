import Cabecera from '../Componentes/Landing/Cabecera';
import ComoFunciona from '../Componentes/Landing/ComoFunciona';
import Hero from '../Componentes/Landing/Hero';
import Marketplace from '../Componentes/Landing/Marketplace';
import Planificador from '../Componentes/Landing/Planificador';
import Problema from '../Componentes/Landing/Problema';

export default function Landing() {
    return (
        <>
            <Cabecera />

            {/* Dejo el id para que el enlace de saltar al contenido tenga a dónde ir */}
            <main id="contenido">
                <Hero />
                <Problema />
                <ComoFunciona />
                <Planificador />
                <Marketplace />
            </main>
        </>
    );
}