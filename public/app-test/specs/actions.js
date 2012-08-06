describe('Actions triggered by buttons', function() {

   var listController;
   var listWidget;

   beforeEach(function() {
      listController = Application.getController('KR.controller.EntryController');
      listWidget = listController.getPanelView();
      expect(listWidget).toBeDefined();
   });

   it('toggle table columns visibility', function() {
      var columns = listWidget.columns;
      var button = Ext.ComponentQuery.query('buttongroup > button') [0];

      button.fireEvent('click', button);

      var hiddenColumns = Ext.Array.filter(columns, function(elem) {
         return elem.hidden;
      });

      expect(Ext.Array.pluck(hiddenColumns, 'dataIndex')).toBeArray([]);

      button.fireEvent('click', button);

      hiddenColumns = Ext.Array.filter(columns, function(elem) {
         return elem.hidden;
      });

      expect(Ext.Array.pluck(hiddenColumns, 'dataIndex')).toBeArray(['cleartext_user', 'cleartext_password']);

      button.fireEvent('click', button);

      hiddenColumns = Ext.Array.filter(columns, function(elem) {
         return elem.hidden;
      });

      expect(Ext.Array.pluck(hiddenColumns, 'dataIndex')).toBeArray([]);
   });

   it('lock button deletes session password', function() {
      var button = Ext.ComponentQuery.query('buttongroup > button') [1];

      expect(KR.sharedData.password).toBeNull();

      KR.sharedData.password = 'dummypassword';

      button.fireEvent('click', button);

      expect(KR.sharedData.password).toBeNull();
   });

   it('decrypt password column - no password', function() {
      var store = listWidget.getStore();
      KR.sharedData.password = null;
      store.loadData(KR.sharedData.test.data);
      store.reload(function() { 
         expect(store.getAt(0).get('cleartext_user')).toBe('***'); 
         expect(store.getAt(0).get('cleartext_password')).toBe('***'); 
      });
   });

   it('decrypt password column - with password', function() {
      var store = listWidget.getStore();
      KR.sharedData.password = 'dummypassword';
      store.loadData(KR.sharedData.test.data);
      store.reload(function() { 
         expect(store.getAt(0).get('cleartext_user')).not.toBe('***'); 
         expect(store.getAt(0).get('cleartext_password')).not.toBe('***'); 

      });
   });

   it('add new entry ciphers user and password columns', function() {
      var store = listWidget.getStore();

      var entry = Ext.create('KR.model.Entry', {
         name: 'TEST',
         url: 'http://danielpecos.com',
         user: 'clear user',
         password: 'clear password',
         email: 'contact@danielpecos.com'
      });
      entry.validate();

      KR.sharedData.password = 'dummypassword';
      var storeSize = store.count();

      var user = entry.get('user');
      var password = entry.get('password');

      var result = store.add(entry);
      expect(result).not.toBe(null);
      expect(result.length).toBeGreaterThan(0);

      expect(store.count()).toBe(storeSize + 1);

      var aes = Ext.create('DPM.util.crypto.AES', {password: KR.sharedData.password});
      var addedEntry = result[0];
      expect(aes.decrypt(addedEntry.get('user'))).toBe(user);
      expect(aes.decrypt(addedEntry.get('password'))).toBe(password);
   });

   it('add new entry with null password should fail', function() {
      var store = listWidget.getStore();

      var entry = Ext.create('KR.model.Entry', {
         name: 'TEST',
         url: 'http://danielpecos.com',
         user: 'clear user',
         password: 'clear password',
         email: 'contact@danielpecos.com'
      });
      entry.validate();

      KR.sharedData.password = null;

      expect(function() {store.add(entry)}).toThrow("Password can not be null");
   });
});
