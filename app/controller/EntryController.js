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
      }, 
      {
         ref: 'entryDialog',
         selector: 'entryedit'
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
      if (KR.sharedData.password != null) {

         var newDialog = Ext.widget('entryedit');
         if (record != null) {
            var aes = Ext.create('DPM.util.crypto.AES', {password: KR.sharedData.password});
            record.set('user', record.get('cleartext_user'));
            record.set('password', record.get('cleartext_password'));
            newDialog.getForm().loadRecord(record);
         }

         newDialog.show();
      } else {
         Ext.MessageBox.show({
            title: 'Error',
            msg: 'You must enter a session password first',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
         });
      }

   },

   updateEntry: function(button) {
      var dialog = this.getEntryDialog();
      var form = dialog.getForm();
      var record = form.getRecord();
      var values = form.getValues();

      var store = this.getEntryStoreStore();
      if (record == null) {
         record = Ext.create(this.getEntryModel(), values);
         record = store.add(record);
      } else {
         record.set(values);
      }

      dialog.close();
   },

   setColumnsVisible: function(visible) {
      var list = this.getPanelView()

      var columns = Ext.Array.filter(list.columns, function(el) {return el.dataIndex === 'cleartext_user' || el.dataIndex === 'cleartext_password'});
      Ext.Array.each(columns, function(el) {el.setVisible(visible)});
   }
});
