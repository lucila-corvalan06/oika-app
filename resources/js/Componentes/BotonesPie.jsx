import Boton from './Boton';

/**
 * Botones de abajo de cada paso del armado del proyecto: volver y continuar.
 * @param {object} props
 * @param {string} props.volverA Dirección del paso anterior.
 * @param {boolean} [props.editando] Si se edita desde el resumen, cambian a Cancelar y Listo.
 * @param {boolean} [props.desactivado] Si Continuar está deshabilitado porque falta elegir algo.
 */
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