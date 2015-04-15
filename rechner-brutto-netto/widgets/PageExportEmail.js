define([
  'dojo/_base/declare',
  'shared/_PageBase',
  'dojo/text!./templates/PageExportEmail.html',

  'shared/widgets/NumberOutput',
  'shared/widgets/Output',
  './DetailsTable',
  './InputMain',
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
