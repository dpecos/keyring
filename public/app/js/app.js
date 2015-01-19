'use strict';


// Declare app level module which depends on filters, and services
angular.module('KeyRing', [
  'ngRoute',
  'KeyRing.filters',
  'KeyRing.services',
  'KeyRing.directives',
  'KeyRing.factories',
  'KeyRing.controllers',
  'ui.bootstrap'
])
.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();  
  });
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {templateUrl: 'partials/entries.html', controller: 'EntriesCtrl', controllerAs: 'Ctrl'});
  $routeProvider.otherwise({redirectTo: '/list'});
}]);


