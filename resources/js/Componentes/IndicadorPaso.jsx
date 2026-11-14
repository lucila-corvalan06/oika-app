import { PencilSimpleIcon } from '@phosphor-icons/react';

export default function IndicadorPaso({ actual, total, editando = false, className = '' }) {
    // Al editar desde el resumen no hay recorrido que mostrar, así que dejo solo el aviso
    if (editando) {
        return (
            <div className={className}>
                {/* Lo dibujo como cápsula para que se note que es otro modo y no el contador de pasos */}
                <p className="inline-flex items-center gap-2 rounded-full bg-arena px-3 py-1.5 text-sm font-medium">
                    <PencilSimpleIcon weight="bold" aria-hidden="true" className="size-4" />
                    Editando tu respuesta
                </p>
            </div>
        );
    }

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