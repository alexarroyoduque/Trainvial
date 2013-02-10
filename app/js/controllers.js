(function (global, angular) {
var controllerModule = angular.module('controllerModule', []);



function TrainvialCtrl($scope, $http) {

  var NUM_PREGUNTAS=0;
  var NUM_CASILLAS=0;

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
  $http.get('json/preguntasDeportes.json').success(function(data) {
    $scope.preguntasDeportes = data;
    NUM_PREGUNTAS = data.length - 1;
  });
  $http.get('json/preguntasCultura.json').success(function(data) {
    $scope.preguntasCultura = data;
  });
  $http.get('json/preguntasOcio.json').success(function(data) {
    $scope.preguntasOcio = data;
  });
  $http.get('json/preguntasMeta.json').success(function(data) {
    $scope.preguntasMeta = data;
  });

  $http.get('json/tablero.json').success(function(data) {
    $scope.casillasTablero = data;
     NUM_CASILLAS = data.length;
  });

  //--- Inicializar variables ---//
  var globalCorrecta = 0;
      esperandoRespuesta = false,
      esperandoNuevaPregunta = true,
      dadoLanzado = false,
      turno = 0;

  var casillaActual = 0,
      casillaPosibleAdelante = 0,
      casillaPosibleAtras = 0;

  var preguntaQuesito = false,
      tipoPregunta = "";
      

  var preguntaAleatoria = 0;

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

  $scope.hacerPregunta = function(identificador) {
    if(dadoLanzado == true && esperandoNuevaPregunta == true && (identificador == casillaPosibleAdelante || identificador == casillaPosibleAtras)) {
      $scope.casillasTablero[casillaActual].isActivo = false;
      casillaActual = identificador-1;
      $scope.casillasTablero[casillaPosibleAdelante-1].posible = false;
      $scope.casillasTablero[casillaPosibleAtras-1].posible = false;
      $scope.casillasTablero[casillaActual].isActivo = true;

      //Comprobación de si la casilla es de quesito
      preguntaQuesito = $scope.casillasTablero[casillaActual].isQuesito;
      //Pregunta aleatoria
      preguntaAleatoria = Math.floor((Math.random()*14)+0);
      
      //Se muestra el panel de pregunta
      $scope.mensaje = "Responda a la pregunta";
      $scope.mostrarPanelPregunta = true;

      //Se realiza la pregunta según el tipo de casilla
      if($scope.casillasTablero[identificador-1].tipo == "deportes") {
        buscarPregunta($scope.preguntasDeportes[preguntaAleatoria], 'deportes');
      }
      if($scope.casillasTablero[identificador-1].tipo == "cultura") {
        buscarPregunta($scope.preguntasCultura[preguntaAleatoria], 'cultura');
      }
      if($scope.casillasTablero[identificador-1].tipo == "ocio") {
        buscarPregunta($scope.preguntasOcio[preguntaAleatoria], 'ocio');
      }
      if($scope.casillasTablero[identificador-1].tipo == "meta") {
        //$scope.preguntaFinalAcceso = true;
        buscarPregunta($scope.preguntasMeta[preguntaAleatoria], 'meta');
      }
    }
  };
  
  //Función que lanza el dado y se controla a qué casilla puede ir el jugador
  $scope.lanzarDado = function() {
    if(esperandoRespuesta == false && dadoLanzado == false && $scope.juegoCompletado == false) {
      //En el primer turno
      if(turno!=0) {
        $scope.casillasTablero[casillaActual].posible = false;
        $scope.casillasTablero[casillaActual].isActivo = true;
      }

      //Lanzamiento del dado
      $scope.valorDado = Math.floor((Math.random()*3)+1);

      esperandoRespuesta = true;

      dadoLanzado = true;
      casillaPosibleAdelante = casillaActual+$scope.valorDado+1;
      casillaPosibleAtras=casillaActual-$scope.valorDado+1;
      if(casillaPosibleAdelante<=11) {
        if(casillaPosibleAdelante == 11 && $scope.quesitoDeportes == true && $scope.quesitoCultura == true && $scope.quesitoOcio == true) {
          $scope.casillasTablero[casillaPosibleAdelante-1].posible= true;
        }else if(casillaPosibleAdelante<=10) {
          $scope.casillasTablero[casillaPosibleAdelante-1].posible= true;
          }else{
            casillaPosibleAdelante = casillaPosibleAdelante - $scope.valorDado - $scope.valorDado;
            $scope.casillasTablero[casillaPosibleAdelante-1].posible = true;
          }
      }else{//Que pasa si no se puede ir hacia adelante con el dado
            casillaPosibleAdelante = casillaPosibleAtras;
            $scope.casillasTablero[casillaPosibleAdelante-1].posible = true;
          }

      //Que pasa si no se puede ir hacia atras con el dado
      if(casillaPosibleAtras>1) {
         $scope.casillasTablero[casillaPosibleAtras-1].posible = true;
      }else{
           casillaPosibleAtras = casillaPosibleAdelante;
           $scope.casillasTablero[casillaPosibleAtras-1].posible = true;
      }

      turno++;
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
  $scope.onSubmit = function() {
    if(esperandoNuevaPregunta == false) {

      $scope.mostrarPanelPregunta = false;

      if($scope.respuesta == globalCorrecta) {
        $scope.resultado = "Acierto"
        $scope.preguntasCorrectas++;
        $scope.mensaje = "Lance el dado";
        
        if (tipoPregunta == 'meta') {
            $scope.juegoCompletado = true;
            $scope.mensaje = "Completado";
            $scope.resultado = "Completado";
        }

        if(preguntaQuesito == true) {
            if(tipoPregunta == 'deportes') {
              $scope.quesitoDeportes=true;
            }else if(tipoPregunta == 'cultura') {
              $scope.quesitoCultura=true;
            }else
              $scope.quesitoOcio=true;
        }
      } else {
          $scope.mensaje = "Lance el dado";
          $scope.resultado = "Fallo"
          //$scope.preguntaFinalAcceso = false;
          $scope.preguntasIncorrectas++;
        }

        //Si tenemos los tres quesitos se puede acceder a la pregunta final
        if ($scope.quesitoDeportes == true && $scope.quesitoOcio == true && $scope.quesitoCultura == true) {
          $scope.preguntaFinalAcceso = true;
        }

        esperandoRespuesta = false;
        esperandoNuevaPregunta = true;
        dadoLanzado = false;
      };
    }//fin del if

  //función que es llamada por el boton reset, pone al valor inicial todas las variables
  $scope.reset = function() {

    if(turno!=0) {
      $scope.casillasTablero[casillaPosibleAdelante-1].posible = false;
      $scope.casillasTablero[casillaPosibleAtras-1].posible = false;
    }
    //--- Reinciar variables ---//
    globalCorrecta = 0;
    esperandoRespuesta = false;
    esperandoNuevaPregunta = true;
    dadoLanzado = false;
    turno = 0;

    casillaActual = 0;
    casillaPosibleAdelante = 0;
    casillaPosibleAtras = 0;

    preguntaQuesito = false;
    tipoPregunta = "";
        

    var preguntaAleatoria = 0;

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

controllerModule.controller('TrainvialCtrl',TrainvialCtrl);

}(this, this.angular));