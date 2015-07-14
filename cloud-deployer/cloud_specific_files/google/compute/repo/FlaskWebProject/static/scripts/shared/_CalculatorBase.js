define([
  'dojo/_base/declare',
  'dojo/_base/connect',
  'shared/_SharedWorker'
], function(
  declare,
  connect,
  _SharedWorker
) {

  return declare(null, {

    constructor: function() {
      this.worker = new _SharedWorker(this.workerPath);
      connect.connect(this.worker, 'onMessage', this, 'onMessage');
    },

    onMessage: function(data) {
      if (data.status === 'error') {
        console.error(data.error);
        return;
      }

      this.onResult(data.result);
    },

    onResult: function(result) {
    },

    updateResult: function(data) {
      console.log('input: ', data);
      this.worker.post(data);
    }

  });

});
