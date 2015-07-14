define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/dom-class',
  'shared/_WidgetBase',
  'dojo/text!./templates/VergleichTable.html',

  'shared/widgets/NumberOutput'
], function(
  declare,
  array,
  domClass,
  _WidgetBase,
  template
) {

  return declare('rechner-brutto-netto.widgets.VergleichTable', _WidgetBase, {

    templateString: template,

    _setVorteilMessageAttr: { node: 'vorteilMessageNode', type: 'innerText' },

    postCreate: function() {
      var constants = this.config.constants;

      this.watchValue(this.rechner, 'skv_vorteil', [
        {
          on: constants.TYP_III_V,
          call: this.highlight_3_5
        },
        {
          on: constants.TYP_V_III,
          call: this.highlight_5_3
        },
        {
          on: constants.TYP_IV_IV,
          call: this.highlight_4_4
        },
        {
          on: constants.TYP_IV_IV_FAKTOR,
          call: this.highlight_4_4_faktor
        }
      ]);

      this.inherited(arguments);
    },

    highlight_3_5: function() {
      this._highlightRow('3_5');
      this.set('vorteilMessage', 'III - V');
    },

    highlight_5_3: function() {
      this._highlightRow('5_3');
      this.set('vorteilMessage', 'V - III');
    },

    highlight_4_4: function() {
      this._highlightRow('4_4');
      this.set('vorteilMessage', 'IV - IV');
    },

    highlight_4_4_faktor: function() {
      this._highlightRow('4_4_faktor');
      this.set('vorteilMessage', 'IV - IV mit Faktor');
    },

    _highlightRow: function(highlightId) {
      array.forEach(['3_5', '5_3', '4_4', '4_4_faktor'], function(id) {
        domClass.toggle(this['row_' + id], 'highlight', id === highlightId);
      }, this);
    }

  });

});
