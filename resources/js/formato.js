// Armo los formatos una sola vez y los reuso
const formatoPesos = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const formatoNumero = new Intl.NumberFormat('es-AR', { maximumFractionDigits: 1 });

/**
 * Muestra un monto en pesos, sin centavos.
 * @param {number} valor
 * @returns {string} Por ejemplo "$ 221.495.931".
 */
export function pesos(valor) {
    return formatoPesos.format(valor);
}

/**
 * Muestra un número con coma y un decimal como máximo.
 * @param {number} valor
 * @returns {string} Por ejemplo "46,5".
 */
export function numero(valor) {
    return formatoNumero.format(valor);
}

/**
 * Pasa semanas a meses, redondeando al medio mes.
 * @param {number} semanas
 * @returns {string} Por ejemplo "Aproximadamente 10 meses y medio", o vacío si es menos de un mes.
 */
export function meses(semanas) {
    // Uso 30,44 días por mes, el promedio de un año
    const redondeado = Math.round(((semanas * 7) / 30.44) * 2) / 2;

    if (redondeado < 1) {
        return '';
    }

    const enteros = Math.floor(redondeado);
    const texto = enteros === 1 ? 'Aproximadamente un mes' : `Aproximadamente ${enteros} meses`;

    return redondeado > enteros ? `${texto} y medio` : texto;
}

/**
 * Pega las palabras cortas a la siguiente para que no queden solas al final de una línea.
 * @param {string} texto
 * @returns {string}
 */
export function pegarConectores(texto) {
    return texto.replace(/(?<=^|\s)(a|al|con|de|del|e|el|en|la|las|lo|los|o|por|su|tu|u|un|una|y)\s/gi, '$1\u00A0');
}