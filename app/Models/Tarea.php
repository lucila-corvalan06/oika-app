<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * Una tarea de una etapa de obra, explicada en palabras simples.
 *
 * @property int $id
 * @property int $etapa_id
 * @property int $orden
 * @property string $nombre
 * @property string $descripcion
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Etapa $etapa
 */
class Tarea extends Model
{
    protected $fillable = [
        'etapa_id',
        'orden',
        'nombre',
        'descripcion',
    ];

    protected function casts(): array
    {
        return [
            'etapa_id' => 'integer',
            'orden' => 'integer',
        ];
    }

    /**
     * Etapa a la que pertenece la tarea.
     */
    public function etapa(): BelongsTo
    {
        return $this->belongsTo(Etapa::class);
    }
}
