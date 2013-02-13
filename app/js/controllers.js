(function (global, angular) {
    'use strict';
    var controllerModule = angular.module('controllerModule', []);

    function TrainvialCtrl($scope, $http) {

        //--- Inicializar variables ---//
        var NUM_PREGUNTAS = 0,
            NUM_CASILLAS = 0,
            globalCorrecta = 0,
            esperandoRespuesta = false,
            esperandoNuevaPregunta = true,
            turno = 0,
            casillaActual = 0,
            casillaPosibleAdelante = 0,
            casillaPosibleAtras = 0,
            preguntaQuesito = false,
            tipoPregunta = "",
            preguntaAleatoria = 0;

        $scope.valorDado = 'Lance para empezar';
        $scope.mensaje = "Lance el dado";
        $scope.resultado = "Lance el dado";
        $scope.quesitoDeportes = false;
        $scope.quesitoCultura = false;
        $scope.quesitoOcio = false;
        $scope.mostrarPanelPregunta = false;
        $scope.preguntasCorrectas = 0;
        $scope.preguntasIncorrectas = 0;
        $scope.juegoCompletado = false;


        $scope.preguntaFinalAcceso = false;

        //Función que busca una pregunta y hace la lógica necesaria para saber cual es la correcta
        //Recibe la pregunta a buscar que es una aleatoria de una colleción y el tipo de pregunta (deportes, ocio...)
        function buscarPregunta(preguntaABuscar, tipo) {
            //Se guarda la respuesta correcta para poder ser comparada cuando el usuario la resuelva
            globalCorrecta = preguntaABuscar.correcta;
            tipoPregunta = tipo;
            $scope.atencionPregunta = preguntaABuscar.pregunta;
            $scope.respuesta1 = preguntaABuscar.opcion1;
            $scope.respuesta2 = preguntaABuscar.opcion2;
            //Ya no se espera una nueva pregunta
            esperandoNuevaPregunta = false;
        }

        //--- Leer los Json ---//
        $http.get('json/preguntasDeportes.json').success(function (data) {
            $scope.preguntasDeportes = data;
            NUM_PREGUNTAS = data.length - 1;
        });
        $http.get('json/preguntasCultura.json').success(function (data) {
            $scope.preguntasCultura = data;
            if ((data.length - 1) < NUM_PREGUNTAS) {
                NUM_PREGUNTAS = data.length - 1;
            }
        });
        $http.get('json/preguntasOcio.json').success(function (data) {
            $scope.preguntasOcio = data;
            if ((data.length - 1) < NUM_PREGUNTAS) {
                NUM_PREGUNTAS = data.length - 1;
            }
        });
        $http.get('json/preguntasMeta.json').success(function (data) {
            $scope.preguntasMeta = data;
            if ((data.length - 1) < NUM_PREGUNTAS) {
                NUM_PREGUNTAS = data.length - 1;
            }
        });

        $http.get('json/tablero.json').success(function (data) {
            $scope.casillasTablero = data;
            NUM_CASILLAS = data.length;
        });


        $scope.hacerPregunta = function (identificador) {
            if (esperandoNuevaPregunta === true && (identificador === casillaPosibleAdelante || identificador === casillaPosibleAtras)) {
                $scope.casillasTablero[casillaActual].isActivo = false;
                casillaActual = identificador - 1;
                $scope.casillasTablero[casillaPosibleAdelante - 1].posible = false;
                $scope.casillasTablero[casillaPosibleAtras - 1].posible = false;
                $scope.casillasTablero[casillaActual].isActivo = true;

                //Comprobación de si la casilla es de quesito
                preguntaQuesito = $scope.casillasTablero[casillaActual].isQuesito;
                //Pregunta aleatoria
                preguntaAleatoria = Math.floor((Math.random() * 14));

                //Se muestra el panel de pregunta
                $scope.mensaje = "Responda a la pregunta";
                $scope.mostrarPanelPregunta = true;

                //Se realiza la pregunta según el tipo de casilla
                if ($scope.casillasTablero[identificador - 1].tipo === "deportes") {
                    buscarPregunta($scope.preguntasDeportes[preguntaAleatoria], 'deportes');
                } else if ($scope.casillasTablero[identificador - 1].tipo === "cultura") {
                    buscarPregunta($scope.preguntasCultura[preguntaAleatoria], 'cultura');
                } else if ($scope.casillasTablero[identificador - 1].tipo === "ocio") {
                    buscarPregunta($scope.preguntasOcio[preguntaAleatoria], 'ocio');
                } else if ($scope.casillasTablero[identificador - 1].tipo === "meta") {
                    buscarPregunta($scope.preguntasMeta[preguntaAleatoria], 'meta');
                }
            }
        };

        //Función que lanza el dado y se controla a qué casilla puede ir el jugador
        $scope.lanzarDado = function () {
            if (esperandoRespuesta === false && $scope.juegoCompletado === false) {
                //En el primer turno
                if (turno > 0) {
                    $scope.casillasTablero[casillaActual].posible = false;
                    $scope.casillasTablero[casillaActual].isActivo = true;
                }

                //Lanzamiento del dado
                $scope.valorDado = Math.floor((Math.random() * 3) + 1);

                esperandoRespuesta = true;
                //En el tablero puedes avanzar hacia delante o hacia atrás
                casillaPosibleAdelante = casillaActual + $scope.valorDado + 1;
                casillaPosibleAtras = casillaActual - $scope.valorDado + 1;

                if (casillaPosibleAdelante <= NUM_CASILLAS) {
                    //Si se tienen los tres quesitos se puede acceder a la meta
                    if (casillaPosibleAdelante === NUM_CASILLAS && $scope.quesitoDeportes === true && $scope.quesitoCultura === true && $scope.quesitoOcio === true) {
                        $scope.casillasTablero[casillaPosibleAdelante - 1].posible = true;
                    } else if (casillaPosibleAdelante <= (NUM_CASILLAS - 1)) {
                        $scope.casillasTablero[casillaPosibleAdelante - 1].posible = true;
                    } else {
                        casillaPosibleAdelante = casillaPosibleAdelante - $scope.valorDado - $scope.valorDado;
                        $scope.casillasTablero[casillaPosibleAdelante - 1].posible = true;
                    }
                } else {//Que pasa si no se puede ir hacia adelante con el dado
                    casillaPosibleAdelante = casillaPosibleAtras;
                    $scope.casillasTablero[casillaPosibleAdelante - 1].posible = true;
                }

                //Que pasa si no se puede ir hacia atras con el dado
                if (casillaPosibleAtras > 1) {
                    $scope.casillasTablero[casillaPosibleAtras - 1].posible = true;
                } else {
                    casillaPosibleAtras = casillaPosibleAdelante;
                    $scope.casillasTablero[casillaPosibleAtras - 1].posible = true;
                }

                turno = turno + 1;
                $scope.mensaje = "esperando";
                $scope.atencionPregunta = '';
                $scope.respuesta1 = '';
                $scope.respuesta2 = '';
                $scope.respuesta = '';
                $scope.resultado = ' esperando';
            }//fin del if
        };


        //Función que es llamada al responder una pregunta
        //Comprueba si ha habido éxito, si había quesito, si es la meta...
        $scope.onSubmit = function () {
            if (esperandoNuevaPregunta === false) {
                $scope.mostrarPanelPregunta = false;
                //Si se acierta la pregunta y no es de meta
                if ($scope.respuesta === globalCorrecta && tipoPregunta !== 'meta') {
                    $scope.preguntasCorrectas = $scope.preguntasCorrectas + 1;
                    $scope.resultado = "Acierto";
                    $scope.mensaje = "Lance el dado";

                    if (preguntaQuesito === true) {
                        if (tipoPregunta === 'deportes') {
                            $scope.quesitoDeportes = true;
                        } else if (tipoPregunta === 'cultura') {
                            $scope.quesitoCultura = true;
                        } else {
                            $scope.quesitoOcio = true;
                        }
                    }
                } else if (tipoPregunta === 'meta') {
                    $scope.preguntasCorrectas = $scope.preguntasCorrectas + 1;
                    $scope.juegoCompletado = true;
                    $scope.mensaje = "Completado";
                    $scope.resultado = "Completado";
                } else {
                    $scope.preguntasIncorrectas = $scope.preguntasIncorrectas + 1;
                    $scope.mensaje = "Lance el dado";
                    $scope.resultado = "Fallo";
                }

                //Si tenemos los tres quesitos se puede acceder a la pregunta final
                if ($scope.quesitoDeportes === true && $scope.quesitoOcio === true && $scope.quesitoCultura === true) {
                    $scope.preguntaFinalAcceso = true;
                }

                esperandoRespuesta = false;
                esperandoNuevaPregunta = true;
            }//fin del if
        };

        //función que es llamada por el boton reset, pone al valor inicial todas las variables
        $scope.reset = function () {

            if (turno !== 0) {
                $scope.casillasTablero[casillaPosibleAdelante - 1].posible = false;
                $scope.casillasTablero[casillaPosibleAtras - 1].posible = false;
            }

            //--- Reinciar variables ---//
            globalCorrecta = 0;
            esperandoRespuesta = false;
            esperandoNuevaPregunta = true;
            turno = 0;

            casillaActual = 0;
            casillaPosibleAdelante = 0;
            casillaPosibleAtras = 0;

            preguntaQuesito = false;
            tipoPregunta = "";

            preguntaAleatoria = 0;

            $scope.valorDado = 'Lance para empezar';
            $scope.mensaje = "Lance el dado";
            $scope.resultado = "Lance el dado";
            $scope.quesitoDeportes = false;
            $scope.quesitoCultura = false;
            $scope.quesitoOcio = false;
            $scope.mostrarPanelPregunta = false;
            $scope.preguntasCorrectas = 0;
            $scope.preguntasIncorrectas = 0;
            $scope.juegoCompletado = false;


            $scope.preguntaFinalAcceso = false;
        };
    }

    controllerModule.controller('TrainvialCtrl', TrainvialCtrl);

}(this, this.angular));