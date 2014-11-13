'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

  .controller('MainCtrl', ['$rootScope', '$q', '$modal', 'categoriesDAO', 'entriesDAO', 'cryptoSRV', function($rootScope, $q, $modal, categoriesDAO, entriesDAO, cryptoSRV) {
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

     var loadCategories = function() {
        return $q.when(categoriesDAO.load()).then(function(payload) { $rootScope.categories = payload.data.data; });
     };
     
     var loadEntries = function() {
        return $q.when(entriesDAO.load()).then(function(entries) { 
           $rootScope.entries = entries.data.data; 
           $rootScope.checkLock();
        });
     };

     $rootScope.reloadData = function() {
        loadCategories().then(loadEntries);
     };

     $rootScope.checkLock = function() {
        $rootScope.entries = $rootScope.entries.map(function(entry) {
           if ($rootScope.masterPassword) {
              entry.clearPassword = cryptoSRV.decrypt(entry.password, $rootScope.masterPassword);
           } else {
              delete entry.clearPassword;
           }
           return entry;
        });
     };

     $rootScope.reloadData();

  }])

  .controller('EntriesCtrl', ['$rootScope', '$scope', '$q', 'entriesDAO', function($rootScope, $scope, $q, entriesDAO) {
     var me = this; 

     this.entriesByCategory = function(category) {
        return $rootScope.entries.filter(function(entry) {
           return entry.category === category.name;
        });
     };
  }])

  .controller('EditEntryCtrl', ['$rootScope', '$scope', '$q', '$modalInstance', 'entriesDAO', 'cryptoSRV', 'entry', function($rootScope, $scope, $q, $modalInstance, entriesDAO, cryptoSRV, entry) {
     $scope.entry = entry;

     this.save = function() {
        entry.clearPassword = entry.password;
        entry.password = cryptoSRV.encrypt(entry.clearPassword,  $rootScope.masterPassword);

        $q.when(entriesDAO.create($scope.entry)).then(function(entry) { 
           $rootScope.entries.push($scope.entry);
           $modalInstance.close($scope.entry);
        }, function(err) {
           console.log(err);
           alert("Error creating entry: " + err.statusText);
        });
     };
  }])

  .controller('CategoriesCtrl', ['$rootScope', '$scope', '$q', '$modal', 'categoriesDAO', function($rootScope, $scope, $q, $modal, categoriesDAO) {
     var me = this; 

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
              $rootScope.reloadData();
           }, function(err) {
              console.log(err);
              alert("Error creating category: " + err.statusText);
           });
        }, function() {
           // dialog closed without saving
        });
     };
  }])

  .controller('EditCategoryCtrl', ['$scope', '$modalInstance', 'category', function($scope, $modalInstance, category) {
     $scope.category = category;

     this.save = function() {
        $modalInstance.close($scope.category);
     };
  }]);
