Ext.Loader.setConfig({enabled:true});

Ext.require('Ext.app.Application');

var Application = null;

Ext.onReady(function() {

   Application = Ext.create('Ext.app.Application', {

      name: 'KR',
      controllers: ['Entry'],
      
      launch: function() {
         jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
         jasmine.getEnv().execute();
      }
      
   });

});

