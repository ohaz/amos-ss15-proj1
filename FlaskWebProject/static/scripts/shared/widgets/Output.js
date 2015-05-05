define([
  'dojo/_base/declare',
  'shared/_WidgetBase',
  'shared/utils/html'
], function(
  declare,
  _WidgetBase,
  html
) {

  return declare('shared.widgets.Output', _WidgetBase, {

    templateString: '<span></span>',
    value: '',
    noEscape: false,

    _setValueAttr: function(value) {
      value = value || '';

      if (!this.noEscape) {
        value = html.escape(value);
      }
      this.domNode.innerHTML = value;
    }

  });

});
