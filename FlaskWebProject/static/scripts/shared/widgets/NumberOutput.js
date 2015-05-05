define([
  'dojo/_base/declare',
  'shared/_WidgetBase',
  'shared/utils/number',
  'shared/utils/html'
], function(
  declare,
  _WidgetBase,
  number,
  html
) {

  var format = number.format;

  return declare('shared.widgets.NumberOutput', _WidgetBase, {

    templateString: '<span></span>',
    value: 0,
    places: 0,

    _setValueAttr: function(value) {
      var text,
          unit;

      if (value != undefined && !isNaN(value)) {
        text = format(value, this.places);
        if (this.unit) {
          text += ' ';
          if (value === 0) {
            text += this.unit[0] || '';
          } else if (value === 1) {
            text += this.unit[1] || '';
          } else {
            text += this.unit[2] || '';
          }
        }
      } else {
        text = '–';
      }
      html.setText(this.domNode, text);
    }

  });

});
