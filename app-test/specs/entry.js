describe('Entry UI tests', function() {

   it('table defined with correct header', function() {
      var list = Ext.widget('entrylist');
      var columns = list.columns;
      
      var actualColumns = [];
      Ext.Array.each(columns, function(elem, index, arrayItSelf) {
         actualColumns.push(elem.text);
      }); 
         
      var expectedColumns = ['Category', 'Name', 'URL', 'User', 'Password', 'Email', 'Notes']; 

      expect(actualColumns).toBeArray(expectedColumns);

   });

   it('table using correct data', function() {
      var list = Ext.widget('entrylist');
      var columns = list.columns;

      var actualDataIndex = [];
      Ext.Array.each(columns, function(elem, index, arrayItSelf) {
         actualDataIndex.push(elem.dataIndex);
      });

      var expectedDataIndex = ['category', 'name', 'url', 'user', 'password', 'email', 'notes']; 

      expect(actualDataIndex).toBeArray(expectedDataIndex);
   });

});


describe('Entry Datasource tests', function() {

   it('table datasource model defined with correct fields', function() {
      var list = Ext.widget('entrylist');
      var store = list.getStore();
      var model = store.getProxy().getModel();
      
      var actualFields = [];
      Ext.Array.each(model.getFields(), function(elem, index, arrayItSelf) {
         actualFields.push(elem.name);
      });
      var expectedFields = ['category', 'name', 'url', 'user', 'password', 'email', 'notes', 'id']; 

      expect(actualFields).toBeArray(expectedFields);
   });

});
