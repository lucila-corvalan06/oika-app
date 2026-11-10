export default function TarjetaRol({
    id,
    name,
    value,
    titulo,
    descripcion,
    icono,
    checked,
    onChange,
    deshabilitada = false,
}) {
    return (
        <label
            htmlFor={id}
            className={`flex min-h-12 items-center gap-4 rounded-2xl border-2 p-4 ${
                checked ? 'border-terracota' : 'border-arena'
            } ${deshabilitada ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <span
                aria-hidden="true"
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-arena text-mocha ${
                    deshabilitada ? 'opacity-60' : ''
                }`}
            >
                {icono}
            </span>

            <span className="flex-1">
                {/* Atenúo solo el texto, así la etiqueta "Próximamente" se sigue leyendo bien */}
                <span className={deshabilitada ? 'opacity-60' : ''}>
                    <span className="block font-medium">{titulo}</span>
                    <span className="block text-sm">{descripcion}</span>
                </span>

                {deshabilitada && (
                    <span className="mt-1 inline-block rounded-full bg-arena px-2 py-0.5 text-xs font-medium">
                        Próximamente
                    </span>
                )}
            </span>

            <span className="relative flex size-6 shrink-0 items-center justify-center">
                <input
                    id={id}
                    type="radio"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    disabled={deshabilitada}
                    className="peer size-6 appearance-none rounded-full border-2 border-mocha/70 checked:border-terracota focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota disabled:opacity-60"
                />
                {/* Dibujo yo el punto del medio porque con appearance-none el navegador no lo pone */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute size-3 rounded-full bg-terracota opacity-0 peer-checked:opacity-100"
                />
            </span>
        </label>
    );
}