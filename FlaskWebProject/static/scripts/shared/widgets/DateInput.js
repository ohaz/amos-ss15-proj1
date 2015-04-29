define([
  'dojo/_base/declare',
  'dojo/date/locale',
  'shared/_WidgetBase'
], function(
  declare,
  dateLocale,
  _WidgetBase
) {

  return declare('shared.widgets.DateInput', _WidgetBase, {

    templateString: '<input type="date">',
    value: null,

    _setValueAttr: function(value) {
      var currentValue;

      if (!(value instanceof Date)) {
        value = this._parseDate(value);
      }

      currentValue = this.get('value');
      if (!currentValue || value && value.getTime() !== currentValue.getTime() && !isNaN(value.getTime())) {
        this._set('value', value);
      }
      this._updateNodeValue();
    },

    postCreate: function() {
      this.inherited(arguments);
      this.connect(this.domNode, 'blur', this.onBlur);
    },

    onBlur: function(event) {
      this.set('value', this.domNode.value);
      this._updateNodeValue();
      this.emit('change', this.get('value'));
    },

    _parseDate: function(dateOrString) {
      var parts,
          date;

      if (dateOrString instanceof Date) {
        return dateOrString;
      }

      parts = dateOrString.split(/[-]/);
      date = new Date(parts[0], parts[1]-1, parts[2]);

      return date;
    },

    _updateNodeValue: function() {
      var value,
        dateStr;

      value = this.get('value');
      if (value) {
        dateStr = dateLocale.format(value, {
          datePattern: 'yyyy-MM-dd',
          selector: 'date'
        });
      } else {
        dateStr = '';
      }
      this.domNode.value = dateStr;
    }

  });

});
