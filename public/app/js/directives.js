'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('reveal', function() {
     return {
        restrict: 'A',
        replace: false,
        scope: {
           data: '=data'
        },
        templateUrl: 'partials/directives/reveal.html'
     };
  });
