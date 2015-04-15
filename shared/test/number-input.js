require({
  baseUrl: '../../'
}, [
  'dojo/on',
  'dijit/registry',
  'shared/env',
  'shared/widgets/NumberInput',
  'dojo/ready'
], function(
  on,
  registry,
  has,
  NumberInput,
  ready
) {

  ready(function() {

    var log = (function(doc) {
      var logNode = doc.getElementById('log');

      return function(message) {
        var p = doc.createElement('p');
        p.innerText = message;
        logNode.appendChild(p);
      };
    })(document);


    var input = registry.byId('testInput');
    var onChange = function() {
      var value = input.get('value');
      log('New value: ' + value + ' (' + typeof value + ')');
    };
    on(input, 'change', onChange);

//    input.set('value', 1234.567);


    var inputNode = document.createElement('input');

    log('Support für input type="number": ' + has('number-input'));
    log('Support für localizedNumber: ' + has('localizedNumber'));
    log('Support für input.setSelectionRange: ' + !!inputNode.setSelectionRange);
    log('node.value: ' + input.domNode.value);
    log('node.valueAsNumber: ' + input.domNode.valueAsNumber);


  });
});
