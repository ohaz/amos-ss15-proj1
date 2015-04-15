define([
  'dojo/_base/declare',
  'dojo/dom-class',
  'shared/_WidgetBase',
  'dojo/text!./templates/InputMain.html',

  'shared/widgets/NumberInput',
  'shared/widgets/NumberOutput',
  'shared/widgets/ListSelect'
], function(
  declare,
  domClass,
  _WidgetBase,
  template
) {

  return declare('rechner-brutto-netto.widgets.InputMain', _WidgetBase, {

    templateString: template,

    _setPrivKvPvAttr: function(visible) {
      domClass.toggle(this.privateKvPvRowNode, 'hidden', !visible);
    },

    postCreate: function() {
      var constants = this.config.constants,
          values = this.config.values;

      this._initVeranlagungsjahrSelect(values.veranlagungsjahr);
      this._initLohnzahlzeitraumSelect(constants);
      this._initSteuerklasse1Select(constants);
      this._initSteuerklasse2Select(constants);

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


      this.inherited(arguments);
    },

    onBruttoChange: function() {
      this.rechner.set('brutto_oder_netto', true);
      this.onChange();
    },

    onNettoChange: function() {
      this.rechner.set('brutto_oder_netto', false);
      this.onChange();
    },

    showPrivKvPvRow: function() {
      this.set('privKvPv', true);
    },

    hidePrivKvPvRow: function() {
      this.set('privKvPv', false);
    },

    _initVeranlagungsjahrSelect: function(range) {
      var from = range.min,
          to = range.max;

      this.veranlagungsjahrSelect.setRange(from, to);
    },

    _initLohnzahlzeitraumSelect: function(constants) {
      this.lohnzahlzeitraumSelect.set('options', [
        {
          text: 'monatlich',
          value: constants.LZZ_MONATLICH
        },
        {
          text: 'jährlich',
          value: constants.LZZ_JAEHRLICH
        }
      ]);
    },

    _initSteuerklasse1Select: function(constants) {
      this._initSteuerklasseSelect(this.steuerklasse1Select, constants);
    },

    _initSteuerklasse2Select: function(constants) {
      this._initSteuerklasseSelect(this.steuerklasse2Select, constants);
    },

    _initSteuerklasseSelect: function(select, constants) {
      select.set('options', [
        {
          text: 'I',
          value: constants.STEUERKLASSE_I
        },
        {
          text: 'II',
          value: constants.STEUERKLASSE_II
        },
        {
          text: 'III',
          value: constants.STEUERKLASSE_III
        },
        {
          text: 'IV',
          value: constants.STEUERKLASSE_IV
        },
        {
          text: 'V',
          value: constants.STEUERKLASSE_V
        },
        {
          text: 'VI',
          value: constants.STEUERKLASSE_VI
        }
      ]);
    }

  });

});
