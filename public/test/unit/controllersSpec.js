'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('myApp.controllers'));
  beforeEach(module('myApp.factories'));

  describe('MainCtrl', function() {
     var scope = null;
     var mainCtrl = null;

     beforeEach(inject(function($controller) {
        scope = {};

        scope.entries = [
           {name: "Entry 1", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "foo"},
           {name: "Entry 2", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "bar"},
        ];
        
        mainCtrl = $controller('MainCtrl', { $scope: scope });
     }));

     it('should be defined', function() {
        expect(mainCtrl).toBeDefined();
     });

     it('should filter entries by category', function() {
        expect(mainCtrl.entriesByCategory({name: "bar"})[0].name).toBe("Entry 2");
     });
  });

});
