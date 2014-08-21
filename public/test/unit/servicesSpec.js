'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('myApp.services'));

  describe('cryptoSRV', function() {

     it('should encrypt and decrypt properly', inject(function(cryptoSRV) {
        var encrypted = cryptoSRV.encrypt("keyring", "keyring");
        expect(cryptoSRV.decrypt(encrypted, "keyring")).toBe("keyring");
     }));

  });
});
