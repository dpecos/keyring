module.exports = function(app) {

   var storeUser = function(profile, done) {
      app.db.collection("users", function(err, collection) {
         collection.insert({login: profile.uid});
         done();
      });
   };

   app.db.checkUserExists = function(profile, done) {
      app.db.collection("users", function(err, collection) {
         collection.find({login: profile.uid}).toArray(function(err, result) { 
            if (err) {
               console.log("Error: " + err);
            } else {
               if (result.length != 0) {
                  done();
               } else {
                  storeUser(profile, done);
               }
            }
         });
      })
   };
};

