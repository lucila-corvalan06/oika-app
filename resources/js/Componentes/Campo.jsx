export default function Campo({
    id,
    etiqueta,
    type = 'text',
    value,
    onChange,
    ayuda,
    error,
    className = '',
    ...resto
}) {
    const idAyuda = `${id}-ayuda`;
    const idError = `${id}-error`;

    // Junto los ids de la ayuda y del error para que el lector de pantalla los lea con el campo.
    const descripcion = [ayuda && idAyuda, error && idError].filter(Boolean).join(' ') || undefined;

    return (
        <div className={className}>
            <label htmlFor={id} className="mb-1 block text-sm font-medium">
                {etiqueta}
            </label>

            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={descripcion}
                className={`min-h-12 w-full rounded-xl border-2 bg-arena/30 px-4 text-base placeholder:text-mocha/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota ${
                    error ? 'border-negativo' : 'border-mocha/70'
                }`}
                {...resto}
            />

            {ayuda && (
                <p id={idAyuda} className="mt-1 text-sm text-mocha">
                    {ayuda}
                </p>
            )}

            {error && (
                <p id={idError} role="alert" className="mt-1 text-sm text-negativo">
                    {error}
                </p>
            )}
        </div>
    );
}