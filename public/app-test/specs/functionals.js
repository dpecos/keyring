describe('Functionals', function() {

   var listWidget;

   beforeEach(function() {
      var listController = Application.getController('KR.controller.EntryController');
      listWidget = listController.getPanelView();
      expect(listWidget).toBeDefined();
      KR.sharedData.password = null;
   });

   it('show/hide button toggle credentials columns visibility', function() {
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

      expect(KR.sharedData.password).toBeNull();
      KR.sharedData.password = '';
      expect(KR.sharedData.password).not.toBeNull();

      var lockbutton = Ext.ComponentQuery.query('buttongroup > button') [1];
      lockbutton.fireEvent('click', lockbutton);

      expect(KR.sharedData.password).toBeNull();
   });


});
