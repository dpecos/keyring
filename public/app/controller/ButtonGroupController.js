Ext.define('KR.controller.ButtonGroupController', {
   extend: 'Ext.app.Controller',

   requires: ['KR.view.category.List'],

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
         },
         'buttongroup > button[id=manage_categories]': {
            click: this.manageCategories
         }
      });
   },


   toggleVisibility: function(button) {
      button.setText(button.text === 'Show credentials' ? 'Hide credentials' : 'Show credentials');

      var listController = this.getController('KR.controller.EntryController');
      listController.setColumnsVisible(button.text !== 'Show credentials');
   },

   toggleEncryption: function(button) {
      var store = this.getEntryStoreStore();

      if (KR.sharedData.password == null) {

         var msgbox = Ext.MessageBox.prompt(
            'Password', 
            'Enter decryption password:', 
            function(btn, text) {
               if (btn == 'ok') {
                  KR.sharedData.password = text;

                  button.setText('Lock data');
                  store.load();
               }
               this.close();
            }
         );
         msgbox.textField.inputEl.dom.type = 'password';


      } else {
         button.setText('Unlock data');

         KR.sharedData.password = null;
         store.load();
      }
   },

   addNewEntry: function(button) {
      var listController = this.getController('KR.controller.EntryController');
      listController.editEntry(listController.getEntryListView(), null); 
   },

   manageCategories: function(button) {
      var popup = Ext.create('Ext.window.Window', {
         title: 'Categories',
         modal: true,
         width: 400,
         items: [ {xtype: 'categorylist'} ],
      });
      popup.show();
   }
});
