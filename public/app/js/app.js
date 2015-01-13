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
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {templateUrl: 'partials/entries.html', controller: 'EntriesCtrl', controllerAs: 'Ctrl'});
  $routeProvider.otherwise({redirectTo: '/list'});
}]);
