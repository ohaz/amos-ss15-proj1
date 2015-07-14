define(function () {

  var DATEV = {};

  DATEV.constants = {
    GESELLSCHAFTSFORM_KAPITALGESELLSCHAFT: 0,
    GESELLSCHAFTSFORM_ANDERE: 1
  };

  DATEV.values = {
    gesellschaftsform_4: DATEV.constants.GESELLSCHAFTSFORM_KAPITALGESELLSCHAFT,

    gemeinde_index: {
      value: -1
    },
    berechnungsjahr_2: {
      value: 2015,
      min: 2011,
      max: 2015
    },
    hebesatz_6: {
      value: 0,
      min: 0,
      max: 999
    },
    ergebnis_gewst_8: {
      value: 0,
      min: 1,
      max: 99999999
    },
    vorauszahlungen_10: {
      value: 0,
      min: 0,
      max: 99999999
    },
    hinzurechnungen_12: {
      value: 0,
      min: 0,
      max: 9999999
    },
    kuerzungen_14: {
      value: 0,
      min: 0,
      max: 99999999
    },
    einstellungen_gewerbeertrag_schritt_2: {
      value: 50,
      min: 0,
      max: 9999999
    },
    einstellungen_hebesatz_schritt_4: {
      value: 5,
      min: 0,
      max: 999
    }
  };

  return DATEV;

});
