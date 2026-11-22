// Armo los formatos una sola vez y los reuso.
const formatoPesos = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const formatoNumero = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 });

export function pesos(valor) {
    return formatoPesos.format(valor);
}

export function numero(valor) {
    return formatoNumero.format(valor);
}

// Paso las semanas a meses redondeando al medio mes, porque las familias se organizan en meses.
export function meses(semanas) {
    // Uso 30,44 días por mes, que es el promedio de un año (365,25 ÷ 12).
    const redondeado = Math.round(((semanas * 7) / 30.44) * 2) / 2;

    // Con menos de un mes no muestro nada: ahí alcanza con las semanas.
    if (redondeado < 1) {
        return '';
    }

    const enteros = Math.floor(redondeado);
    const texto = enteros === 1 ? 'Aproximadamente un mes' : `Aproximadamente ${enteros} meses`;

    return redondeado > enteros ? `${texto} y medio` : texto;
}