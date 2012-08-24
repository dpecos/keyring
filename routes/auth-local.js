module.exports = function(app) {
   if (app.settings.env === 'development') {

      var passport = require('passport');
      var LocalStrategy= require('passport-local').Strategy;

      passport.serializeUser(function(user, done) {
         done(null, user);
      });

      passport.deserializeUser(function(obj, done) {
         done(null, obj);
      });

      console.log("development - Local user authentication enabled");

      var url = app.server.getUrl;

      passport.use(new LocalStrategy(
         function(username, password, done) {
            if (username === 'devel' && password === 'devel') {
               var user = {
                  id: 1,
                  uid: 'devel',
                  uname: 'Development Mode'
               };
               return done(null, user);
            } else {
               done(null, null);
            }
         }
      ));

      app.get('/auth/local', passport.authenticate('local', {failureRedirect: url('/login')}), function(req, res) {
         res.redirect(url('/'));
      });

      app.get('/auth/local/callback', passport.authenticate('local', {failureRedirect: url('/login')}), function(req, res) {
         res.redirect(url('/'));
      }); 
   }
};
