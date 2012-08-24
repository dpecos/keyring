var fs = require('fs');
 
module.exports = function(app){

   require('./auth-common.js')(app);

   fs.readdirSync(__dirname).forEach(function(file) {
      if (file == "index.js") return;
      if (file == "auth-common.js") return;
      if (file.indexOf('swp') >= 0) return;
      if (file.indexOf('~') >= 0) return;

      var name = file.substr(0, file.indexOf('.'));
      if (name != '') {
         require('./' + name)(app);
      }
   });

};
