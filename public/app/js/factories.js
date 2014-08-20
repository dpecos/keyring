angular.module('myApp.factories', [])
  .factory("categoriesDAO", function() {
     return {
        categories: [
        {name: "foo", id: 1},
        {name: "bar", id: 2}
        ]
     };
  })
  .factory("entriesDAO", function() {
     return {
        entries: [
           {name: "Entry 1", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "foo"},
           {name: "Entry 2", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "bar"},
           {name: "Entry 2", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "foo"}
        ]
     };
  });
