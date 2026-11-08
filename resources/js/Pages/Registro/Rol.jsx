// Es una pantalla provisoria para comprobar que los roles llegan desde el controlador
const etiquetas = {
    usuario_final: 'Voy a construir mi casa',
    profesional: 'Soy profesional de la construcción',
};

export default function Rol({ roles }) {
    return (
        <main>
            <h1>¿Cómo querés usar Oika?</h1>
            <ul>
                {roles.map((rol) => (
                    <li key={rol}>{etiquetas[rol]}</li>
                ))}
            </ul>
        </main>
    );
}