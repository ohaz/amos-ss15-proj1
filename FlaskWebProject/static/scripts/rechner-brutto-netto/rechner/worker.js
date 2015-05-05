importScripts('../../shared/config.js', '../../shared/require.js');

require({
  baseUrl: '../../',
  paths: {
    'dojo': 'dojotoolkit/dojo'
  }
}, [
  'shared/setupWorker',
  'rechner/brutto-netto/calc'
], function(
  setupWorker,
  calc
  ) {

  setupWorker(calc);

});
