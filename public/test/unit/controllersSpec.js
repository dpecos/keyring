'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('KeyRing.controllers'));
  beforeEach(module('KeyRing.factories'));

  describe('EntriesCtrl', function() {
     var scope = null;
     var entriesCtrl = null;

     beforeEach(inject(function($controller) {
        scope = {};

        scope.entries = [
           {name: "Entry 1", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "foo"},
           {name: "Entry 2", url: "http://", user: "User 1", email: "user1@email.com", password: "password1", notes: "Notes for entry 1", category: "bar"},
        ];
        
        entriesCtrl = $controller('EntriesCtrl', { $scope: scope });
     }));

     it('should be defined', function() {
        expect(entriesCtrl).toBeDefined();
     });

     it('should filter entries by category', function() {
        expect(entriesCtrl.entriesByCategory({name: "bar"})[0].name).toBe("Entry 2");
     });
  });

});
