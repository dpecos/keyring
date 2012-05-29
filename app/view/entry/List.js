Ext.define('KR.view.entry.List', {
   extend: 'Ext.grid.Panel',
   alias: 'widget.entrylist',
   
   title: 'Passwords',
   store: 'EntryStore',

   initComponent: function() {
      this.columns = [
         {header: 'Category', dataIndex: 'category', flex: 1},
         {header: 'Name', dataIndex: 'name', flex: 1},
         {header: 'URL', dataIndex: 'url', flex: 1},
         {header: 'User', dataIndex: 'user', flex: 1, hidden: true},
         {header: 'Password', dataIndex: 'password', flex: 1, hidden: true},
         {header: 'Email', dataIndex: 'email', flex: 1},
         {header: 'Notes', dataIndex: 'notes', flex: 1}
      ];

      this.callParent(arguments);
   }
});
