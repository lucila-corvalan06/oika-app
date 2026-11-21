import { Head, Link, useForm } from '@inertiajs/react';
import Boton from '../../Componentes/Boton';
import Campo from '../../Componentes/Campo';
import Checkbox from '../../Componentes/Checkbox';
import IndicadorPaso from '../../Componentes/IndicadorPaso';

export default function Datos() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terminos: false,
    });

    function enviar(evento) {
        evento.preventDefault();
        post('/registrarse/datos');
    }

    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6">
            <Head title="Creá tu cuenta" />
            <IndicadorPaso actual={2} total={2} />

            <main className="mt-8 flex flex-1 flex-col">
                <h1 className="text-3xl font-semibold">Creá tu cuenta</h1>
                <p className="mt-2">Completá tus datos para empezar.</p>

                {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col">
                    <div className="flex flex-col gap-4">
                        <Campo
                            id="name"
                            etiqueta="Nombre completo"
                            autoComplete="name"
                            placeholder="Nombre y apellido"
                            value={data.name}
                            onChange={(evento) => setData('name', evento.target.value)}
                            error={errors.name}
                        />

                        <Campo
                            id="email"
                            etiqueta="Correo electrónico"
                            type="email"
                            autoComplete="email"
                            placeholder="nombre@mail.com"
                            value={data.email}
                            onChange={(evento) => setData('email', evento.target.value)}
                            error={errors.email}
                        />

                        <Campo
                            id="password"
                            etiqueta="Contraseña"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Creá tu contraseña"
                            ayuda="Usá al menos 8 caracteres."
                            value={data.password}
                            onChange={(evento) => setData('password', evento.target.value)}
                            error={errors.password}
                        />

                        <Campo
                            id="password_confirmation"
                            etiqueta="Repetir contraseña"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Repetí tu contraseña"
                            value={data.password_confirmation}
                            onChange={(evento) => setData('password_confirmation', evento.target.value)}
                        />

                        <Checkbox
                            id="terminos"
                            etiqueta="Acepto los términos y condiciones."
                            checked={data.terminos}
                            onChange={(evento) => setData('terminos', evento.target.checked)}
                            error={errors.terminos}
                        />
                    </div>

                    <div className="mt-auto flex gap-3 pt-8">
                        <Boton href="/registrarse" variante="secundaria" className="flex-1">
                            Volver
                        </Boton>
                        <Boton type="submit" disabled={processing} className="flex-1">
                            Crear cuenta
                        </Boton>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm">
                    ¿Ya tenés cuenta?{' '}
                    <Link href="/ingresar" className="font-medium underline">
                        Iniciá sesión
                    </Link>
                </p>
            </main>
        </div>
    );
}