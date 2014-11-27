module.exports = function(app) {

   app.checkAuth = function(req, res, next) {
      if (req.isAuthenticated()) { 
         return next(); 
      } 
      res.redirect(app.server.getUrl('/login'));
   }

   app.get('/', app.checkAuth, function(req, res) {
      res.redirect(app.server.getUrl('/app/index.html'));
   });

   app.get('/login', function(req, res) {
      res.render('login', {app: app});
   });

   app.get('/logout', function(req, res) {
      req.logout();
      res.redirect(app.server.getUrl('/'));
   });

};
