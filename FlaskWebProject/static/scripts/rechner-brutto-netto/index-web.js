require([
  'dojo/_base/window',
  'dojo/_base/Deferred',
  'shared/rechnerFactoryWeb',
  'rechner/brutto-netto/config',
  'shared/widgets/AppController',
  'dojo/domReady!'
], function(
  window,
  Deferred,
  rechnerFactory,
  config,
  AppController
) {

  var packageName = 'rechner-brutto-netto';

  function init(rechner) {
    var appController = new AppController({
      config: config,
      rechner: rechner,
      packageName: packageName,
      initialPage: 'PageIndexIphone'
    });
    appController.placeAt(window.body());
    appController.startup();
  }

  var rechner = rechnerFactory(packageName, config.values);
  Deferred.when(rechner, init);

});
