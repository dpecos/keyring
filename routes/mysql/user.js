module.exports = function(app) {

   var storeUser = function(profile, done) {
      app.db.query("insert into users(login) values(?)", [profile.uid], function(err, result) { 
         if (err) {
            console.log("Error: " + err);
         } else {
            done();
         }
      });
   };

   app.db.checkUserExists = function(profile, done) {
      app.db.query("select * from users where login = ?", [profile.uid], function(err, result) {
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
   };

};

