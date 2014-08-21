angular.module('myApp.factories', [])
  .factory("categoriesDAO", function($http) {
     return {
        load: function() {
           return $http.get("/data/category");
        }
     };
  })
  .factory("entriesDAO", function() {
     return {
        load: function() {
           return [
           {name: "Entry 1", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "foo"},
           {name: "Entry 2", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "bar"},
           {name: "Entry 2", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "foo"}
           ]
        }
     };
  });
