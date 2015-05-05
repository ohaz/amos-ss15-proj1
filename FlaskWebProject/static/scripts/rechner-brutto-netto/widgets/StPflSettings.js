define([
  'dojo/_base/declare',
  'dojo/dom-class',
  'shared/utils/number',
  'shared/_WidgetBase',
  'dojo/text!./templates/StPflSettings.html',

  'shared/widgets/NumberInput',
  'shared/widgets/ListSelect',
  'shared/widgets/Checkbox'
], function(
  declare,
  domClass,
  number,
  _WidgetBase,
  template
) {

  return declare('rechner-brutto-netto.widgets.StPflSettings', _WidgetBase, {

    templateString: template,

    _setVersorgungsbeginnMaxAttr: function(value) {
      this._updateVersorgungsbeginnOptions(this.VERSORGUNGSBEGINN_MIN, value);
    },

    postCreate: function() {
      var constants = this.config.constants,
          values = this.config.values;

      this.VERSORGUNGSBEGINN_MIN = values.versorgungsbeginn.min;
      this._initKinderfreibetragSelect(values.kinderfreibetrag_1);
      this._initArbeitsstaetteSelect(constants);

      this.watchValue(this.rechner, 'gesetzliche_kv', [
        {
          on: true,
          call: this._disablePrivKv
        },
        {
          on: false,
          call: this._enablePrivKv
        }
      ]);
      
      this.inherited(arguments);
    },

    _enablePrivKv: function() {
      domClass.remove(this.beitragPrivKvNode, 'hidden');
      domClass.remove(this.privKvNode, 'hidden');
      domClass.add(this.gesetzlKvNode, 'hidden');
      domClass.add(this.zusatzbeitragssatz, 'hidden');
    },

    _disablePrivKv: function() {
      domClass.add(this.beitragPrivKvNode, 'hidden');
      domClass.add(this.privKvNode, 'hidden');
      domClass.remove(this.gesetzlKvNode, 'hidden');
      domClass.remove(this.zusatzbeitragssatz, 'hidden');
    },

    _initKinderfreibetragSelect: function(range) {
      var from = range.min,
          to = range.max,
          step = .5;

      this.kinderfreibetragSelect.setRange(from, to, {
        step: step,
        formatFn: number.format.withPlaces(1)
      });
    },

    _initArbeitsstaetteSelect: function(constants) {
      this.arbeitsstaetteSelect.set('options', [
        {
          text: 'Baden-Württemberg',
          value: constants.BADEN_WUERTTEMBERG
        },
        {
          text: 'Bayern',
          value: constants.BAYERN
        },
        {
          text: 'Berlin',
          value: constants.BERLIN
        },
        {
          text: 'Brandenburg',
          value: constants.BRANDENBURG
        },
        {
          text: 'Bremen',
          value: constants.BREMEN
        },
        {
          text: 'Hamburg',
          value: constants.HAMBURG
        },
        {
          text: 'Hessen',
          value: constants.HESSEN
        },
        {
          text: 'Mecklenburg-Vorpommern',
          value: constants.MECKLENBURG_VORPOMMERN
        },
        {
          text: 'Niedersachsen',
          value: constants.NIEDERSACHSEN
        },
        {
          text: 'Nordrhein-Westfalen',
          value: constants.NORDRHEIN_WESTFALEN
        },
        {
          text: 'Rheinland-Pfalz',
          value: constants.RHEINLAND_PFALZ
        },
        {
          text: 'Saarland',
          value: constants.SAARLAND
        },
        {
          text: 'Sachsen',
          value: constants.SACHSEN
        },
        {
          text: 'Sachsen-Anhalt',
          value: constants.SACHSEN_ANHALT
        },
        {
          text: 'Schleswig-Holstein',
          value: constants.SCHLESWIG_HOLSTEIN
        },
        {
          text: 'Thüringen',
          value: constants.THUERINGEN
        }
      ]);
    },

    _updateVersorgungsbeginnOptions: function(min, max) {
      var year;

      min = parseInt(min, 10) || 0;
      max = parseInt(max, 10) || 0;

      if (!min || !max || min > max) {
        return;
      }

      this.versorgungsbeginnSelect.setRange(max, min);
      this.versorgungsbeginnSelect.set('value', max);
    }

  });

});
