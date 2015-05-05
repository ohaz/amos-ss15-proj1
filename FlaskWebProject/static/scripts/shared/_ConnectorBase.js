define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/connect',
  'dojo/_base/array',
  'dojo/Stateful',
  'dojo/on'
], function(
  declare,
  lang,
  connect,
  array,
  Stateful,
  on
) {

  function clampValue(value, min, max) {
    if (min != null) {
      value = Math.max(value, min);
    }
    if (max != null) {
      value = Math.min(value, max);
    }

    return isNaN(value) ? min : value;
  }


  var _bind = lang.hitch;

  return declare(null, {

    constructor: function(messenger, calculator, store, values) {
      this.messenger = messenger;
      this.calculator = calculator;
      this.store = store;
      this.values = values || {};
      this.stateful = new Stateful();

      on(this.messenger, 'updateValue', _bind(this, 'onUpdateValue'));
      connect.connect(this.calculator, 'onResult', this, 'onResult');
    },

    initValues: function() {
      var values = this.values,
          prop;

      for (prop in values) {
        this.set(prop, this._getDefault(prop));
      }
    },

    get: function(key) {
      return this._get(key);
    },

    set: function(key, value) {
      if (value === undefined) {
        value = this._getDefault(key);
      }
      this._set(key, value);
    },

    watch: function(name, callback) {
      return this.stateful.watch(name, callback);
    },

    watchInputs: function(propArray, method, context) {
      context = context || this;
      array.forEach(propArray, function(prop) {
        this.watch(prop, _bind(context, method));
      }, this);
    },

    _get: function(key) {
      var entry = this.store.get(key);
      return entry ? entry.value : this._getDefault(key);
    },

    _set: function(key, value) {
      var validValue;

      validValue = this.makeValid(key, value);

      this.store.put({
        id: key,
        value: validValue
      });
      this.stateful.set(key, validValue);
      this.messenger.publish('updateValue', key);
    },

    makeValid: function(key, value) {
      var range;

      if (typeof value === 'string' && value != Number(value) ||
          typeof value === 'object' && value !== null) {
        return value;
      }

      range = typeof this.values[key] === 'object' ?
        this.values[key] :
        {};

      return clampValue(value, range.min, range.max);
    },

    onUpdateValue: function(key) {
      this.stateful.set(key, this.get(key));
    },

    onResult: function(result) {
      console.log('output: ', result);
    },

    updateResult: function() {
    },

    _getDefault: function(key) {
      var values = this.values;

      if (values.hasOwnProperty(key)) {
        if (values[key].value != undefined) {
          return values[key].value;
        } else {
          return values[key];
        }
      } else {
        return undefined;
      }
    }

  });
});
