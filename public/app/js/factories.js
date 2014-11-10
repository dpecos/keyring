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
           return [
           {name: "Entry 1", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "foo"},
           {name: "Entry 2", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "bar"},
           {name: "Entry 2", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "foo"}
           ]
        },
        create: function(entry) {
           return $http.post("/data/entry", entry);
        }
     };
  });
