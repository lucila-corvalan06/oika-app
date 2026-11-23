export default function Checkbox({ id, etiqueta, checked, onChange, error, className = '', ...resto }) {
    const idError = `${id}-error`;

    return (
        <div className={className}>
            <label htmlFor={id} className="flex min-h-12 cursor-pointer items-center gap-3">
                <span className="relative flex size-6 shrink-0 items-center justify-center">
                    <input
                        id={id}
                        type="checkbox"
                        checked={checked}
                        onChange={onChange}
                        aria-invalid={error ? 'true' : undefined}
                        aria-describedby={error ? idError : undefined}
                        className="peer size-6 cursor-pointer appearance-none rounded-md border-2 border-mocha/70 checked:border-terracota checked:bg-terracota focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota"
                        {...resto}
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
                <span className="text-sm md:text-base">{etiqueta}</span>
            </label>

            {error && (
                <p id={idError} role="alert" className="text-sm text-negativo md:text-base">
                    {error}
                </p>
            )}
        </div>
    );
}