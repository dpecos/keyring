Ext.define('KR.store.Categories', {
   extend: 'Ext.data.Store',

   model: 'KR.model.Category',

   autoLoad: true,
   appendId: false,
   batch: true,


   proxy: {
      type: 'rest',
      url: 'http://localhost:3000/category',
      reader: {
         type: 'json',
         root: 'data',
         successProperty: 'success'
      },
      writer: {
         type: 'json',
         successProperty: 'success'
      }
   }


});
