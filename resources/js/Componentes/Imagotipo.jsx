/**
 * Logo de oika en SVG. Toma el color de la clase de texto, así se puede usar sobre cualquier fondo.
 * @param {object} props
 * @param {string} [props.className] Clases para el tamaño, por defecto "h-8 w-auto".
 * @param {boolean} [props.claro] Si va en crema, para fondos de color.
 */
export default function Imagotipo({ className = 'h-8 w-auto', claro = false, ...resto }) {
    const color = claro ? 'text-crema' : 'text-terracota';

    return (
        <svg viewBox="0 0 765.03 281" role="img" aria-label="oika" className={`${color} ${className}`} {...resto}>
            <path
                d="M301,213.95c0-37.37,29.68-66.52,68.37-66.52s68.63,28.89,68.63,66.52-29.68,67.04-68.37,67.04-68.63-29.15-68.63-67.04ZM402.49,214.22c0-20.14-13.78-34.18-33.12-34.18s-32.86,14.31-32.86,34.18,13.51,34.45,32.86,34.45,33.12-14.31,33.12-34.45Z"
                fill="currentColor"
            />
            <path
                d="M632,217.13c0-37.89,26.5-66.78,61.21-66.78,15.37,0,28.36,5.56,37.37,14.84v-12.19h34.45v128h-34.45v-12.19c-9.01,9.28-21.99,12.19-37.1,12.19-34.98,0-61.48-25.97-61.48-63.87ZM732.44,216.87c0-20.14-13.25-34.45-32.6-34.45s-32.33,14.31-32.33,34.45,13.25,32.06,32.33,32.06,32.6-11.66,32.6-32.06Z"
                fill="currentColor"
            />
            <polygon
                points="262.5 140 237.75 164.75 122.5 49.5 59.75 112.25 35 87.5 122.5 0 192.5 70 192.5 17.5 227.5 17.5 227.5 105 262.5 140"
                fill="currentColor"
            />
            <polygon
                points="227.5 210 227.5 280 17.5 280 17.5 210 0 192.5 17.5 175 17.5 140 52.5 140 122.5 70 192.5 140 167.75 164.75 122.5 119.5 52.5 189.5 52.5 245 192.5 245 192.5 210 227.5 210"
                fill="currentColor"
            />
            <path
                d="M454.89,112.46c0-11.13,8.21-19.88,19.61-19.88s19.61,8.75,19.61,19.88-8.21,19.88-19.61,19.88-19.61-8.74-19.61-19.88ZM457.01,153h34.98v128h-34.98v-128Z"
                fill="currentColor"
            />
            <path
                d="M509.5,89.4h34.71v122.43l46.64-58.83h40.01l-50.35,60.95,53,67.04h-42.4l-46.9-62.27v62.27h-34.71V89.4Z"
                fill="currentColor"
            />
        </svg>
    );
}