Ext.define('KR.store.Categories', {
   extend: 'Ext.data.Store',

   model: 'KR.model.Category',

   autoLoad: true,
   appendId: false,

   proxy: {
      type: 'rest',
      url: window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/data/category',
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
