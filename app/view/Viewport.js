Ext.define('KR.view.Viewport', {
   extend: 'Ext.panel.Panel',
   alias: 'widget.main', 

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
      },
      {
         xtype: 'buttongroup',
         title: 'Operations',
         items: [
            {
               id: 'add_new_entry',
               text: 'New Entry'
            }
         ]
      },
      {
         xtype: 'buttongroup',
         title: 'Categories',
         items: [
            {
               id: 'manage_categories',
               text: 'Manage'
            }
         ]
      }
   ], 
   items: {
      xtype: 'entrylist'
   }

});
