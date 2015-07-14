define(function () {

  var DATEV = {};

  DATEV.constants = {
    BERECHNUNGSZIEL_JAHR: 0,
    BERECHNUNGSZIEL_ZEITRAUM: 1,
    BERECHNUNGSZIEL_STARTTERMIN: 2,
    BERECHNUNGSZIEL_ENDTERMIN: 3,

    KONFESSION_KEINE: 1,
    KONFESSION_KATHOLISCH: 2,
    KONFESSION_PROTESTANTISCH: 3,

    BUNDESLAND_BRANDENBURG: 1,
    BUNDESLAND_BERLIN: 2,
    BUNDESLAND_BADEN_WUERTTEMBERG: 3,
    BUNDESLAND_BAYERN: 4,
    BUNDESLAND_BREMEN: 5,
    BUNDESLAND_HESSEN: 6,
    BUNDESLAND_HAMBURG: 7,
    BUNDESLAND_MECKLENBURG_VORPOMMERN: 8,
    BUNDESLAND_NIEDERSACHSEN: 9,
    BUNDESLAND_NORDRHEIN_WESTFALEN: 10,
    BUNDESLAND_RHEINLAND_PFALZ: 11,
    BUNDESLAND_SCHLEWSIG_HOLSTEIN: 12,
    BUNDESLAND_SAARLAND: 13,
    BUNDESLAND_SACHSEN: 14,
    BUNDESLAND_SACHSEN_ANHALT: 15,
    BUNDESLAND_THUERINGEN: 16
  };

  DATEV.values = {
    berechnungsziel: DATEV.constants.BERECHNUNGSZIEL_JAHR,
    bundesland: DATEV.constants.BUNDESLAND_BAYERN,
    konfession: DATEV.constants.KONFESSION_KEINE,

    starttermin: new Date(),
    endtermin: new Date((new Date()
      .getTime()) + (24 * 60 * 60 * 1000)),

    berechnungsjahr: {
      value: 2015,
      min: 2009,
      max: 2016
    },
    projektdauer: {
      value: 1,
      min: 0,
      max: 9999
    },
    abzuegeInTagen: {
      value: 1,
      min: 0,
      max: 9999
    },
    abzuegeInProzent: {
      value: 0.00,
      min: 0.00,
      max: 99.00
    },
    personenzahl: {
      value: 1,
      min: 0,
      max: 999
    },
    personenzahl_schrittweite: {
      value: 1,
      min: 0,
      max: 999
    }
  };

  return DATEV;

});
