var passport = require('passport');
var YahooStrategy = require('passport-yahoo').Strategy;

passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(obj, done) {
   done(null, obj);
});

module.exports = function(app) {
   var url = app.server.getUrl;

   passport.use(new YahooStrategy(
      {
         returnURL: url('/auth/yahoo/callback'),
         realm: url()
      },
      function(identifier, profile, done) {
         profile.uid = profile.emails[0].value;
         profile.identifier = identifier;
         return done(null, profile);
      }
   ));

   app.get('/auth/yahoo', passport.authenticate('yahoo', {failureRedirect: url('/login')}), function(req, res) {
      res.redirect(url('/'));
   });

   app.get('/auth/yahoo/callback', passport.authenticate('yahoo', {failureRedirect: url('/login')}), function(req, res) {
      res.redirect(url('/'));
   }); 

};
