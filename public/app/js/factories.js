var contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf('/app'));

angular.module('KeyRing.factories', [])
  .factory("categoriesDAO", ['$http', 'timeoutSRV', function($http, timeoutSRV) {
    return {
      load: function() {
        timeoutSRV.resetTimer();
        return $http.get(contextPath + "/data/category");
      }, 
      create: function(category) {
        timeoutSRV.resetTimer();
        return $http.post(contextPath + "/data/category", category);
      },
      remove: function(category) {
        timeoutSRV.resetTimer();
        return $http.delete(contextPath + "/data/category/" + category._id);
      }
    };
  }])
  .factory("entriesDAO", ['$http', 'timeoutSRV', function($http, timeoutSRV) {
    return {
      load: function() {
        timeoutSRV.resetTimer();
        return $http.get(contextPath + "/data/entry");
      },
      create: function(entry) {
        timeoutSRV.resetTimer();
        return $http.post(contextPath + "/data/entry", entry);
      },
      update: function(entry) {
        timeoutSRV.resetTimer();
        return $http.put(contextPath + "/data/entry/" + entry._id, entry);
      },
      remove: function(entry) {
        timeoutSRV.resetTimer();
        return $http.delete(contextPath + "/data/entry/" + entry._id);
      }
    };
  }]);
