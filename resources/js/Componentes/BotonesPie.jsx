import Boton from './Boton';

export default function BotonesPie({ volverA, editando = false, desactivado = false }) {
    return (
        // En compu los centro en una columna angosta para que no queden como barras, igual que en elegir rol
        <div className="mt-auto flex gap-3 pt-8 md:pt-16 xl:mx-auto xl:w-full xl:max-w-lg xl:pt-12">
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