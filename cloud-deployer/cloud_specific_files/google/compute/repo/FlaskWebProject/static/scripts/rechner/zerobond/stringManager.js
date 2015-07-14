define([
  "./config"
], function (
  config
) {

  var constants,
    labels;

  constants = config.constants || {};

  labels = {
    berechnungsmodus: {},
    hint: {},
    ergebnismodus: {}
  };

  labels.berechnungsmodus[constants.BERECHNUNG_KAUFKURS] = "Emissionskurs";
  labels.berechnungsmodus[constants.BERECHNUNG_RENDITE] = "Rendite in % p.a.";

  labels.hint[constants.BERECHNUNG_KAUFKURS] = "Wie viel darf ein Zero-Bond kosten?";
  labels.hint[constants.BERECHNUNG_RENDITE] = "Wie hoch ist die Rendite?";

  labels.ergebnismodus[constants.BERECHNUNG_KAUFKURS] = "Rendite in % p.a.";
  labels.ergebnismodus[constants.BERECHNUNG_RENDITE] = "Emissionskurs";

  return {
    getLabel: function (key) {
      var label = labels[key] || {};
      return function (value) {
        return label[value] || "";
      };
    }
  };

});
