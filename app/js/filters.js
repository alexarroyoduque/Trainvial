(function (global, angular, _) {
  'use strict';

  var filterModule = angular.module('filterModule', []);

  function filtroCasilla() {
    return function (tipo, posible, isActivo, isQuesito, preguntaFinalAcceso) {
      var dev = tipo;
      if (posible === true) {
        dev += ' casillaPosible';
      }
      if (isActivo === true) {
        dev += ' casillaActual';
      }
      if (isQuesito === true) {
        dev += '  casillaQuesito';
      }
      if (tipo === 'meta' && preguntaFinalAcceso === false) {
        dev += ' bloqueado';
      }
      return ' ' + dev;
    };
  }

  function resultadoFilter() {
    return function (inputResultado) {
      if (inputResultado === "Acierto") {
        return ' img/trainvial/resultado-acierto.png';
      } else if (inputResultado === "Fallo") { 
        return ' img/trainvial/resultado-fallo.png';
      } else if (inputResultado === "esperando") { 
        return ' img/trainvial/resultado-interrogacion.png';
      } else if (inputResultado === "Completado") { 
        return ' img/trainvial/resultado-completo.png';
      }
        else return ' img/trainvial/resultado-interrogacion.png';
    };
  }
  
  function valorDadoFilter() {
    return function (inputValorDado) {
      if (inputValorDado === 1) {
        return ' img/trainvial/valor-dado1.png';
      } else if (inputValorDado === 2) { 
        return ' img/trainvial/valor-dado2.png';
      } else if (inputValorDado === 3) { 
        return ' img/trainvial/valor-dado3.png';
      }
        else return ' img/trainvial/dado.png';
    };
  }

  function habilitarDadoFilter() {
    return function(inputMensaje) {
      if (inputMensaje === 'Lance el dado') {
        return ' habilitarDado';
      } else return ' ';
    };
  }

    function mensajeFilter() {
    return function (inputMensaje) {
      if (inputMensaje === 'Lance el dado') {
        return ' img/trainvial/mensaje-dado.png';
      } else if (inputMensaje === 'Responda a la pregunta') { 
        return ' img/trainvial/mensaje-reloj.png';
      } else if (inputMensaje === 'esperando') { 
        return ' img/trainvial/mensaje-reloj.png';
      } else if (inputMensaje === 'Completado') { 
        return ' img/trainvial/mensaje-trofeo.png';
      }
      else return ' img/trainvial/mensaje.png';
    };
  }

  filterModule.filter('filtroCasilla', filtroCasilla);
  filterModule.filter('resultadoFilter', resultadoFilter);
  filterModule.filter('valorDadoFilter', valorDadoFilter);
  filterModule.filter('mensajeFilter', mensajeFilter);
  filterModule.filter('habilitarDadoFilter', habilitarDadoFilter);
}(this, this.angular, this._));