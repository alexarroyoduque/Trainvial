(function (global, angular) {
'use strict';

/* Directives */
var directiveModule = angular.module('directiveModule', []);

function panelpersonal(){
  return{
    restrict: 'A',
    replace: true,
    templateUrl: "partials/panel-personal.html" 
  };
}

directiveModule.directive('panelpersonal',panelpersonal);

function panelpregunta(){
  return{
    restrict: 'A',
    replace: true,
    templateUrl: "partials/panel-pregunta.html" 
  };
}

directiveModule.directive('panelpregunta',panelpregunta);

function paneljuegocompleto(){
  return{
    restrict: 'A',
    replace: true,
    templateUrl: "partials/panel-juego-completo.html" 
  };
}

directiveModule.directive('paneljuegocompleto',paneljuegocompleto);

function panelprogreso(){
  return{
    restrict: 'A',
    replace: true,
    templateUrl: "partials/panel-progreso.html" 
  };
}

directiveModule.directive('panelprogreso',panelprogreso);

function paneldesarrollador(){
  return{
    restrict: 'A',
    replace: true,
    templateUrl: "partials/panel-desarrollador.html" 
  };
}

directiveModule.directive('paneldesarrollador',paneldesarrollador);

function tablero(){
  return{
    restrict: 'A',
    replace: true,
    templateUrl: "partials/tablero.html" 
  };
}

directiveModule.directive('tablero',tablero);

}(this, this.angular));