import Boton from './Boton';

export default function BotonesPie({ volverA, editando = false, desactivado = false }) {
    return (
        <div className="mt-auto flex gap-3 pt-8">
            {/* Al editar, volver significa cancelar y lleva al resumen sin tocar la respuesta */}
            <Boton
                href={editando ? '/familia/proyecto/resumen' : volverA}
                variante="secundaria"
                className="flex-1"
            >
                {editando ? 'Cancelar' : 'Volver'}
            </Boton>
            <Boton type="submit" disabled={desactivado} className="flex-1">
                {editando ? 'Listo' : 'Continuar'}
            </Boton>
        </div>
    );
}