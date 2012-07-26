Ext.define('KR.model.Entry', {
   extend: 'Ext.data.Model',
   idProperty: '_id',
   fields: ['category', 'name', 'url', 'user', 'password', 'email', 'notes']
});
