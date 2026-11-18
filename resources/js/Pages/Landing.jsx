import Cabecera from '../Componentes/Landing/Cabecera';
import Cierre from '../Componentes/Landing/Cierre';
import ComoFunciona from '../Componentes/Landing/ComoFunciona';
import Hero from '../Componentes/Landing/Hero';
import Marketplace from '../Componentes/Landing/Marketplace';
import Pie from '../Componentes/Landing/Pie';
import Planes from '../Componentes/Landing/Planes';
import Planificador from '../Componentes/Landing/Planificador';
import Preguntas from '../Componentes/Landing/Preguntas';
import Problema from '../Componentes/Landing/Problema';

export default function Landing() {
    return (
        <>
            <Cabecera />

            <main>
                <Hero />
                <Problema />
                <ComoFunciona />
                <Planificador />
                <Marketplace />
                <Planes />
                <Preguntas />
                <Cierre />
            </main>

            <Pie />
        </>
    );
}