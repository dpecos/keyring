Ext.define('DPM.view.SearchablePanel', {
   extend: 'Ext.grid.Panel',

   requires: [
      'Ext.toolbar.TextItem',
      'Ext.form.field.Checkbox',
      'Ext.form.field.Text'
   ],

   initComponent: function() {
      this.tbar = ['Search', {
         xtype: 'textfield',
         name: 'searchField',
         hideLabel: true,
         width: 200,
      }, {
         xtype: 'button',
         name: 'prevButton',
         text: '&lt;',
         tooltip: 'Find Previous Row',
      }, {
         xtype: 'button',
         name: 'nextButton',
         text: '&gt;',
         tooltip: 'Find Next Row',
      }, '-', {
         xtype: 'checkbox',
         name: 'regularExprCheckBox',
         hideLabel: true,
         margin: '0 0 0 4px',
      }, 'Regular expression', {
         xtype: 'checkbox',
         name: 'caseSensitiveCheckBox',
         hideLabel: true,
         margin: '0 0 0 4px',
      }, 'Case sensitive',
      /*{
         id: 'search',
         name: 'search',
         emptyText: 'enter search term',
         xtype: 'trigger',
         triggerCls: 'x-form-search-trigger',
         onTriggerClick: function () {
            if (this.getRawValue().length > 0) {
               Ext.MessageBox.show({
                  title: 'Search Feature',
                  msg: 'Coming soon ... ',
                  icon: Ext.MessageBox.INFO,
                  animateTarget: 'search',
                  buttons: Ext.MessageBox.OK
               });
            } else {
               Ext.MessageBox.show({
                  title: 'Invalid Input',
                  msg: 'Search term cannot be empty.',
                  icon: Ext.MessageBox.WARNING,
                  animateTarget: 'search',
                  buttons: Ext.MessageBox.OK
               });
            }
         }
      }*/
      ];

      this.bbar = Ext.create('DPM.view.StatusBar', {
         defaultText: '&nbsp;',
         name: 'searchStatusBar'
      });

      this.callParent(arguments);
   }

});
