define([
  "./config"
], function (
  config
) {

  var constants,
    labels;

  constants = config.constants || {};

  labels = {
    barendwert: {},
    hint: {},
    zeitraum: {},
    laufzeit: {},
    abloesebetrag: {}
  };

  labels.barendwert[constants.BERECHNUNG_BARWERT] = "Barwert";
  labels.barendwert[constants.BERECHNUNG_ENDWERT] = "Endwert";

  labels.hint[constants.BERECHNUNG_BARWERT] = "Wie hoch ist heute der Ablösebetrag für eine zukünftige Schuld oder Forderung?";
  labels.hint[constants.BERECHNUNG_ENDWERT] = "Wie hoch ist zukünftig der verzinste Betrag einer Zahlung?";

  labels.zeitraum[constants.ZAHLUNG_JAEHRLICH] = "jährlich";
  labels.zeitraum[constants.ZAHLUNG_MONATLICH] = "monatlich";
  labels.zeitraum[constants.ZAHLUNG_EINMALIG] = "einmalig";

  labels.laufzeit[constants.ZAHLUNG_JAEHRLICH] = "Laufzeit in Jahren";
  labels.laufzeit[constants.ZAHLUNG_MONATLICH] = "Laufzeit in Monaten";
  labels.laufzeit[constants.ZAHLUNG_EINMALIG] = "Laufzeit in Jahren";

  labels.abloesebetrag[constants.BERECHNUNG_BARWERT] = "Ablösebetrag";
  labels.abloesebetrag[constants.BERECHNUNG_ENDWERT] = "Endbetrag";

  return {
    getLabel: function (key) {
      var label = labels[key] || {};
      return function (value) {
        return label[value] || "";
      };
    }
  };

});
