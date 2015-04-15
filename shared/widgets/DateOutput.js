define([
  'dojo/_base/declare',
  'shared/_WidgetBase',
  'dojo/date',
  'dojo/date/locale',
  'shared/utils/html'
], function(
  declare,
  _WidgetBase,
  date,
  dateLocale,
  html
) {

  return declare('shared.widgets.DateOutput', _WidgetBase, {

    templateString: '<span></span>',
    value: null,
    datePattern: null,

    _setValueAttr: function(value) {
      var date,
          currentValue,
          currentTimestamp;

      if (value instanceof Date) {
        date = value;
      } else {
        date = new Date(value);
      }

      currentValue = this.get('value');
      currentTimestamp = currentValue && currentValue.getTime();

      if (date.getTime() !== currentTimestamp) {
        this._set('value', date);
        this._render();
      }
    },

    _setDatePatternAttr: function(value) {
      this._set('datePattern', value);
      this._render();
    },

    _render: function() {
      var date = this.get('value'),
          formattedDate = '';

      if (date) {
        formattedDate = dateLocale.format(date, {
          selector: 'date',
          fullYear: true,
          datePattern: this.datePattern
        });
      }

      html.setText(this.domNode, formattedDate);
    }

  });

});
