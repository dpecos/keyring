angular.module('myApp.factories', [])
  .factory("categoriesDAO", function($http) {
     return {
        load: function() {
           return $http.get("/data/category");
        }, 
        create: function(category) {
           return $http.post("/data/category", category);
        },
        remove: function(category) {
           return $http.delete("/data/category/" + category._id);
        }
     };
  })
  .factory("entriesDAO", function($http) {
     return {
        load: function() {
           return $http.get("/data/entry");
        },
        create: function(entry) {
           return $http.post("/data/entry", entry);
        }
     };
  });
