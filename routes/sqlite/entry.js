module.exports = function(app) {
   
   var db = app.db;

   app.get('/data/entry', app.checkAuth, function(req, res) {
      var sql = "select e.id as _id, c.name as category, e.name, e.url, e.user, e.password, e.email, e.notes from entries e, categories c, users u where " + 
         "e.owner = u.id and " +
         "u.login = ? and " +
         "e.category = c.id " +
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
               req.body.owner = rows[0].owner;
               req.body.category = rows[0].id;

               db.run("insert into entries set ?", req.body, function(err) {
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
         db.run("delete from entries where id = ? and owner = (select id from users where login = ?)", [req.body._id, req.user.uid], function(err) {
            if (err) {
               console.log("Error: " + err);
            } else {
               res.send({success: !err});
            }
         });
      });

   });
};
