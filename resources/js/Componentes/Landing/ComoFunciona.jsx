import Boton from '../Boton';
import { pegarConectores } from '../../formato';

const pasos = [
    {
        titulo: 'Contanos cómo imaginás tu hogar',
        descripcion: 'Respondé unas preguntas simples sobre plantas, ambientes y baños.',
    },
    {
        titulo: 'Mirá cuánto cuesta y cuánto tarda cada etapa',
        descripcion: 'oika estima costos y tiempos de cada etapa constructiva.',
    },
    {
        titulo: 'Ahorrá a tu ritmo y avanzá etapa por etapa',
        descripcion: 'Sumá lo que podés y mirá cómo se llena la barra de cada etapa.',
    },
    {
        titulo: 'Contactá profesionales cuando llegue el momento',
        descripcion: 'Elegí gente de confianza y escribile por WhatsApp o mail.',
    },
];

export default function ComoFunciona() {
    return (
        <section id="como-funciona" aria-labelledby="titulo-como-funciona">
            {/* Dejo texto, pasos y botón como tres bloques sueltos para poder apilarlos en celu y acomodarlos en dos columnas en escritorio */}
            <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0 lg:py-32">
                {/* En tablet limito y centro el ancho del texto, de los pasos y del botón para que compartan el mismo borde y no sobre espacio */}
                <div className="md:mx-auto md:w-full md:max-w-2xl lg:col-start-1 lg:row-start-1 lg:self-end lg:max-w-none">
                    <h2
                        id="titulo-como-funciona"
                        className="text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl"
                    >
                        De la idea a tu hogar, en <span className="text-terracota">4 pasos</span>
                    </h2>

                    <p className="mt-6 max-w-xl text-lg text-mocha">
                        Sin saber nada de construcción, oika te guía de principio a&nbsp;fin.
                    </p>
                </div>

                {/* Uso una lista ordenada para que el lector de pantalla anuncie los pasos y su orden */}
                <ol className="flex flex-col gap-4 md:mx-auto md:w-full md:max-w-2xl lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center lg:max-w-none">
                    {pasos.map((paso, indice) => (
                        <li key={paso.titulo} className="flex items-start gap-5 rounded-2xl bg-arena p-5 lg:p-6">
                            {/* El número grande es decorativo, la lista ya numera los pasos */}
                            <span aria-hidden="true" className="w-14 shrink-0 text-4xl font-semibold text-terracota">
                                0{indice + 1}
                            </span>

                            <div>
                                <p className="text-lg font-semibold">{pegarConectores(paso.titulo)}</p>
                                <p className="mt-1 text-mocha">{pegarConectores(paso.descripcion)}</p>
                            </div>
                        </li>
                    ))}
                </ol>

                {/* Dejo el botón después de los pasos para que quien ya se convenció no tenga que subir hasta la cabecera */}
                {/* Lo centro desde sm para que también quede centrado en el iPad mini, que mide 744 px */}
                <div className="sm:w-2/5 sm:justify-self-center lg:col-start-1 lg:row-start-2 lg:mt-8 lg:w-auto lg:self-start lg:justify-self-start">
                    <Boton href="/bienvenida">Empezá gratis</Boton>
                </div>
            </div>
        </section>
    );
}