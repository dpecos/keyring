Ext.define('DPM.controller.SearchablePanelController', {
   extend: 'Ext.app.Controller',

   requires: [
      'Ext.toolbar.TextItem',
      'Ext.form.field.Checkbox',
      'Ext.form.field.Text'
   ],


   tagsRe: /<[^>]*>/gm,
   tagsProtect: '\x0f',
   regExpProtect: /\\|\/|\+|\\|\.|\[|\]|\{|\}|\?|\$|\*|\^|\|/gm,
   indexes: [],
   currentIndex: null,
   caseSensitive: false,
   regExpMode: false,
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

   /**
   * In normal mode it returns the value with protected regexp characters.
   * In regular expression mode it returns the raw value except if the regexp is invalid.
   * @return {String} The value to process or null if the textfield value is blank or invalid.
   * @private
   */
   getSearchValue: function() {
      value = this.getPanelView().down('textfield[name=searchField]').getValue();

      if (value === '') {
         return null;
      }
      if (!this.regExpMode) {
         value = value.replace(this.regExpProtect, function(m) {
            return '\\' + m;
         });
      } else {
         try {
            new RegExp(value);
         } catch (error) {
            this.statusBar.setStatus({
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
      count = 0;

      this.view = this.getPanelView().view;
      this.statusBar = this.getPanelView().down('statusbar[name=searchStatusBar]');
      this.view.refresh();

      // reset the statusbar
      this.statusBar.setStatus({
         text: this.defaultStatusText,
         iconCls: ''
      });

      var searchValue = this.getSearchValue();
      this.indexes = [];
      this.currentIndex = null;

      if (searchValue !== null) {
         var searchRegExp = new RegExp(searchValue, 'g' + (this.caseSensitive ? '' : 'i'));
         this.getPanelView().getStore().each(function(record, idx) {
            var td = Ext.fly(this.view.getNode(idx)).down('td'), cell, matches, cellHTML;
            while(td) {
               cell = td.down('.x-grid-cell-inner');
               matches = cell.dom.innerHTML.match(this.tagsRe);
               cellHTML = cell.dom.innerHTML.replace(this.tagsRe, this.tagsProtect);

               var that = this;
               // populate indexes array, set currentIndex, and replace wrap matched string in a span
               cellHTML = cellHTML.replace(searchRegExp, function(m) {
                  count += 1;
                  if (Ext.Array.indexOf(that.indexes, idx) === -1) {
                     that.indexes.push(idx);
                  }
                  if (that.currentIndex === null) {
                     that.currentIndex = idx;
                  }
                  return '<span class="' + that.matchCls + '">' + m + '</span>';
               });
               // restore protected tags
               Ext.each(matches, function(match) {
                  cellHTML = cellHTML.replace(this.tagsProtect, match); 
               });
               // update cell html
               cell.dom.innerHTML = cellHTML;
               td = td.next();
            }
         }, this);

         // results found
         if (this.currentIndex !== null) {
            this.view.getSelectionModel().select(this.currentIndex);
            this.statusBar.setStatus({
               text: count + ' matche(s) found.',
               iconCls: 'x-status-valid'
            });
         }
      }

      // no results found
      if (this.currentIndex === null) {
         this.getPanelView().getSelectionModel().deselectAll();
      }

      // force textfield focus
      this.getPanelView().down('textfield[name=searchField]').focus();
   },

   /**
   * Selects the previous row containing a match.
   * @private
   */   
   onPreviousClick: function() {
      var idx;

      if ((idx = Ext.Array.indexOf(this.indexes, this.currentIndex)) !== -1) {
         this.currentIndex = idx - 1 >= 0 ? this.indexes[idx - 1] : this.indexes[this.indexes.length - 1];
         this.getPanelView().getSelectionModel().select(this.currentIndex);
      }
   },

   /**
   * Selects the next row containing a match.
   * @private
   */    
   onNextClick: function() {
      var idx;

      if ((idx = Ext.Array.indexOf(this.indexes, this.currentIndex)) !== -1) {
         this.currentIndex = this.indexes[idx + 1] || this.indexes[0];
         this.getPanelView().getSelectionModel().select(this.currentIndex);
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
