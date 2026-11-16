import Cabecera from '../Componentes/Landing/Cabecera';
import Hero from '../Componentes/Landing/Hero';
import Problema from '../Componentes/Landing/Problema';

export default function Landing() {
    return (
        <>
            <Cabecera />

            {/* Dejo el id para que el enlace de saltar al contenido tenga a dónde ir */}
            <main id="contenido">
                <Hero />
                <Problema />
            </main>
        </>
    );
}