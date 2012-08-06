describe('UnitTests: Controllers', function() {

   var listController;
   var listWidget;

   beforeEach(function() {
      listController = Application.getController('KR.controller.EntryController');
      listWidget = listController.getPanelView();
      expect(listWidget).toBeDefined();
   });

   describe('EntryList controller', function() {
      var store;

      beforeEach(function() {
         store = listWidget.getStore();
         /*spyOn(store, 'load').andCallFake(function() {
            store.each(function(record) {
            if (KR.sharedData.password == null) {
            record.set('cleartext_user', '***');
            record.set('cleartext_password', '***');
            } else {
            record.set('cleartext_user', KR.sharedData.test.user);
            record.set('cleartext_password', KR.sharedData.test.password);
            }
            });
            });*/
      });

      it('edit entry button shows alert when no password', function() {
         KR.sharedData.password = null;

         var dialog = listController.editEntry();

         expect(Ext.fly(dialog.getItemId() + '-displayfield-inputEl').dom.firstChild.data).toBe('You must enter a session password first');
         expect(Ext.query('.x-message-box-error')).not.toBeNull();

         dialog.destroy();
      });
   });

   xdescribe('ButtonGroup controller', function() {
      it('TODO', function() {
      });

   });
});
