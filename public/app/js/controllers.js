'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$scope', 'categoriesDAO', 'entriesDAO', function($scope, categoriesDAO, entriesDAO) {
     $scope.categories = categoriesDAO.categories;
     $scope.entries = entriesDAO.entries;

     this.entriesByCategory = function(category) {
        return $scope.entries.filter(function(entry) {
           return entry.category === category.name;
        });
     };

  }]);
