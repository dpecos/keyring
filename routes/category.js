var ObjectID = require('mongodb').ObjectID;

module.exports = function(app) {
   
   var db = app.mongodb;

   app.get('/data/category', function(req, res) {
      db.collection('categories', function(err, collection) {
         collection.find({}).sort({name: 1}).toArray(function(err, items) {
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
      var category = null;

      db.collection('categories', function(err, collection) {
         var _id = req.body._id;
         delete req.body._id;

         collection.findOne({_id: new ObjectID(_id)}, function(err, el) {
            db.collection('entries', function(err, collection) {
               collection.update({category: el.name}, {$set: {category: req.body.name}});
            });
            collection.update({_id: new ObjectID(_id)}, {$set : req.body});
         });

      });


      res.send({success: true});
   });

   app.del('/data/category/:id?', function(req, res) {
      db.collection('categories', function(err, collection) {
         collection.remove({_id: new ObjectID(req.body._id)}, function(error) {
            res.send({success: !error});
         });
      });
   });
};
