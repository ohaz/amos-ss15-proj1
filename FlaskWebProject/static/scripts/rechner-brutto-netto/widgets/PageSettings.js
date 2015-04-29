define([
  'dojo/_base/declare',
  'shared/_PageBase',
  'dojo/text!./templates/PageSettings.html',

  './StPflSettings',
  'shared/widgets/NumberInput',
  'shared/widgets/TabContainer'
], function(
  declare,
  _PageBase,
  template
) {

  return declare(_PageBase, {

    templateString: template,

    postCreate: function() {
      if (this.tabIndex !== undefined) {
        this.tabContainer.selectTabByIndex(this.tabIndex);
      }

      this.watchProp(this.rechner, 'veranlagungsjahr', this.onVeranlagungsjahrChange);
      this._updateVeranlagungsjahr(this.rechner.get('veranlagungsjahr'));

      this.inherited(arguments);
    },

    onVeranlagungsjahrChange: function(name, oldValue, newValue) {
      this._updateVeranlagungsjahr(newValue);
    },

    _updateVeranlagungsjahr: function(veranlagungsjahr) {
      this.stPfl1Settings.set('versorgungsbeginnMax', veranlagungsjahr);
      this.stPfl2Settings.set('versorgungsbeginnMax', veranlagungsjahr);
    }

  });

});
