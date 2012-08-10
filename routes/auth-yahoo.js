var passport = require('passport');
var YahooStrategy = require('passport-yahoo').Strategy;

passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(obj, done) {
   done(null, obj);
});


passport.use(new YahooStrategy(
   {
      returnURL: 'http://localhost:3000/auth/yahoo/callback',
      realm: 'http://localhost:3000'
   },
   function(identifier, profile, done) {
      profile.uid = profile.emails[0].value;
      profile.identifier = identifier;
      return done(null, profile);
   }
));

module.exports = function(app) {

   app.get('/auth/yahoo', passport.authenticate('yahoo', {failureRedirect: '/login'}), function(req, res) {
      res.redirect('/');
   });

   app.get('/auth/yahoo/callback', passport.authenticate('yahoo', {failureRedirect: '/login'}), function(req, res) {
      res.redirect('/');
   }); 

};
