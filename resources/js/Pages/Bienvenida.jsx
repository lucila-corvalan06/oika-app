import { Head } from '@inertiajs/react';
import Boton from '../Componentes/Boton';
import Imagotipo from '../Componentes/Imagotipo';

export default function Bienvenida() {
    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6">
            <Head title="Bienvenida" />
            <header>
                <Imagotipo className="h-8 w-auto" />
            </header>

            <main className="mt-6 flex flex-1 flex-col">
                {/* La ilustración es decorativa, por eso la escondo de los lectores de pantalla */}
                <div aria-hidden="true" className="min-h-48 flex-1 rounded-2xl bg-arena" />

                <h1 className="mt-8 text-3xl font-semibold">Construí tu hogar a tu ritmo</h1>
                <p className="mt-2">Organizá tu obra por etapas y avanzá según lo que podés ahorrar.</p>

                <div className="mt-8 flex flex-col gap-3">
                    <Boton href="/registrarse">Crear cuenta</Boton>
                    <Boton href="/ingresar" variante="secundaria">
                        Ya tengo cuenta
                    </Boton>
                </div>
            </main>
        </div>
    );
}