import { MinusIcon, PlusIcon } from '@phosphor-icons/react';

const preguntas = [
    {
        pregunta: '¿oika construye mi hogar?',
        respuesta:
            'No. oika te ayuda a planificar cada etapa, ahorrar para ella y encontrar profesionales. La obra la hacen las personas que vos elijas.',
    },
    {
        pregunta: '¿Es gratis para las familias?',
        respuesta:
            'Sí. Armar tu proyecto y usar la app no tiene costo para familias y parejas. Los planes mensuales son solo para profesionales, proveedores e inmobiliarias.',
    },
    {
        pregunta: '¿Qué tan exactos son los costos?',
        respuesta:
            'Son estimaciones orientativas que parten de tus respuestas. Te sirven para planificar y ahorrar, pero el precio final lo confirmás con el profesional que contrates.',
    },
    {
        pregunta: '¿Cómo sé que los profesionales son de confianza?',
        respuesta:
            'Antes de aparecer, cada profesional sube su matrícula y su certificado, y el equipo de oika los revisa. Además, vas a poder ver fotos de sus trabajos y calificaciones de otras familias.',
    },
    {
        pregunta: '¿Tengo que instalar algo?',
        respuesta:
            'No hace falta. oika funciona desde el navegador, en el celular, la tablet o la compu. Si querés, también podés instalarla en tu pantalla de inicio y abrirla como cualquier otra app.',
    },
    {
        pregunta: 'Soy profesional, ¿cómo me sumo?',
        respuesta:
            'Te registrás, subís tu matrícula y tu certificado, y el equipo de oika los revisa. Cuando te aprueban, elegís el plan que más te sirva.',
    },
];

export default function Preguntas() {
    return (
        <section id="preguntas" aria-labelledby="titulo-preguntas">
            <div className="mx-auto max-w-3xl px-6 py-20 lg:py-32">
                <h2
                    id="titulo-preguntas"
                    className="text-center text-3xl leading-tight font-semibold text-balance sm:text-4xl lg:text-5xl"
                >
                    Preguntas <span className="text-terracota">frecuentes</span>
                </h2>

                {/* Uso details y summary nativos porque el navegador se ocupa del teclado y de anunciar si está abierto o cerrado */}
                <div className="mt-14 divide-y divide-arena border-y border-arena lg:mt-16">
                    {preguntas.map((item) => (
                        <details key={item.pregunta} className="group">
                            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota [&::-webkit-details-marker]:hidden">
                                {item.pregunta}
                                {/* El ícono es decorativo, el navegador ya anuncia el estado */}
                                <span aria-hidden="true" className="shrink-0 text-terracota">
                                    <PlusIcon size={24} weight="bold" className="group-open:hidden" />
                                    <MinusIcon size={24} weight="bold" className="hidden group-open:block" />
                                </span>
                            </summary>

                            <p className="pr-12 pb-6">{item.respuesta}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}