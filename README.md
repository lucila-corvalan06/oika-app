oika

Tu hogar, a tu ritmo.

oika es una aplicación para familias que quieren construir su hogar por etapas, a medida que pueden ahorrar. La familia responde unas preguntas sobre cómo imagina su hogar y la app le muestra cuánto le va a costar, cuánto va a tardar y cuántos metros cuadrados va a tener, todo separado en las cinco etapas de una obra: cimientos y contrapiso, mampostería, techo y losa, instalaciones y terminaciones.

Con eso, la familia puede ir ahorrando etapa por etapa y empezar cada una cuando junta lo que necesita, sin tener que endeudarse por la obra entera. La idea es que alguien que nunca construyó nada sepa siempre cuál es su próximo paso y cuánta plata necesita para darlo.

oika también reúne a quienes hacen posible una obra. Las familias pueden encontrar profesionales, proveedores de materiales e inmobiliarias, ver sus perfiles con fotos de trabajos y calificaciones, y contactarlos por WhatsApp o por mail. Del otro lado, los profesionales, proveedores e inmobiliarias se suman a la app con un plan mensual para llegar a familias que ya saben qué quieren construir y cuánto pueden ahorrar.

La app está publicada en https://oika-production-oafi50.laravel.cloud y el código está en https://github.com/lucila-corvalan06/oika-app.

Funcionalidades implementadas hasta el momento

Por ahora la app tiene la landing, donde se explica qué es oika, cómo funciona, los planes para profesionales y las preguntas frecuentes. Tiene registro e ingreso, y al registrarse cada persona elige si es una familia o un profesional. Cada uno entra solamente a sus propias pantallas.

La familia arma su proyecto en seis pasos. Elige cuántas plantas va a tener su hogar, cuántos dormitorios y baños, cómo quiere los espacios, si suma cochera o algún extra y el nivel de terminación. En el último paso ve un resumen con todas sus respuestas y puede cambiar cualquiera antes de guardar.

Con esas respuestas trabaja el motor de cálculo, que es la parte central del proyecto. Calcula los metros cuadrados, el costo y el tiempo de la obra y los reparte entre las cinco etapas. Los valores que usa para calcular están cargados en la base de datos.

Después de guardar el proyecto, la familia tiene un inicio que le muestra su próximo paso, una pantalla con su proyecto completo y el detalle de cada etapa, con lo que cuesta, lo que tarda, las tareas que se hacen y lo que conviene tener en cuenta.

Toda la app está adaptada para verse bien en celular, en tablet y en computadora.

Tecnologías que usé

Usé Laravel 13 con PHP para el backend y MySQL para la base de datos. Para el frontend usé React, y para conectar las dos partes usé Inertia, que me permite armar las pantallas en React sin tener que hacer una API aparte. Los estilos los hice con Tailwind CSS y el frontend se compila con Vite. Los íconos son de Phosphor Icons.

Para comprobar que todo funcione bien escribí tests con PHPUnit, que hoy son 90, y uso Laravel Pint para que el código PHP tenga siempre el mismo formato. La app está publicada en Laravel Cloud.

Cómo instalarlo

Para instalarlo hace falta tener PHP 8.3 o superior, Composer, Node.js con npm y MySQL.

Primero hay que descargar el proyecto y entrar a su carpeta. Si lo recibiste en un zip, alcanza con descomprimirlo.

bash
git clone https://github.com/lucila-corvalan06/oika-app.git
cd oika-app

Después se instalan las dependencias de PHP.

bash
composer install

Hay que crear el archivo de configuración copiando el de ejemplo. En Windows, desde PowerShell, el comando es Copy-Item .env.example .env.

bash
cp .env.example .env

Y generar la clave de la aplicación.

bash
php artisan key:generate

Antes de seguir hay que crear en MySQL una base de datos vacía llamada oika y completar el usuario y la contraseña de MySQL en el archivo .env, en DB_USERNAME y DB_PASSWORD.

Con la base lista, este comando crea las tablas y carga los datos que la app necesita: las etapas de obra, sus tareas, los ambientes del armado del proyecto y los valores que usa el motor de cálculo. Sin estos datos el motor no puede calcular nada.

bash
php artisan migrate --seed

Por último se instalan las dependencias del frontend.

bash
npm install
Cómo correrlo

Hacen falta dos terminales abiertas en la carpeta del proyecto. En una se levanta el servidor de Laravel y en la otra Vite, que va compilando el frontend.

bash
php artisan serve
bash
npm run dev

Con las dos andando, la app se abre en http://localhost:8000. Para ver el recorrido completo conviene crear una cuenta como familia y armar un proyecto.

Los tests se corren con composer test.

Lucila Corvalán