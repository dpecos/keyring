Ext.define('KR.view.entry.Edit', {
   extend: 'Ext.window.Window',
   alias: 'widget.entryedit',

   title: 'Edit entry',
   layout: 'fit',

   initComponent: function() {
      var categoriesStore = Ext.data.StoreManager.lookup('Categories');
      this.items = [
         {
            xtype: 'form',
            items: [
               {xtype: 'combo', name: 'category', fieldLabel: 'Category', store: categoriesStore, displayField: 'name', valueField: 'name', queryMode: 'local'},
               {xtype: 'textfield', name: 'name', fieldLabel: 'Name'},
               {xtype: 'textfield', name: 'url', fieldLabel: 'URL'},
               {xtype: 'textfield', name: 'user', fieldLabel: 'User'},
               {xtype: 'textfield', name: 'password', fieldLabel: 'Password'},
               {xtype: 'textfield', name: 'email', fieldLabel: 'Email'},
               {xtype: 'textfield', name: 'notes', fieldLabel: 'Notes'}
            ]
         }
      ];

      this.buttons = [
         {text: 'Save', action: 'save'},
         {text: 'Cancel', scope: this, handler: this.close},
      ];

      this.callParent(arguments);
   },

   getForm: function() {
      return this.child('form');
   }
});
