require([
  'dojo/_base/window',
  'dojo/_base/Deferred',
  'shared/rechnerFactory',
  'rechner/brutto-netto/config',
  'rechner-brutto-netto/widgets/PageDetails'
], function(
  window,
  Deferred,
  rechnerFactory,
  config,
  Page
) {

  function init(rechner) {
    var page = new Page({config: config, rechner: rechner});
    page.placeAt(window.body());
    page.startup();
  }

  var rechner = rechnerFactory('rechner-brutto-netto', config.values);
  Deferred.when(rechner, init);

});
