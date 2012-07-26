Ext.define('KR.store.EntryStore', {
   extend: 'Ext.data.Store',
   requires: ['DPM.util.crypto.AES'],

   model: 'KR.model.Entry',

   autoLoad: true,
   appendId: false,

   groupField: 'category',

   proxy: {
      type: 'rest',
      url: '/data/entry',
      reader: {
         type: 'json',
         root: 'data',
         successProperty: 'success'
      },
      writer: {
         type: 'json',
         successProperty: 'success'
      }
   },

   listeners: {
      load: function(store, records, successful, eOpts) {
         if (successful) {
            var filter =  new Ext.util.Filter({
               filterFn: function(el) {
                  if (KR.sharedData.password != null) {
                     var aes = Ext.create('DPM.util.crypto.AES', {password: KR.sharedData.password});
                     el.data.cleartext_user = aes.decrypt(el.data.user);
                     el.data.cleartext_password = aes.decrypt(el.data.password);
                  } else {
                     el.data.cleartext_user = "***";
                     el.data.cleartext_password = "***";
                  }
                  return true;
               }
            });
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
