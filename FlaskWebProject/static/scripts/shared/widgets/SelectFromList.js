define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/on',
  '../_WidgetBase',
  'dijit/_Container',
  'dojo/text!./templates/SelectFromList.html',
  'dojo/text!./templates/SelectFromListItem.html'
], function(
  declare,
  array,
  on,
  _WidgetBase,
  _Container,
  template,
  itemTemplate
) {

  var Item = declare(_WidgetBase, {

    templateString: itemTemplate,

    label: '',
    subLabel: '',
    name: '',
    value: '',

    _setLabelAttr: { node: 'labelNode', type: 'innerHTML' },
    _setSubLabelAttr: { node: 'subLabelNode', type: 'innerHTML' },
    _setCheckedAttr: { node: 'inputNode', type: 'attribute', attribute: 'checked' }

  });



  return declare('shared.widgets.SelectFromList', [
    _WidgetBase,
    _Container
  ], {

    templateString: template,

    postCreate: function() {
      var self = this,
          handler;

      handler = on(this.domNode, 'input:change', function(event) {
        self.set('value', event.target.value);
        self.emit('change');
      });
      this._connects.push(handler);
    },

    _setValueAttr: function(value) {
      var children,
          item;

      if (value === this.get('value')) {
        return;
      }

      value = parseInt(value, 10) || 0;
      children = this.getChildren();
      item = children[value];
      if (item) {
        item.set('checked', true);
      } else {
        array.forEach(children, function(child) {
          child.set('checked', false);
        });
      }
      this._set('value', value);
    },

    _setDataAttr: function(value) {
      array.forEach(this.getChildren(), this.removeChild, this);

      array.forEach(value, function(item, index) {
        var li = new Item({
          name: this.name || '',
          label: ''+item.label,
          subLabel: ''+item.subLabel,
          value: ''+index,
          checked: index === this.get('value')
        });
        li.placeAt(this);
      }, this);
    }

  });

});
