define(function () {

  var DATEV = {};

  DATEV.constants = {
    // Berechnungsmodus
    BERECHNUNG_LAUFZEIT: 1,
    BERECHNUNG_TILGUNGSSATZ: 0,
    BERECHNUNG_BETRAG: 2,

    // Zahlungsweise
    ZAHLUNG_JAEHRLICH: 1,
    ZAHLUNG_HALBJAEHRLICH: 2,
    ZAHLUNG_VIERTELJAEHRLICH: 4,
    ZAHLUNG_MONATLICH: 12
  };

  DATEV.values = {
    berechnungsart: DATEV.constants.BERECHNUNG_TILGUNGSSATZ,
    zahlungsturnus: DATEV.constants.ZAHLUNG_JAEHRLICH,

    darlehensbetrag: {
      value: 50000,
      min: 1.00,
      max: 99999999
    },
    restschuld_jahr_schrittweite: {
      value: 1,
      min: 1,
      max: 5
    },
    restschuld_jahr_start: {
      value: 5,
      min: 1,
      max: 30
    },
    teilbetrag_jahr_schrittweite: {
      value: 1,
      min: 1,
      max: 5
    },
    teilbetrag_jahr_start: {
      value: 5,
      min: 1,
      max: 20
    },
    teilbetrag_restschuld: {
      value: 15000,
      min: 0,
      max: 99999998
    },
    vorgegebene_annuitaet: {
      value: 15000,
      min: 1,
      max: 99999999
    },
    vorgegebene_annuitaet_schrittweite: {
      value: 1000,
      min: 0,
      max: 500
    },
    vorgegebene_laufzeit: {
      value: 5,
      min: 1,
      max: 99
    },
    vorgegebene_laufzeit_schrittweite: {
      value: 1,
      min: 1,
      max: 5
    },
    vorgegebener_tilgungssatz: {
      value: 1.5,
      min: 0.1,
      max: 99.99
    },
    vorgegebener_tilgungssatz_schrittweite: {
      value: 0.1,
      min: 0.00,
      max: 9.99
    },
    zinssatz: {
      value: 5,
      min: 0.01,
      max: 20.00
    },
    zinssatz_schrittweite: {
      value: 0.1,
      min: 0.00,
      max: 9.99
    }
  };

  return DATEV;

});
