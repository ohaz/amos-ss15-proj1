define(function () {

  return function BigDecimal(value) {
    //internal variables ==================================
    this.value = value;

    // internal functions =================================
    //valueOf(value)
    this.valueOf = function (value) {
      return new BigDecimal(value);
    };

    // internal class functions
    this.add = function (_bigdecimal) {
      return new BigDecimal(this.value + _bigdecimal.value);
    };

    this.subtract = function (_bigdecimal) {
      return new BigDecimal(this.value - _bigdecimal.value);
    };

    this.multiply = function (_bigdecimal) {
      return new BigDecimal(this.value * _bigdecimal.value);
    };

    this.divide = function (_bigdecimal, precision, roundType) {
      if (precision == undefined) {
        return new BigDecimal(this.value / _bigdecimal.value);
      }
      else {
        return this.setScaleImpl(this.value / _bigdecimal.value, precision, roundType);
      }
    };

    this.compareTo = function (_bigdecimal) {
      if (this.value > _bigdecimal.value) {
        return 1;
      }
      else if (this.value == _bigdecimal.value) {
        return 0;
      }
      else {
        return -1;
      }
    };

    this.setScale = function (precision, roundType) {
      return this.setScaleImpl(this.value, precision, roundType);
    };

    this.setScaleImpl = function (valueToScale, precision, roundType) {
      var i = 0;
      var res = valueToScale;
      var multiplikator = 1;
      while (i++ < precision) {
        multiplikator *= 10;
      }

      var ret = 0;
      var floor = Math.floor(res);
      var modulo = res % floor;
      if (modulo == 1) {
        ret = floor;
      }
      else {
        if (roundType < 0) {
          ret = (Math.floor(res * multiplikator)) / multiplikator;
        }
        else {
          ret = (Math.floor(res * multiplikator) + 1) / multiplikator;;
        }
      }

      return new BigDecimal(ret);

    };
  };
});
