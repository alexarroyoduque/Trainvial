(function (global, angular) {
    'use strict';

    var filterModule = angular.module('filterModule', []);

    function quesitoEstadoFilter() {
        return function (quesitoEstado) {
            if (quesitoEstado === true) {
                return 'Conseguido';
            } else {
                return 'No conseguido';
            }
        };
    }
    filterModule.filter('quesitoEstadoFilter', quesitoEstadoFilter);


    function quesitoClaseFilter() {
        return function (quesitoEstado) {
            if (quesitoEstado === true) {
                return ' quesitoConseguido';
            } else {
                return ' ';
            }
        };
    }
    filterModule.filter('quesitoClaseFilter', quesitoClaseFilter);


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
    filterModule.filter('filtroCasilla', filtroCasilla);

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
            } else if (inputResultado === "Lance el dado") {
                return ' img/trainvial/resultado-mano.png';
            } else {
                return ' img/trainvial/resultado-interrogacion.png';
            }
        };
    }
    filterModule.filter('resultadoFilter', resultadoFilter);


    function valorDadoFilter() {
        return function (inputValorDado) {
            if (inputValorDado === 1) {
                return ' img/trainvial/valor-dado1.png';
            } else if (inputValorDado === 2) {
                return ' img/trainvial/valor-dado2.png';
            } else if (inputValorDado === 3) {
                return ' img/trainvial/valor-dado3.png';
            } else {
                return ' img/trainvial/dado.png';
            }
        };
    }
    filterModule.filter('valorDadoFilter', valorDadoFilter);


    function habilitarDadoFilter() {
        return function (inputMensaje) {
            if (inputMensaje === 'Lance el dado') {
                return ' habilitarDado';
            } else {
                return ' ';
            }
        };
    }
    filterModule.filter('habilitarDadoFilter', habilitarDadoFilter);


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
            } else {
                return ' img/trainvial/mensaje.png';
            }
        };
    }
    filterModule.filter('mensajeFilter', mensajeFilter);

}(this, this.angular));