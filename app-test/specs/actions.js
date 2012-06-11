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
      //var toolbar = Ext.widget('main').getDockedItems()[0];

      listController.setColumnsVisible(false);

      var hiddenColumns = Ext.Array.filter(columns, function(elem) {
         return elem.hidden;
      });

      expect(Ext.Array.pluck(hiddenColumns, 'dataIndex')).toBeArray(['cleartext_user', 'cleartext_password']);

      listController.setColumnsVisible(true);

      hiddenColumns = Ext.Array.filter(columns, function(elem) {
         return elem.hidden;
      });

      expect(Ext.Array.pluck(hiddenColumns, 'dataIndex')).toBeArray([]);

      listController.setColumnsVisible(false);

      hiddenColumns = Ext.Array.filter(columns, function(elem) {
         return elem.hidden;
      });

      expect(Ext.Array.pluck(hiddenColumns, 'dataIndex')).toBeArray(['cleartext_user', 'cleartext_password']);
   });

});
