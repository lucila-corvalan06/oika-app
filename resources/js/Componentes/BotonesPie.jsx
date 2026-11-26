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
        <>
            {/* Separo el espacio de arriba de la franja pegada, así cuando queda fija no tapa contenido de más */}
            <div aria-hidden="true" className="mt-auto h-4 shrink-0 md:h-12 xl:h-8" />

            {/* En pantallas bajas la franja queda pegada abajo para que no haya que buscar los botones */}
            {/* La franja va de todo el ancho para que tape bien el contenido que pasa por debajo */}
            <div className="sticky bottom-0 bg-crema py-4">
                {/* En compu les doy el mismo ancho que la columna de las preguntas para que queden alineados con las tarjetas */}
                <div className="flex gap-3 xl:mx-auto xl:w-full xl:max-w-xl">
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
            </div>
        </>
    );
}