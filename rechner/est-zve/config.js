define(function () {

  var DATEV = {};

  DATEV.constants = {
    VERANLAGUNGSFORM_EINZEL: 0,
    VERANLAGUNGSFORM_ZUSAMMEN: 1
  };

  DATEV.values = {
    Veranlagungsform: DATEV.constants.VERANLAGUNGSFORM_EINZEL,

    Veranlagungszeitraum: {
      value: 2015,
      min: 2011,
      max: 2015
    },
    Kirchensteuer: {
      value: 9.00,
      min: 0.00,
      max: 100.00
    },
    Sonderausgaben: {
      value: 0,
      min: 0,
      max: 99999999
    },
    ek_LuF: {
      value: 0,
      min: -99999999,
      max: 99999999
    },
    ek_Gewerbebetrieb: {
      value: 0,
      min: -99999999,
      max: 99999999
    },
    ek_Messbetrag: {
      value: 0,
      min: 0,
      max: 99999999
    },
    ek_SelbstArbeit: {
      value: 0,
      min: -99999999,
      max: 99999999
    },
    ek_NichtSelbstArbeit: {
      value: 0,
      min: -99999999,
      max: 99999999
    },
    ek_Kapital: {
      value: 0,
      min: -99999999,
      max: 99999999
    },
    ek_Vermietung: {
      value: 0,
      min: -99999999,
      max: 99999999
    },
    ek_Sonstiges: {
      value: 0,
      min: -99999999,
      max: 99999999
    }
  };

  return DATEV;

});
