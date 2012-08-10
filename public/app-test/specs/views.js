describe('UnitTests: Views', function() {

   describe('EntryList view', function() {
      var listController;
      var listWidget;

      beforeEach(function() {
         listController = Application.getController('KR.controller.EntryController');
         listWidget = listController.getPanelView();
         expect(listWidget).toBeDefined();
      });

      describe('List widget setup', function() {

         it('table defined with correct header', function() {
            var columns = listWidget.columns;

            expect(Ext.Array.pluck(columns, 'text')).toBeArray(['Category', 'Name', 'URL', 'User', 'Password', 'Email', 'Notes']);
         });

         it('table using correct data', function() {
            var columns = listWidget.columns;

            expect(Ext.Array.pluck(columns, 'dataIndex')).toBeArray(['category', 'name', 'url', 'cleartext_user', 'cleartext_password', 'email', 'notes']);
         });

         it('table columns initial visibility', function() {
            var columns = listWidget.columns;
            var hiddenColumns = Ext.Array.filter(columns, function(elem) {
               return elem.hidden;
            });

            expect(Ext.Array.pluck(hiddenColumns, 'dataIndex')).toBeArray(['cleartext_user', 'cleartext_password']);

         });

      });
   });

   describe('Edit Widget setup', function() {
      it('popup edit windows has fields', function() {
         var edit = Ext.widget('entryedit');

         expect(Ext.Array.pluck(edit.items.items[0].items.items, 'name')).toBeArray(['category', 'name', 'url', 'user', 'password', 'email', 'notes']);

         edit.destroy();
      });

   });

});