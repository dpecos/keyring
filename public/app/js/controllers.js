'use strict';

/* Controllers */

function showEntryDialog(entry, $modal) {
   var isNewEntry = entry == null;
   entry = entry || {};

   var previousCipheredUser = entry.user;
   var previousCipheredPassword = entry.password;
   entry.user = entry.clearUser;
   entry.password = entry.clearPassword;

   var modalInstance = $modal.open({
      templateUrl: 'partials/addEntry.html',
      controller: 'EditEntryCtrl as Ctrl',
      resolve: {
         entry: function() {
            return entry;
         }
      }
   });

   modalInstance.result.then(function(newEntry) {
      //ok
   }, function() {
      //cancel
      if (!isNewEntry) {
         entry.user = previousCipheredUser;
         entry.password = previousCipheredPassword;
      }
   });
}

angular.module('KeyRing.controllers', [])

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
    });
  };

  this.addNewEntry = function() {
    showEntryDialog(null, $modal);
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

  $rootScope.checkLock = function() {
    $rootScope.entries = $rootScope.entries.map(function(entry) {
      if ($rootScope.masterPassword) {
        entry.clearUser = cryptoSRV.decrypt(entry.user, $rootScope.masterPassword);
        entry.clearPassword = cryptoSRV.decrypt(entry.password, $rootScope.masterPassword);
      } else {
        delete entry.clearUser;
        delete entry.clearPassword;
      }
      return entry;
    });
  };

  $rootScope.reloadData = function() {
    loadCategories().then(loadEntries);
  };

  $rootScope.reloadData();

}])

.controller('MasterPasswordCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {

   this.show = function() {
      bootbox.prompt({
         title: "Master password",
         className: 'info',
         inputType: 'password',
         callback: function(password) {
            if (password) {
               $rootScope.masterPassword = password;
            } else {
               $rootScope.masterPassword = null;
            }
            $rootScope.$apply();
            $rootScope.checkLock();
         }
      });
   };

}])

.controller('EntriesCtrl', ['$rootScope', '$scope', '$q', '$modal', '$anchorScroll', '$location', '$log', 'entriesDAO', function($rootScope, $scope, $q, $modal, $anchorScroll, $location, $log, entriesDAO) {
  this.entriesByCategory = function(category) {
    return $rootScope.entries.filter(function(entry) {
      return entry.category === category.name;
    });
  };

  this.entriesInCategory = function(category) {
     return this.entriesByCategory(category).length;
  };

  this.editEntry = function(entry) {
    showEntryDialog(entry, $modal);
  };

  this.deleteEntry = function(entry) {
    bootbox.confirm({
      title: "Confirm deletion",
      message: "Are you sure you want to remove this entry?",
      className: 'warning',
      callback: function(result) {
        if (result) {
          $q.when(entriesDAO.remove(entry)).then(function() { 
            var index = $rootScope.entries.indexOf(entry);
            $rootScope.entries.splice(index, 1);
          }, function(err) {
            $log.error(err);
            alert("Error deleting entry: " + err.statusText);
          });
        }
      }
    });
  }

  this.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  }

}])

.controller('EditEntryCtrl', ['$rootScope', '$scope', '$q', '$modalInstance', '$log', 'entriesDAO', 'cryptoSRV', 'entry', function($rootScope, $scope, $q, $modalInstance, $log, entriesDAO, cryptoSRV, entry) {
   $scope.entry = entry;

   this.save = function() {
      var clearUser = entry.user;
      var clearPassword = entry.password;

      entry.user = cryptoSRV.encrypt(clearUser, $rootScope.masterPassword);
      entry.password = cryptoSRV.encrypt(clearPassword, $rootScope.masterPassword);

      delete entry.clearUser;
      delete entry.clearPassword;

      if (entry._id) {
         $q.when(entriesDAO.update(entry)).then(function(response) { 
            entry.clearUser = clearUser;
            entry.clearPassword = clearPassword;
            $modalInstance.close(response);
         }, function(err) {
            $log.error(err);
            entry.clearUser = clearUser;
            entry.clearPassword = clearPassword;
            alert("Error updating entry: " + err.statusText);
         });
      } else {
         $q.when(entriesDAO.create(entry)).then(function(response) { 
            $modalInstance.close(response);
            $rootScope.reloadData();
         }, function(err) {
            $log.error(err);
            entry.clearUser = clearUser;
            entry.clearPassword = clearPassword;
            alert("Error creating entry: " + err.statusText);
         });
      }
   };

   this.cancel = function() {
      $modalInstance.close();
   };
}])

.controller('CategoriesCtrl', ['$rootScope', '$scope', '$q', '$modalInstance', '$modal', '$log', 'categoriesDAO', function($rootScope, $scope, $q, $modalInstance, $modal, $log, categoriesDAO) {
  this.remove = function(category) {
    bootbox.confirm({
      title: "Confirm deletion",
      message: "Are you sure you want to remove this category?",
      className: 'warning',
      callback: function(result) {
        if (result) {
          $q.when(categoriesDAO.remove(category)).then(function(error) {
            //TODO: handle error
            $rootScope.categories = $rootScope.categories.filter(function(cat) {
              return cat.name != category.name;
            });
          });
        }
      }
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
      if (newCategory) {
        $q.when(categoriesDAO.create(newCategory)).then(function(category) { 
          $rootScope.reloadData();
        }, function(err) {
          $log.error(err);
          alert("Error creating category: " + err.statusText);
        });
      }
    }, function() {
      // dialog closed without saving
    });
  };

  this.cancel = function() {
    $modalInstance.close();
  };
}])

.controller('EditCategoryCtrl', ['$scope', '$modalInstance', 'category', function($scope, $modalInstance, category) {
   $scope.category = category;

   this.save = function() {
      $modalInstance.close($scope.category);
   };

   this.cancel = function() {
      $modalInstance.close();
   };
}]);
