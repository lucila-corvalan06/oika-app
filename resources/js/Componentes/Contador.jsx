import { MinusIcon, PlusIcon } from '@phosphor-icons/react';

// Estas clases las comparten los dos botones para que queden iguales.
const claseBoton =
    'flex size-12 items-center justify-center rounded-full border-2 border-cafe text-cafe transition-colors hover:bg-arena/50 active:bg-arena focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota aria-disabled:opacity-40';

export default function Contador({ id, etiqueta, singular, valor, minimo, maximo, onChange, className = '' }) {
    const enMinimo = valor <= minimo;
    const enMaximo = valor >= maximo;

    // Uso aria-disabled y no disabled para que el botón no pierda el foco al llegar al límite.
    function restar() {
        if (!enMinimo) {
            onChange(valor - 1);
        }
    }

    function sumar() {
        if (!enMaximo) {
            onChange(valor + 1);
        }
    }

    return (
        <div
            role="group"
            aria-labelledby={`${id}-etiqueta`}
            className={`flex items-center justify-between gap-4 rounded-2xl bg-arena/50 p-4 ${className}`}
        >
            <span id={`${id}-etiqueta`} className="text-lg font-medium">
                {etiqueta}
            </span>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={restar}
                    aria-disabled={enMinimo}
                    aria-label={`Quitar un ${singular}`}
                    className={claseBoton}
                >
                    <MinusIcon weight="bold" aria-hidden="true" className="size-5" />
                </button>

                {/* Con aria-live el lector de pantalla anuncia el número nuevo cada vez que cambia */}
                <span aria-live="polite" className="w-8 text-center text-2xl font-semibold">
                    {valor}
                </span>

                <button
                    type="button"
                    onClick={sumar}
                    aria-disabled={enMaximo}
                    aria-label={`Sumar un ${singular}`}
                    className={claseBoton}
                >
                    <PlusIcon weight="bold" aria-hidden="true" className="size-5" />
                </button>
            </div>
        </div>
    );
}