define([
  'dojo/_base/declare',
  'shared/_PageBase',
  'dojo/text!./templates/PageDetails.html',

  './DetailsTable'
], function(
  declare,
  _PageBase,
  template
) {

  return declare(_PageBase, {

    templateString: template

  });

});
