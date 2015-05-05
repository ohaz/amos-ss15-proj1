define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/dom-construct',
  'shared/utils/html',
  'shared/_WidgetBase',
  'dojo/text!./templates/SimpleSelect.html'
], function(
  declare,
  array,
  dom,
  html,
  _WidgetBase,
  template
) {

  return declare('shared.widgets.SimpleSelect', _WidgetBase, {

    templateString: template,

    startup: function() {
      this.connect(this.selectNode, 'change', this.onChange);
      this.inherited(arguments);
    },

    addOption: function(text, value) {
      var options = {},
          node;

      if (value != undefined) {
        options['value'] = value;
      }

      node = dom.create('option', options, this.selectNode);
      html.setText(node, text);
    },

    setRange: function(from, to, options) {
      var value,
          compare,
          step,
          formatFn;

      options = options || {};
      step = options.step || 1;
      formatFn = options.formatFn || function(v) { return v; };

      if (from < to) {
        compare = function() { return value <= to; };
      } else {
        compare = function() { return value >= to; };
        step = -step;
      }

      this.clear();
      for (value = from; compare(); value += step) {
        this.addOption(formatFn(value), value);
      }
    },

    selectValue: function(value, silent) {
      var i, n, option;

      if (value === this.get('value')) {
        return;
      }

      this._selectValue(value, silent);
    },

    _selectValue: function(value, silent) {
      var i, n, option;

      for (i = 0, n = this.selectNode.length; i < n; i += 1) {
        option = this.selectNode.item(i);

        if (option.value === ''+value) {
          this.selectIndex(i, silent);
          return;
        }
      }

      // remove selection if value is not present
      this.selectIndex(-1, silent);
    },

    selectIndex: function(index, silent) {
      if (index < this.selectNode.length) {
        this.selectNode.selectedIndex = index;
        this._updateValue();
        if (!silent) {
          this.emit('change');
        }
      }
    },

    clear: function() {
      dom.empty(this.selectNode);
    },

    onChange: function(e) {
      this._updateValue();
      this.emit('change');
    },

    updateSelection: function() {
      this._selectValue(this.get('value'));
    },

    _updateValue: function() {
      var value = this._getSelectedValue();

      if (value !== '' && Number(value) == value) {
        value = Number(value);
      }

      this._set('value', value);
    },

    _setOptionsAttr: function(options) {
      this.clear();
      array.forEach(options, function(option) {
        if (typeof option === 'string') {
          this.addOption(option);
        } else {
          this.addOption(option.text, option.value);
        }
      }, this);
    },

    _getSelectedValue: function() {
      var option = this._getSelectedOption();
      return option && option.value;
    },

    _getSelectedOption: function() {
      var node,
          index,
          option;

      node = this.selectNode;
      index = node.selectedIndex;

      // try block in case selectedIndex is -1, i.e. no selection
      try {
        option = node.item(index);
      } catch(ex) {
        // nothing to do
      }

      return option;
    },

    _setValueAttr: function(value) {
      this.selectValue(value);
    }

  });

});
