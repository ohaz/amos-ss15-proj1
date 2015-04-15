define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/on',
  './SharedWorkerShim'
], function(
  declare,
  lang,
  on
) {

  return declare(null, {

    constructor: function(workerPath) {
      this.worker = new SharedWorker(workerPath);
      this._port = this.worker.port;

      on(this._port, 'message', lang.hitch(this, '_onMessage'));
      this._port.start();
    },

    onMessage: function(data) {},

    post: function(data) {
      this._port.postMessage(data);
    },

    _onMessage: function(e) {
      this.onMessage(e.data);
    }

  });

});
