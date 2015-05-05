define([
  "./config"
], function (
  config
) {

  var constants,
      labels;

  constants = config.constants || {};

  labels = {
    periodentyp: {},
    laufzeit: {},
    anzahlInLaufzeit: {}
  };

  labels.periodentyp[constants.PERIODENTYP_JAHR] = "Jahren";
  labels.periodentyp[constants.PERIODENTYP_QUARTAL] = "Quartalen";
  labels.periodentyp[constants.PERIODENTYP_MONAT] = "Monaten";
  labels.periodentyp[constants.PERIODENTYP_TAG] = "Tagen";

  labels.laufzeit[constants.PERIODENTYP_JAHR] = "Laufzeit in Jahren";
  labels.laufzeit[constants.PERIODENTYP_QUARTAL] = "Laufzeit in Quartalen";
  labels.laufzeit[constants.PERIODENTYP_MONAT] = "Laufzeit in Monaten";
  labels.laufzeit[constants.PERIODENTYP_TAG] = "Laufzeit in Tagen";

  labels.anzahlInLaufzeit[constants.PERIODENTYP_JAHR] = "Anzahl Jahre";
  labels.anzahlInLaufzeit[constants.PERIODENTYP_QUARTAL] = "Anzahl Quartale";
  labels.anzahlInLaufzeit[constants.PERIODENTYP_MONAT] = "Anzahl Monate";
  labels.anzahlInLaufzeit[constants.PERIODENTYP_TAG] = "Anzahl Tage";

  return {
    getLabel: function (key) {
      var label = labels[key] || {};
      return function (value) {
        return label[value] || "";
      };
    }
  };

});
