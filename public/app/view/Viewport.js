Ext.define('KR.view.Viewport', {
   extend: 'Ext.panel.Panel',
   alias: 'widget.main', 

   layout: 'fit',
   renderTo: document.body,
   bodyPadding: 10,

   tbar: [
      {
         xtype: 'buttongroup',
         title: 'Encryption',
         width: 220,
         layout: { type: 'hbox', pack: 'center' }, 
         items: [
            {
               id: 'toggle_visibility_button',
               text: 'Show credentials',
               iconCls: 'show'
            },
            {
               id: 'toggle_decrypt_button',
               text: 'Unlock data',
               iconCls: 'unlock'
            }
         ]
      },
      {
         xtype: 'buttongroup',
         title: 'Operations',
         width: 100,
         layout: { type: 'hbox', pack: 'center' }, 
         items: [
            {
               id: 'add_new_entry',
               text: 'New Entry',
               iconCls: 'add'
            }
         ]
      },
      {
         xtype: 'buttongroup',
         title: 'Categories',
         width: 100,
         layout: { type: 'hbox', pack: 'center' }, 
         items: [
            {
               id: 'manage_categories',
               text: 'Manage',
               iconCls: 'grid'
            }
         ]
      }
   ], 
   items: {
      xtype: 'entrylist'
   }

});