define([
  'dojo/number'
], function(
  number
) {

  var round = number.round,
      format = number.format,
      ret;

  ret = {
    format: function(value, places) {
      var rounded,
          formatted;

      value = Number(value) || 0;
      places = places || 0;

      rounded = round(value || 0, places);
      formatted = format(rounded, { places: places });

      return formatted;
    }
  };

  ret.format.withPlaces = function(places) {
    return function(value) {
      return ret.format(value, places);
    };
  };

  return ret;

});
