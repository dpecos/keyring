'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$scope', 'categoriesFacade', 'entriesFacade', function($scope, categoriesFacade, entriesFacade) {
     $scope.categories = categoriesFacade.categories;
     $scope.entries = entriesFacade.entries;

     $scope.entriesByCategory = function(category) {
        return $scope.entries.filter(function(entry) {
           return entry.category === category.name;
        });
     };

  }]);
