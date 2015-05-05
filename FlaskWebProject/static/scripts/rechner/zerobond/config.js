define(function () {

  var DATEV = {};

  DATEV.constants = {
    // Berechnungsmodus
    BERECHNUNG_KAUFKURS: 1,
    BERECHNUNG_RENDITE: 0
  };

  DATEV.values = {
    zerobond: {
      //Wertebereich: BERECHNUNG_KAUFKURS, BERECHNUNG_RENDITE
      value: DATEV.constants.BERECHNUNG_KAUFKURS
    },
    laufzeit: {
      value: 10,
      min: 1,
      max: 99
    },
    emission_rendite: {
      value: 10,
      min: 0.00,
      max: 100.00
    },
    laufzeit_schritt: {
      value: 1,
      min: 1,
      max: 5
    },
    emission_rendite_schritt: {
      value: 0.1,
      min: 0.00,
      max: 10.00
    }
  };

  return DATEV;

});
