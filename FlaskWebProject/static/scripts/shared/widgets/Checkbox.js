define([
  'dojo/_base/declare',
  'shared/_WidgetBase',
  'dojo/text!./templates/Checkbox.html'
], function(
  declare,
  _WidgetBase,
  template
) {

  return declare('shared.widgets.Checkbox', _WidgetBase, {

    templateString: template,

    _setValueAttr: function(value) {
      var isChecked = !!value;
      this.inputNode.checked = isChecked;
      this._set('value', isChecked);
    },

    onChange: function() {
      this._set('value', this.inputNode.checked);
      this.inherited(arguments);
    }

  });

});
