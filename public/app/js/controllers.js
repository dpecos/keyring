'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('MainCtrl', ['$scope', '$q', 'categoriesDAO', 'entriesDAO', function($scope, $q, categoriesDAO, entriesDAO) {
     $q.when(categoriesDAO.load()).then(function(categories) { $scope.categories = categories; });
     $q.when(entriesDAO.load()).then(function(entries) { $scope.entries = entries; });

     this.entriesByCategory = function(category) {
        return $scope.entries.filter(function(entry) {
           return entry.category === category.name;
        });
     };

  }]);
