# Trainvial con AngularJS

## Introducción

Este proyecto contiene una aplicación construída con AngularJS. 
Se trata de un juego de tablero de preguntas y respuestas.
Se usan aspectos básicos de Angular como módulos, controladores y filtros.


## ¿En qué consiste el juego?

La funcionalidad es bastante sencilla de entender. El jugador lanza un dado virtual y se mueve por las diferentes casillas del tablero.
El objetivo es conseguir los tres "quesitos" que dan acceso a la meta.
Si el jugador responde correctamente la pregunta de meta habrá completado el juego.

## Funcionamiento

### Modelo de datos

El juego lee datos de diferentes JSON:

- El tablero se construye a partir de un JSON de casillas. Cada casilla tiene:
-- tipo: Puede ser salida*, deportes, ocio, cultura o meta*.
-- isActivo: Se usa para saber si es la casilla actual del jugador.
-- posible: Se usa para saber si el jugador tras haber lanzado el dado puede desplazarse a dicha casilla.
-- isQuesito: Si es true significa que es una casilla en la que el jugador puede ganar un quesito.

- Hay cuatros JSON más que contienen la colección de preguntas, cada JSON contiene un tipo de preguntas:
-- tipo: Puede ser deportes, cultura, ocio o meta según el JSON.
-- pregunta: Contiene una pregunta.
-- opcion1: Muestra una posible respuesta para la pregunta.
-- opcion2: Muestra otra posible respuesta para la pregunta.
-- correcta: Contiene la respuesta correcta a la pregunta.

### Controlador

La aplicación usa un controlador que gestiona el funcionamiento del juego:

- Existe un controlador, TraivialCtrl:
-- Inicializa todas las variables del $scope que varían según avanza el juego.
-- Contiene diferentes funciones:
--- Controla el lanzamiento del dado y el desplazamiento del jugador a las casillas del tablero.
--- Controla el progreso del jugador, guardando los quesitos conseguidos y el balance de preguntas acertadas.
--- Controla si el jugador ha ganado.
--- Reinicializa las variables del $scope para volver a empezar una partida.

### Filtros

Los diferentes filtros se encargan de agregar clases a las etiquetas html en función de diferentes parámetros o para cargar unos recursos y otros.

- Se gestiona el color de las casillas del tablero dependiendo del tipo de pregunta.
- Se gestiona el formato de las casillas ya sea la casilla actual o una posible casilla una vez lanzado el dado.
- Se gestiona la iconografía:
-- Dependiendo del valor del dado se muestra una u otra imagen.
-- Dependiendo del resultado al responder a una pregunta se muestra una imagen u otra.
-- Dependiendo de si se puede lanzar el dado o no se controla asignando unos colores para hacerlo más accesible.

## Estilos

- La aplicación usa algunos estilos de bootstrap.
- Además cuenta con unos estilos personalizados y es capaz de reconocer si la aplicación ha sido abierta con un dispositivo móvil o no. 
- Se ha intentado respetar el responsive design en la medida de lo posible.

## JS Extra

- Si la aplicación se abre por un dispositivo de Apple muestra una sugerencia para guardar la aplicación en el dispostivo.