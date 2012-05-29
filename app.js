Ext.Loader.setConfig({enabled:true});

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
               title: 'Privacy',
               items: [
                  /*{
                     text: 'Unlock'
                  },*/
                  {
                     id: 'toggle_visibility_button',
                     text: 'Show'
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
