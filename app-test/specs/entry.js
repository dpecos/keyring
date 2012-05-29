describe('Entry List TESTs', function() {

   var listWidget;

   beforeEach(function() {
      listWidget = Ext.widget('entrylist');
      expect(listWidget).toBeDefined();
   });

   describe('List Widget setup', function() {

      it('table defined with correct header', function() {
         var columns = listWidget.columns;

         expect(Ext.Array.pluck(columns, 'text')).toBeArray(['Category', 'Name', 'URL', 'User', 'Password', 'Email', 'Notes']);
      });

      it('table using correct data', function() {
         var columns = listWidget.columns;

         expect(Ext.Array.pluck(columns, 'dataIndex')).toBeArray(['category', 'name', 'url', 'user', 'password', 'email', 'notes']);
      });

      it('table columns initial visibility', function() {
         var columns = listWidget.columns;
         var hiddenColumns = Ext.Array.filter(columns, function(elem) {
            return elem.hidden;
         });

         expect(Ext.Array.pluck(hiddenColumns, 'dataIndex')).toBeArray(['user', 'password']);

      });

   });

   describe('Edit Widget setup', function() {
      it('popup edit windows has fields', function() {
         var edit = Ext.widget('entryedit');

         expect(Ext.Array.pluck(edit.items.items[0].items.items, 'name')).toBeArray(['category', 'name', 'url', 'user', 'password', 'email', 'notes']);
      });

   });

   describe('Datasource configuration', function() {

      var listWidget = null;

      beforeEach(function() {
         listWidget = Ext.widget('entrylist');
      });

      it('table datasource model defined with correct fields', function() {
         var store = listWidget.getStore();
         var model = store.getProxy().getModel();

         expect(Ext.Array.pluck(model.getFields(), 'name')).toBeArray(['category', 'name', 'url', 'user', 'password', 'email', 'notes', 'id']);
      });

   });

});
