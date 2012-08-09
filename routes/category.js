var ObjectID = require('mongodb').ObjectID;

module.exports = function(app) {
   
   var db = app.mongodb;

   app.get('/data/category', app.checkAuth, function(req, res) {
      db.collection('categories', function(err, collection) {
         collection.find({owner: req.user.uid}).sort({name: 1}).toArray(function(err, items) {
            res.send({data: items, success: true});
         });
      });
   });

   app.post('/data/category', app.checkAuth, function(req, res) {
      db.collection('categories', function(err, collection) {
         delete req.body._id;

         req.body.owner = req.user.uid;
         collection.insert(req.body);
         res.send({success: true});
      });
   });

   app.put('/data/category/:id?', app.checkAuth, function(req, res) {
      var category = null;

      db.collection('categories', function(err, collection) {
         var _id = req.body._id;
         delete req.body._id;

         collection.findOne({_id: new ObjectID(_id), owner: req.user.uid}, function(err, el) {
            db.collection('entries', function(err, collection) {
               collection.update({category: el.name, owner: req.user.uid}, {$set: {category: req.body.name}});
            });
            collection.update({_id: new ObjectID(_id), owner: req.user.uid}, {$set : req.body});
         });

      });


      res.send({success: true});
   });

   app.del('/data/category/:id?', function(req, res) {
      db.collection('categories', function(err, collection) {
         collection.remove({_id: new ObjectID(req.body._id), owner: req.user.uid}, function(error) {
            res.send({success: !error});
         });
      });
   });
};
