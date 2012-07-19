Ext.define('KR.controller.SearchableListController', {
   extend: 'Ext.app.Controller',

   requires: [
      'Ext.toolbar.TextItem',
      'Ext.form.field.Checkbox',
      'Ext.form.field.Text'
   ],

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

   init: function() {
      this.control({
         'textfield[name=searchField]': {
            change: {
               fn: this.onTextFieldChange,
               scope: this,
               buffer: 100
            }
         },
         'button[name=nextButton]': {
            click: this.onNextClick
         },
         'button[name=prevButton]': {
            click: this.onPreviousClick
         },
         'checkbox[name=regularExprCheckBox]': {
            change: this.regExpToggle
         },
         'checkbox[name=caseSensitiveCheckBox]': {
            change: this.caseSensitiveToggle
         }
      });
   },

   // detects html tag
   tagsRe: /<[^>]*>/gm,

   // DEL ASCII code
   tagsProtect: '\x0f',

   // detects regexp reserved word
   regExpProtect: /\\|\/|\+|\\|\.|\[|\]|\{|\}|\?|\$|\*|\^|\|/gm,

   /**
   * In normal mode it returns the value with protected regexp characters.
   * In regular expression mode it returns the raw value except if the regexp is invalid.
   * @return {String} The value to process or null if the textfield value is blank or invalid.
   * @private
   */
   getSearchValue: function() {
      var me = this,
      value = this.getEntriesList().down('textfield[name=searchField]').getValue();

      if (value === '') {
         return null;
      }
      if (!me.regExpMode) {
         value = value.replace(me.regExpProtect, function(m) {
            return '\\' + m;
         });
      } else {
         try {
            new RegExp(value);
         } catch (error) {
            me.statusBar.setStatus({
               text: error.message,
               iconCls: 'x-status-error'
            });
            return null;
         }
         // this is stupid
         if (value === '^' || value === '$') {
            return null;
         }
      }

      return value;
   },

   /**
   * Finds all strings that matches the searched value in each grid cells.
   * @private
   */
   onTextFieldChange: function() {
      var me = this,
      count = 0;

      me.view = this.getEntriesList().view;
      me.statusBar = this.getEntriesList().down('statusbar[name=searchStatusBar]');
      me.view.refresh();

      // reset the statusbar
      me.statusBar.setStatus({
         text: me.defaultStatusText,
         iconCls: ''
      });

      var searchValue = me.getSearchValue();
      me.indexes = [];
      me.currentIndex = null;

      if (searchValue !== null) {
         var searchRegExp = new RegExp(searchValue, 'g' + (me.caseSensitive ? '' : 'i'));

         this.getEntryStoreStore().each(function(record, idx) {
            var td = Ext.fly(me.view.getNode(idx)).down('td'), cell, matches, cellHTML;
            while(td) {
               cell = td.down('.x-grid-cell-inner');
               matches = cell.dom.innerHTML.match(me.tagsRe);
               cellHTML = cell.dom.innerHTML.replace(me.tagsRe, me.tagsProtect);

               // populate indexes array, set currentIndex, and replace wrap matched string in a span
               cellHTML = cellHTML.replace(searchRegExp, function(m) {
                  count += 1;
                  if (Ext.Array.indexOf(me.indexes, idx) === -1) {
                     me.indexes.push(idx);
                  }
                  if (me.currentIndex === null) {
                     me.currentIndex = idx;
                  }
                  return '<span class="' + me.matchCls + '">' + m + '</span>';
               });
               // restore protected tags
               Ext.each(matches, function(match) {
                  cellHTML = cellHTML.replace(me.tagsProtect, match); 
               });
               // update cell html
               cell.dom.innerHTML = cellHTML;
               td = td.next();
            }
         }, me);

         // results found
         if (me.currentIndex !== null) {
            me.view.getSelectionModel().select(me.currentIndex);
            me.statusBar.setStatus({
               text: count + ' matche(s) found.',
               iconCls: 'x-status-valid'
            });
         }
      }

      // no results found
      if (me.currentIndex === null) {
         this.getEntriesList().getSelectionModel().deselectAll();
      }

      // force textfield focus
      this.getEntriesList().down('textfield[name=searchField]').focus();
   },

   /**
   * Selects the previous row containing a match.
   * @private
   */   
   onPreviousClick: function() {
      var me = this,
      idx;

      if ((idx = Ext.Array.indexOf(me.indexes, me.currentIndex)) !== -1) {
         me.currentIndex = idx - 1 >= 0 ? me.indexes[idx - 1] : me.indexes[me.indexes.length - 1];
         this.getEntriesList().getSelectionModel().select(me.currentIndex);
      }
   },

   /**
   * Selects the next row containing a match.
   * @private
   */    
   onNextClick: function() {
      var me = this,
      idx;

      if ((idx = Ext.Array.indexOf(me.indexes, me.currentIndex)) !== -1) {
         me.currentIndex = me.indexes[idx + 1] || me.indexes[0];
         this.getEntriesList().getSelectionModel().select(me.currentIndex);
      }
   },

   /**
   * Switch to case sensitive mode.
   * @private
   */    
   caseSensitiveToggle: function(checkbox, checked) {
      this.caseSensitive = checked;
      this.onTextFieldChange();
   },

   /**
   * Switch to regular expression mode
   * @private
   */
   regExpToggle: function(checkbox, checked) {
      this.regExpMode = checked;
      this.onTextFieldChange();
   }

});
