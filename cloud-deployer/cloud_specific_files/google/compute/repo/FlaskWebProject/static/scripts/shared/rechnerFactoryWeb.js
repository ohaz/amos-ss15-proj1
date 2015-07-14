define([
  'require',
  'dojo/_base/Deferred'
], function(
  require,
  Deferred
) {

  return function(rechnerId, values) {
    var deferred;

    values = values || {};
    deferred = new Deferred();

    require([
      'shared/utils/SimpleMessenger',
      'dojo/store/Memory',
      [rechnerId, 'rechner', 'CalculatorWeb'].join('/'),
      [rechnerId, 'rechner', 'Connector'].join('/')
    ], function(
      Messenger,
      Store,
      Calculator,
      Connector
    ) {

      var messenger = new Messenger();
      var calculator = new Calculator();
      var store = new Store();
      var rechner = new Connector(messenger, calculator, store, values);

      deferred.resolve(rechner);
    });

    return deferred;
  };

});
