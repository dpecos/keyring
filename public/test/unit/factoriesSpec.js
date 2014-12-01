'use strict';

/* jasmine specs for controllers go here */

describe('factories', function(){
  beforeEach(module('KeyRing.factories'));

  describe('categoriesDAO', function() {
     var categoriesDAO = null;

     beforeEach(inject(['categoriesDAO', function(factory) {
        categoriesDAO = factory;
     }]));

     it('should be defined', function() {
        expect(categoriesDAO).toBeDefined();
     });
  });

  describe('entriesDAO', function() {
     var entriesDAO = null;

     beforeEach(inject(['entriesDAO', function(factory) {
        entriesDAO = factory;
     }]));

     it('should be defined', function() {
        expect(entriesDAO).toBeDefined();
     });
  });

});
