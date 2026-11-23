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
        // Desde tablet paso la tarjeta a grilla para pararla: ícono y círculo arriba, textos abajo
        <label
            htmlFor={id}
            className={`flex min-h-12 items-center gap-4 rounded-2xl border-2 p-4 md:grid md:grid-cols-[1fr_auto] md:content-start md:items-start md:gap-y-5 md:p-5 ${
                checked ? 'border-terracota' : 'border-arena'
            } ${deshabilitada ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
            {/* Dibujo el cuadro solo si llega un ícono para que una tarjeta de solo texto no deje un hueco vacío */}
            {icono && (
                <span
                    aria-hidden="true"
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl bg-arena text-mocha md:size-14 ${
                        deshabilitada ? 'opacity-60' : ''
                    }`}
                >
                    {icono}
                </span>
            )}

            <span className="flex-1 md:col-span-2 md:row-start-2">
                {/* Atenúo solo el texto, así la etiqueta "Próximamente" se sigue leyendo bien */}
                <span className={deshabilitada ? 'opacity-60' : ''}>
                    <span className="block font-medium md:text-lg">{titulo}</span>
                    <span className="block text-sm md:mt-1 md:text-base">{descripcion}</span>
                </span>

                {deshabilitada && (
                    <span className="mt-1 inline-block rounded-full bg-arena px-2 py-0.5 text-xs font-medium md:mt-3 md:px-2.5 md:text-sm">
                        Próximamente
                    </span>
                )}
            </span>

            <span className="relative flex size-6 shrink-0 items-center justify-center md:col-start-2 md:row-start-1">
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
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute size-3 rounded-full bg-terracota opacity-0 peer-checked:opacity-100"
                />
            </span>
        </label>
    );
}