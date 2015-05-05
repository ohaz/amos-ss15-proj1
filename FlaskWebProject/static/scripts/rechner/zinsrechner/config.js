define(function () {

  var DATEV = {};

  DATEV.constants = {
    PERIODENTYP_JAHR: 0,
    PERIODENTYP_QUARTAL: 1,
    PERIODENTYP_MONAT: 2,
    PERIODENTYP_TAG: 3
  };

  DATEV.values = {
    periodentyp: {
      value: DATEV.constants.PERIODENTYP_JAHR
    },
    zinssatz: {
      value: 12,
      min: 0.00,
      max: 999.00
    },
    periodenanzahl: {
      value: 3,
      min: 0,
      max: 999
    },
    zinssatzSchrittweite: {
      value: 0.1,
      min: 0.00,
      max: 999.00
    },
    periodenSchrittweite: {
      value: 1,
      min: 0,
      max: 999
    }
  };

  return DATEV;

});
