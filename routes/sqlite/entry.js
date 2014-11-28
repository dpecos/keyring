module.exports = function(app) {

   var db = app.db;

   var sqlUsers = "CREATE TABLE users (id INTEGER PRIMARY KEY, login TEXT, username TEXT);";
   var sqlCategories = "CREATE TABLE categories (id INTEGER PRIMARY KEY, name STRING, owner NUMERIC);";
   var sqlEntries = "CREATE TABLE entries (category NUMERIC, owner NUMERIC, password TEXT, id INTEGER PRIMARY KEY, name TEXT, url TEXT, user TEXT, email TEXT, notes TEXT);";

   app.get('/data/entry', app.checkAuth, function(req, res) {
      var sql = "select e.id as _id, c.name as category, e.name, e.url, e.user, e.password, e.email, e.notes from entries e left join categories c on " +
         "e.category = c.id, " +
         "users u where " + 
         "e.owner = u.id and " +
         "u.login = ? " +
         "order by upper(category), upper(e.name)"; 

      db.serialize(function() {
         db.all(sql, [req.user.uid], function(err, rows) {
            if (err) {
               console.log("Error: " + err);
            } else {
               res.send({data: rows, success: true});
            }
         });
      });

   });

   app.post('/data/entry', app.checkAuth, function(req, res) {

      delete req.body._id;

      db.serialize(function() {
         db.all("select * from categories where name = ? and owner = (select id from users where login = ?)", [req.body.category, req.user.uid], function(err, rows) {
            if (err) {
               console.log("Error: " + err);
            } else {
               var sql = "insert into entries" +
                  "(owner, category, name, url, user, password, email, notes) " + 
                  "values (?, ?, ?, ?, ?, ?, ?, ?)";

               var data = [
                  rows[0].owner,
                  rows[0].id,
                  req.body.name,
                  req.body.url,
                  req.body.user,
                  req.body.password,
                  req.body.email,
                  req.body.notes
               ];

               db.run(sql, data, function(err) {
                  if (err) {
                     console.log("Error: " + err);
                  } else {
                     res.send({success: true});
                  }
               });
            }
         });
      });

   });

   app.put('/data/entry/:id?', app.checkAuth, function(req, res) {
      db.serialize(function() {
         db.all("select * from categories where name = ? and owner = (select id from users where login = ?)", [req.body.category, req.user.uid], function(err, rows) {
            if (err) {
               console.log("Error: " + err);
            } else {
               var sql = "update entries set " +
                  "category = ?, " + 
                  "name = ?, " + 
                  "url = ?, " + 
                  "user = ?, " + 
                  "password = ?, " + 
                  "email = ?, " + 
                  "notes = ? " + 
                  "where id = ? and owner = ?";

               var data = [
                  rows[0].id,
                  req.body.name,
                  req.body.url,
                  req.body.user,
                  req.body.password,
                  req.body.email,
                  req.body.notes,
                  req.body._id,
                  rows[0].owner
               ];

               db.run(sql, data, function(err) {
                  if (err) {
                     console.log("Error: " + err);
                  } else {
                     res.send({success: true});
                  }
               });
            }
         });
      });

   });

   app.del('/data/entry/:id?', app.checkAuth, function(req, res) {
      db.serialize(function() {
         db.run("delete from entries where id = ? and owner = (select id from users where login = ?)", [req.params.id, req.user.uid], function(err) {
            if (err) {
               console.log("Error: " + err);
               res.send(err, 500);
            } else {
               res.send({success: !err});
            }
         });
      });

   });
};
