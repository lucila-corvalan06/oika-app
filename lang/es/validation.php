<?php

// Traduzco solo las reglas que uso; el resto cae al inglés de respaldo y lo sumo cuando haga falta
return [

    'accepted' => 'Para continuar, tenés que aceptar :attribute.',
    'after' => 'El campo :attribute tiene que tener una fecha posterior al :date.',
    'after_or_equal' => 'El campo :attribute no puede tener una fecha anterior al :date.',
    'between' => [
        'array' => 'Elegí entre :min y :max opciones en :attribute.',
        'file' => 'El archivo de :attribute tiene que pesar entre :min y :max KB.',
        'numeric' => 'El campo :attribute tiene que estar entre :min y :max.',
        'string' => 'El campo :attribute tiene que tener entre :min y :max caracteres.',
    ],
    'confirmed' => 'La confirmación de :attribute no coincide. Revisala y probá de nuevo.',
    'current_password' => 'La contraseña actual no es correcta.',
    'date' => 'El campo :attribute tiene que ser una fecha válida.',
    'digits' => 'El campo :attribute tiene que tener :digits dígitos.',
    'digits_between' => 'El campo :attribute tiene que tener entre :min y :max dígitos.',
    'email' => 'El campo :attribute tiene que ser un correo electrónico válido, por ejemplo nombre@correo.com.',
    'enum' => 'La opción que elegiste en :attribute no es válida.',
    'exists' => 'La opción que elegiste en :attribute no es válida.',
    'file' => 'El campo :attribute tiene que ser un archivo.',
    'image' => 'El archivo de :attribute tiene que ser una imagen.',
    'in' => 'La opción que elegiste en :attribute no es válida.',
    'integer' => 'El campo :attribute tiene que ser un número entero.',
    'max' => [
        'array' => 'No podés elegir más de :max opciones en :attribute.',
        'file' => 'El archivo de :attribute no puede pesar más de :max KB.',
        'numeric' => 'El campo :attribute no puede ser mayor que :max.',
        'string' => 'El campo :attribute no puede tener más de :max caracteres.',
    ],
    'mimes' => 'El archivo de :attribute tiene que ser de alguno de estos tipos: :values.',
    'mimetypes' => 'El archivo de :attribute tiene que ser de alguno de estos tipos: :values.',
    'min' => [
        'array' => 'Elegí al menos :min opciones en :attribute.',
        'file' => 'El archivo de :attribute tiene que pesar al menos :min KB.',
        'numeric' => 'El campo :attribute tiene que ser como mínimo :min.',
        'string' => 'El campo :attribute tiene que tener al menos :min caracteres.',
    ],
    'not_in' => 'La opción que elegiste en :attribute no es válida.',
    'numeric' => 'El campo :attribute tiene que ser un número.',
    'password' => [
        'letters' => 'El campo :attribute tiene que incluir al menos una letra.',
        'mixed' => 'El campo :attribute tiene que incluir al menos una mayúscula y una minúscula.',
        'numbers' => 'El campo :attribute tiene que incluir al menos un número.',
        'symbols' => 'El campo :attribute tiene que incluir al menos un símbolo.',
        'uncompromised' => 'La :attribute que elegiste apareció en una filtración de datos. Elegí otra distinta.',
    ],
    'regex' => 'El formato del campo :attribute no es válido.',
    'required' => 'Completá el campo :attribute para continuar.',
    'string' => 'El campo :attribute tiene que ser texto.',
    'unique' => 'El valor que ingresaste en :attribute ya está en uso.',
    'uploaded' => 'No pudimos subir el archivo de :attribute. Probá de nuevo.',

    // Todavía no tengo mensajes por campo, los voy a sumar si alguno lo necesita
    'custom' => [],

    // Cambio el nombre técnico de cada campo por uno que se lea bien en el mensaje
    'attributes' => [
        'name' => 'nombre',
        'email' => 'correo electrónico',
        'password' => 'contraseña',
        'password_confirmation' => 'confirmación de la contraseña',
        'terminos' => 'los términos y condiciones',
        'rol' => 'rol',
        'colegio_consejo' => 'colegio o consejo',
        'numero_matricula' => 'número de matrícula',
        'cuit' => 'CUIT',
        'archivo' => 'certificado',
        'vigente_hasta' => 'fecha de vigencia',
        'plantas' => 'cantidad de plantas',
        'dormitorios' => 'cantidad de dormitorios',
        'banos' => 'cantidad de baños',
    ],

];
