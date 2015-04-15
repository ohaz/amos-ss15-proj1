define([
  "./config"
], function (
  config
) {
  var constants,
    labels;

  constants = config.constants || {};

  labels = {
    bundesland: {},
    lohnzahlzeitraum: {},
    steuerklasse: {},
    steuerklasseVorteil: {}
  };

  labels.bundesland[constants.BADEN_WUERTTEMBERG] = "Baden Württemberg";
  labels.bundesland[constants.BAYERN] = "Bayern";
  labels.bundesland[constants.BERLIN] = "Berlin";
  labels.bundesland[constants.BRANDENBURG] = "Brandenburg";
  labels.bundesland[constants.BREMEN] = "Bremen";
  labels.bundesland[constants.HAMBURG] = "Hamburg";
  labels.bundesland[constants.HESSEN] = "Hessen";
  labels.bundesland[constants.MECKLENBURG_VORPOMMERN] = "Mecklenburg Vorpommern";
  labels.bundesland[constants.NIEDERSACHSEN] = "Niedersachsen";
  labels.bundesland[constants.NORDRHEIN_WESTFALEN] = "Nordrhein Westfalen";
  labels.bundesland[constants.RHEINLAND_PFALZ] = "Rheinland Pfalz";
  labels.bundesland[constants.SAARLAND] = "Saarland";
  labels.bundesland[constants.SACHSEN] = "Sachsen";
  labels.bundesland[constants.SACHSEN_ANHALT] = "Sachsen Anhalt";
  labels.bundesland[constants.SCHLESWIG_HOLSTEIN] = "Schleswig Holstein";
  labels.bundesland[constants.THUERINGEN] = "Thüringen";

  labels.lohnzahlzeitraum[constants.LZZ_JAEHRLICH] = "Jährlich";
  labels.lohnzahlzeitraum[constants.LZZ_MONATLICH] = "Monatlich";
  labels.lohnzahlzeitraum[constants.LZZ_WOECHENTLICH] = "Wöchentlich";
  labels.lohnzahlzeitraum[constants.LZZ_TAEGLICH] = "Täglich";

  labels.steuerklasse[constants.STEUERKLASSE_I] = "I";
  labels.steuerklasse[constants.STEUERKLASSE_II] = "II";
  labels.steuerklasse[constants.STEUERKLASSE_III] = "III";
  labels.steuerklasse[constants.STEUERKLASSE_IV] = "IV";
  labels.steuerklasse[constants.STEUERKLASSE_V] = "V";
  labels.steuerklasse[constants.STEUERKLASSE_VI] = "VI";

  labels.steuerklasseVorteil[constants.TYP_III_V] = "III - V";
  labels.steuerklasseVorteil[constants.TYP_V_III] = "V - III";
  labels.steuerklasseVorteil[constants.TYP_IV_IV] = "IV - IV";
  labels.steuerklasseVorteil[constants.TYP_IV_IV_FAKTOR] = "IV - IV mit Faktor";

  return {
    getLabel: function (key) {
      var label = labels[key] || {};
      return function (value) {
        return label[value] || "";
      };
    }
  };

});
