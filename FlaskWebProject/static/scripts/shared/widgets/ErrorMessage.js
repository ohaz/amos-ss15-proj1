define([
  'dojo/_base/declare',
  'shared/utils/html',
  'shared/_WidgetBase',
  'dojo/text!./templates/ErrorMessage.html'
], function(
  declare,
  html,
  _WidgetBase,
  template
) {

  return declare('shared.widgets.ErrorMessage', _WidgetBase, {

    templateString: template,
    baseClass: 'error',
    message: '',

    _setValueAttr: function(value) {
      html.setText(this.messageNode, value || '');
    }

  });

});
