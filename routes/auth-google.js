var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(obj, done) {
   done(null, obj);
});


passport.use(new GoogleStrategy(
   {
      returnURL: 'http://localhost:3000/auth/google/callback',
      realm: 'http://localhost:3000'
   },
   function(identifier, profile, done) {
      profile.uid = profile.emails[0].value;
      profile.identifier = identifier;
      return done(null, profile);
   }
));

module.exports = function(app) {

   app.get('/auth/google', passport.authenticate('google', {failureRedirect: '/login'}), function(req, res) {
      res.redirect('/');
   });

   app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}), function(req, res) {
      res.redirect('/');
   }); 

};
