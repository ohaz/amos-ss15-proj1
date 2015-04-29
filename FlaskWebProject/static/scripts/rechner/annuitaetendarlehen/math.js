define(function () {
  "use strict";

  function BerechneAnnuitaet(Darlehen, Zins, Wert, Zahlungsweise, Modus) {
    switch (Modus) {
    case 0:
      return BerechneAnnuitaetTilgung(Darlehen, Zins, Wert, Zahlungsweise);
      break;
    case 1:
      return BerechneAnnuitaetLaufzeit(Darlehen, Zins, Wert, Zahlungsweise);
      break;
    case 2:
      return BerechneAnnuitaetBetrag(Darlehen, Zins, Wert, Zahlungsweise);
      break;

    default:
      return -1;
      break;
    }
  }

  //Berechnet die Annuität abhängig von Tilgungssatz
  function BerechneAnnuitaetTilgung(Darlehen, Zins, Tilgung, Zahlungsweise) {
    var ZinsU = ZinsUnterjaehrig(Zins, Zahlungsweise);
    var TilgungU = ZinsUnterjaehrig(Tilgung, Zahlungsweise);
    return (ZinsU + TilgungU) * Darlehen;
  }


  // Berechnet die Annuität abhängig von der Laufzeit
  function BerechneAnnuitaetLaufzeit(Darlehen, Zins, Laufzeit, Zahlungsweise) {
    var ZinsRateLaufzeit = ZinsUnterjaehrig(Zins, Zahlungsweise);
    var AuswahlRateLaufzeit = Laufzeit * Zahlungsweise;

    var temp1 = 1 + ZinsRateLaufzeit;
    var temp2 = Math.pow(temp1, AuswahlRateLaufzeit);
    var temp3 = ZinsRateLaufzeit * temp2;
    var temp4 = temp2 - 1;

    var ANNF = temp3 / temp4;
    return ANNF * Darlehen;
  }

  // Berechnet Annuität abhängig vom Betrag
  function BerechneAnnuitaetBetrag(Darlehen, Zins, Betrag, Zahlungsweise) {
    var Tilgungsanteil = Darlehen * Zins;
    Tilgungsanteil = (Betrag * Zahlungsweise) - Tilgungsanteil;
    return Tilgungsanteil / Darlehen * 100;
  }

  function BerechneRueckzahlsumme(Darlehen, Zins, Wert, Zahlungsweise, Modus) {
    switch (Modus) {
    case 0:
      return BerechneRueckzahlsummeTilgung(Darlehen, Zins, Wert, Zahlungsweise);
      break;
    case 1:
      return BerechneRueckzahlsummeLaufzeit(Darlehen, Zins, Wert, Zahlungsweise);
      break;
    case 2:
      if (BerechneAnnuitaet(Darlehen, Zins, Wert, Zahlungsweise, Modus) <= 0.0)
        return -1;
      else
        return BerechneRueckzahlsummeBetrag(Darlehen, Zins, Wert, Zahlungsweise);
      break;

    default:
      return -1;
      break;
    }
  }

  // Berechnet die Rückzahlsumme abhängig von der Laufzeit
  function BerechneRueckzahlsummeLaufzeit(Darlehen, Zins, Laufzeit, Zahlungsweise) {
    var Zinsgesamt = 0;
    var Restschuld = Darlehen;

    var RateLaufzeit1 = BerechneAnnuitaetLaufzeit(Darlehen, Zins, Laufzeit, Zahlungsweise);
    var ZinsU = ZinsUnterjaehrig(Zins, Zahlungsweise);

    Laufzeit = Laufzeit * Zahlungsweise;

    //Es muessen ganze Monate/Jahre sein, da sonst keine Uebereinstimmung mit Fany. Praxis kennt keine einzelnen Tage bei monatlicher Zahlung
    for (var i = 1; i <= Laufzeit; i++) {
      var Zinsanteil = Restschuld * ZinsU;
      var Tilgungsanteil = RateLaufzeit1 - Zinsanteil;
      if (Tilgungsanteil <= Restschuld) {
        Restschuld = Restschuld - Tilgungsanteil;
      }
      else {
        Tilgungsanteil = Restschuld;
        Restschuld = 0;
      }
      Zinsgesamt = Zinsgesamt + Zinsanteil;
    }

    return (Darlehen + Zinsgesamt);
  }

  // Berechnet die Rückzahlsumme abhängig von der Tilgung
  function BerechneRueckzahlsummeTilgung(Darlehen, Zins, Tilgung, Zahlungsweise) {
    var Laufzeit1 = 0;
    var Zinsgesamt = 0;
    var Zinsanteil = 0;
    var Tilgungsanteil = 0;
    Zinsgesamt = 0;
    var Restschuld = Darlehen;

    var Variable1 = BerechneAnnuitaetTilgung(Darlehen, Zins, Tilgung, Zahlungsweise);

    var ZinsU = ZinsUnterjaehrig(Zins, Zahlungsweise);

    while (Restschuld > 0) {
      Zinsanteil = Restschuld * ZinsU;
      Tilgungsanteil = Variable1 - Zinsanteil;
      if (Tilgungsanteil <= Restschuld) {
        Restschuld = Restschuld - Tilgungsanteil;
      }
      else {
        Tilgungsanteil = Restschuld;
        Restschuld = 0;
      }
      Zinsgesamt = Zinsgesamt + Zinsanteil;
      Laufzeit1 = Laufzeit1 + 1;
    }

    return (Darlehen + Zinsgesamt);
  }

  //Berechnet die Rückzahlsumme abhängig von der Tilgung
  function BerechneRueckzahlsummeBetrag(Darlehen, Zins, Tilgung, Zahlungsweise) {
    var Laufzeit1 = 0;
    var Zinsgesamt = 0;
    var Zinsanteil = 0;
    var Tilgungsanteil = 0;
    Zinsgesamt = 0;
    var Restschuld = Darlehen;

    //var Variable1 = BerechneAnnuitaetBetrag(Darlehen, Zins, Tilgung, Zahlungsweise);
    //var Variable1 = BerechneAnnuitaetTilgung(Darlehen, Zins, Variable1/100, Zahlungsweise);
    var ZinsU = ZinsUnterjaehrig(Zins, Zahlungsweise);

    while (Restschuld > 0) {
      Zinsanteil = Restschuld * ZinsU;
      Tilgungsanteil = Tilgung - Zinsanteil; //Variable1-Zinsanteil;
      if (Tilgungsanteil <= Restschuld) {
        Restschuld = Restschuld - Tilgungsanteil;
      }
      else {
        Tilgungsanteil = Restschuld;
        Restschuld = 0;
      }
      Zinsgesamt = Zinsgesamt + Zinsanteil;
      Laufzeit1 = Laufzeit1 + 1;
    }

    return (Darlehen + Zinsgesamt);
  }

  // Berechnet Gesamtlaufzeit
  function BerechneGesamtLaufzeit(Darlehen, Zins, Wert, Zahlungsweise, Modus) {
    var Laufzeit1 = 0;
    var AnzahlMonate = 0;
    var Zinsgesamt = 0;
    var Zinsanteil = 0;
    var Tilgungsanteil = 0;
    Zinsgesamt = 0;
    var Restschuld = Darlehen;

    var Variable1 = 0;

    switch (Modus) {
    case 0:
      Variable1 = BerechneAnnuitaetTilgung(Darlehen, Zins, Wert, Zahlungsweise);
      break;
    case 2:
      if (BerechneAnnuitaet(Darlehen, Zins, Wert, Zahlungsweise, Modus) <= 0.0)
        return -1;
      else
        Variable1 = Wert;

    default:
      break;
    }

    //var Variable1 = BerechneAnnuitaetTilgung(Darlehen, Zins, Wert, Zahlungsweise);
    var ZinsU = ZinsUnterjaehrig(Zins, Zahlungsweise);

    while (Restschuld > 0) {
      Zinsanteil = Restschuld * ZinsU;
      Tilgungsanteil = Variable1 - Zinsanteil;
      if (Tilgungsanteil <= Restschuld) {
        Restschuld = Restschuld - Tilgungsanteil;
      }
      else {
        Tilgungsanteil = Restschuld;
        Restschuld = 0;
      }
      Zinsgesamt = Zinsgesamt + Zinsanteil;
      Laufzeit1 = Laufzeit1 + 1;
    }

    var Monate = 0;

    switch (Zahlungsweise) {
    case 1:
      Monate = 12;
      break;
    case 2:
      Monate = 6;
      break;
    case 4:
      Monate = 3;
      break;
    case 12:
      Monate = 1;
      break;
    }

    //Anzahl Jahre, bei ungerader Zahl die Monate dazu.
    var AnzahlJahre = Laufzeit1 / Zahlungsweise;
    var AnzahlAuswahl = Laufzeit1 % Zahlungsweise;

    //Restschuld auf Monate aufteilen, Zins auch runterbrechen
    var Teilbetrag = Variable1 / Monate;
    ZinsU = ZinsU / Monate;

    Restschuld = Tilgungsanteil;
    while (Restschuld > 0) {
      Zinsanteil = Restschuld * ZinsU;
      Tilgungsanteil = Teilbetrag - Zinsanteil;
      Restschuld = Restschuld - Tilgungsanteil;
      AnzahlMonate = AnzahlMonate + 1;
    }

    if (AnzahlAuswahl != 0) {
      AnzahlAuswahl = AnzahlAuswahl - 1;
      AnzahlAuswahl = AnzahlAuswahl * Monate;
      AnzahlAuswahl = AnzahlAuswahl + AnzahlMonate;
    }
    else {
      if (AnzahlMonate != Monate) {
        AnzahlJahre = AnzahlJahre - 1;
        var Variable2 = (Zahlungsweise - 1) * Monate;
        AnzahlAuswahl = Variable2 + AnzahlMonate;
      }
    }

    return "~" + Math.floor(AnzahlJahre) + "J - " + AnzahlAuswahl + "M";

  }

  function ZinsUnterjaehrig(Zins, Zahlungsweise) {
    return Zins / Zahlungsweise;
  }

  function TilgungssatzSchrittweite(Darlehen, AuswahlSchritt) {
    return AuswahlSchritt / Darlehen * 100;
  }

  // Berechnet Restschuld abhängig von der vorgegebenen Berechnungsart

  function BerechneRestschuld(Darlehen, Zins, Wert, Zahlungsweise, Jahre, Modus) {
    Jahre = Jahre * Zahlungsweise;

    var ZinsU = 0;
    var RateLaufzeit1 = 0;

    switch (Modus) {
    case 1:
      RateLaufzeit1 = BerechneAnnuitaetLaufzeit(Darlehen, Zins, Wert, Zahlungsweise);
      break;
    case 0:
      //Wert = Wert/100;
      RateLaufzeit1 = BerechneAnnuitaetTilgung(Darlehen, Zins, Wert, Zahlungsweise);
      break;
    case 2:
      var dblTilgungProJahr = Wert * Zahlungsweise - Darlehen * Zins;
      var dblTilgungssatz = dblTilgungProJahr / Darlehen;
      var dblTilgungssatzProZeitraum = dblTilgungssatz / Zahlungsweise;
      var dblRateProZeitraum = (Zins / Zahlungsweise + dblTilgungssatzProZeitraum) * Darlehen;

      /*
    Wert = Wert*Zahlungsweise;
    var Tilgung = BerechneAnnuitaetBetrag(Darlehen, Zins, Wert, Zahlungsweise);
    Tilgung = Tilgung/100;
    Wert = Tilgung;
    RateLaufzeit1 = BerechneAnnuitaetTilgung(Darlehen, Zins, Wert, Zahlungsweise);*/

      RateLaufzeit1 = dblRateProZeitraum;
      break;
    default:
      break;
    }

    ZinsU = ZinsUnterjaehrig(Zins, Zahlungsweise);

    var temp1 = Math.pow((ZinsU + 1), Jahre);
    var temp2 = temp1 - 1;
    var temp3 = temp2 / ZinsU * RateLaufzeit1;
    var temp4 = temp1 * Darlehen;

    var Restschuld = temp4 - temp3;

    if (Restschuld <= 0) {
      return 0;
    }
    else {
      return Restschuld;
    }
  }

  // Berechnet Annuität auf Basis vorgegebener Laufzeit und Restschuld
  function BerechneAnnuitaetMitRestschuldLaufzeitVorgabe(Darlehen, Zins, Zahlungsweise, Jahre, RestschuldBetrag) {
    var ZinsU = Zins / Zahlungsweise;
    Jahre = Jahre * Zahlungsweise;

    var temp1 = Math.pow((ZinsU + 1), Jahre);
    var temp2 = (temp1 * Darlehen) - RestschuldBetrag;
    var temp3 = (temp1 - 1) / ZinsU;
    var temp4 = temp2 / temp3;

    return temp4;
  }

  return {
    BerechneAnnuitaet: BerechneAnnuitaet,
    BerechneRueckzahlsumme: BerechneRueckzahlsumme,
    BerechneGesamtLaufzeit: BerechneGesamtLaufzeit,
    BerechneRestschuld: BerechneRestschuld,
    BerechneAnnuitaetMitRestschuldLaufzeitVorgabe: BerechneAnnuitaetMitRestschuldLaufzeitVorgabe
  };

});
