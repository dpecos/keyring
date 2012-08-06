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
            store.each(function(record) {
               if (KR.sharedData.password != null) {
                  var aes = Ext.create('DPM.util.crypto.AES', {password: KR.sharedData.password});
                  record.set('cleartext_user', aes.decrypt(record.get('user')));
                  record.set('cleartext_password', aes.decrypt(record.get('password')));
               } else {
                  record.set('cleartext_user', "***");
                  record.set('cleartext_password', "***");
               }
               return true;
            });
         }
      }
   },

   add: function(records) {
      if (KR.sharedData.password != null) {
         var aes = Ext.create('DPM.util.crypto.AES', {password: KR.sharedData.password});

         var cipherRecord = function (record) {
            record.set({
               cleartext_user: record.get('user'),
               cleartext_password: record.get('password'),
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
