Ext.define('KR.store.Categories', {
   extend: 'Ext.data.Store',

   model: 'KR.model.Category',

   data: [
      { name: 'Category 1' },
      { name: 'Category 2' },
      { name: 'Category 3' },
      { name: 'Category 4' }
   ] ,

   proxy: { type: 'memory'}

});
