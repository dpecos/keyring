var express = require('express'),
   http = require('http'),
   mysql = require('mysql'),
   mongodb = require('mongodb').Db,
   mongoserver = require('mongodb').Server;

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

var launchApp = function(db) {
   app.mongodb = db;
   var routes = require('./routes')(app)

   http.createServer(app).listen(app.get('port'), function() {
      console.log("Express server listening on port " + app.get('port'));
   });
};

if (config.server.db == 'mysql') {
   var db = mysql.createConnection({
      host: config.mysql.host, 
      port: config.mysql.port, 
      user: config.mysql.user,
      password: config.mysql.password,
      database: config.mysql.database
   });

   db.connect(function(err) {
      if (err) {
         console.log("Error authenticating to mysql: " + err);
         process.exit(1);
      } else {
         launchApp(db)
      }
   });

} else if (app.server.db == 'mongodb') {
   var db = new mongodb(config.mongo.database, new mongoserver(config.mongo.host, config.mongo.port, {}), {native_parser: false});

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
                  launchApp(db);
               }
            });
         } else {
            launchApp(db);
         }
      }
   });
}
