'use strict';

/* Services */

angular.module('KeyRing.services', []).
  value('version', version).

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
  }). 

  service('timeoutSRV', ['$interval', function($interval) {
     var timeout = 60000;
     var startTime = null;
     var intervalId = null;
     var callback = null;
     var callbackEnd = null;

     var timerTick = function () {
        var currentTime = new Date();

        var ellapsedTime = currentTime - startTime;
        ellapsedTime = parseInt(ellapsedTime / 10) * 10;

        if (ellapsedTime >= timeout) {
           stopTimer();
        } else if (callback) {
           callback(timeout, ellapsedTime);
        }
     }

     var startTimer = function (handler, handlerEnd) {
       startTime = new Date();
       callback = handler;
       callbackEnd = handlerEnd;

       if (intervalId === null) {
          intervalId = $interval(timerTick, 1000);
       }
       
       return timeout;
     };

     var stopTimer = function () {
        startTime = null;

        if (intervalId !== null) {
           $interval.cancel(intervalId);
           intervalId = null;
           callbackEnd();
        }
     };

     return {
        startTimer: startTimer,
        stopTimer: stopTimer
     }
  }]);
