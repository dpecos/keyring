Ext.define('KR.view.entry.List', {
   extend: 'DPM.view.SearchablePanel', 
   alias: 'widget.entrylist',

   title: 'Passwords',
   store: 'EntryStore',

   columnLines: true, 

   features: [ {ftype: 'grouping'} ],

   initComponent: function() {
      this.columns = [
         {header: 'Category', dataIndex: 'category', flex: 1},
         {header: 'Name', dataIndex: 'name', flex: 1},
         {header: 'URL', dataIndex: 'url', flex: 1, xtype: 'templatecolumn', tpl: '<tpl if="url"><a href="{url}">{url}</a></tpl>'},
         {header: 'User', dataIndex: 'cleartext_user', flex: 1, hidden: true},
         {header: 'Password', dataIndex: 'cleartext_password', flex: 1, hidden: true},
         {header: 'Email', dataIndex: 'email', flex: 1, xtype: 'templatecolumn', tpl: '<tpl if="email"><a href="mailto:{email}">{email}</a></tpl>'},
         {header: 'Notes', dataIndex: 'notes', flex: 1}
      ];

      this.callParent(arguments);
   }

});
