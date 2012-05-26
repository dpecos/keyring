Ext.define('KR.view.entry.Edit', {
	extend: 'Ext.window.Window',
	alias: 'widget.entryedit',

	title: 'Edit entry',
	layout: 'fit',
	autoShow: true,

	initComponent: function() {
		this.items = [
			{
				xtype: 'form',
				items: [
					{xtype: 'textfield', name: 'name', fieldLabel: 'Name'}
				]
			}
		];

		this.buttons = [
			{text: 'Save', action: 'save'},
			{text: 'Cancel', scope: this, handler: this.close},
		];
	
		this.callParent(arguments);
	}
});
