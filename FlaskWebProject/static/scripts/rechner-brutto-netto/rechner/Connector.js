define([
  'rechner/brutto-netto/config',
  'dojo/_base/declare',
  'dojo/_base/lang',
  'shared/_ConnectorBase',
  'dojo/Stateful'
], function(
  config,
  declare,
  lang,
  _ConnectorBase,
  Stateful
) {

  var constants = config.constants;

  var _bind = lang.hitch,
      reStPfl1 = /_1$/,
      reStPfl2 = /_2$/;

  var StPfl = declare(Stateful, {

    constructor: function(propertyNotFound) {
      this._propertyNotFound = propertyNotFound;
    },

    get: function(key) {
      if (!(key in this)) {
        return this._propertyNotFound(key);
      } else {
        return this.inherited(arguments);
      }
    },

    set: function(key, value) {
      if (!(key in this) || this[key] !== value) {
        return this.inherited(arguments);
      }

      return this;
    }
  });

  return declare(_ConnectorBase, {

    constructor: function() {
      this.stPfl1 = new StPfl(_bind(this, this._getKeyWithExtension, '_1'));
      this.stPfl1.watch(_bind(this, this._onStPfl1Change));

      this.stPfl2 = new StPfl(_bind(this, this._getKeyWithExtension, '_2'));
      this.stPfl2.watch(_bind(this, this._onStPfl2Change));

      this.watchInputs(['gesetzliche_kv_1', 'gesetzliche_kv_2'], function() {
        var showPrivKvPv = !(this.get('gesetzliche_kv_1') &&
                             this.get('gesetzliche_kv_2'));
        this.set('showPrivKvPv', showPrivKvPv);
      }, this);

      this.watchInputs(['lohnzahlzeitraum'], this._updateLohnzahlungszeitraumString);
    },

    set: function(key, value) {
      this._set(key, value);
      this._updateStpfl(key);
    },

    onUpdateValue: function(key) {
      this.inherited(arguments);
      this._updateStpfl(key);
    },

    updateResult: function() {
      var veranlagungsjahr,
          versorgungsbeginn_1,
          versorgungsbeginn_2;

      veranlagungsjahr = this.get('veranlagungsjahr');
      versorgungsbeginn_1 = Math.min(this.get('versorgungsbeginn_1'), veranlagungsjahr) || veranlagungsjahr;
      versorgungsbeginn_2 = Math.min(this.get('versorgungsbeginn_2'), veranlagungsjahr) || veranlagungsjahr;

      this.calculator.updateResult({
        brutto_oder_netto: this.get('brutto_oder_netto'),

        veranlagungsjahr: veranlagungsjahr,
        lohnzahlzeitraum: this.get('lohnzahlzeitraum'), // (1, 2, 3 oder 4)
        faktor: this.get('faktor'),

        // Stpfl1 Eingaben
        steuerklasse_1: this.get('steuerklasse_1'),
        bruttolohn_1: this.get('bruttolohn_1'),
        nettolohn_1: this.get('nettolohn_1'),
        alter_1: this.get('alter_1'),
        hinzurechnungsbetrag_1: this.get('hinzurechnungsbetrag_1'),
        versorgungsbezuege_1: this.get('versorgungsbezuege_1'),
        versorgungsbeginn_1: versorgungsbeginn_1,
        freibetrag_1: this.get('freibetrag_1'),
        rv_pflicht_1: this.get('rv_pflicht_1'),
        ks_pflicht_1: this.get('ks_pflicht_1'),
        kinderfreibetrag_1: this.get('kinderfreibetrag_1'),
        arbeitsstaette_1: this.get('arbeitsstaette_1'),
        gesetzliche_kv_1: this.get('gesetzliche_kv_1'),
        zuschlag_gesetzliche_kv_1: this.get('zuschlag_gesetzliche_kv_1'),
        zusatzbeitragssatz_1: this.get('zusatzbeitragssatz_1'),
        beitrag_private_kv_1: this.get('beitrag_private_kv_1'),
        zuschuss_private_kv_1: this.get('zuschuss_private_kv_1'),

        // Stpfl2 Eingaben
        steuerklasse_2: this.get('steuerklasse_2'),
        bruttolohn_2: this.get('bruttolohn_2'),
        nettolohn_2: this.get('nettolohn_2'),
        alter_2: this.get('alter_2'),
        hinzurechnungsbetrag_2: this.get('hinzurechnungsbetrag_2'),
        versorgungsbezuege_2: this.get('versorgungsbezuege_2'),
        versorgungsbeginn_2: versorgungsbeginn_2,
        freibetrag_2: this.get('freibetrag_2'),
        rv_pflicht_2: this.get('rv_pflicht_2'),
        ks_pflicht_2: this.get('ks_pflicht_2'),
        kinderfreibetrag_2: this.get('kinderfreibetrag_2'),
        arbeitsstaette_2: this.get('arbeitsstaette_2'),
        gesetzliche_kv_2: this.get('gesetzliche_kv_2'),
        zuschlag_gesetzliche_kv_2: this.get('zuschlag_gesetzliche_kv_2'),
        zusatzbeitragssatz_2: this.get('zusatzbeitragssatz_2'),
        beitrag_private_kv_2: this.get('beitrag_private_kv_2'),
        zuschuss_private_kv_2: this.get('zuschuss_private_kv_2'),

        config: config
      });
    },

    onResult: function(result) {
      var stPfl_1 = result.bne[0],
          stPfl_2 = result.bne[1],
          skv = result.skv, // Steuerklassenvergleich
          stSumme_1,
          stSumme_2,
          svSumme_1,
          svSumme_2;

      stSumme_1 = stPfl_1.lohnsteuer +
        stPfl_1.solizuschlag +
        stPfl_1.kirchensteuer;

      svSumme_1 = stPfl_1.kv_beitrag +
        stPfl_1.pv_beitrag +
        stPfl_1.rv_beitrag +
        stPfl_1.av_beitrag +
        stPfl_1.beitrag_private_kv;

      this.set('bruttolohn_1', stPfl_1.bruttolohn);
      this.set('nettolohn_1', stPfl_1.nettolohn);

      this.set('bmg_kirchensteuer_1', stPfl_1.bmg_kirchensteuer);
      this.set('lohnsteuer_1', stPfl_1.lohnsteuer);
      this.set('solidaritaetszuschlag_1', stPfl_1.solizuschlag);
      this.set('kirchensteuer_1', stPfl_1.kirchensteuer);
      this.set('st_summe_1', stSumme_1);

      this.set('krankenversicherung_1', stPfl_1.kv_beitrag);
      this.set('pflegeversicherung_1', stPfl_1.pv_beitrag);
      this.set('beitrag_private_kv_1', stPfl_1.beitrag_private_kv);
      this.set('private_kvpv_1', stPfl_1.m_dprivate_kvpv_1);
      this.set('rentenversicherung_1', stPfl_1.rv_beitrag);
      this.set('arbeitslosenversicherung_1', stPfl_1.av_beitrag);
      this.set('sv_summe_1', svSumme_1);



      stSumme_2 = stPfl_2.lohnsteuer +
        stPfl_2.solizuschlag +
        stPfl_2.kirchensteuer;

      svSumme_2 = stPfl_2.kv_beitrag +
        stPfl_2.pv_beitrag +
        stPfl_2.rv_beitrag +
        stPfl_2.av_beitrag +
        stPfl_2.beitrag_private_kv;

      this.set('bruttolohn_2', stPfl_2.bruttolohn);
      this.set('nettolohn_2', stPfl_2.nettolohn);

      this.set('bmg_kirchensteuer_2', stPfl_2.bmg_kirchensteuer);
      this.set('lohnsteuer_2', stPfl_2.lohnsteuer);
      this.set('solidaritaetszuschlag_2', stPfl_2.solizuschlag);
      this.set('kirchensteuer_2', stPfl_2.kirchensteuer);
      this.set('st_summe_2', stSumme_2);

      this.set('krankenversicherung_2', stPfl_2.kv_beitrag);
      this.set('pflegeversicherung_2', stPfl_2.pv_beitrag);
      this.set('beitrag_private_kv_2', stPfl_2.beitrag_private_kv);
      this.set('private_kvpv_2', stPfl_2.m_dprivate_kvpv_2);
      this.set('rentenversicherung_2', stPfl_2.rv_beitrag);
      this.set('arbeitslosenversicherung_2', stPfl_2.av_beitrag);
      this.set('sv_summe_2', svSumme_2);


      // Steuerklassenvergleich
      /*
      skv: {
        faktor: 1
        skv_drei_fuenf: 1437.33
        skv_fuenf_drei: 1437.33
        skv_vier_vier: 1076.46
        skv_vier_vier_faktor: null
        vorteil: 1
      }
      */
      this.set('skv_faktor', skv.faktor);
      this.set('skv_drei_fuenf', skv.skv_drei_fuenf);
      this.set('skv_fuenf_drei', skv.skv_fuenf_drei);
      this.set('skv_vier_vier', skv.skv_vier_vier);
      this.set('skv_vier_vier_faktor', skv.skv_vier_vier_faktor);
      this.set('skv_vorteil', skv.vorteil);

      this.inherited(arguments);
    },

    _getDefault: function(key) {
      if (/versorgungsbeginn_/.test(key)) {
        return this.get('veranlagungsjahr');
      } else {
        return this.inherited(arguments);
      }
    },

    _onStPfl1Change: function(prop, oldValue, newValue) {
      this._setStPflValue(this.stPfl1, prop, '_1', newValue);
    },

    _onStPfl2Change: function(prop, oldValue, newValue) {
      this._setStPflValue(this.stPfl2, prop, '_2', newValue);
    },

    _setStPflValue: function(stateful, prop, propExt, value) {
      var fullProp,
          validValue,
          string;

      fullProp = prop + propExt;
      validValue = this.makeValid(fullProp, value);

      if (prop === 'steuerklasse') {
        string = '';

        switch (validValue) {
          case constants.STEUERKLASSE_I:
            string = 'I';
            break;

          case constants.STEUERKLASSE_II:
            string = 'II';
            break;

          case constants.STEUERKLASSE_III:
            string = 'III';
            break;

          case constants.STEUERKLASSE_IV:
            string = 'IV';
            break;

          case constants.STEUERKLASSE_V:
            string = 'V';
            break;

          case constants.STEUERKLASSE_VI:
            string = 'VI';
            break;
        }

        stateful.set('steuerklasseString', string);
      }

      if (value === validValue) {
        this._set(fullProp, validValue);
      } else {
        stateful.set(prop, validValue);
      }
    },

    _getKeyWithExtension: function(ext, key) {
      return this.get(key + ext);
    },

    _updateStpfl: function(key) {
      if (key.match(reStPfl1)) {
        this.stPfl1.set(key.replace(reStPfl1, ''), this.get(key));
      } else if (key.match(reStPfl2)) {
        this.stPfl2.set(key.replace(reStPfl2, ''), this.get(key));
      }
    },

    _updateLohnzahlungszeitraumString: function() {
      var label = '';

      switch (this.get('lohnzahlzeitraum')) {
        case constants.LZZ_JAEHRLICH:
          label = 'jährlich';
          break;

        case constants.LZZ_MONATLICH:
          label = 'monatlich';
          break;

        case constants.LZZ_WOECHENTLICH:
          label = 'wöchentlich';
          break;

        case constants.LZZ_TAEGLICH:
          label = 'täglich';
          break;
      }

      this.set('lohnzahlzeitraumString', label);
    }
  });

});
