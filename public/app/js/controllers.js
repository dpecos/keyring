'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('MainCtrl', ['$rootScope', '$q', '$modal', 'categoriesDAO', function($rootScope, $q, $modal, categoriesDAO) {
     $rootScope.categories = [];
     $rootScope.entries = [];

     this.showCategories = function() {
        var modalInstance = $modal.open({
           templateUrl: 'partials/categories.html',
           controller: 'CategoriesCtrl as Ctrl'
        });

        modalInstance.result.then(null, function(categories) {
           // TODO
           console.log(arguments);
        });
     };

     this.addNewEntry = function() {
        var modalInstance = $modal.open({
           templateUrl: 'partials/addEntry.html',
           controller: 'EditEntryCtrl as Ctrl',
           resolve: {
              entry: function() {
                 return { };
              }
           }
        });

        modalInstance.result.then(function(newEntry) {
           // TODO
           console.log(arguments);
        }, function() {
           // dialog closed without saving
           // TODO
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

  .controller('EditEntryCtrl', ['$rootScope', '$scope', '$q', '$modalInstance', 'entriesDAO', 'entry', function($rootScope, $scope, $q, $modalInstance, entriesDAO, entry) {
     $scope.entry = entry;

     this.save = function() {
        $q.when(entriesDAO.create($scope.entry)).then(function(entry) { 
           $rootScope.entries.push(entry);
           $modalInstance.close($scope.entry);
        }, function(err) {
           console.log(err);
           alert("Error creating entry: " + err.statusText);
        });
     };
  }])

  .controller('CategoriesCtrl', ['$rootScope', '$scope', '$q', '$modal', 'categoriesDAO', function($rootScope, $scope, $q, $modal, categoriesDAO) {
     var me = this; 

     this.load = function() {
        $q.when(categoriesDAO.load()).then(function(payload) { $rootScope.categories = payload.data.data; });
     };

     this.remove = function(category) {
        $q.when(categoriesDAO.remove(category)).then(function(error) {
           //TODO: handle error
           $rootScope.categories = $rootScope.categories.filter(function(cat) {
              return cat.name != category.name;
           });
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
              me.load();
           }, function(err) {
              console.log(err);
              alert("Error creating category: " + err.statusText);
           });
        }, function() {
           // dialog closed without saving
        });
     };

     this.load();
  }])

  .controller('EditCategoryCtrl', ['$scope', '$modalInstance', 'category', function($scope, $modalInstance, category) {
     $scope.category = category;

     this.save = function() {
        $modalInstance.close($scope.category);
     };
  }]);
