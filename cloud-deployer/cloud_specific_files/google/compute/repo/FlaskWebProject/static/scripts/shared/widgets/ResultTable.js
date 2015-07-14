define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/dom-construct',
  'dojo/dom-class',
  'shared/_WidgetBase',
  'dojo/text!./templates/ResultTable.html'
], function(
  declare,
  array,
  domConstruct,
  domClass,
  _WidgetBase,
  template
) {

  var _toggleClass = domClass.toggle;

  return declare('shared.widgets.ResultTable', _WidgetBase, {

    templateString: template,
    maxColNumPhone: 3,
    value: [],
    cellFilter: null,
    colLabels: [],
    firstColRight: false,

    _setValueAttr: function(value) {
      if (!(value && value.length)) {
        value = [];
      }
      this._set('value', value);
      this.updateTable();
    },

    _setBorderAttr: function(value) {
      _toggleClass(this.domNode, 'table-border', !!value);
    },

    _setEqualColsAttr: function(value) {
      _toggleClass(this.domNode, 'equal-cols', !!value);
    },

    _setDisclosureTableAttr: function(value) {
      _toggleClass(this.domNode, 'inline-table-disclosure', !!value);
    },

    updateTable: function() {
      domConstruct.empty(this.tableHeadNode);
      domConstruct.empty(this.tableBodyNode);

      this.colLabels = this.colLabels || [];
      if (this.colLabels.length > 0) {
        this._renderRow(this.tableHeadNode, 'th')(this.colLabels);
      }

      array.forEach(this.value, this._renderRow(this.tableBodyNode, 'td', this.cellFilter), this);
    },

    _renderRow: function(parentNode, cellNodeName, filter) {
      var self = this;

      return function(data, rowIndex) {
        var rowNode,
            rowOptions = {};

        if (rowIndex != undefined && rowIndex === this.highlightRow) {
          rowOptions.className = 'highlight';
        }

        rowNode = domConstruct.create('tr', rowOptions, parentNode);
        array.forEach(data, self._renderCell(rowNode, cellNodeName || 'td', rowIndex, filter));
      };
    },

    _renderCell: function(rowNode, tagName, rowIndex, filter) {
      var self = this;

      if (typeof filter !== 'function') {
        filter = function(value){return value;};
      }

      return function(data, colIndex) {
        var className = '',
            options = {};

        if (!self.firstColRight && colIndex === 0) {
          className += ' col-left';
        }
        if (colIndex >= self.maxColNumPhone) {
          className += ' additional-cell';
        }

        options.className = className;
        options.innerHTML = filter(data, colIndex, rowIndex);

        domConstruct.create(tagName, options, rowNode);
      };
    }

  });

});
