define(function () {

  var DATEV = {};

  DATEV.constants = {
    PACKAGE_NAME: 'rechner-barendwert',

    // Berechnungsmodus
    BERECHNUNG_BARWERT: 0,
    BERECHNUNG_ENDWERT: 1,

    // Zahlungsweise
    ZAHLUNG_JAEHRLICH: 0,
    ZAHLUNG_MONATLICH: 1,
    ZAHLUNG_EINMALIG: 2,

    // Zahl der Spalten in Ergebnisansicht auf iPhone
    PHONE_COLUMNS_PER_ROW: 3
  };

  DATEV.values = {
    barendwert: {
      value: DATEV.constants.BERECHNUNG_BARWERT
    },
    betrag: {
      value: 50000,
      min: 1,
      max: 999999
    },
    zeitraum: {
      value: DATEV.constants.ZAHLUNG_JAEHRLICH
    },
    zinssatz: {
      value: 3.0,
      min: 0.01,
      max: 10
    },
    laufzeit: {
      value: 10,
      min: 1,
      max: 30
    },
    zinsschritt: {
      value: 1.00,
      min: 0.01,
      max: 3
    },
    laufzeitschritt: {
      value: 1,
      min: 1,
      max: 5
    }
  };

  return DATEV;

});