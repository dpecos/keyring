var contextPath = window.location.pathname.substring(0, window.location.pathname.indexOf('/app'));

angular.module('KeyRing.factories', [])
  .factory("categoriesDAO", function($http) {
    return {
      load: function() {
        return $http.get(contextPath + "/data/category");
      }, 
      create: function(category) {
        return $http.post(contextPath + "/data/category", category);
      },
      remove: function(category) {
        return $http.delete(contextPath + "/data/category/" + category._id);
      }
    };
  })
  .factory("entriesDAO", function($http) {
    return {
      load: function() {
        return $http.get(contextPath + "/data/entry");
      },
      create: function(entry) {
        return $http.post(contextPath + "/data/entry", entry);
      },
      update: function(entry) {
        return $http.put(contextPath + "/data/entry/" + entry._id, entry);
      },
      remove: function(entry) {
        return $http.delete(contextPath + "/data/entry/" + entry._id);
      }
    };
  });
