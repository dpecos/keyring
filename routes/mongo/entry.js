var ObjectID = require('mongodb').ObjectID;
var DBRef = require('mongodb').DBRef;

module.exports = function(app) {
   
   var db = app.db;

   app.get('/data/entry', app.checkAuth, function(req, res) {
      db.collection('entries', function(err, collection) {
         collection.find({owner: req.user.uid}).sort({category:1, name: 1}).toArray(function(err, items) {
            if (err) {
               console.log("Error: " + err);
            } else {
               res.send({data: items, success: true});
            }
         });
      });
   });

   app.post('/data/entry', app.checkAuth, function(req, res) {
      db.collection('entries', function(err, collection) {
         if (err) {
            console.log("Error: " + err);
         } else {
            delete req.body._id;

            req.body.owner = req.user.uid;
            collection.insert(req.body);
            res.send({success: true});
         }
      });
   });

   app.put('/data/entry/:id?', app.checkAuth, function(req, res) {
      db.collection('entries', function(err, collection) {
         if (err) {
            console.log("Error: " + err);
         } else {
            var _id = req.body._id;
            delete req.body._id;
            collection.update({_id: new ObjectID(_id), owner: req.user.uid}, {$set : req.body});
            res.send({success: true});
         }
      });
   });

   app.del('/data/entry/:id?', app.checkAuth, function(req, res) {
      db.collection('entries', function(err, collection) {
         collection.remove({_id: new ObjectID(req.body._id), owner: req.user.uid}, function(err) {
            if (err) {
               console.log("Error: " + err);
            } else {
               res.send({success: !err});
            }
         });
      });
   });
};
