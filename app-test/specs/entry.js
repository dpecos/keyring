describe('Entry UI tests', function() {

   it('table defined with correct header', function() {
      var list = Ext.widget('entrylist');
      var columns = list.columns;

      expect(Ext.Array.pluck(columns, 'text')).toBeArray(['Category', 'Name', 'URL', 'User', 'Password', 'Email', 'Notes']);
   });

   it('table using correct data', function() {
      var list = Ext.widget('entrylist');
      var columns = list.columns;

      expect(Ext.Array.pluck(columns, 'dataIndex')).toBeArray(['category', 'name', 'url', 'user', 'password', 'email', 'notes']);
   });

   it('popup edit windows has fields', function() {
      var edit = Ext.widget('entryedit');

      expect(Ext.Array.pluck(edit.items.items[0].items.items, 'name')).toBeArray(['category', 'name', 'url', 'user', 'password', 'email', 'notes']);
   });

});


describe('Entry Datasource tests', function() {

   it('table datasource model defined with correct fields', function() {
      var list = Ext.widget('entrylist');
      var store = list.getStore();
      var model = store.getProxy().getModel();
      
      expect(Ext.Array.pluck(model.getFields(), 'name')).toBeArray(['category', 'name', 'url', 'user', 'password', 'email', 'notes', 'id']);
   });

});
