Ext.define('DPM.controller.SearchablePanelController', {
   extend: 'Ext.app.Controller',

   requires: [
      'Ext.toolbar.TextItem',
      'Ext.form.field.Checkbox',
      'Ext.form.field.Text'
   ],

   init: function() {
 
      var searchHelper = {
         tagsRe: /<[^>]*>/gm,
         tagsProtect: '\x0f',
         regExpProtect: /\\|\/|\+|\\|\.|\[|\]|\{|\}|\?|\$|\*|\^|\|/gm,
         indexes: [],
         currentIndex: null,
         caseSensitive: false,
         regExpMode: false,
         matchCls: 'x-livesearch-match',
         defaultStatusText: 'Nothing Found',

         /**
         * In normal mode it returns the value with protected regexp characters.
         * In regular expression mode it returns the raw value except if the regexp is invalid.
         * @return {String} The value to process or null if the textfield value is blank or invalid.
         * @private
         */
         getSearchValue: function(that) {
            value = that.getPanelView().down('textfield[name=searchField]').getValue();

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

            this.getSearchHelper().view = this.getPanelView().view;
            this.getSearchHelper().statusBar = this.getPanelView().down('statusbar[name=searchStatusBar]');
            this.getSearchHelper().view.refresh();

            // reset the statusbar
            this.getSearchHelper().statusBar.setStatus({
               text: this.getSearchHelper().defaultStatusText,
               iconCls: ''
            });

            var searchValue = this.getSearchHelper().getSearchValue(this);
            this.getSearchHelper().indexes = [];
            this.getSearchHelper().currentIndex = null;

            if (searchValue !== null) {
               var searchRegExp = new RegExp(searchValue, 'g' + (this.getSearchHelper().caseSensitive ? '' : 'i'));
                  this.getPanelView().getStore().each(function(record, idx) {
                     var td = Ext.fly(this.getSearchHelper().view.getNode(idx)).down('td'), cell, matches, cellHTML;
                     while(td) {
                        cell = td.down('.x-grid-cell-inner');
                        matches = cell.dom.innerHTML.match(this.getSearchHelper().tagsRe);
                        cellHTML = cell.dom.innerHTML.replace(this.getSearchHelper().tagsRe, this.getSearchHelper().tagsProtect);

                        var that = this;
                        // populate indexes array, set currentIndex, and replace wrap matched string in a span
                        cellHTML = cellHTML.replace(searchRegExp, function(m) {
                           count += 1;
                           if (Ext.Array.indexOf(that.getSearchHelper().indexes, idx) === -1) {
                              that.getSearchHelper().indexes.push(idx);
                           }
                           if (that.getSearchHelper().currentIndex === null) {
                              that.getSearchHelper().currentIndex = idx;
                           }
                           return '<span class="' + that.getSearchHelper().matchCls + '">' + m + '</span>';
                        });
                        // restore protected tags
                        Ext.each(matches, function(match) {
                           cellHTML = cellHTML.replace(this.getSearchHelper().tagsProtect, match); 
                        });
                        // update cell html
                        cell.dom.innerHTML = cellHTML;
                        td = td.next();
                     }
                  }, this);

                  // results found
                  if (this.getSearchHelper().currentIndex !== null) {
                     this.getSearchHelper().view.getSelectionModel().select(this.getSearchHelper().currentIndex);
                     this.getSearchHelper().statusBar.setStatus({
                        text: count + ' matche(s) found.',
                        iconCls: 'x-status-valid'
                     });
                  }
            }

            // no results found
            if (this.getSearchHelper().currentIndex === null) {
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

            if ((idx = Ext.Array.indexOf(this.getSearchHelper().indexes, this.getSearchHelper().currentIndex)) !== -1) {
               this.getSearchHelper().currentIndex = idx - 1 >= 0 ? this.getSearchHelper().indexes[idx - 1] : this.getSearchHelper().indexes[this.getSearchHelper().indexes.length - 1];
               this.getPanelView().getSelectionModel().select(this.getSearchHelper().currentIndex);
            }
         },

         /**
         * Selects the next row containing a match.
         * @private
         */    
         onNextClick: function() {
            var idx;

            if ((idx = Ext.Array.indexOf(this.getSearchHelper().indexes, this.getSearchHelper().currentIndex)) !== -1) {
               this.getSearchHelper().currentIndex = this.getSearchHelper().indexes[idx + 1] || this.getSearchHelper().indexes[0];
               this.getPanelView().getSelectionModel().select(this.getSearchHelper().currentIndex);
            }
         },

         /**
         * Switch to case sensitive mode.
         * @private
         */    
         caseSensitiveToggle: function(checkbox, checked) {
            this.getSearchHelper().caseSensitive = checked;
            this.getSearchHelper().onTextFieldChange.call(this);
         },

         /**
         * Switch to regular expression mode
         * @private
         */
         regExpToggle: function(checkbox, checked) {
            this.getSearchHelper().regExpMode = checked;
            this.getSearchHelper().onTextFieldChange.call(this);
         }
      };

      this.getSearchHelper = function() {
         return searchHelper;
      };

      this.control({
         'textfield[name=searchField]': {
            change: {
               fn: searchHelper.onTextFieldChange,
               buffer: 100
            }
         },
         'button[name=nextButton]': {
            click: searchHelper.onNextClick
         },
         'button[name=prevButton]': {
            click: searchHelper.onPreviousClick
         },
         'checkbox[name=regularExprCheckBox]': {
            change: searchHelper.regExpToggle
         },
         'checkbox[name=caseSensitiveCheckBox]': {
            change: searchHelper.caseSensitiveToggle
         }
      });

   }

});
