define(function() {

  var clients = [];

  function makeConnectListener(fn) {
    return function(event) {
      var port = event.ports[0];
      clients.push(port);
      port.onmessage = makeMessageListener(port, fn);
    };
  }

  function makeMessageListener(port, fn) {
    return function(msg) {
      port.postMessage({
        status: 'success',
        result: fn(msg.data)
      });
    };
  }

  function errorHandler(message, filename, lineno) {
    var i, len;

    for (i = 0, len = clients.length; i < len; i += 1) {
      clients[i].postMessage({
        status: 'error',
        error: {
          message: message,
          filename: filename,
          lineno: lineno
        }
      });
    }
  };
  self.onerror = errorHandler;

  return function(fn) {
    if (typeof fn === 'function') {
      self.onconnect = makeConnectListener(fn);
    }
    if (typeof sw.readyToConnect === 'function') {
      sw.readyToConnect();
    }
  };

});
