define(function () {

  var DATEV = {};

  DATEV.constants = {
    // Lohnzahlungszeitraum
    LZZ_JAEHRLICH: 1,
    LZZ_MONATLICH: 2,
    LZZ_WOECHENTLICH: 3,
    LZZ_TAEGLICH: 4,

    // Steuerklassen
    STEUERKLASSE_I: 1,
    STEUERKLASSE_II: 2,
    STEUERKLASSE_III: 3,
    STEUERKLASSE_IV: 4,
    STEUERKLASSE_V: 5,
    STEUERKLASSE_VI: 6,

    // Bundesländer
    BADEN_WUERTTEMBERG: 1,
    BAYERN: 2,
    BERLIN: 3,
    BRANDENBURG: 4,
    BREMEN: 5,
    HAMBURG: 6,
    HESSEN: 7,
    MECKLENBURG_VORPOMMERN: 8,
    NIEDERSACHSEN: 9,
    NORDRHEIN_WESTFALEN: 10,
    RHEINLAND_PFALZ: 11,
    SAARLAND: 12,
    SACHSEN: 13,
    SACHSEN_ANHALT: 14,
    SCHLESWIG_HOLSTEIN: 15,
    THUERINGEN: 16,

    // Rückgabewert Steuerkl.-Vergleich
    TYP_III_V: 0,
    TYP_V_III: 1,
    TYP_IV_IV: 2,
    TYP_IV_IV_FAKTOR: 3
  },

  DATEV.values = {
    brutto_oder_netto: {
      value: true
    },

    rv_pflicht_1: {
      value: true
    },
    rv_pflicht_2: {
      value: true
    },
    ks_pflicht_1: {
      value: true
    },
    ks_pflicht_2: {
      value: true
    },
    gesetzliche_kv_1: {
      value: true
    },
    gesetzliche_kv_2: {
      value: true
    },
    zuschlag_gesetzliche_kv_1: {
      value: false
    },
    zuschlag_gesetzliche_kv_2: {
      value: false
    },
    zuschuss_private_kv_1: {
      value: false
    },
    zuschuss_private_kv_2: {
      value: false
    },

    lohnzahlzeitraum: {
      value: DATEV.constants.LZZ_MONATLICH
    },
    steuerklasse_1: {
      value: DATEV.constants.STEUERKLASSE_I
    },
    steuerklasse_2: {
      value: DATEV.constants.STEUERKLASSE_I
    },
    arbeitsstaette_1: {
      value: DATEV.constants.BAYERN
    },
    arbeitsstaette_2: {
      value: DATEV.constants.BAYERN
    },

    veranlagungsjahr: {
      value: 2015,
      min: 2011,
      max: 2015
    },
    faktor: {
      value: 1,
      min: 0,
      max: 1
    },
    bruttolohn_1: {
      value: 3000,
      min: 0,
      max: 999999
    },
    bruttolohn_2: {
      value: 3000,
      min: 0,
      max: 999999
    },
    nettolohn_1: {
      value: 0,
      min: 0,
      max: 499999
    },
    nettolohn_2: {
      value: 0,
      min: 0,
      max: 499999
    },
    alter_1: {
      value: 30,
      min: 1,
      max: 99
    },
    alter_2: {
      value: 30,
      min: 0,
      max: 99
    },
    kinderfreibetrag_1: {
      value: 0,
      min: 0,
      max: 15
    },
    kinderfreibetrag_2: {
      value: 0,
      min: 0,
      max: 15
    },
    beitrag_private_kv_1: {
      value: 0,
      min: 0,
      max: 99999
    },
    beitrag_private_kv_2: {
      value: 0,
      min: 0,
      max: 99999
    },

    versorgungsbezuege_1: {
      value: 0,
      min: 0,
      max: 99999
    },
    versorgungsbezuege_2: {
      value: 0,
      min: 0,
      max: 99999
    },
    freibetrag_1: {
      value: 0,
      min: 0,
      max: 50000
    },
    freibetrag_2: {
      value: 0,
      min: 0,
      max: 50000
    },
    hinzurechnungsbetrag_1: {
      value: 0,
      min: 0,
      max: 50000
    },
    hinzurechnungsbetrag_2: {
      value: 0,
      min: 0,
      max: 50000
    },
    versorgungsbeginn: {
      min: 2005
    },
    
    zusatzbeitragssatz_1: {
    	value: 0.90,
    	min: 0.01,
    	max: 99.99
    },
    zusatzbeitragssatz_2: {
    	value: 0.90,
    	min: 0.01,
    	max: 99.99
    }
  };

  return DATEV;

});
