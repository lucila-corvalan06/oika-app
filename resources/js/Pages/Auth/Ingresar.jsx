import { Head, Link, useForm } from '@inertiajs/react';
import Boton from '../../Componentes/Boton';
import Campo from '../../Componentes/Campo';
import Checkbox from '../../Componentes/Checkbox';
import Imagotipo from '../../Componentes/Imagotipo';

export default function Ingresar() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        recordar: false,
    });

    function enviar(evento) {
        evento.preventDefault();
        post('/ingresar');
    }

    return (
        <div className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-6">
            <Head title="Iniciar sesión" />
            <header>
                <Imagotipo className="h-8 w-auto" />
            </header>

            <main className="mt-8 flex flex-1 flex-col">
                <h1 className="text-3xl font-semibold">Iniciá sesión</h1>
                <p className="mt-2">Ingresá con tu cuenta para seguir con tu obra.</p>

                <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col">
                    <div className="flex flex-col gap-4">
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

                        <div>
                            <Campo
                                id="password"
                                etiqueta="Contraseña"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Ingresá tu contraseña"
                                value={data.password}
                                onChange={(evento) => setData('password', evento.target.value)}
                                error={errors.password}
                            />
                            {/* Todavía no existe la recuperación de clave, por eso es un botón sin destino */}
                            <div className="flex justify-end">
                                <button type="button" className="min-h-12 text-sm underline">
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>
                        </div>

                        <Checkbox
                            id="recordar"
                            etiqueta="Mantener sesión iniciada en este dispositivo"
                            checked={data.recordar}
                            onChange={(evento) => setData('recordar', evento.target.checked)}
                        />
                    </div>

                    {/* mt-auto empuja el botón al pie cuando sobra espacio */}
                    <div className="mt-auto pt-8">
                        <Boton type="submit" disabled={processing}>
                            Iniciar sesión
                        </Boton>
                    </div>
                </form>

                <p className="mt-4 text-center text-sm">
                    ¿No tenés cuenta?{' '}
                    <Link href="/registrarse" className="font-medium underline">
                        Crear cuenta
                    </Link>
                </p>
            </main>
        </div>
    );
}