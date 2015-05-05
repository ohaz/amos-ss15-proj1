define([
  "./math"
], function (
  math
) {
  "use strict";

  function BerechneTabellen(input) {
    var darlehen = input.darlehensbetrag,
      zins = input.zinssatz,
      zinsSchrittweite = input.zinssatz_schrittweite,
      zahlungsweise = input.zahlungsturnus,
      tilgungssatz = input.vorgegebener_tilgungssatz,
      tilgungssatzSchrittweite = input.vorgegebener_tilgungssatz_schrittweite,
      laufzeit = input.vorgegebene_laufzeit,
      laufzeitSchrittweite = input.vorgegebene_laufzeit_schrittweite,
      betrag = input.vorgegebene_annuitaet,
      betragSchrittweite = input.vorgegebene_annuitaet_schrittweite,
      restschuldBeiZinsbindungStartJahr = input.restschuld_jahr_start,
      restschuldBeiZinsbindungSchrittweite = input.restschuld_jahr_schrittweite,
      annuitaetBeiVorgegRestschuldRestschuld = input.teilbetrag_restschuld,
      annuitaetBeiVorgegRestschuldStartJahr = input.teilbetrag_jahr_start,
      annuitaetBeiVorgegRestschuldSchrittweite = input.teilbetrag_jahr_schrittweite,
      modus = input.berechnungsart;

    var wert;
    var wertSchrittweite;
    var resultIsOK = true;

    switch (modus) {
    case 0:
      wert = tilgungssatz / 100;
      wertSchrittweite = tilgungssatzSchrittweite / 100;
      break;
    case 1:
      wert = laufzeit;
      wertSchrittweite = laufzeitSchrittweite;
      break;
    case 2:
      wert = betrag;
      wertSchrittweite = betragSchrittweite;
      break;

    default:
      wert = 0;
      wertSchrittweite = 0;
      break;
    }

    zins = zins / 100;
    zinsSchrittweite = zinsSchrittweite / 100;

    var temp_zins = zins;
    var temp_wert = wert;

    // Annuitaet bzw. Unterjaehriger Teilbetrag berechnen
    var annuitaet = [];
    annuitaet[0] = [];
    annuitaet[0][0] = "";

    for (var i = 1; i < 6; i++) {
      annuitaet[i] = [];
      annuitaet[i][0] = temp_zins * 100;
      for (var i2 = 1; i2 < 4; i2++) {
        annuitaet[0][i2] = modus == 0 ? temp_wert * 100 : temp_wert;
        var temp = math.BerechneAnnuitaet(darlehen, temp_zins, temp_wert, zahlungsweise, modus);
        annuitaet[i][i2] = temp != -1 ? temp : "--";
        if (temp == -1)
          resultIsOK = false;
        temp_wert += wertSchrittweite;
      }
      temp_wert = wert;
      temp_zins += zinsSchrittweite;
    }
    temp_zins = zins;

    // Rueckzahlsumme berechnen
    var rueckzahlsumme = [];
    rueckzahlsumme[0] = [];
    rueckzahlsumme[0][0] = "";

    for (var i = 1; i < 6; i++) {
      rueckzahlsumme[i] = [];
      rueckzahlsumme[i][0] = temp_zins * 100;
      for (var i2 = 1; i2 < 4; i2++) {
        rueckzahlsumme[0][i2] = modus == 0 ? temp_wert * 100 : temp_wert;
        var temp = math.BerechneRueckzahlsumme(darlehen, temp_zins, temp_wert, zahlungsweise, modus);
        rueckzahlsumme[i][i2] = temp != -1 ? temp : "--";
        if (temp == -1)
          resultIsOK = false;
        temp_wert += wertSchrittweite;
      }
      temp_wert = wert;
      temp_zins += zinsSchrittweite;
    }
    temp_zins = zins;

    // Laufzeit berechnen
    var gesamtLaufzeit = [];
    gesamtLaufzeit[0] = [];
    gesamtLaufzeit[0][0] = "";
    if (modus == 1) {
      gesamtLaufzeit = "~" + laufzeit + "J - 0M";
    }
    else {
      for (var i = 1; i < 6; i++) {
        gesamtLaufzeit[i] = [];
        gesamtLaufzeit[i][0] = temp_zins * 100;
        for (var i2 = 1; i2 < 4; i2++) {
          gesamtLaufzeit[0][i2] = modus == 0 ? temp_wert * 100 : temp_wert;
          var temp = math.BerechneGesamtLaufzeit(darlehen, temp_zins, temp_wert, zahlungsweise, modus);
          gesamtLaufzeit[i][i2] = temp != -1 ? temp : "--";
          if (temp == -1)
            resultIsOK = false;
          temp_wert += wertSchrittweite;
        }
        temp_wert = wert;
        temp_zins += zinsSchrittweite;
      }
      temp_zins = zins;
    }

    // Restschuld bei vorgeg. Berechnungsart mit Zinsbindung
    var temp_jahr = restschuldBeiZinsbindungStartJahr;
    var restschuld = [];
    for (var i = 0; i < 6; i++) {
      var temp = math.BerechneRestschuld(darlehen, temp_zins, temp_wert, zahlungsweise, temp_jahr, modus);
      restschuld[i] = new Array(temp_jahr, temp);
      if (temp == 0)
        break;
      temp_jahr += restschuldBeiZinsbindungSchrittweite;
    }

    // Annuität bei vorgeg. Laufzeit u Restschuld
    temp_jahr = annuitaetBeiVorgegRestschuldStartJahr;
    var annuitaetBeiVorgegRestschuld = [];

    if (darlehen > annuitaetBeiVorgegRestschuldRestschuld) {
      for (var i = 0; i < 6; i++) {
        var temp = math.BerechneAnnuitaetMitRestschuldLaufzeitVorgabe(darlehen, temp_zins, zahlungsweise, temp_jahr, annuitaetBeiVorgegRestschuldRestschuld);
        annuitaetBeiVorgegRestschuld[i] = new Array(temp_jahr, temp.toFixed(2));
        temp_jahr += annuitaetBeiVorgegRestschuldSchrittweite;
      }
    }

    // Ergebnisobjekt erstellen
    var output = {
      annuitaet: annuitaet,
      tilgung: annuitaet,
      rueckzahlsumme: rueckzahlsumme,
      laufzeit: gesamtLaufzeit,
      restschuld: restschuld,
      teilbetrag: annuitaetBeiVorgegRestschuld,
      resultIsOK: resultIsOK
    };

    var retValue = [];
    retValue[0] = output;

    return retValue;

  }

  //function zum Runden der Ergebnisse auf x Stellen nach Komma
  function r(number, stellen) {
    var referenzStellen = "1";
    for (var i = 0; i < stellen; i++) {
      referenzStellen += i;
    }
    referenzStellen = parseInt(referenzStellen);
    var k = (Math.round(number * referenzStellen) / referenzStellen)
      .toString();
    k += (k.indexOf('.') == -1) ? '.00' : '00';
    return k.substring(0, k.indexOf('.') + 3);
  }

  return BerechneTabellen;

});
