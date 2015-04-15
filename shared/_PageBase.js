define([
  'dojo/_base/declare',
  'dojo/has',
  'shared/_WidgetBase',
  'shared/utils/noClickDelay'
], function(
  declare,
  has,
  _WidgetBase,
  noClickDelay
) {

  return declare(_WidgetBase, {

    startup: function(omitNoClickDelay) {
      this.inherited(arguments);
      if (!omitNoClickDelay) {
        noClickDelay();
      }
      if (!has('env-production')) {
        var meta = document.querySelector('meta[name=viewport]');
        meta.setAttribute('content', 'initial-scale=1.0');
      }
    },

    onChange: function() {
      if (this._started) {
        this.rechner.updateResult();
      }
    }

  });

});
