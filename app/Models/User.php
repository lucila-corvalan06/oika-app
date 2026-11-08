<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\Estado;
use App\Enums\Rol;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

// Dejo rol y estado fuera de fillable para que nadie pueda elegirlos desde un formulario.
/**
 * Persona que usa Oika, ya sea una familia, un profesional o el admin.
 */
#[Fillable(['name', 'email', 'password', 'tiene_terreno'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Convierte cada columna al tipo que corresponde al leerla.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            // Con los enums cada cuenta se lee como Rol::Admin y no como texto suelto.
            'rol' => Rol::class,
            'estado' => Estado::class,
            'tiene_terreno' => 'boolean',
        ];
    }
}
