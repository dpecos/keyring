var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(obj, done) {
   done(null, obj);
});


module.exports = function(app) {
   var url = app.server.getUrl;

   passport.use(new GoogleStrategy(
      {
         returnURL: url('/auth/google/callback'),
         realm: url()
      },
      function(identifier, profile, done) {
         profile.uid = profile.emails[0].value;
         profile.uname = profile.displayName;
         return done(null, profile);
      }
   ));

   app.get('/auth/google', passport.authenticate('google', {failureRedirect: url('/login')}), function(req, res) {
      res.redirect(url('/'));
   });

   app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: url('/login')}), function(req, res) {
      res.redirect(url('/'));
   }); 

};
