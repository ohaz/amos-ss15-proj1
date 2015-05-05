define([
  'dojo/_base/declare',
  'dojo/dom-class',
  'shared/_WidgetBase',
  'dojo/text!./templates/DetailsTable.html',

  'shared/widgets/NumberOutput'
], function(
  declare,
  domClass,
  _WidgetBase,
  template
) {

  return declare('rechner-brutto-netto.widgets.DetailsTable', _WidgetBase, {

    templateString: template,

    _setPrivKvPvAttr: function(visible) {
      domClass.toggle(this.privateKvPvRowNode, 'hidden', !visible);
    },

    postCreate: function() {
      this.watchValue(this.rechner, 'showPrivKvPv', [
        {
          on: true,
          call: this.showPrivKvPvRow
        },
        {
          on: false,
          call: this.hidePrivKvPvRow
        }
      ]);
    },

    showPrivKvPvRow: function() {
      this.set('privKvPv', true);
    },

    hidePrivKvPvRow: function() {
      this.set('privKvPv', false);
    }

  });

});
