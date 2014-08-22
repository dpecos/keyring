'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.factories',
  'myApp.controllers',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {templateUrl: 'partials/entries.html', controller: 'EntriesCtrl', controllerAs: 'Ctrl'});
  $routeProvider.otherwise({redirectTo: '/list'});
}]);
