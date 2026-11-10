export default function IndicadorPaso({ actual, total, className = '' }) {
    return (
        <div className={className}>
            <p className="text-sm font-medium">
                Paso {actual} de {total}
            </p>

            {/* Las barras son decorativas, el texto ya dice en qué paso estoy */}
            <div aria-hidden="true" className="mt-2 flex gap-2">
                {Array.from({ length: total }, (_, indice) => (
                    <div
                        key={indice}
                        className={`h-1 flex-1 rounded-full ${indice < actual ? 'bg-terracota' : 'bg-arena'}`}
                    />
                ))}
            </div>
        </div>
    );
}