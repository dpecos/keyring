Ext.Loader.setConfig({
   enabled: true, 
   paths: {
      'DPM': 'lib/DPM'
   }
});
Ext.Loader.syncRequire('sharedData');

Ext.application({

   name: 'KR',
   
   appFolder: 'app',

   controllers: [
      'ButtonGroupController',
      'EntryController',
      'CategoryController'
   ],
   
   autoCreateViewport: true,
   
   launch: function () {
   }

});
