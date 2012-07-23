Ext.define('KR.store.EntryStore', {
   requires: ['DPM.util.crypto.AES'],

   extend: 'Ext.data.Store',

   storeId: 'entries',

   model: 'KR.model.Entry',
   autoLoad: true,
   autoSync: true,

   groupField: 'category',

   proxy: {
      type: 'ajax',
      api: {
         create: 'data/demo.json',
         read: 'data/demo.json',
         update: 'data/update.json',
         destroy: 'data/update.json'
      },
      reader: {
         type: 'json',
         root: 'Results',
         successProperty: 'success'
      },
      writer: 'json'
   },


   listeners: {
      load: function(store, records, successful, eOpts) {
         if (successful) {
            var filter = null;

            if (KR.sharedData.password != null) {
               var aes = Ext.create('DPM.util.crypto.AES', {password: KR.sharedData.password});
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
            store.clearFilter();
            store.filter(filter);
         }
      }
   },

   add: function(records) {
      if (KR.sharedData.password != null) {
         var aes = Ext.create('DPM.util.crypto.AES', {password: KR.sharedData.password});

         var cipherRecord = function (record) {
            record.set({
               user: aes.encrypt(record.get('user')),
               password: aes.encrypt(record.get('password'))
            });
            return record;
         };

         if (Ext.isArray(records)) {
            records = Ext.map(records, cipherRecord)
         } else {
            records = cipherRecord(records);
         }

      } else {
         throw "Password can not be null";
      }

      return this.callParent([records]);
   }
});
