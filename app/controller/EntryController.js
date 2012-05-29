Ext.define('KR.controller.EntryController', {
   extend: 'Ext.app.Controller',

   stores: [
      'EntryStore'
   ],
   
   models: [
      'Entry'
   ],
   
   views: [
      'entry.List',
      'entry.Edit'
   ],

   refs: [
      {
         ref: 'list',
         selector: 'entrylist'
      }
   ],

   init: function() {
      this.control({
         'entrylist': {
            itemdblclick: this.editEntry
         },
         'entryedit button[action=save]': {
            click: this.updateEntry
         }
      });
   },

   editEntry: function(grid, record) {
      console.log('Double click on ' + record.get('name'));

      var view = Ext.widget('entryedit');
      view.down('form').loadRecord(record);

      view.show();
   },

   updateEntry: function(button) {
      var win = button.up('window'),
          form = win.down('form'),
          record = form.getRecord(),
          values = form.getValues();

      record.set(values);  
      win.close();
      
      //this.getEntriesStore().sync();
   },

   setColumnsVisible: function(visible) {
      var list = this.getList();

      var columns = Ext.Array.filter(list.columns, function(el) {return el.dataIndex === 'cleartext_user' || el.dataIndex === 'cleartext_password'});
      Ext.Array.each(columns, function(el) {el.setVisible(visible)});
   }
});
