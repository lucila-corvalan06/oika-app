import { useForm } from '@inertiajs/react';

// Dejo esta pantalla sin estilo hasta la Fase 2, ahora solo compruebo que el ingreso funciona
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
        <main>
            <h1>Ingresá a Oika</h1>
            <form onSubmit={enviar} noValidate>
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
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(evento) => setData('password', evento.target.value)}
                    />
                    {errors.password && <p role="alert">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="recordar">
                        <input
                            id="recordar"
                            type="checkbox"
                            checked={data.recordar}
                            onChange={(evento) => setData('recordar', evento.target.checked)}
                        />
                        Mantener sesión iniciada
                    </label>
                </div>

                <button type="submit" disabled={processing}>
                    Ingresar
                </button>
            </form>
        </main>
    );
}