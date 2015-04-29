define([
  'dojo/_base/declare',
  'shared/_PageBase',
  'dojo/text!./templates/PageVergleich.html',

  './VergleichTable'
], function(
  declare,
  _PageBase,
  template
) {

  return declare(_PageBase, {

    templateString: template

  });

});
