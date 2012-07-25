var ObjectID = require('mongodb').ObjectID;

module.exports = function(app) {
   
   var db = app.mongodb;

   app.get('/data/category', function(req, res) {
      db.collection('categories', function(err, collection) {
         collection.find({}).toArray(function(err, items) {
            res.send({data: items, success: true});
         });
      });
   });

   app.post('/data/category', function(req, res) {
      db.collection('categories', function(err, collection) {
         delete req.body._id;
         collection.insert(req.body);
         res.send({success: true});
      });
   });

   app.put('/data/category/:id?', function(req, res) {
      db.collection('categories', function(err, collection) {
         var _id = req.body._id;
         delete req.body._id;
         collection.update({_id: new ObjectID(_id)}, {$set : req.body});
         res.send({success: true});
      });
   });

   app.del('/data/category/:id?', function(req, res) {
      db.collection('categories', function(err, collection) {
         collection.remove({_id: new ObjectID(req.body._id)}, function(error) {
            res.send({success: !error});
         });
      });
   });
};
