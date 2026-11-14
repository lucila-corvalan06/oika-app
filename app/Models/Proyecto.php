<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

// Dejo user_id fuera de fillable porque el dueño sale de la cuenta que guarda, no de lo que llegue del formulario.
/**
 * Casa que una familia armó con las respuestas del wizard.
 *
 * @property int $id
 * @property int $user_id
 * @property int $plantas
 * @property int $dormitorios
 * @property int $banos
 * @property string $espacios
 * @property int $cochera
 * @property array<int, string> $extras
 * @property string $terminacion
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read User $user
 */
#[Fillable(['plantas', 'dormitorios', 'banos', 'espacios', 'cochera', 'extras', 'terminacion'])]
class Proyecto extends Model
{
    /**
     * Convierte cada columna al tipo que corresponde al leerla.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'extras' => 'array',
        ];
    }

    /**
     * Devuelve la familia dueña de este proyecto.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
