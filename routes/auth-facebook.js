var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(obj, done) {
   done(null, obj);
});

module.exports = function(app) {
   var url = app.server.getUrl;

   passport.use(new FacebookStrategy(
      {
         clientID: '266957883414432',
         clientSecret: '3598b64a7f61d8a8e546b80bc2a210a6',
         callbackURL: url('/auth/facebook/callback'),
         profileFields: ['id', 'displayName', 'email', 'picture']
      },
      function(accessToken, refreshToken, profile, done) {
         profile.email = profile.emails[0].value;
         profile.uid = profile.email;
         profile.uname = profile.displayName;
         profile.avatar = profile.photos[0].value;
         app.db.checkUserExists(profile, function() {
            done(null, profile);
         });
      }
   ));

   app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email'], failureRedirect: url('/login')}), function(req, res) {
      res.redirect(url('/'));
   });

   app.get('/auth/facebook/callback', passport.authenticate('facebook', {scope: ['email'], failureRedirect: url('/login')}), function(req, res) {
      res.redirect(url('/'));
   }); 

};
