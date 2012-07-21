Ext.define('KR.controller.EntryController', {
   extend: 'DPM.controller.SearchablePanelController',

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
         ref: 'panelView',
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

      this.callParent(arguments);
   },

   editEntry: function(grid, record) {
      var newDialog = Ext.widget('entryedit');
      newDialog.getForm().loadRecord(record);

      newDialog.show();
   },

   updateEntry: function(button) {
      var dialog = this.getEntryEditDialog();
      var form = dialog.getForm();
      var record = form.getRecord();
      var values = form.getValues();

      record.set(values);  
      dialog.close();

      //this.getEntriesStore().sync();
   },

   setColumnsVisible: function(visible) {
      var list = this.getPanelView()

      var columns = Ext.Array.filter(list.columns, function(el) {return el.dataIndex === 'cleartext_user' || el.dataIndex === 'cleartext_password'});
      Ext.Array.each(columns, function(el) {el.setVisible(visible)});
   }
});
