define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/dom-class',
  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/_WidgetsInTemplateMixin',
  'dojo/Evented',
  'shared/connectProp',
  'shared/utils/equals'
], function(
  declare,
  lang,
  array,
  domClass,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  Evented,
  connectProp,
  equals
) {

  var _bind = lang.hitch;

  return declare([
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    Evented
  ], {

    constructor: function() {
      this._watchHandles = [];
    },

    startup: function() {
      var model = this.model,
          bindProp = this.bindProp;

      this.inherited(arguments);

      if (model && model.watch && bindProp) {
        connectProp(model, bindProp, this, 'value');
      }
    },

    _set: function(name, value) {
      var oldValue = this.get(name);
      if (!equals(oldValue, value)) {
        this.inherited(arguments);
      }
    },

    onChange: function() {
      this.emit('change');
    },

    watchProp: function(stateful, prop, method) {
      var handle = stateful.watch(prop, _bind(this, method));
      this._watchHandles.push(handle);
    },

    watchValue: function(stateful, prop, targetValue, method) {
      if (lang.isArray(targetValue)) {
        array.forEach(targetValue, function(watch) {
          this._watchValue(stateful, prop, watch.on, watch.call);
        }, this);
      } else {
        this._watchValue(stateful, prop, targetValue, method);
      }
    },

    _watchValue: function(stateful, prop, targetValue, method) {
      var callback,
          watcher,
          handle;

      callback = _bind(this, method);

      watcher = function(name, oldValue, newValue) {
        if (newValue === targetValue) {
          callback(newValue);
        }
      };

      this.watchProp(stateful, prop, watcher);

      if (stateful.get(prop) === targetValue) {
        callback(targetValue);
      }
    },

    detach: function() {
      var domNode = this.domNode;
      domNode.parentElement.removeChild(domNode);
    },

    destroy: function() {
      var handle;
      while (this._watchHandles.length > 0) {
        handle = this._watchHandles.pop();
        handle.unwatch();
      }
      this._watchHandles = null;
      this.inherited(arguments);
    },

    show: function() {
      domClass.remove(this.domNode, 'hidden');
    },

    hide: function() {
      domClass.add(this.domNode, 'hidden');
    }

  });

});
