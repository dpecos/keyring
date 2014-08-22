'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('MainCtrl', ['$rootScope', '$q', '$modal', 'categoriesDAO', function($rootScope, $q, $modal, categoriesDAO) {
     //$q.when(categoriesDAO.load()).then(function(categories) { $rootScope.categories = categories; });
     $rootScope.categories = [{name:'foo'}];

     this.showCategories = function() {
        var modalInstance = $modal.open({
           templateUrl: 'partials/categories.html',
           controller: 'CategoriesCtrl as Ctrl',
           resolve: {
              categories: function() {
                 return $scope.categories;
              }
           }
        });

        modalInstance.result.then(null, function(categories) {
           console.log(arguments);
        });
     };

  }])

  .controller('EntriesCtrl', ['$scope', '$q', 'entriesDAO', function($scope, $q, entriesDAO) {
     $q.when(entriesDAO.load()).then(function(entries) { $scope.entries = entries; });

     this.entriesByCategory = function(category) {
        return $scope.entries.filter(function(entry) {
           return entry.category === category.name;
        });
     };
  }])

  .controller('CategoriesCtrl', ['$rootScope', '$q', 'entriesDAO', function($rootScope, $q, entriesDAO) {
     this.remove = function(category) {
        $rootScope.categories = $rootScope.categories.filter(function(cat) {
           return cat.name != category.name;
        });
     };

     this.add = function() {
        console.log(arguments);
     };
  }]);
