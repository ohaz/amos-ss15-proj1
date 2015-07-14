define([
  './BigDecimal'
], function (
  BigDecimal
) {

  return {
    ONE: new BigDecimal(1),
    ZERO: new BigDecimal(0),
    TEN: new BigDecimal(10),
    ROUND_DOWN: -1,
    ROUND_UP: 1,
    setScale: function (precision, roundType) {
      return setScaleImpl(this.value, precision, roundType);
    },
    valueOf: function (value) {
      return new BigDecimal(value);
    }
  };

});
