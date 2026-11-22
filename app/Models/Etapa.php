<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * Una de las 5 etapas de obra, con su parte del costo, sus semanas de trabajo y sus textos.
 *
 * @property int $id
 * @property int $orden
 * @property string $nombre
 * @property string|null $descripcion
 * @property array|null $esperas
 * @property int $porcentaje_costo
 * @property float $semanas_trabajo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Collection<int, Tarea> $tareas
 */
class Etapa extends Model
{
    protected $fillable = [
        'orden',
        'nombre',
        'descripcion',
        'esperas',
        'porcentaje_costo',
        'semanas_trabajo',
    ];

    protected function casts(): array
    {
        return [
            'orden' => 'integer',
            'esperas' => 'array',
            'porcentaje_costo' => 'integer',
            // Sin esto el decimal me llega como texto, y el motor necesita un número para hacer cuentas.
            'semanas_trabajo' => 'float',
        ];
    }

    /**
     * Tareas de la etapa, en el orden en que se hacen.
     */
    public function tareas(): HasMany
    {
        // Ordeno acá para que las tareas lleguen siempre en orden, sin repetirlo en cada consulta.
        return $this->hasMany(Tarea::class)->orderBy('orden');
    }
}
