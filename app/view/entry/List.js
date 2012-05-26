Ext.define('KR.view.entry.List', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.entrylist',
	
	title: 'Passwords',
	store: 'Entries',

	initComponent: function() {
		console.log('List view intialized');
		
		this.columns = [
			{header: 'Category', dataIndex: 'name', flex: 1},
			{header: 'Name', dataIndex: 'name', flex: 1},
			{header: 'URL', dataIndex: 'name', flex: 1},
			{header: 'User', dataIndex: 'name', flex: 1},
			{header: 'Password', dataIndex: 'name', flex: 1},
			{header: 'Email', dataIndex: 'name', flex: 1},
			{header: 'Notes', dataIndex: 'name', flex: 1}
		];

		this.callParent(arguments);
	}
});
