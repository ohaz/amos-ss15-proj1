define([
  'require',
  'dojo/_base/Deferred'
], function(
  require,
  Deferred
) {

  return function(rechnerId, values, clearStore) {
    var deferred;

    values = values || {};
    deferred = new Deferred();

    require([
      'dojo/has',
      'shared/utils/XWindowMessenger',
      'shared/store/LocalStorage',
      [rechnerId, 'rechner', 'Calculator'].join('/'),
      [rechnerId, 'rechner', 'Connector'].join('/'),
      'shared/env' // populates has('localStorage')
    ], function(
      has,
      Messenger,
      Store,
      Calculator,
      Connector
    ) {

      if (clearStore && has('localStorage')) {
        localStorage.clear();
      }

      var messenger = new Messenger();
      var calculator = new Calculator();
      var store = new Store();
      var rechner = new Connector(messenger, calculator, store, values);

      deferred.resolve(rechner);
    });

    return deferred;
  };

});
