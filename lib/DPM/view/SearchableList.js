Ext.define('DPM.view.SearchableList', {
   extend: 'Ext.grid.Panel',

   requires: [
      'Ext.toolbar.TextItem',
      'Ext.form.field.Checkbox',
      'Ext.form.field.Text'
   ],

   /**
   * @private
   * search value initialization
   */
   searchValue: null,

   /**
   * @private
   * The row indexes where matching strings are found. (used by previous and next buttons)
   */
   indexes: [],

   /**
   * @private
   * The row index of the first search, it could change if next or previous buttons are used.
   */
   currentIndex: null,

   /**
   * @private
   * The generated regular expression used for searching.
   */
   searchRegExp: null,

   /**
   * @private
   * Case sensitive mode.
   */
   caseSensitive: false,

   /**
   * @private
   * Regular expression mode.
   */
   regExpMode: false,

   /**
   * @cfg {String} matchCls
   * The matched string css classe.
   */
   matchCls: 'x-livesearch-match',

   defaultStatusText: 'Nothing Found',

   initComponent: function() {
      var me = this;
      me.tbar = ['Search', {
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
      }, 'Case sensitive'];

      me.bbar = Ext.create('DPM.view.StatusBar', {
         defaultText: me.defaultStatusText,
         name: 'searchStatusBar'
      });


      this.callParent(arguments);
   }

   // afterRender override: it adds textfield and statusbar reference and start monitoring keydown events in textfield input 
/*   afterRender: function() {
      var me = this;
      me.callParent(arguments);
      me.textField = me.down('textfield[name=searchField]');
      me.statusBar = me.down('statusbar[name=searchStatusBar]');
   },*/

});
