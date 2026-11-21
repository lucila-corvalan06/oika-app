<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Un ambiente del hogar con su superficie de referencia.
 *
 * @property int $id
 * @property string $clave
 * @property string $nombre
 * @property float $m2
 * @property bool $semicubierto
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Componente extends Model
{
    protected $fillable = [
        'clave',
        'nombre',
        'm2',
        'semicubierto',
    ];

    protected function casts(): array
    {
        return [
            'm2' => 'float',
            'semicubierto' => 'boolean',
        ];
    }
}
