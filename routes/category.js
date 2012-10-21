var ObjectID = require('mongodb').ObjectID;

module.exports = function(app) {
   
   var db = app.mongodb;

   app.get('/data/category', app.checkAuth, function(req, res) {

      db.query("select c.name as name, c.id as _id from categories c, users u where c.owner = u.id and u.login = ?", [req.user.uid], function(err, rows, columns) {
         if (err) {
               console.log("Error: " + err);
         } else {
            res.send({data: rows, success: true})
         }
      });
      
      /*db.collection('categories', function(err, collection) {
         collection.find({owner: req.user.uid}).sort({name: 1}).toArray(function(err, items) {
            if (err) {
               console.log("Error: " + err);
            } else {
               res.send({data: items, success: true});
            }
         });
      });*/
   });

   app.post('/data/category', app.checkAuth, function(req, res) {

      delete req.body._id;
      req.body.owner = req.user.uid;

      db.query("insert into categories(name, owner) values (?, (select id from users where login = ?)) ", [req.body.name, req.body.owner], function(err, result) {
         if (err) {
            console.log("Error: " + err);
         } else {
            res.send({success: true});
         }
      });

      /*db.collection('categories', function(err, collection) {
         if (err) {
            console.log("Error: " + err);
         } else {
            collection.insert(req.body);
            res.send({success: true});
         }
      });*/
   });

   app.put('/data/category/:id?', app.checkAuth, function(req, res) {
      db.query("update categories set name = ? where id = ? and owner = (select id from users where login = ?)", [req.body.name, req.body._id, req.user.uid], function(err) {
         if (err) {
            console.log("Error: " + err);
         } else {
            res.send({success: !err});
         }
      });
       /*var category = null;

      db.collection('categories', function(err, collection) {
         if (err) {
            console.log("Error: " + err);
         } else {
            var _id = req.body._id;
            delete req.body._id;

            collection.findOne({_id: new ObjectID(_id), owner: req.user.uid}, function(err, el) {
               db.collection('entries', function(err, collection) {
                  collection.update({category: el.name, owner: req.user.uid}, {$set: {category: req.body.name}}, {multi: true});
               });
               collection.update({_id: new ObjectID(_id), owner: req.user.uid}, {$set : req.body});
            });
         }
      });

      res.send({success: true});*/
   });

   app.del('/data/category/:id?', function(req, res) {
      db.query("delete from categories where id = ? and owner = (select id from users where login = ?)", [req.body._id, req.user.uid], function(err) {
         if (err) {
            console.log("Error: " + err);
         } else {
            res.send({success: !err});
         }
      });
      
      /*db.collection('categories', function(err, collection) {
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
