module.exports = function(app) {
   
   var db = app.db;

   app.get('/data/category', app.checkAuth, function(req, res) {

      db.query("select c.name as name, c.id as _id from categories c, users u where c.owner = u.id and u.login = ?", [req.user.uid], function(err, rows, columns) {
         if (err) {
               console.log("Error: " + err);
         } else {
            res.send({data: rows, success: true});
         }
      });
      
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

   });

   app.put('/data/category/:id?', app.checkAuth, function(req, res) {
      db.query("update categories set name = ? where id = ? and owner = (select id from users where login = ?)", [req.body.name, req.body._id, req.user.uid], function(err) {
         if (err) {
            console.log("Error: " + err);
         } else {
            res.send({success: !err});
         }
      });
   });

   app.del('/data/category/:id?', function(req, res) {
      db.query("delete from categories where id = ? and owner = (select id from users where login = ?)", [req.body._id, req.user.uid], function(err) {
         if (err) {
            console.log("Error: " + err);
         } else {
            res.send({success: !err});
         }
      });
      
   });
};
