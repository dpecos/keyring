var passport = require('passport');
var GoogleStrategy = require('passport-google-openidconnect').Strategy;

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
         clientID: '385034162376-hjbif1ag4u19omoi1g87uj4rb1lj6dcb.apps.googleusercontent.com',
         clientSecret: 'PaXTS-MCy_mm47qQAXiA_4YH',
         callbackURL: url('/auth/google/callback'),
         userInfoURL: "https://www.googleapis.com/plus/v1/people/me"
      },
      function(iss, sub, profile, accessToken, refreshToken, done) {
         profile.uid = profile._json.emails[0].value;
         profile.uname = profile._json.displayName;
         app.db.checkUserExists(profile, function() {
            done(null, profile);
         });
      }
   ));

   app.get('/auth/google', passport.authenticate('google-openidconnect', {scope: ['email', 'profile'], failureRedirect: url('/login')}), function(req, res) {
      res.redirect(url('/'));
   });

   app.get('/auth/google/callback', passport.authenticate('google-openidconnect', {scope: ['email', 'profile'], failureRedirect: url('/login')}), function(req, res) {
      res.redirect(url('/'));
   }); 

};
