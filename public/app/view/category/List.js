Ext.define('KR.view.category.List', {
   extend: 'Ext.grid.Panel', 
   alias: 'widget.categorylist',

   height: 300,

   store: 'Categories',

   columnLines: true, 

   selModel: {
      selType: 'checkboxmodel',
      mode: 'MULTI', 
      checkOnly: true
   },

   columns : [
      {
         header: 'Name', 
         dataIndex: 'name', 
         flex: 1, 
         sortable: true, 
         editor: {allowBlank: false}
      }
   ],

   plugins: [
      Ext.create('Ext.grid.plugin.CellEditing', {
         clicksToEdit: 2
      })
   ],    

   dockedItems: [
      {
         xtype: 'toolbar',
         items: [
            {
               name: 'addButton',
               text:'Add',
               tooltip:'Add new Category',
               iconCls:'add'
            }, '-', {
               name: 'removeButton',
               text:'Remove',
               tooltip:'Remove selected categories',
               iconCls: 'remove'
            }
         ]
      },
      {
         xtype: 'toolbar',
         dock: 'bottom',
         ui: 'footer',
         layout: {
            pack: 'center'
         },
         items: [
            {
               name: 'saveButton',
               minWidth: 80,
               text: 'Save',
               iconCls: 'save'
            }, {
               name: 'cancelButton',
               minWidth: 80,
               text: 'Cancel'
            }
         ]
      }
   ]

});
