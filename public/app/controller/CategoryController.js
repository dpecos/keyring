Ext.define('KR.controller.CategoryController', {
   extend: 'Ext.app.Controller',

   stores: [
      'Categories', 'EntryStore'
   ],

   models: [
      'Category'
   ],

   views: [
      'category.List'
   ],

   refs: [
      {
         ref: 'categoryList',
         selector: 'categorylist'
      }
   ],

   init: function() {
      this.control({
         'categorylist button[name=addButton]': {
            click: this.addNewCategory
         },
         'categorylist button[name=removeButton]': {
            click: this.removeCategories
         },
         'categorylist button[name=saveButton]': {
            click: this.save
         },
         'categorylist button[name=cancelButton]': {
            click: this.closePopup
         },
         'categorylist': {
            beforeedit: this.beforeedit,
            edit: this.edit
         }
      });

      this.callParent(arguments);
   },

   addNewCategory: function() {
      var store = this.getCategoriesStore();
      var model = this.getCategoryModel();
      var msgbox = Ext.MessageBox.prompt('Name', 'Please enter the category name:', function(button, text) {
         if (button == 'ok') {
            var record = Ext.create(model, {name: text});
            record.setDirty(true);
            store.add(record);
         }
         this.close();
      });
      msgbox.textField.inputEl.dom.type = 'input';
   },

   removeCategories: function() {
      var model = this.getCategoryList().getSelectionModel();
      var selection = model.getSelection();
      var store = this.getCategoriesStore();
      Ext.Array.each(selection, function(item) {
         store.remove(item);
      });
   },

   save: function() {
      var store = this.getCategoriesStore();
      var me = this;
      if (store.getModifiedRecords() != 0 || store.getRemovedRecords() != 0) {
         store.sync({
            callback: function() {
               me.getCategoriesStore().reload();
               me.getEntryStoreStore().reload();
               me.closePopup();
            }
         });
      } else {
         this.closePopup();
      }
   },

   closePopup: function() {
      var store = this.getCategoriesStore();
      store.rejectChanges();
      this.getCategoryList().up().close();
   },

   beforeedit: function(editor, ev, eOpts) {
      var model = this.getCategoryList().getSelectionModel();
      this._selectedRecords = model.getSelection();
   },

   edit: function(editor, ev, eOpts) {
      var model = this.getCategoryList().getSelectionModel();
      if (this._selectedRecords != null) {
         model.deselectAll();
         model.select(this._selectedRecords);
         delete this._selectedRecords;
      } else {
         model.deselect(ev.record);
      }
   }

});