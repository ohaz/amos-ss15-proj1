define([
  'dojo/_base/declare',
  'dojo/_base/connect',
  './SimpleSelect',
  'dojo/text!./templates/ListSelect.html'
], function(
  declare,
  connect,
  SimpleSelect,
  template
) {

  return declare('shared.widgets.ListSelect', [
    SimpleSelect
  ], {

    templateString: template,

    _setLabelAttr: {
      node: 'labelNode',
      type: 'innerText'
    },
    _setSupplementalAttr: {
      node: 'supplementalNode',
      type: 'innerText'
    },

    constructor: function() {
      this.inherited(arguments);

      connect.connect(this, '_updateValue', this, '_updateSupplemental');
    },

    _updateSupplemental: function() {
      var selectedOption = this._getSelectedOption();
      this.set('supplemental', selectedOption ? selectedOption.text : '');
    }

  });

});
