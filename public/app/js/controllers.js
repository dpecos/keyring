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
              /*categories: function() {
                 return $scope.categories;
              }*/
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

  .controller('EditCategoryCtrl', ['$scope', '$modalInstance', 'category', function($scope, $modalInstance, category) {
     $scope.category = category;

     this.save = function() {
        $modalInstance.close($scope.category);
     };
  }])

  .controller('CategoriesCtrl', ['$rootScope', '$scope', '$q', '$modal', 'categoriesDAO', function($rootScope, $scope, $q, $modal, categoriesDAO) {

     this.remove = function(category) {
        $rootScope.categories = $rootScope.categories.filter(function(cat) {
           return cat.name != category.name;
        });
     };

     this.add = function() {
        var modalInstance = $modal.open({
           templateUrl: 'partials/editCategory.html',
           controller: 'EditCategoryCtrl as Ctrl',
           //scope: $scope,
           resolve: {
              category: function() {
                 return { name: null };
              }
           }
        });

        modalInstance.result.then(function(newCategory) {
           $q.when(categoriesDAO.create(newCategory)).then(function(category) { 
              $scope.categories.push(category);
           }, function(err) {
              console.log(err);
              alert("Error creating category: " + err.statusText);
           });
        }, function() {
           // dialog closed without saving
        });
     };
  }]);
