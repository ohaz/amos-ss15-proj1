define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dijit/_Container',
  'shared/_WidgetBase'
], function(
  declare,
  lang,
  array,
  _Container,
  _WidgetBase
) {

  return declare('shared.widgets.DataList', [_WidgetBase, _Container], {

    templateString: '<ul data-dojo-attach-point="containerNode"></ul>',
    childCtor: null,

    _setValueAttr: function(value) {
      this.empty();
      this._render(value);
    },

    _render: function(objects) {
      if (lang.isFunction(this.childCtor)) {
        array.forEach(objects, function(data, index) {
          var child;

          data.itemIndex = index;
          child = new this.childCtor(data);
          this.addChild(child);
        }, this);
      }
    },

    _destroyChild: function(child) {
      this.removeChild(child);
      child.destroy();
    },

    empty: function() {
      array.forEach(this.getChildren(), this._destroyChild, this);
    }

  });

});
