import { MinusIcon, PlusIcon } from '@phosphor-icons/react';

// Estas clases las comparten los dos botones para que queden iguales; desde tablet los agrando para el dedo y la vista.
const claseBoton =
    'flex size-12 items-center justify-center rounded-full border-2 border-cafe text-cafe transition-colors hover:bg-arena/50 active:border-terracota active:bg-arena active:text-terracota focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota aria-disabled:opacity-40 md:size-14';

/**
 * Contador con botones para restar y sumar, entre un mínimo y un máximo.
 * @param {object} props
 * @param {string} props.id Identificador del contador.
 * @param {string} props.etiqueta Texto del contador.
 * @param {string} props.singular Nombre en singular para los botones.
 * @param {number} props.valor Número actual.
 * @param {number} props.minimo Número más bajo permitido.
 * @param {number} props.maximo Número más alto permitido.
 * @param {function} props.onChange Se llama con el número nuevo.
 */    
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
            className={`flex items-center justify-between gap-4 rounded-2xl border-2 border-arena p-4 md:p-5 ${className}`}
        >
            <span id={`${id}-etiqueta`} className="text-lg font-medium md:text-xl">
                {etiqueta}
            </span>

            <div className="flex items-center gap-3 md:gap-4">
                <button
                    type="button"
                    onClick={restar}
                    aria-disabled={enMinimo}
                    aria-label={`Quitar un ${singular}`}
                    className={claseBoton}
                >
                    <MinusIcon weight="bold" aria-hidden="true" className="size-5 md:size-6" />
                </button>

                {/* Con aria-live el lector de pantalla anuncia el número nuevo cada vez que cambia */}
                <span aria-live="polite" className="w-8 text-center text-2xl font-semibold text-terracota md:w-10 md:text-3xl">
                    {valor}
                </span>

                <button
                    type="button"
                    onClick={sumar}
                    aria-disabled={enMaximo}
                    aria-label={`Sumar un ${singular}`}
                    className={claseBoton}
                >
                    <PlusIcon weight="bold" aria-hidden="true" className="size-5 md:size-6" />
                </button>
            </div>
        </div>
    );
}