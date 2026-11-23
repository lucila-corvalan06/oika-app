export default function TarjetaCasilla({ id, titulo, descripcion, checked, onChange }) {
    return (
        // Desde tablet agrando el relleno y los textos para que acompañen a los títulos más grandes
        <label
            htmlFor={id}
            className={`flex min-h-16 cursor-pointer items-center gap-4 rounded-2xl border-2 px-4 py-3 md:px-5 md:py-4 ${
                checked ? 'border-terracota bg-terracota/10' : 'border-arena'
            }`}
        >
            <span className="flex-1">
                <span className={`block text-base md:text-lg ${checked ? 'font-semibold' : 'font-medium'}`}>{titulo}</span>
                <span className="block text-sm md:text-base">{descripcion}</span>
            </span>

            <span className="relative flex size-6 shrink-0 items-center justify-center">
                {/* Escondo el aspecto nativo para dibujar el mío, pero sigue siendo una casilla real */}
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="peer size-6 cursor-pointer appearance-none rounded-md border-2 border-mocha/70 checked:border-terracota checked:bg-terracota focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota"
                />
                {/* La tilde queda invisible hasta que la casilla se marca, y va en crema porque el manual no usa blanco */}
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pointer-events-none absolute size-4 text-crema opacity-0 peer-checked:opacity-100"
                >
                    <path d="M5 12l5 5L19 7" />
                </svg>
            </span>
        </label>
    );
}