var ObjectID = require('mongodb').ObjectID;
var DBRef = require('mongodb').DBRef;

module.exports = function(app) {
   
   var db = app.mongodb;

   app.get('/data/entry', function(req, res) {
      db.collection('entries', function(err, collection) {
         collection.find({}).sort({category:1, name: 1}).toArray(function(err, items) {
            res.send({data: items, success: true});
         });
      });
   });

   app.post('/data/entry', function(req, res) {
      db.collection('entries', function(err, collection) {
         //req.body.category = new DBRef('categories', new ObjectID(req.body._category_id));
         delete req.body._id;
         collection.insert(req.body);
         res.send({success: true});
      });
   });

   app.put('/data/entry/:id?', function(req, res) {
      db.collection('entries', function(err, collection) {
         var _id = req.body._id;
         delete req.body._id;
         collection.update({_id: new ObjectID(_id)}, {$set : req.body});
         res.send({success: true});
      });
   });

   app.del('/data/entry/:id?', function(req, res) {
      db.collection('entries', function(err, collection) {
         collection.remove({_id: new ObjectID(req.body._id)}, function(error) {
            res.send({success: !error});
         });
      });
   });
};
