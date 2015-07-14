define(function() {

  function ltrim(str) {
    if (str && typeof str.replace === 'function') {
      return str.replace(/^\s+/,'');
    } else {
      return str;
    }
  }

  function rtrim(str) {
    if (str && typeof str.replace === 'function') {
      return str.replace(/\s+$/,'');
    } else {
      return str;
    }
  }

  return {
    toCamelCase: function(str) {
      return str.replace(/(\-[a-z])/g, function($1) {
        return $1.toUpperCase().replace('-','');
      });
    },

    toDashed: function(str) {
      return str.replace(/([A-Z])/g, function($1) {
        return '-' + $1.toLowerCase();
      });
    },

    ltrim: ltrim,

    rtrim: rtrim,

    trim: function(str) {
      return ltrim(rtrim(str));
    }
  };

});
