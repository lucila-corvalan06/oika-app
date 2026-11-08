import { useForm } from '@inertiajs/react';

// Es una pantalla provisoria, la estilo después con los componentes propios.
const etiquetas = {
    usuario_final: 'Voy a construir mi casa',
    profesional: 'Soy profesional de la construcción',
};

export default function Rol({ roles }) {
    // Dejo el rol vacío para que no haya ninguna opción preseleccionada.
    const { data, setData, post, processing, errors } = useForm({
        rol: '',
    });

    function enviar(evento) {
        evento.preventDefault();
        post('/registrarse');
    }

    return (
        <main>
            <h1>¿Cómo querés usar Oika?</h1>
            {/* Uso noValidate para que valide solo el servidor y no el navegador */}
            <form onSubmit={enviar} noValidate>
                <fieldset>
                    <legend>Elegí una opción</legend>
                    {roles.map((rol) => (
                        <label key={rol}>
                            <input
                                type="radio"
                                name="rol"
                                value={rol}
                                checked={data.rol === rol}
                                onChange={(evento) => setData('rol', evento.target.value)}
                            />
                            {etiquetas[rol]}
                        </label>
                    ))}
                </fieldset>
                {errors.rol && <p role="alert">{errors.rol}</p>}
                <button type="submit" disabled={processing}>
                    Continuar
                </button>
            </form>
        </main>
    );
}