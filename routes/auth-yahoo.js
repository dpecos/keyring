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
         profile.email = profile.emails[0].value;
         profile.uid = profile.email;
         profile.identifier = identifier;
         profile.uname = profile.displayName;
         app.db.checkUserExists(profile, function() {
            done(null, profile);
         });
      }
   ));

   app.get('/auth/yahoo', passport.authenticate('yahoo', {failureRedirect: url('/login')}), function(req, res) {
      res.redirect(url('/'));
   });

   app.get('/auth/yahoo/callback', passport.authenticate('yahoo', {failureRedirect: url('/login')}), function(req, res) {
      res.redirect(url('/'));
   }); 

};
