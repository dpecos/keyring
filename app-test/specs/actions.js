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

   it('decrypt password column', function() {
      var store = listWidget.getStore();
      
      expect(store.getAt(0).get('cleartext_user')).toBe('***'); 
      expect(store.getAt(0).get('cleartext_password')).toBe('***'); 

      KR.sharedData.password = 'dummypassword';
      store.reload()

      expect(store.getAt(0).get('cleartext_user')).not.toBe('***'); 
      expect(store.getAt(0).get('cleartext_password')).not.toBe('***'); 

      KR.sharedData.password = null;
      store.reload()

      expect(store.getAt(0).get('cleartext_user')).toBe('***'); 
      expect(store.getAt(0).get('cleartext_password')).toBe('***'); 
   });

});
