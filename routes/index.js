var fs = require('fs');
 
module.exports = function(app){

   require('./auth-common.js')(app);

   var handleFile = function(route, file) {
      if (file == "index.js") return;
      if (file == "auth-common.js") return;
      if (file.indexOf('swp') >= 0) return;
      if (file.indexOf('~') >= 0) return;

      var name = file.substr(0, file.indexOf('.'));
      if (name != '') {
         if (route != null) {
            name = route + "/" + name;
         }
         require('./' + name)(app);
      }
   };

   fs.readdirSync(__dirname).forEach(function(file) {handleFile(null, file);});
   fs.readdirSync(__dirname + "/" + app.server.db).forEach(function(file) {handleFile(app.server.db, file);});
};
