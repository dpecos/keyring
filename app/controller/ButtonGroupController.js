Ext.define('KR.controller.ButtonGroupController', {
   extend: 'Ext.app.Controller',

   stores: ['EntryStore'],

   init: function() {
      this.control({
         'buttongroup > button[id=toggle_visibility_button]': {
            click: this.toggleVisibility
         },
         'buttongroup > button[id=toggle_decrypt_button]': {
            click: this.toggleEncryption
         },
         'buttongroup > button[id=add_new_entry]': {
            click: this.addNewEntry
         }
      });
   },


   toggleVisibility: function(button) {
      button.setText(button.text === 'Show' ? 'Hide' : 'Show');

      var listController = this.getController('KR.controller.EntryController');
      listController.setColumnsVisible(button.text !== 'Show');
   },

   toggleEncryption: function(button) {
      //var store = Ext.data.StoreManager.get('EntryStore');
      var store = this.getEntryStoreStore();

      if (KR.sharedData.password == null) {

         var msgbox = Ext.MessageBox.prompt(
            'Password', 
            'Enter decryption password:', 
            function(btn, text) {
               if (btn == 'ok') {
                  KR.sharedData.password = text;

                  button.setText('Lock');
                  store.load();
               }
            }
         );
         msgbox.textField.inputEl.dom.type = 'password';


      } else {
         button.setText('Unlock');

         KR.sharedData.password = null;
         store.load();
      }
   },

   addNewEntry: function(button) {
      var listController = this.getController('KR.controller.EntryController');
      listController.editEntry(listController.getEntryListView(), null); 
   }
});
