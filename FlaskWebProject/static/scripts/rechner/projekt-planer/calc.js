define([
  './projektPlanerArbeitstage',
  './projektPlanerMobileDate'
], function (
  Arbeitstage,
  CMobileDate
) {

  function calc(input) {
    var berechnungsziel = input.berechnungsziel,
        berechnungsjahr = input.berechnungsjahr,
        starttermin = input.starttermin,
        endtermin = input.endtermin,
        projektdauer = input.projektdauer,
        bundesland = input.bundesland,
        konfession = input.konfession,
        abzuegeInTagen = input.abzuegeInTagen,
        abzuegeInProzent = input.abzuegeInProzent,
        personenzahl = input.personenzahl,
        personenzahl_schrittweite = input.personenzahl_schrittweite;

    var GUELTIGE_JAHRE_AB = 2009;
    var GUELTIGE_JAHRE_BIS = 2015;
    //var TABELLEN_GROESSE = 20;
    var MAX_EINGABE_PERSONEN = 999;
    var MAX_EINGABE_ABZUEGEPROZENT = 99;
    var MAX_EINGABE_ABZUEGETAGE = 9999;
    var MAX_EINGABE_PROJEKTDAUER = 9999;
    var MAX_EINGABE_SCHRITTWEITE = 99;
    var JAHR_RANGE = 5;

    //var date = new CMobileDate();

    var iZaehler = 0;

    switch (berechnungsziel) {

      //Berechnungsziel Jahresübersicht
    case 0:

      var results = [];

      var arbeitstage = new Arbeitstage();
      //Berechnungsdaten setzen
      arbeitstage.SetBundesland(bundesland);
      arbeitstage.SetAbzuegeTage(abzuegeInTagen);
      arbeitstage.SetAbzuegeProzent(abzuegeInProzent);
      arbeitstage.SetNrPersonen(personenzahl);
      arbeitstage.SetKonfession(konfession);

      arbeitstage.SetBerechnungsart(1);

      // Setze das Startdatum
      var dateVon = new CMobileDate();
      dateVon.SetNr(1, berechnungsjahr);
      arbeitstage.SetDatumVon(dateVon);

      // Setzt das Enddatum
      var dateBis = new CMobileDate();
      dateBis.SetNr(dateBis.GetNrDaysInYear(berechnungsjahr), berechnungsjahr);
      arbeitstage.SetDatumBis(dateBis);

      //Berechnet die Anzahl der Arbeitstage
      arbeitstage.Calc();

      results[0] = arbeitstage;

      //Die Berechnung der Jahresübersicht erfolgt mit mehreren
      // Zeitraumberechung.
      //Problem: Abzuege gelten fuer das komplette Jahr und müssen
      // verteilt werden. Wenn jeder Monat 1/12 der Abzüge übernimmt
      // kann es zu fehlern kommen, da die einzelnen Monate nicht
      // gleichviele Arbeitstage enthalten.
      //Lösung: Verteilung der Abzüge in mehreren Schritten.

      //Abzüge für das Jahr ermitteln
      var iAbzuegeTage = arbeitstage.GetAbzuegeTage();
      //Abzüge die noch nicht verteilt sind
      var iRestAbzuegeTage = iAbzuegeTage;



      // Berechnung der Arbeitstage der einzelnen Monate
      var TempDate = new CMobileDate();
      var iBonusRunde = 0;
      for (var iZaehler = 1; iZaehler < 13; iZaehler++) {

        var arbeitstage_sep = new Arbeitstage();
        //Berechnungsdaten setzen
        arbeitstage_sep.SetBundesland(bundesland);
        arbeitstage_sep.SetAbzuegeTage(abzuegeInTagen);
        arbeitstage_sep.SetAbzuegeProzent(abzuegeInProzent);
        arbeitstage_sep.SetNrPersonen(personenzahl);
        arbeitstage_sep.SetKonfession(konfession);

        arbeitstage_sep.SetBerechnungsart(1);

        //Startdatum setzen
        var dateVon = new CMobileDate();
        dateVon.SetNr(1, berechnungsjahr);
        arbeitstage_sep.SetDatumVon(dateVon);

        //Enddatum setzen
        var dateBis = new CMobileDate();
        dateBis.SetNr(dateBis.GetNrDaysInYear(berechnungsjahr), berechnungsjahr);
        arbeitstage_sep.SetDatumBis(dateBis);


        arbeitstage_sep.Calc();

        arbeitstage_sep.feiertageDetails = [];

        //Abzug für diesen Monat ermitteln
        var iAbzug = Math.floor((iRestAbzuegeTage / (13 - iZaehler)));
        //Rest Abzuege reduzieren
        iRestAbzuegeTage -= iAbzug;
        //Abzeuge eintragen
        arbeitstage_sep.SetAbzuegeTage(iAbzug);
        //Passenden Monats Anfang und Ende als Datum setzen
        TempDate = arbeitstage_sep.GetDatumVon();
        TempDate.SetDate(1, iZaehler, TempDate.GetYear());
        arbeitstage_sep.SetDatumVon(TempDate);
        TempDate = new CMobileDate();
        TempDate.SetDate(TempDate.GetNrDaysInMonth(arbeitstage_sep.GetDatumVon()
            .GetYear(), iZaehler), iZaehler, arbeitstage_sep.GetDatumVon()
          .GetYear());
        arbeitstage_sep.SetDatumBis(TempDate);
        //Berechnen
        arbeitstage_sep.Calc();
        //Falls der Monat weniger Tage halt als Abzuege geplant sind
        // dann müssen die überschüssigen Abzuege später auf einen anderen
        // Monat verlagert werden
        iBonusRunde += Math.floor(arbeitstage_sep.GetAbzuegeTage() - arbeitstage_sep.GetAbgezogen(true, 2));


        results[iZaehler] = arbeitstage_sep;

      }

      var iCounter = 0;
      iZaehler = 1;
      //Restliche Abzuege + Abzuege die die Arbeitstage eines Monats
      // enthalten addieren
      iRestAbzuegeTage += iBonusRunde;
      //Solange es noch Abzuege zu verteilen gibt und ein Monat
      // einen freien Arbeitstag hat
      while (iRestAbzuegeTage > 0 && iCounter < 12) {
        //Noch Arbeitstage frei?
        if (results[iZaehler].GetArbeitstage(true, false) - results[iZaehler].GetAbgezogen(true, 2) == 0)
          iCounter++;
        else {
          //Counter auf 0 setzen, nochmal eine Runde
          iCounter = 0;
          results[iZaehler].SetAbzuegeTage(results[iZaehler].GetAbzuegeTage() + 1);
          //Neu Berechnen
          results[iZaehler].Calc();
          iRestAbzuegeTage--;
        }
        //Beim Dezember angekommen?
        if (++iZaehler > 12)
        //                Bei Januar wieder anfangen
          iZaehler = 1;
      }

      for (var int1 = 0; int1 < results.length; int1++) {
        results[int1] = {
          Kalendertage: results[int1].GetTageInsgesamt(),
          SonSamstage: results[int1].GetNrSamstage() + results[int1].GetNrSonntage(),
          Feiertage: results[int1].GetNrFeiertage(),
          Brueckentage: results[int1].GetNrBrueckentage(),
          Arbeitstage: results[int1].GetArbeitstage(false, false),
          Personenzahl: results[int1].GetNrPersonen(),
          ArbeitstageGesamt: results[int1].GetArbeitstage(false, false) * results[int1].GetNrPersonen(),
          Abzuege: results[int1].GetAbgezogen(true, 1),
          Nettoarbeitstage: results[int1].GetArbeitstage(true, true),

          DatumVon: new Date(results[int1].GetDatumVon()
            .GetYear(), results[int1].GetDatumVon()
            .GetMonth() - 1, results[int1].GetDatumVon()
            .GetDay()),
          DatumBis: new Date(results[int1].GetDatumBis()
            .GetYear(), results[int1].GetDatumBis()
            .GetMonth() - 1, results[int1].GetDatumBis()
            .GetDay()),

          FeiertageDetails: results[int1].getFeiertageDetails()
        };
      }

      return results;
      break;

      //Berechnungsziel Zeitraumübersicht
    case 1:
      var results = [];

      var arbeitstage = new Arbeitstage();
      //Berechnungsdaten setzen
      arbeitstage.SetBundesland(bundesland);
      arbeitstage.SetAbzuegeTage(abzuegeInTagen);
      arbeitstage.SetAbzuegeProzent(abzuegeInProzent);
      arbeitstage.SetNrPersonen(1);
      arbeitstage.SetKonfession(konfession);

      arbeitstage.SetBerechnungsart(1);

      var dateVon = new CMobileDate();
      dateVon.SetDate(starttermin.getDate(), starttermin.getMonth() + 1, starttermin.getFullYear());
      arbeitstage.SetDatumVon(dateVon);

      var dateBis = new CMobileDate();
      dateBis.SetDate(endtermin.getDate(), endtermin.getMonth() + 1, endtermin.getFullYear());
      arbeitstage.SetDatumBis(dateBis);
      arbeitstage.Calc();

      results[0] = arbeitstage;

      for (var int1 = 0; int1 < 20; int1++) {
        arbeitstage = new Arbeitstage();
        //Berechnungsdaten setzen
        arbeitstage.SetBundesland(bundesland);
        arbeitstage.SetAbzuegeTage(abzuegeInTagen);
        arbeitstage.SetAbzuegeProzent(abzuegeInProzent);
        arbeitstage.SetNrPersonen(personenzahl + (int1 * personenzahl_schrittweite));
        arbeitstage.SetKonfession(konfession);

        arbeitstage.SetBerechnungsart(1);

        var dateVon = new CMobileDate();
        dateVon.SetDate(starttermin.getDate(), starttermin.getMonth() + 1, starttermin.getFullYear());
        arbeitstage.SetDatumVon(dateVon);

        var dateBis = new CMobileDate();
        dateBis.SetDate(endtermin.getDate(), endtermin.getMonth() + 1, endtermin.getFullYear());
        arbeitstage.SetDatumBis(dateBis);
        arbeitstage.Calc();

        results[int1 + 1] = arbeitstage;
      }

      for (var int1 = 0; int1 < results.length; int1++) {
        results[int1] = {
          Kalendertage: results[int1].GetTageInsgesamt(),
          SonSamstage: results[int1].GetNrSamstage() + results[int1].GetNrSonntage(),
          Feiertage: results[int1].GetNrFeiertage(),
          Brueckentage: results[int1].GetNrBrueckentage(),
          Arbeitstage: results[int1].GetArbeitstage(false, false),
          Personenzahl: results[int1].GetNrPersonen(),
          ArbeitstageGesamt: results[int1].GetArbeitstage(false, false) * results[int1].GetNrPersonen(),
          Abzuege: results[int1].GetAbgezogen(true, 1),
          Nettoarbeitstage: results[int1].GetArbeitstage(true, true),

          DatumVon: new Date(results[int1].GetDatumVon()
            .GetYear(), results[int1].GetDatumVon()
            .GetMonth() - 1, results[int1].GetDatumVon()
            .GetDay()),
          DatumBis: new Date(results[int1].GetDatumBis()
            .GetYear(), results[int1].GetDatumBis()
            .GetMonth() - 1, results[int1].GetDatumBis()
            .GetDay()),

          FeiertageDetails: results[int1].getFeiertageDetails()
        };
      }

      return results;
      break;

      //Startterminberechnung
    case 2:
      var results = [];
      for (var int1 = 0; int1 < 20; int1++) {
        var arbeitstage = new Arbeitstage();
        //Berechnungsdaten setzen
        arbeitstage.SetBundesland(bundesland);
        arbeitstage.SetAbzuegeTage(abzuegeInTagen);
        arbeitstage.SetAbzuegeProzent(abzuegeInProzent);
        arbeitstage.SetNrPersonen(personenzahl + (int1 * personenzahl_schrittweite));
        arbeitstage.SetKonfession(konfession);

        arbeitstage.SetBerechnungsart(2);

        var dateVon = new CMobileDate();
        dateVon.SetDate(1, 1, GUELTIGE_JAHRE_AB - JAHR_RANGE);
        arbeitstage.SetDatumVon(dateVon);

        var dateBis = new CMobileDate();
        dateBis.SetDate(endtermin.getDate(), endtermin.getMonth() + 1, endtermin.getFullYear());
        arbeitstage.SetDatumBis(dateBis);

        arbeitstage.SetProjektdauer(projektdauer);
        arbeitstage.Calc();

        results[int1] = arbeitstage;
      }

      for (var int1 = 0; int1 < results.length; int1++) {
        results[int1] = {
          Kalendertage: results[int1].GetTageInsgesamt(),
          SonSamstage: results[int1].GetNrSamstage() + results[int1].GetNrSonntage(),
          Feiertage: results[int1].GetNrFeiertage(),
          Brueckentage: results[int1].GetNrBrueckentage(),
          Arbeitstage: results[int1].GetArbeitstage(false, false),
          Personenzahl: results[int1].GetNrPersonen(),
          ArbeitstageGesamt: results[int1].GetArbeitstage(false, false) * results[int1].GetNrPersonen(),
          Abzuege: results[int1].GetAbgezogen(true, 1),
          Nettoarbeitstage: results[int1].GetArbeitstage(true, true),

          DatumVon: new Date(results[int1].GetDatumVon()
            .GetYear(), results[int1].GetDatumVon()
            .GetMonth() - 1, results[int1].GetDatumVon()
            .GetDay()),
          DatumBis: new Date(results[int1].GetDatumBis()
            .GetYear(), results[int1].GetDatumBis()
            .GetMonth() - 1, results[int1].GetDatumBis()
            .GetDay()),

          FeiertageDetails: results[int1].getFeiertageDetails()
        };
      }

      return results;
      break;

      //Endterminberechnung
    case 3:
      var results = [];
      for (var int1 = 0; int1 < 20; int1++) {
        var arbeitstage = new Arbeitstage();
        //Berechnungsdaten setzen
        arbeitstage.SetBundesland(bundesland);
        arbeitstage.SetAbzuegeTage(abzuegeInTagen);
        arbeitstage.SetAbzuegeProzent(abzuegeInProzent);
        arbeitstage.SetNrPersonen(personenzahl + (int1 * personenzahl_schrittweite));
        arbeitstage.SetKonfession(konfession);

        arbeitstage.SetBerechnungsart(3);

        var dateVon = new CMobileDate();
        dateVon.SetDate(starttermin.getDate(), starttermin.getMonth() + 1, starttermin.getFullYear());
        arbeitstage.SetDatumVon(dateVon);

        var dateBis = new CMobileDate();
        dateBis.SetDate(1, 1, GUELTIGE_JAHRE_BIS + JAHR_RANGE);
        arbeitstage.SetDatumBis(dateBis);

        arbeitstage.SetProjektdauer(projektdauer);
        arbeitstage.Calc();

        results[int1] = arbeitstage;
      }

      for (var int1 = 0; int1 < results.length; int1++) {
        results[int1] = {
          Kalendertage: results[int1].GetTageInsgesamt(),
          SonSamstage: results[int1].GetNrSamstage() + results[int1].GetNrSonntage(),
          Feiertage: results[int1].GetNrFeiertage(),
          Brueckentage: results[int1].GetNrBrueckentage(),
          Arbeitstage: results[int1].GetArbeitstage(false, false),
          Personenzahl: results[int1].GetNrPersonen(),
          ArbeitstageGesamt: results[int1].GetArbeitstage(false, false) * results[int1].GetNrPersonen(),
          Abzuege: results[int1].GetAbgezogen(true, 1),
          Nettoarbeitstage: results[int1].GetArbeitstage(true, true),

          DatumVon: new Date(results[int1].GetDatumVon()
            .GetYear(), results[int1].GetDatumVon()
            .GetMonth() - 1, results[int1].GetDatumVon()
            .GetDay()),
          DatumBis: new Date(results[int1].GetDatumBis()
            .GetYear(), results[int1].GetDatumBis()
            .GetMonth() - 1, results[int1].GetDatumBis()
            .GetDay()),

          FeiertageDetails: results[int1].getFeiertageDetails()
        };
      }

      return results;
      break;

    default:
      break;
    }
    return null;


  }

  return calc;

});
