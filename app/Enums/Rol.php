<?php

namespace App\Enums;

/**
 * Tipos de cuenta que puede tener una persona en Oika.
 */
enum Rol: string
{
    // El valor de texto es lo que se guarda en la base de datos
    case UsuarioFinal = 'usuario_final';
    case Profesional = 'profesional';
    case Admin = 'admin';
}
