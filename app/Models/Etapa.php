<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Una de las 5 etapas de obra, con su parte del costo y sus semanas de trabajo.
 *
 * @property int $id
 * @property int $orden
 * @property string $nombre
 * @property int $porcentaje_costo
 * @property float $semanas_trabajo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Etapa extends Model
{
    protected $fillable = [
        'orden',
        'nombre',
        'porcentaje_costo',
        'semanas_trabajo',
    ];

    protected function casts(): array
    {
        return [
            'orden' => 'integer',
            'porcentaje_costo' => 'integer',
            // Sin esto el decimal me llega como texto, y el motor necesita un número para hacer cuentas.
            'semanas_trabajo' => 'float',
        ];
    }
}
