define([
  'dojo/_base/declare',
  'dojo/dom-construct',
  'dojo/dom-attr',
  'dojo/dom-class',
  'shared/_WidgetBase',
  'shared/utils/html',
  'dojo/text!./templates/2dResultTable.html'
], function(
  declare,
  domConstruct,
  domAttr,
  domClass,
  _WidgetBase,
  html,
  template
) {

  var _toggleClass = domClass.toggle;

  return declare('shared.widgets.2dResultTable', _WidgetBase, {

    templateString: template,
    maxColNumPhone: 3,
    value: [],
    colHeadingFilter: null,
    rowHeadingFilter: null,
    cellFilter: null,

    _setColLabelAttr: {
      node: 'colLabelNode',
      type: 'innerText'
    },
    _setRowLabelAttr: {
      node: 'rowLabelNode',
      type: 'innerText'
    },
    _setValueAttr: function(value) {
      if (!(value && value.length)) {
        value = [];
      }
      this._set('value', value);
      this.updateTable();
    },

    _setEqualColsAttr: function(value) {
      _toggleClass(this.domNode, 'equal-cols', !!value);
    },

    _filter: function(value, filter) {
      return filter ? filter(value) : value;
    },

    updateTable: function() {
      var i,
          j,
          thClass,
          tdClass,
          row,
          tr;

      if (this.value.length == 0) {
        return;
      }

      // Add Column Headers

      domConstruct.empty(this.colHeadingsNode);

      for (i = 1; i < this.value[0].length; i++) {
        thClass = "cell-separator-bottom";

        if (i > this.maxColNumPhone) {
          thClass += " additional-cell";
        }

        domConstruct.create(
          "th",
          {
            "class": thClass,
            "innerHTML": this._filter(this.value[0][i], this.colHeadingFilter)
          },
          this.colHeadingsNode,
          "last"
        );
      }

      // Add Rows

      domConstruct.empty(this.tableBodyNode);

      for (i = 1; i < this.value.length; i++) {
        row = this.value[i];

        // Add Table Row
        tr = domConstruct.create("tr", null, this.tableBodyNode, "last");

        // Add Row Heading
        domConstruct.create(
          "th",
          {
            "class": "emph cell-separator-right column-left",
            "innerHTML": this._filter(row[0], this.rowHeadingFilter)
          },
          tr,
          "last"
        );

        // Add Row Cells
        for (j = 1; j < row.length; j++) {
          tdClass = "";
          if (j > this.maxColNumPhone) {
            tdClass = "additional-cell";
          }

          domConstruct.create(
            "td",
            {
              "class": tdClass,
              "innerHTML": this._filter(row[j], this.cellFilter)
            },
            tr,
            "last"
          );
        }
      }

      domAttr.set(this.colLabelNode, 'colspan', this.value[0].length - 1);
    }
  });
});
