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
      }
   }
});
