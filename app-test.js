Ext.Loader.setConfig({
   enabled: true, 
   paths: {
      'DPM': 'lib/DPM'
   }
});
Ext.Loader.syncRequire('sharedData');

Ext.require('Ext.app.Application');

var Application = null;

Ext.onReady(function() {

   Application = Ext.create('Ext.app.Application', {

      name: 'KR',

      controllers: [
         'ButtonGroupController',
         'EntryController'
      ],

      autoCreateViewport: true,

      launch: function() {
         var dummy_data = [
            {   
               id: 1, 
               category: 'WebSites',
               name: 'Google',
               url: 'http://google.com', 
               user: 'me',
               password: 'p1',
               email: 'me@google.com',
               notes: null
            },
            {   
               id: 2, 
               category: 'WebSites',
               name: 'Yahoo',
               url: 'http://yahoo.com', 
               user: 'me',
               password: 'p2',
               email: 'me@yahoo.com',
               notes: null
            }
         ];
         var proxy = new Ext.data.proxy.Memory({
            model: 'KR.model.Entry',
            data: dummy_data
         });

         listController = Application.getController('KR.controller.EntryController');
         listWidget = listController.getPanelView();
         listWidget.getStore().setProxy(proxy);

         jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
         jasmine.getEnv().execute();
      }

   });

});

