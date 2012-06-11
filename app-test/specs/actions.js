describe('Actions triggered by buttons', function() {

   var listController;
   var listWidget;

   beforeEach(function() {
      listController = Application.getController('KR.controller.EntryController');
      listWidget = listController.getEntriesList();
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

});
