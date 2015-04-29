var clients = [];

self.onconnect = function(event) {
  var port = event.ports[0];
  clients.push(port);

  port.onmessage = function(msg) {
    for (var i = 0; i < clients.length; i++) {
      if (clients[i] && clients[i] !== port) {
        clients[i].postMessage(msg.data);
      }
    }
  };
};

if (typeof sw.readyToConnect === 'function') {
  sw.readyToConnect();
}
