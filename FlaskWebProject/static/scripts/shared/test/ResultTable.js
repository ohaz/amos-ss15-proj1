require([
  'dojo/parser',
  'dijit/_base/manager',
  'shared/widgets/ResultTable',
  'dojo/domReady!'
], function(
  parser,
  dijitManager
) {

  var resultTable, testData;

  parser.parse();
  resultTable = dijitManager.byId('resultTable');

  testData = [
    [5, 123.456],
    [6, 123.456],
    [7, 123.456],
    [8, 123.456],
    [9, 123.456]
  ];

  resultTable.set('values', testData);

  console.log(resultTable);

});
