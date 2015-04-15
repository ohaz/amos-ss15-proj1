define([
  'dojo/_base/declare',
  'shared/_PageBase',
  'dojo/text!./templates/PageIndexIphone.html',

  './InputMain',
  'shared/widgets/Link'
], function(
  declare,
  _PageBase,
  template
) {

  return declare(_PageBase, {

    templateString: template,

    startup: function() {
      this.rechner.initValues();
      this.rechner.updateResult();
      this.inherited(arguments);
    }

  });

});
