import { Head, Link, useForm } from '@inertiajs/react';
import Boton from '../../Componentes/Boton';
import Campo from '../../Componentes/Campo';
import Checkbox from '../../Componentes/Checkbox';
import IndicadorPaso from '../../Componentes/IndicadorPaso';
import Imagotipo from '../../Componentes/Imagotipo';

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
        <div className="flex min-h-dvh flex-col bg-crema xl:flex-row xl:bg-terracota">
            <Head title="Creá tu cuenta" />

            {/* El bloque de marca aparece solo en compu; en celu y tablet el formulario largo necesita todo el alto */}
            <header className="relative hidden overflow-hidden xl:flex xl:w-1/2 xl:flex-col xl:justify-between xl:px-16 xl:pt-14 xl:pb-18">
                {/* La trama es decoración, por eso va como fondo y no como imagen que lea el lector de pantalla */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('/img/trama.png')" }}
                />
                <Imagotipo claro className="relative h-11 w-auto self-start" />
                <p className="relative text-7xl leading-none text-crema">
                    <span className="block">Tu hogar,</span>
                    <span className="block font-semibold">a tu ritmo</span>
                </p>
            </header>

            {/* En compu la hoja se monta 20 px sobre el terracota, igual que en ingresar */}
            <main className="relative flex flex-1 flex-col bg-crema px-6 py-6 md:px-12 md:py-10 xl:-ml-5 xl:justify-center xl:rounded-l-[20px] xl:px-24 xl:py-12">
                <div className="mx-auto flex w-full max-w-md flex-1 flex-col md:max-w-none xl:mx-0 xl:max-w-lg xl:flex-none">
                    <IndicadorPaso actual={2} total={2} />

                    {/* En tablet centro el formulario en el alto que queda, igual que en elegir rol */}
                    <div className="mt-8 flex flex-1 flex-col md:mt-0 md:justify-center xl:mt-7 xl:flex-none">
                        <h1 className="text-3xl font-semibold md:text-center md:text-5xl md:leading-tight md:font-medium md:tracking-tight xl:text-left xl:text-4xl">
                            Creá tu cuenta
                        </h1>
                        <p className="mt-2 md:mt-3 md:text-center md:text-xl md:text-mocha xl:mt-2 xl:text-left xl:text-lg">
                            Completá tus datos para empezar.
                        </p>

                        {/* Uso noValidate para que valide solo el servidor y no el navegador */}
                        <form onSubmit={enviar} noValidate className="mt-6 flex flex-1 flex-col md:mt-10 md:flex-none xl:mt-6">
                            {/* En compu paso a dos columnas para que el formulario entre sin scrollear, con las contraseñas lado a lado */}
                            <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2 xl:items-start">
                                <Campo
                                    id="name"
                                    etiqueta="Nombre completo"
                                    autoComplete="name"
                                    placeholder="Nombre y apellido"
                                    value={data.name}
                                    onChange={(evento) => setData('name', evento.target.value)}
                                    error={errors.name}
                                    className="xl:col-span-2"
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
                                    className="xl:col-span-2"
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
                                    className="xl:col-span-2"
                                />
                            </div>

                            {/* En celu mt-auto empuja los botones al pie; desde tablet el formulario no estira y quedan pegados */}
                            <div className="mt-auto flex gap-3 pt-8 md:pt-12 xl:pt-6">
                                <Boton href="/registrarse" variante="secundaria" className="flex-1">
                                    Volver
                                </Boton>
                                <Boton type="submit" disabled={processing} className="flex-1">
                                    Crear cuenta
                                </Boton>
                            </div>
                        </form>

                        <p className="mt-4 text-center text-sm md:text-base">
                            ¿Ya tenés cuenta?{' '}
                            <Link href="/ingresar" className="font-medium underline">
                                Iniciá sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}