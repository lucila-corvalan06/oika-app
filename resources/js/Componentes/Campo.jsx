import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react';

export default function Campo({
    id,
    etiqueta,
    type = 'text',
    value,
    onChange,
    ayuda,
    error,
    className = '',
    ...resto
}) {
    const idAyuda = `${id}-ayuda`;
    const idError = `${id}-error`;

    // Guardo acá si la contraseña se ve para que todos los campos de contraseña tengan el ojito sin repetirlo en cada pantalla
    const [visible, setVisible] = useState(false);
    const esContrasena = type === 'password';

    // Junto los ids de la ayuda y del error para que el lector de pantalla los lea con el campo.
    const descripcion = [ayuda && idAyuda, error && idError].filter(Boolean).join(' ') || undefined;

    return (
        <div className={className}>
            <label htmlFor={id} className="mb-1 block text-sm font-medium">
                {etiqueta}
            </label>

            <div className="relative">
                <input
                    id={id}
                    type={esContrasena && visible ? 'text' : type}
                    value={value}
                    onChange={onChange}
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={descripcion}
                    className={`min-h-12 w-full rounded-xl border-2 bg-arena/30 text-base placeholder:text-mocha/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota ${
                        esContrasena ? 'pl-4 pr-12' : 'px-4'
                    } ${error ? 'border-negativo' : 'border-mocha/70'}`}
                    {...resto}
                />

                {esContrasena && (
                    <button
                        type="button"
                        onClick={() => setVisible(!visible)}
                        aria-label="Mostrar contraseña"
                        aria-pressed={visible}
                        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-xl text-mocha focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota"
                    >
                        {visible ? (
                            <EyeIcon size={24} weight="bold" aria-hidden="true" />
                        ) : (
                            <EyeSlashIcon size={24} weight="bold" aria-hidden="true" />
                        )}
                    </button>
                )}
            </div>

            {ayuda && (
                <p id={idAyuda} className="mt-1 text-sm text-mocha">
                    {ayuda}
                </p>
            )}

            {error && (
                <p id={idError} role="alert" className="mt-1 text-sm text-negativo">
                    {error}
                </p>
            )}
        </div>
    );
}