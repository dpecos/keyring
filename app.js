var express = require('express')
, http = require('http')
, Db = require('mongodb').Db
, Server = require('mongodb').Server;

var app = express();

var passport = require('passport');

require('coffee-script');
var config = require('./config').config;

app.configure(function(){
   app.set('port', process.env.PORT || config.server.port);
   app.set('views', __dirname + '/views');
   app.set('view engine', 'jade');
   app.use(express.favicon());
   app.use(express.logger('dev'));
   app.use(express.cookieParser());
   app.use(express.bodyParser());
   app.use(express.methodOverride());
   app.use(express.session({secret: 'secretKEYRING'}));
   app.use(passport.initialize());
   app.use(passport.session());
   app.use(app.router);
   app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
   app.use(express.errorHandler());
});

console.log("Environment: " + app.settings.env);

if (config.frontend_server.host) {
   app.server = config.frontend_server;
} else {
   app.server = config.server;
} 

app.server.baseUrl = 
   (app.server.secure ? "https://" : "http://") +
   app.server.host + 
   (app.server.port === null ? "" : ":" + app.server.port) +
   (app.server.path === null ? "" : app.server.path);

app.server.getUrl = function(relativeUrl) {
   return app.server.baseUrl + (relativeUrl ? relativeUrl : "");
}

var db = new Db('keyring', new Server(config.mongo.host, config.mongo.port, {}), {native_parser: false});

var launchApp = function() {
   app.mongodb = db;
   var routes = require('./routes')(app)

   http.createServer(app).listen(app.get('port'), function() {
      console.log("Express server listening on port " + app.get('port'));
   });
};

db.open(function(err, db) {
   if (err) {
      console.log("Error authenticating to mongodb: " + err);
      process.exit(1);
   } else { 
      if (config.mongo.user && config.mongo.password) {
         db.authenticate(config.mongo.user, config.mongo.password, function(err, result) {
            if (err) {
               console.log("Error stablishing connection to mongodb: " + err);
               process.exit(1);
            } else {
               launchApp();
            }
         });
      } else {
         launchApp();
      }
   }
});
