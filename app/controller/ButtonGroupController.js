Ext.define('KR.controller.ButtonGroupController', {
   extend: 'Ext.app.Controller',

   init: function() {
      this.control({
         'buttongroup > button': {
            click: this.buttonClick
         }
      });
   },

   buttonClick: function(button) {
      if (button.id == 'toggle_visibility_button') {
         button.setText(button.text === 'Show' ? 'Hide' : 'Show');

         var listController = this.getController('KR.controller.EntryController');
         listController.setColumnsVisible(button.text !== 'Show');
      } else if (button.id == 'toggle_decrypt_button') {
         
         var store = Ext.data.StoreManager.get('EntryStore');

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
            KR.sharedData.password = null;

            button.setText('Unlock');
            store.load();
         }
      }
   }
});
