import Imagotipo from './Imagotipo';
import NavegacionInferior from './NavegacionInferior';

export default function LayoutFamilia({ activa, children }) {
    return (
        <div className="flex min-h-dvh flex-col">
            <header className="mx-auto w-full max-w-md px-6 py-6">
                <Imagotipo />
            </header>

            {/* Dejo el main con flex-1 para que la navegación quede al pie aunque haya poco contenido. */}
            <main className="mx-auto w-full max-w-md flex-1 px-6 pb-6">{children}</main>

            <NavegacionInferior activa={activa} />
        </div>
    );
}