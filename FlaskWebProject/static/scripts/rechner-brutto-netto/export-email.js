require([
  'dojo/_base/window',
  'dojo/_base/Deferred',
  'shared/rechnerFactory',
  'shared/appFrame',
  'rechner/brutto-netto/config',
  'rechner-brutto-netto/widgets/PageExportEmail',
  'dojo/domReady!'
], function(
  window,
  Deferred,
  rechnerFactory,
  appFrame,
  config,
  Page
  ) {

  function init(rechner) {
    var page = new Page({config: config, rechner: rechner});
    page.placeAt(window.body());
    page.startup();
    appFrame.send('ready');
  }

  var rechner = rechnerFactory('rechner-brutto-netto', config.values);
  Deferred.when(rechner, init);

});
