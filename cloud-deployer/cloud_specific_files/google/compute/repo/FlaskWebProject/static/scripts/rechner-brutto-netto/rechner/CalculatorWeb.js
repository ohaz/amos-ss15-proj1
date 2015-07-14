define([
  'dojo/_base/declare',
  'rechner/brutto-netto/calc'
], function(
  declare,
  calc
) {

  return declare(null, {

    updateResult: function(inputObject) {
      this.onResult(calc(inputObject));
    },

    onResult: function(result) {
    }

  });

});
