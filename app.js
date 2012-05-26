Ext.application({

	requires: ['Ext.container.Viewport'],
	name: 'KR',
	
	appFolder: 'app',

	controllers: [
		'Entry'
	],
	
	launch: function () {
		console.log('KeyRing application loading...');

		Ext.create('Ext.container.Viewport', {
			layout: 'fit',
			items: {
				xtype: 'entrylist'
			}
		});

	}

});
