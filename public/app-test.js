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

      refs: [
         {
            ref: 'Viewport',
            selector: 'main'
         }
      ],

      autoCreateViewport: true,

      launch: function() {
         this.getViewport().hide();

         var proxy = new Ext.data.proxy.Memory({
            model: 'KR.model.Entry'
         });

         var listController = Application.getController('KR.controller.EntryController');
         var listWidget = listController.getPanelView();
         listWidget.getStore().setProxy(proxy);

         KR.sharedData.test = {
            data : [
               {   
                  category: 'WebSites',
                  name: 'Google',
                  url: 'http://google.com', 
                  user: 'w7sfUBYWFhbLrY7bSXfZe3o=',
                  password: 'w7sfUBYWFhbLrY7bSXLLbXtl+36q',
                  email: 'me@google.com',
                  notes: null
               }
            ],
            user: 'dummyuser',
            password: 'dummypassword'
         };

         jasmine.getEnv().addReporter(new jasmine.HtmlReporter());
         jasmine.getEnv().execute();
      }, 

      loadDemoEntries: function(store) {
         var proxy = Ext.create('Ext.data.proxy.Memory', {
            model: 'KR.model.Entry',
            data: KR.sharedData.test.data
         }); 
         store.setProxy(proxy);
         store.reload();
      }

   });

});

