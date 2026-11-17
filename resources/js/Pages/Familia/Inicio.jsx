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
                <section className="mt-6 rounded-3xl bg-arena/50 p-6 lg:mt-10 lg:max-w-2xl lg:p-10">
                    <h2 className="text-xl font-semibold">Tu proyecto está guardado</h2>
                    <p className="mt-2">Revisá tus respuestas y las etapas de tu obra cuando quieras.</p>

                    <div className="mt-6 lg:max-w-xs">
                        <Boton href="/familia/proyecto">Ver mi proyecto</Boton>
                    </div>
                </section>
            ) : (
                <section className="mt-6 rounded-3xl bg-arena/50 p-6 lg:mt-10 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:p-10">
                    <div className="lg:col-start-1">
                        <h2 className="text-xl font-semibold">Armá tu proyecto</h2>
                        <p className="mt-2">Contanos cómo imaginás tu hogar y armamos tu proyecto, etapa por etapa.</p>
                    </div>

                    <div className="mt-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0">
                        <h3 className="text-sm font-semibold">Tu obra se organiza en 5 etapas</h3>
                        <ListaEtapas className="mt-3" />
                    </div>

                    <div className="mt-6 lg:col-start-1 lg:max-w-xs lg:self-start">
                        <Boton href="/familia/proyecto/plantas">Empezar</Boton>
                    </div>
                </section>
            )}
        </LayoutFamilia>
    );
}