var pjson = require('../package.json');
var gravatar = require("gravatar");

module.exports = function(app) {

   app.checkAuth = function(req, res, next) {
      if (req.isAuthenticated()) { 
         return next(); 
      } 
      res.redirect(app.server.getUrl('/login'));
   }

   app.get('/', app.checkAuth, function(req, res) {
      res.redirect(app.server.getUrl('/app/'));
   });

   app.get('/app/', function(req, res) {
      if (req.isAuthenticated()) {
         var email = null;
         if (req.user.email) {
            email = req.user.email;
         }
         var avatar = req.user.avatar || gravatar.url(email, {s: '50', r: 'x', d: 'mm'});
         res.render('index', {version: pjson.version, avatar: avatar});
      } else {
         res.redirect(app.server.getUrl('/login'));
      }
   });

   app.get('/login', function(req, res) {
      res.render('login', {app: app});
   });

   app.get('/logout', function(req, res) {
      req.logout();
      res.redirect(app.server.getUrl('/'));
   });

};
