'use strict';

/* Directives */
function myFunction($scope) {
  $scope.someText = 'Write  something';
}
 
angular.module('componentModule', [])
  .directive('component', function () {
    return {
      restrict: 'E',
      // This HTML will replace the component directive.
      replace: true,
      template: '<div>' +
                  '<div ng-class="first">{{someText | uppercase}}</div>' +
                '</div>'
      }
  });

angular.module('componentModule', [])
  .directive('formcomponent', function ($compile) {
    return {
      restrict: 'E',
      scope: {
        elementtag: '=elementtag'//'=elementtag' es el tag del html
      }, 
      link: function (scope, element, attrs) {
         /*console.log(element);
         console.log(scope);
         console.log(attrs);*/
        var aux=  scope.elementtag;
        var htmlText= "<div> <label for=" +aux.forLabel+ " >" + aux.label + 
        "</label> <input ng-model=\"userInput\" type=" +aux.type + " name=" +aux.name+ " id=" +aux.id+ "></div>";
        //console.log(element);
        element.html(htmlText);
        $compile(element.contents())(scope);
      }
    }
  });