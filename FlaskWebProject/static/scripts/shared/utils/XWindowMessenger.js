define([
  'require',
  'dojo/_base/declare',
  'dojo/_base/connect',
  'dojo/Evented',
  'shared/_SharedWorker'
], function(
  require,
  declare,
  connect,
  Evented,
  _SharedWorker
) {

  return declare([
    Evented
  ], {

    constructor: function() {
      var path = require.toUrl('.');

      this.worker = new _SharedWorker(path + '/workers/messagebus.js');
      connect.connect(this.worker, 'onMessage', this, 'onMessage');
    },

    onMessage: function(data) {
      this.emit(data.type, data.data);
    },

    publish: function(type, data) {
      this.worker.post({
        type: type,
        data: data
      });
    }

  });

});
