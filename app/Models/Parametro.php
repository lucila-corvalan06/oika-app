<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * Un número que usa el motor de cálculo, como el costo por m² o un factor.
 *
 * @property int $id
 * @property string $clave
 * @property string $nombre
 * @property float $valor
 * @property Carbon|null $fecha
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Parametro extends Model
{
    protected $fillable = [
        'clave',
        'nombre',
        'valor',
        'fecha',
    ];

    protected function casts(): array
    {
        return [
            // En la base queda exacto como decimal; acá lo paso a número para que el motor pueda calcular.
            'valor' => 'float',
            'fecha' => 'date',
        ];
    }
}
