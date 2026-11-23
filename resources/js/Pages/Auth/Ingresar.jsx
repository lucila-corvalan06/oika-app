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
        <div className="flex min-h-dvh flex-col bg-crema md:bg-terracota xl:flex-row">
            <Head title="Iniciar sesión" />

            {/* El bloque de marca aparece desde tablet; en celu dejo la pantalla limpia porque el teclado ocupa media pantalla */}
            <header className="relative hidden h-[32dvh] min-h-64 shrink-0 flex-col justify-between overflow-hidden px-12 pt-10 pb-14 md:flex xl:h-auto xl:w-1/2 xl:px-16 xl:pt-14 xl:pb-18">
                {/* La trama es decoración, por eso va como fondo y no como imagen que lea el lector de pantalla */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('/img/trama.png')" }}
                />
                <Imagotipo claro className="relative h-11 w-auto self-start" />
                <p className="relative text-6xl leading-none text-crema xl:text-7xl">
                    <span className="block">Tu hogar,</span>
                    <span className="block font-semibold">a tu ritmo</span>
                </p>
            </header>

            {/* Desde tablet la hoja se monta 20 px sobre el terracota, igual que en la bienvenida */}
            <main className="relative flex flex-1 flex-col bg-crema px-6 py-6 md:-mt-5 md:rounded-t-[20px] md:px-12 md:pt-13 md:pb-12 xl:mt-0 xl:-ml-5 xl:justify-center xl:rounded-l-[20px] xl:rounded-tr-none xl:px-24">
                <div className="mx-auto flex w-full max-w-md flex-1 flex-col md:mx-0 md:max-w-none md:flex-none xl:max-w-md">
                    {/* En celu el logo va arriba del título; desde tablet ya está en el bloque de marca */}
                    <Imagotipo className="h-8 w-auto self-start md:hidden" />

                    {/* Desde tablet el tamaño ya marca la jerarquía, por eso alcanza con medium */}
                    <h1 className="mt-8 text-3xl font-semibold md:mt-0 md:text-5xl md:leading-tight md:font-medium md:tracking-tight">
                        Iniciá sesión
                    </h1>
                    <p className="mt-2 md:mt-3 md:text-xl md:text-mocha">Ingresá con tu cuenta para seguir con tu obra.</p>

                    <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col md:mt-8 md:flex-none">
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
                                    <button type="button" className="min-h-12 text-sm underline md:text-base">
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

                        {/* En celu mt-auto empuja el botón al pie; desde tablet el formulario no estira y el botón queda pegado */}
                        <div className="mt-auto pt-8 md:pt-10">
                            <Boton type="submit" disabled={processing}>
                                Iniciar sesión
                            </Boton>
                        </div>
                    </form>

                    <p className="mt-4 text-center text-sm md:text-base">
                        ¿No tenés cuenta?{' '}
                        <Link href="/registrarse" className="font-medium underline">
                            Crear cuenta
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}