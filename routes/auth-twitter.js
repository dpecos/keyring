var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser(function(user, done) {
   done(null, user);
});

passport.deserializeUser(function(obj, done) {
   done(null, obj);
});


module.exports = function(app) {
   var url = app.server.getUrl;

   passport.use(new TwitterStrategy(
      {
         consumerKey: 'JhuV6WTNV64LUfzdBXw',
         consumerSecret: '5PzByVmYxBvvkKenpfbJ0na9RLXXyg7MqEcH2whSBE',
         callbackURL: url('/auth/twitter/callback'),
      },
      function(token, tokenSecret, profile, done) {
         profile.uid = profile.id + "@twitter";
         profile.uname = profile.name;
         return done(null, profile);
      }
   ));

   app.get('/auth/twitter', passport.authenticate('twitter', {failureRedirect: url('/login')}), function(req, res) {
      res.redirect(url('/'));
   });

   app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: url('/login')}), function(req, res) {
      res.redirect(url('/'));
   }); 

};
