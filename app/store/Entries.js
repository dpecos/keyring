Ext.define('KR.store.Entries', {
   extend: 'Ext.data.Store',

   model: 'KR.model.Entry',
   autoLoad: true,
   autoSync: true,

   proxy: {
      type: 'ajax',
      api: {
         read: 'data/demo.json',
         update: 'data/update.json'
      },
      reader: {
         type: 'json',
         root: 'entries',
         successProperty: 'success'
      }
   }
});
   
