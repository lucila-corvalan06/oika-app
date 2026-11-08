import { useForm } from '@inertiajs/react';

// Dejo esta pantalla sin estilo hasta la Fase 2, ahora solo compruebo que el registro funciona
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
        <main>
            <h1>Creá tu cuenta</h1>
            <form onSubmit={enviar} noValidate>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        value={data.name}
                        onChange={(evento) => setData('name', evento.target.value)}
                    />
                    {errors.name && <p role="alert">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={data.email}
                        onChange={(evento) => setData('email', evento.target.value)}
                    />
                    {errors.email && <p role="alert">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        value={data.password}
                        onChange={(evento) => setData('password', evento.target.value)}
                    />
                    {errors.password && <p role="alert">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="password_confirmation">Repetí la contraseña</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={(evento) => setData('password_confirmation', evento.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="terminos">
                        <input
                            id="terminos"
                            type="checkbox"
                            checked={data.terminos}
                            onChange={(evento) => setData('terminos', evento.target.checked)}
                        />
                        Acepto los términos y condiciones
                    </label>
                    {errors.terminos && <p role="alert">{errors.terminos}</p>}
                </div>

                <button type="submit" disabled={processing}>
                    Crear cuenta
                </button>
            </form>
        </main>
    );
}