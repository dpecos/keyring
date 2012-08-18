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
            itemdblclick: function(grid, record) { 
               this.editEntry(record); 
            }
         },
         'entryedit button[action=save]': {
            click: this.storeEntry
         }
      });

      this.callParent(arguments);
   },

   editEntry: function(record) {
      if (KR.sharedData.password != null) {

         var newDialog = Ext.widget('entryedit');
         if (record != null) {
            record.set('user', record.get('cleartext_user'));
            record.set('password', record.get('cleartext_password'));
            newDialog.getForm().loadRecord(record);
         }

         return newDialog.show();
      } else {
         return Ext.MessageBox.show({
            title: 'Error',
            msg: 'You must enter a session password first',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
         });
      }

   },

   removeEntry: function() {
      var model = this.getPanelView().getSelectionModel();
      var selection = model.getSelection();
      var store = this.getEntryStoreStore();
      if (selection.length > 0) {
         Ext.MessageBox.show({
            title: 'Delete Entry',
            msg: 'Are you sure you want to delete the selected entry?',
            width: 300,
            buttons: Ext.MessageBox.OKCANCEL,
            icon: Ext.window.MessageBox.WARNING,
            fn: function(button) {
               if (button === 'ok') {
                  Ext.Array.each(selection, function(item) {
                     store.remove(item);
                  });

                  store.sync();
               }
            }
         });
      }
   },

   storeEntry: function(button) {
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

      store.sync({
         callback: function() {
            store.reload();
            dialog.close();
         }
      });
   },

   setColumnsVisible: function(visible) {
      var list = this.getPanelView()

      var columns = Ext.Array.filter(list.columns, function(el) {return el.dataIndex === 'cleartext_user' || el.dataIndex === 'cleartext_password'});
      Ext.Array.each(columns, function(el) {el.setVisible(visible)});
   }

});
