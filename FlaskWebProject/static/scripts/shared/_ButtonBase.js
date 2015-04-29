define([
  'dojo/_base/declare',
  'shared/_WidgetBase',
  'shared/widgets/_TapHighlightNodeMixin',
  'shared/utils/html'
], function(
  declare,
  _WidgetBase,
  _TapHighlightNodeMixin,
  html
) {

  return declare([
    _WidgetBase,
    _TapHighlightNodeMixin
  ], {

    templateString: '<a data-dojo-attach-point="buttonNode"><span class="button-label" data-dojo-attach-point="labelNode"></span></a>',
    baseClass: 'button',
    label: '',

    _setLabelAttr: function(value) {
      value = value || '';
      html.setText(this.labelNode, value);
      this._set('label', value);
    },

    postCreate: function() {
      this.connect(this.buttonNode, 'click', this.onClick);
      this.inherited(arguments);
    },

    onClick: function() {
      this.emit('click');
    }

  });

});
