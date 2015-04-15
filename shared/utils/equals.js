define([
  './type'
], function(
  type
) {

  return function equals(a, b) {
    var i,
        prop,
        properties;

    if (a === b) {
      return true;
    }

    if (typeof a !== typeof b) {
      return false;
    }

    if (type.isFunction(a) && type.isFunction(b) && a.toString() === b.toString()) {
      return true;
    }

    if (type.isArray(a) && type.isArray(b) && a.length === b.length) {
      for (i = 0; i < a.length; i += 1) {
        if (!equals(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }

    if (type.isObject(a) && type.isObject(b)) {
      properties = [];
      for (prop in a) {
        properties.push(prop)
      }
      for (prop in b) {
        properties.push(prop)
      }
      for (i = 0; i < properties.length; i += 1) {
        prop = properties[i];
        if (!equals(a[prop], b[prop])) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

});
