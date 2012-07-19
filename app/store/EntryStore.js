Ext.define('KR.store.EntryStore', {
   requires: ['Ext.lib.crypto.AES'],

   extend: 'Ext.data.Store',

   storeId: 'entries',

   model: 'KR.model.Entry',
   autoLoad: true,
   autoSync: true,

   groupField: 'category',

   proxy: {
      type: 'ajax',
      api: {
         read: 'data/demo.json',
         update: 'data/update.json'
      },
      reader: {
         type: 'json',
         root: 'Results',
         successProperty: 'success'
      }
   },

   listeners: {
      load: function(store, records, successful, eOpts) {
         if (successful) {
            var filter = null;

            if (KR.sharedData.password != null) {
               var aes = Ext.create('Ext.lib.crypto.AES', {password: KR.sharedData.password});
               filter = new Ext.util.Filter({
                  filterFn: function(el) {
                     el.data.cleartext_user = aes.decrypt(el.data.user);
                     el.data.cleartext_password = aes.decrypt(el.data.password);
                     return true;
                  }
               });
            } else {
               filter = new Ext.util.Filter({
                  filterFn: function(el) {
                     el.data.cleartext_user = "***";
                     el.data.cleartext_password = "***";
                     return true;
                  }
               });
            }
         }
         store.clearFilter();
         store.filter(filter);
      }
   }
});

