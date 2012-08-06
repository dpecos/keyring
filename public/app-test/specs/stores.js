describe("UnitTests: Stores", function() {

   describe("Entries store", function() {
      var store = null;

      beforeEach(function() {
         var listController = Application.getController('KR.controller.EntryController');
         var listWidget = listController.getPanelView();

         store = listWidget.getStore();
         store.getProxy().clear();
      });


      it('model defined with correct fields', function() {
         var model = store.getProxy().getModel();

         expect(Ext.Array.pluck(model.getFields(), 'name')).toBeArray(['category', 'name', 'url', 'user', 'password', 'email', 'notes', '_id']);
      });

      it("adding a new entry ciphers user and password", function() {
         var record = Ext.create('KR.model.Entry');
         record.set('user', KR.sharedData.test.user);
         record.set('password', KR.sharedData.test.password);

         var storeSize = store.count();

         KR.sharedData.password = KR.sharedData.test.password;
         var results = store.add(record);

         expect(results.length).toBeGreaterThan(0);
         expect(store.count()).toBe(storeSize + 1);

         record = results[0];

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

      it('add new entry with null password should fail', function() {
         KR.sharedData.password = null;

         expect(function() {
            store.add(KR.sharedData.test.data);
         }).toThrow("Password can not be null");
      });
   });
});

