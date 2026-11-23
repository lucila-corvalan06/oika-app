export default function OpcionCorta({ id, name, value, etiqueta, checked, onChange }) {
    return (
        // Desde tablet la hago más alta y con letra más grande, como el resto de las opciones del wizard
        <label
            htmlFor={id}
            className={`flex min-h-14 cursor-pointer items-center justify-center gap-1.5 rounded-2xl border-2 px-2 text-base has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracota md:min-h-15 md:text-lg ${
                checked ? 'border-terracota bg-terracota/10 font-semibold' : 'border-arena font-medium'
            }`}
        >
            {/* Escondo el círculo del radio pero sigue siendo un radio real, así funciona con teclado y lector de pantalla */}
            <input
                id={id}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="sr-only"
            />
            {/* La tilde acompaña al borde para que la opción elegida no dependa solo del color */}
            {checked && (
                <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-4 text-terracota md:size-5"
                >
                    <path d="M5 12l5 5L19 7" />
                </svg>
            )}
            {etiqueta}
        </label>
    );
}