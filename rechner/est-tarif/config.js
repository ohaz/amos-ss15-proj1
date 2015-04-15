define(function () {

  var DATEV = {};

  DATEV.constants = {
    VERANLAGUNGSFORM_EINZEL: 0,
    VERANLAGUNGSFORM_ZUSAMMEN: 1
  };

  DATEV.values = {
    zve: {
      value: 36000,
      min: 1,
      max: 99999999
    },
    veranlagungsjahr: {
      value: 2015,
      min: 2011,
      max: 2015
    },
    veranlagungsform: {
      value: DATEV.constants.VERANLAGUNGSFORM_EINZEL
    },
    zve_schrittweite: {
      value: 1000,
      min: 0,
      max: 99999999
    }
  };

  return DATEV;

});
