Ext.Loader.setConfig({enabled:true});

Ext.define('KR.sharedData', {
   singleton: true,
   password: null
});

Ext.application({

   requires: ['Ext.container.Viewport'],
   name: 'KR',
   
   appFolder: 'app',

   controllers: [
      'ButtonGroupController',
      'EntryController'
   ],
   
   launch: function () {
      console.log('KeyRing application loading...');

      var container = Ext.create('Ext.panel.Panel', {
         title: '',
         layout: 'fit',
         renderTo: document.body,
         bodyPadding: 10,
         tbar: [
            {
               xtype: 'buttongroup',
               title: 'Operations',
               items: [
                  {
                     id: 'toggle_visibility_button',
                     text: 'Show'
                  },
                  {
                     id: 'toggle_decrypt_button',
                     text: 'Unlock'
                  }
               ]
            }
         ], 
         items: {
            xtype: 'entrylist'
         }
      });

   }

});

