Ext.define('KR.view.Viewport', {
   extend: 'Ext.panel.Panel',
   alias: 'widget.main', 

   //title: 'KeyRing 2',

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
