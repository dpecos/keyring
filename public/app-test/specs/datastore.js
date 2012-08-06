describe("Datastores functionality", function() {

   describe("Entries datastore", function() {
      var store = null;

      beforeEach(function() {
         var listController = Application.getController('KR.controller.EntryController');
         var listWidget = listController.getPanelView();

         store = listWidget.getStore();
         store.getProxy().clear();
      });

      it("adding a new entry ciphers user and password", function() {
         var record = Ext.create('KR.model.Entry');
         record.set('user', KR.sharedData.test.user);
         record.set('password', KR.sharedData.test.password);

         KR.sharedData.password = KR.sharedData.test.password;
         record = store.add(record)[0];

         var aes = Ext.create('DPM.util.crypto.AES', {password: KR.sharedData.password});
         expect(aes.decrypt(record.get('user'))).toBe(KR.sharedData.test.user);
         expect(aes.decrypt(record.get('password'))).toBe(KR.sharedData.test.password);

      });

      it("after adding new entries, record has clear and ciphered data",function(){
         var record = Ext.create('KR.model.Entry');
         record.set('user', KR.sharedData.test.user);
         record.set('password', KR.sharedData.test.password);

         KR.sharedData.password = KR.sharedData.test.password;
         record = store.add(record)[0];

         expect(record.get('user')).not.toBe(KR.sharedData.test.user);
         expect(record.get('cleartext_user')).toBe(KR.sharedData.test.user);

         expect(record.get('password')).not.toBe(KR.sharedData.test.password);
         expect(record.get('cleartext_password')).toBe(KR.sharedData.test.password);
      });

      it("loading data deciphers data properly - no password", function(){
         KR.sharedData.password = null;
         Application.loadDemoEntries(store);

         var record = store.getAt(0);

         expect(record.get('user')).toBe(KR.sharedData.test.data[0].user);
         expect(record.get('cleartext_user')).toBe('***');
         expect(record.get('password')).toBe(KR.sharedData.test.data[0].password);
         expect(record.get('cleartext_password')).toBe('***');

      });

      it("loading data deciphers data properly - with password",function(){
         KR.sharedData.password = KR.sharedData.test.password;
         Application.loadDemoEntries(store);

         var record = store.getAt(0);

         expect(record.get('user')).toBe(KR.sharedData.test.data[0].user);
         expect(record.get('cleartext_user')).toBe(KR.sharedData.test.user);
         expect(record.get('password')).toBe(KR.sharedData.test.data[0].password);
         expect(record.get('cleartext_password')).toBe(KR.sharedData.test.password);
      });
   });
});

