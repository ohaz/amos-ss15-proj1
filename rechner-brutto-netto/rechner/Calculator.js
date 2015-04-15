define([
  'require',
  'dojo/_base/declare',
  'shared/_CalculatorBase'
], function(
  require,
  declare,
  _CalculatorBase
) {

  var modulePath = require.toUrl('.');

  return declare([
    _CalculatorBase
  ], {

    workerPath: modulePath + '/worker.js'

  });

});
