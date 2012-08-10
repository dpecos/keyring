var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(obj, done) {
   done(null, obj);
});


passport.use(new TwitterStrategy(
   {
      consumerKey: 'JhuV6WTNV64LUfzdBXw',
      consumerSecret: '5PzByVmYxBvvkKenpfbJ0na9RLXXyg7MqEcH2whSBE',
      callbackURL: 'http://localhost:3000/auth/twitter/callback',
   },
   function(token, tokenSecret, profile, done) {
      profile.uid = profile.id + "@twitter";
      profile.uname = profile.name;
      return done(null, profile);
   }
));

module.exports = function(app) {

   app.get('/auth/twitter', passport.authenticate('twitter', {failureRedirect: '/login'}), function(req, res) {
      res.redirect('/');
   });

   app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), function(req, res) {
      res.redirect('/');
   }); 

};
