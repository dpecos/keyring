'use strict';

/* Services */

angular.module('myApp.services', []).
  service('cryptoSRV', function() {
     var currentPassword = null;

     var encrypt = function(text, password) {
        if (password) {
           currentPassword = password; 
        }
        var result = CryptoJS.AES.encrypt(text, currentPassword);
        return result.toString();
     };

     var decrypt = function(text, password) {
        if (password) {
           currentPassword = password; 
        }
        var result = CryptoJS.AES.decrypt(text, currentPassword);
        return result.toString(CryptoJS.enc.Utf8);
     };

     return {
        encrypt: encrypt,
        decrypt: decrypt
     };
  });
