import Boton from '../../Componentes/Boton';
import LayoutFamilia from '../../Componentes/LayoutFamilia';
import ListaEtapas from '../../Componentes/ListaEtapas';

export default function Inicio({ nombre, tieneProyecto }) {
    return (
        <LayoutFamilia activa="inicio">
            <h1 className="text-3xl font-semibold">Hola, {nombre}</h1>
            <p className="mt-2">Armemos tu hogar etapa por etapa, a tu ritmo.</p>

            {/* Cambio la tarjeta según haya proyecto guardado para no pedirle que lo arme de nuevo */}
            {tieneProyecto ? (
                <section className="mt-6 rounded-3xl bg-arena/50 p-6">
                    <h2 className="text-xl font-semibold">Tu proyecto está guardado</h2>
                    <p className="mt-2">Revisá tus respuestas y las etapas de tu obra cuando quieras.</p>

                    <div className="mt-6">
                        <Boton href="/familia/proyecto">Ver mi proyecto</Boton>
                    </div>
                </section>
            ) : (
                <section className="mt-6 rounded-3xl bg-arena/50 p-6">
                    <h2 className="text-xl font-semibold">Armá tu proyecto</h2>
                    <p className="mt-2">Contanos cómo imaginás tu hogar y armamos tu proyecto, etapa por etapa.</p>

                    <h3 className="mt-6 text-sm font-semibold">Tu obra se organiza en 5 etapas</h3>
                    <ListaEtapas className="mt-3" />

                    <div className="mt-6">
                        <Boton href="/familia/proyecto/plantas">Empezar</Boton>
                    </div>
                </section>
            )}
        </LayoutFamilia>
    );
}