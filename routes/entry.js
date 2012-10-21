var ObjectID = require('mongodb').ObjectID;
var DBRef = require('mongodb').DBRef;

module.exports = function(app) {
   
   var db = app.mongodb;

   app.get('/data/entry', app.checkAuth, function(req, res) {
      var sql = "select e.id as _id, c.name as category, e.name, e.url, e.user, e.passwd as password, e.email, e.notes from entries e, categories c, users u where " + 
         "e.owner = u.id and " +
         "u.login = ? and " +
         "e.category = c.id " +
         "order by upper(category), upper(e.name)"; 

      db.query(sql, [req.user.uid], function(err, rows, columns) {
         if (err) {
               console.log("Error: " + err);
         } else {
            res.send({data: rows, success: true})
         }
      });

      /*db.collection('entries', function(err, collection) {
         collection.find({owner: req.user.uid}).sort({category:1, name: 1}).toArray(function(err, items) {
            if (err) {
               console.log("Error: " + err);
            } else {
               res.send({data: items, success: true});
            }
         });
      });*/
   });

   app.post('/data/entry', app.checkAuth, function(req, res) {
      
      delete req.body._id;
      db.query("select * from categories where name = ? and owner = (select id from users where login = ?)", [req.body.category, req.user.uid], function(err, rows, cols) {
         if (err) {
            console.log("Error: " + err);
         } else {
            req.body.owner = rows[0].owner;
            req.body.category = rows[0].id;

            //TODO: change column name
            req.body.passwd = req.body.password;
            delete req.body.password;

            db.query("insert into entries set ?", req.body, function(err, result) {
               if (err) {
                  console.log("Error: " + err);
               } else {
                  res.send({success: true});
               }
            });
         }
      });

      /*req.body.owner = req.user.uid;
      db.collection('entries', function(err, collection) {
         if (err) {
            console.log("Error: " + err);
         } else {
            collection.insert(req.body);
            res.send({success: true});
         }
      });*/
   });

   app.put('/data/entry/:id?', app.checkAuth, function(req, res) {
      db.query("select * from categories where name = ? and owner = (select id from users where login = ?)", [req.body.category, req.user.uid], function(err, rows, cols) {
         if (err) {
            console.log("Error: " + err);
         } else {
            var sql = "update entries set " +
               "category = ?, " + 
               "name = ?, " + 
               "url = ?, " + 
               "user = ?, " + 
               "passwd = ?, " + 
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

            db.query(sql, data, function(err, result) {
               if (err) {
                  console.log("Error: " + err);
               } else {
                  res.send({success: true});
               }
            });
         }
      });

       /*db.collection('entries', function(err, collection) {
         if (err) {
            console.log("Error: " + err);
         } else {
            var _id = req.body._id;
            delete req.body._id;
            collection.update({_id: new ObjectID(_id), owner: req.user.uid}, {$set : req.body});
            res.send({success: true});
         }
      });*/
   });

   app.del('/data/entry/:id?', app.checkAuth, function(req, res) {
      db.query("delete from entries where id = ? and owner = (select id from users where login = ?)", [req.body._id, req.user.uid], function(err) {
         if (err) {
            console.log("Error: " + err);
         } else {
            res.send({success: !err});
         }
      });

      /*db.collection('entries', function(err, collection) {
         collection.remove({_id: new ObjectID(req.body._id), owner: req.user.uid}, function(err) {
            if (err) {
               console.log("Error: " + err);
            } else {
               res.send({success: !err});
            }
         });
      });*/
   });
};
