define(function() {

  var toString = Object.prototype.toString;

  function isType(type, obj) {
    return toString.call(obj).toLowerCase() === '[object ' + type + ']';
  }

  return {
    isArray: function(obj) {
      return isType('array', obj);
    },

    isFunction: function(obj) {
      return isType('function', obj);
    },

    isObject: function(obj) {
      return isType('object', obj);
    }
  };

});
