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
         'buttongroup > button[id=delete_entry]': {
            click: this.removeEntry
         },
         'buttongroup > button[id=manage_categories]': {
            click: this.manageCategories
         },
         'buttongroup > button[id=user_logout]': {
            click: this.userLogout
         }
      });
   },


   toggleVisibility: function(button) {
      button.setText(button.text === 'Show credentials' ? 'Hide credentials' : 'Show credentials');

      var listController = this.getController('KR.controller.EntryController');
      listController.setColumnsVisible(button.text !== 'Show credentials');
   },


createBox: function(t, s){
       return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    },


   toggleEncryption: function(button) {
      var store = this.getEntryStoreStore();
      var controller = this.getController('ButtonGroupController');

      if (KR.sharedData.password == null) {

         var msgbox = Ext.MessageBox.prompt(
            'Password', 
            'Enter decryption password:', 
            function(btn, text) {
               if (btn == 'ok') {
                  KR.sharedData.password = text;

                  button.setText('Lock data');
                  store.load({
                     callback: function(records, operation, success) {

                        var runner = new Ext.util.TaskRunner();
                        var task = runner.start({
                           run: function(startTime) {
                              var diffTime = (new Date().getTime() - startTime) / 1000
                              if (diffTime > KR.sharedData.timeout) {
                                 controller.toggleEncryption(Ext.getCmp('toggle_decrypt_button'));
                                 Ext.MessageBox.alert('Password timeout', 'Sensible data has been hidden because session timeout');
                                 return false;
                              } else {
                                 return true;
                              }
                           },
                           args: [new Date().getTime()],
                           interval: 1000
                        });
                     }
                  });
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
      listController.editEntry(null); 
   },

   removeEntry: function(button) {
      var listController = this.getController('KR.controller.EntryController');
      listController.removeEntry();
   },

   manageCategories: function(button) {
      var popup = Ext.create('Ext.window.Window', {
         title: 'Categories',
         modal: true,
         width: 400,
         items: [ {xtype: 'categorylist'} ],
      });
      popup.show();
   },

   userLogout: function(button) {
      window.location.href = window.location.href.substring(0, window.location.href.lastIndexOf('/')) + '/logout';
   }
});
