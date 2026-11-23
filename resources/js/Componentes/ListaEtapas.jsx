// Dejo las etapas en una lista para cambiar el texto en un solo lugar cuando las validen
const etapas = ['Cimientos y contrapiso', 'Mampostería', 'Techo y losa', 'Instalaciones', 'Terminaciones'];


/**
 * Lista numerada de las cinco etapas de obra, unidas por una línea.
 * @param {object} props
 * @param {string} [props.className] Clases para ubicar la lista.
 */
export default function ListaEtapas({ className = '' }) {
    return (
        <ol className={className}>
            {etapas.map((etapa, indice) => (
                <li key={etapa} className="relative flex items-center gap-4 py-1.5">
                    {/* El conector es decorativo, por eso lo escondo de los lectores de pantalla. */}
                    {indice < etapas.length - 1 && (
                        <span
                            aria-hidden="true"
                            className="absolute left-4 top-1/2 h-full w-px -translate-x-1/2 bg-mocha/40"
                        />
                    )}
                    <span className="relative flex size-8 items-center justify-center rounded-full bg-crema text-sm font-semibold ring-1 ring-mocha/25">
                        {indice + 1}
                    </span>
                    {etapa}
                </li>
            ))}
        </ol>
    );
}