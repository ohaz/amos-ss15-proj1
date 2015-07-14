define(function() {

  var DATEV = {};

  DATEV.constants = {
    BEPZIEL_STANDARD: 0,
    BEPZIEL_STUECKKOSTEN: 1,
    BEPZIEL_FIXKOSTENPROZ: 2,
    BEPZIEL_DB: 3,
    BEPZIEL_BEP: 4,
    BEPZIEL_GESAMTKOSTEN: 5,
    BEPZIEL_UMSATZERLOESE: 6,
    BEPZIEL_ERGEBNIS: 7,

    BEPVAR_VARKOSTEN: 1,
    BEPVAR_FIXKOSTEN: 2,
    BEPVAR_ABSATZMENGE: 3,
    BEPVAR_VKPREIS: 4,

    BEPERROR_NOERROR: 0,
    BEPERROR_ITERATION: 1,        // Grenzwert-Problematik bei der Iteration
    BEPERROR_NOTFOUND: 2,
    BEPERROR_BELOWZERO: 3,        // Abhängige Variable wäre unter Null
    BEPERROR_BEPNOTEXACT: 4
  };

  DATEV.values = {
   berechnungsart: DATEV.constants.BEPZIEL_STANDARD,
   veraenderliche_groese: DATEV.constants.BEPVAR_VARKOSTEN,

    verkaufspreis: {
      value: 100.00,
      min: 0.01,
      max: 9999999.99
    },
    absatzmenge: {
      value: 1000,
      min: 1,
      max: 999999999
    },
    variable_kosten: {
      value: 20000,
      min: 1,
      max: 999999999
    },
    fixkosten: {
      value: 50000,
      min: 1,
      max: 999999999
    },

    fixkosten_in_prozent: {
      value: 71.43,
      min: 0.01,
      max: 99.99
    },
    stueckkosten: {
      value: 20.00,
      min: 0.01,
      max: 9999999.99
    },
    deckungsbeitrag: {
      value: 80,
      min: -9999999.99,
      max: 9999999.99
    },
    gewinnschwelle: {
      value: 625,
      min: -999999999,
      max: 999999999
    },

    umsatzerloese: {
      value: 100000,
      min: 1,
      max: 999999999.99
    },
    gesamtkosten: {
      value: 70000,
      min: 1,
      max: 999999999.99
    },
    ergebnis: {
      value: 30000,
      min: -999999999,
      max: 999999999
    }
  };

  return DATEV;

});
