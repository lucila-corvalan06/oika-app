<?php

namespace App\Enums;

/**
 * Etapa en la que se encuentra una cuenta dentro de Oika.
 */
enum Estado: string
{
    // Uso estos cinco estados para que el portero sepa a qué pantalla mandar a cada cuenta
    case SinDocumentacion = 'sin_documentacion';
    case EnRevision = 'en_revision';
    case Rechazada = 'rechazada';
    case Aprobada = 'aprobada';
    case Activa = 'activa';
}
