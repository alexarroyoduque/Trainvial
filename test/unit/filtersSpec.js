/*global describe, it, expect, inject, beforeEach, angular */
(function (global, angular) {
'use strict';

    describe('Filtros', function() {
        var $filter;

        //Se carga el módulo de filtros para poder llamar a los filtros de dicho módulo
        beforeEach(module('filterModule'));

        //Se injecta a la variable $filter el $filter de angular para poder usar $filter cuando se necesite
        beforeEach(inject(function ($injector) {
            $filter  = $injector.get('$filter');

        }));

        it("Probando quesitoEstadoFilter, evalua si se ha conseguido cierto quesito", function () {
            expect($filter('quesitoEstadoFilter')(true)).toEqual('Conseguido');
            expect($filter('quesitoEstadoFilter')(false)).toEqual('No conseguido');
        });

        it("Probando quesitoClaseFilter, si se ha conseguido un quesito aplica una clase", function () {
            expect($filter('quesitoClaseFilter')(true)).toEqual(' quesitoConseguido');
            expect($filter('quesitoClaseFilter')(false)).toEqual(' ');
        });

        it("Probando resultadoFilter, dependiendo del resultado a la pregunta se carga una imagen u otra", function () {
            expect($filter('resultadoFilter')('Acierto')).toEqual('img/trainvial/resultado-acierto.png');
            expect($filter('resultadoFilter')('Fallo')).toEqual('img/trainvial/resultado-fallo.png');
            expect($filter('resultadoFilter')('esperando')).toEqual('img/trainvial/resultado-interrogacion.png');
            expect($filter('resultadoFilter')('Completado')).toEqual('img/trainvial/resultado-completo.png');
            expect($filter('resultadoFilter')('Lance el dado')).toEqual('img/trainvial/resultado-mano.png');
            expect($filter('resultadoFilter')(undefined)).toEqual('img/trainvial/resultado-interrogacion.png');
        });

        it("Probando valorDadoFilter, dependiendo del valor de dado se carga una imagen u otra", function () {
            expect($filter('valorDadoFilter')(1)).toEqual('img/trainvial/valor-dado1.png');
            expect($filter('valorDadoFilter')(2)).toEqual('img/trainvial/valor-dado2.png');
            expect($filter('valorDadoFilter')(3)).toEqual('img/trainvial/valor-dado3.png');
            expect($filter('valorDadoFilter')(undefined)).toEqual('img/trainvial/dado.png');
        });

        it("Probando habilitarDadoFilter, si toca tirar el dado se aplica una clase", function () {
            expect($filter('habilitarDadoFilter')('Lance el dado')).toEqual(' habilitarDado');
            expect($filter('habilitarDadoFilter')(undefined)).toEqual(' ');
        });

        it("Probando mensajeFilter, se carga una imagen u otra dependiendo del estado del juego", function () {
            expect($filter('mensajeFilter')('Lance el dado')).toEqual('img/trainvial/mensaje-dado.png');
            expect($filter('mensajeFilter')('Responda a la pregunta')).toEqual('img/trainvial/mensaje-reloj.png');
            expect($filter('mensajeFilter')('esperando')).toEqual('img/trainvial/mensaje-reloj.png');
            expect($filter('mensajeFilter')('Completado')).toEqual('img/trainvial/mensaje-trofeo.png');
            expect($filter('mensajeFilter')(undefined)).toEqual('img/trainvial/mensaje.png');
        });

    });

}(this, angular));