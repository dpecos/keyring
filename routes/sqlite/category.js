module.exports = function(app) {

  var db = app.db;

  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, login TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, owner ID, name TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY, owner ID, category ID, name TEXT, url TEXT, user TEXT, password TEXT, email TEXT, notes TEXT)");
  });

  app.get('/data/category', app.checkAuth, function(req, res) {
    db.serialize(function() {
      db.all("select c.name as name, c.id as _id from categories c, users u where c.owner = u.id and u.login = ?", [req.user.uid], function(err, rows) {
        if (err) {
          console.log("Error: " + err);
          res.send(err, 500);
        } else {
          res.send({data: rows, success: true});
        }
      });
    });

  });

  app.post('/data/category', app.checkAuth, function(req, res) {

    delete req.body._id;
    req.body.owner = req.user.uid;

    db.serialize(function() {
      db.run("insert into categories(name, owner) values (?, (select id from users where login = ?)) ", [req.body.name, req.body.owner], function(err) {
        if (err) {
          console.log("Error: " + err);
          res.send(err, 500);
        } else {
          res.send({success: true});
        }
      });
    });

  });

  app.put('/data/category/:id?', app.checkAuth, function(req, res) {
    db.serialize(function() {
      db.run("update categories set name = ? where id = ? and owner = (select id from users where login = ?)", [req.body.name, req.body._id, req.user.uid], function(err) {
        if (err) {
          console.log("Error: " + err);
          res.send(err, 500);
        } else {
          res.send({success: !err});
        }
      });
    });
  });

  app.del('/data/category/:id', function(req, res) {
    db.serialize(function() {
      db.run("delete from categories where id = ? and owner = (select id from users where login = ?)", [req.params.id, req.user.uid], function(err) {
        if (err) {
          console.log("Error: " + err);
          res.send(err, 500);
        } else {
          db.run("update entries set category = null where category = ? and owner = (select id from users where login = ?)", [req.params.id, req.user.uid], function(err) {
            if (err) {
              console.log("Error: " + err);
              res.send(err, 500);
            } else {
              res.send({success: !err});
            }
          });
        }
      });
    });

  });
};
