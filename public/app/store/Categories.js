Ext.define('KR.store.Categories', {
   extend: 'Ext.data.Store',

   model: 'KR.model.Category',

   autoLoad: true,
   appendId: false,
   batch: true,


   proxy: {
      type: 'rest',
      url: '/data/category',
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
