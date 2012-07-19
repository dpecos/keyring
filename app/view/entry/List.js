Ext.define('KR.view.entry.List', {
   extend: 'KR.view.entry.SearchableList', 
   alias: 'widget.entrylist',

   title: 'Passwords',
   store: 'EntryStore',

   columnLines: true, 

   features: [ {ftype: 'grouping'} ],

   /*selType: 'rowmodel',

   plugins: [
   Ext.create('Ext.grid.plugin.RowEditing', {
   clicksToEdit: 1
   })
   ],*/

   initComponent: function() {
      this.columns = [
         {header: 'Category', dataIndex: 'category', flex: 1},
         {header: 'Name', dataIndex: 'name', flex: 1},
         {header: 'URL', dataIndex: 'url', flex: 1},
         {header: 'User', dataIndex: 'cleartext_user', flex: 1, hidden: true},
         {header: 'Password', dataIndex: 'cleartext_password', flex: 1, hidden: true},
         {header: 'Email', dataIndex: 'email', flex: 1},
         {header: 'Notes', dataIndex: 'notes', flex: 1}
      ];

      this.callParent(arguments);
   },

});
