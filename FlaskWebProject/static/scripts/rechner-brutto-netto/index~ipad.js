require([
  'dojo/_base/window',
  'dojo/_base/Deferred',
  'shared/rechnerFactory',
  'rechner/brutto-netto/config',
  'rechner-brutto-netto/widgets/PageIndexIpad'
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

  var rechner = rechnerFactory('rechner-brutto-netto', config.values, true /* clearStore */);
  Deferred.when(rechner, init);

});
