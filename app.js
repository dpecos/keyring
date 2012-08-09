
/**
* Module dependencies.
*/

var express = require('express')
, http = require('http')
, Db = require('mongodb').Db
, Server = require('mongodb').Server;

var app = express();

var passport = require('passport');

app.configure(function(){
   app.set('port', process.env.PORT || 3000);
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

app.configure('development', function(){
   app.use(express.errorHandler());
});

var db = new Db('keyring', new Server('localhost', 27017, {}), {native_parser: false});
db.open(function(err, db) {});

app.mongodb = db;

var routes = require('./routes')(app)

http.createServer(app).listen(app.get('port'), function(){
   console.log("Express server listening on port " + app.get('port'));
});
