define([
  './projektPlanerFeiertage',
  './projektPlanerMobileDate'
], function (
  CFeiertage,
  CMobileDate
) {

  function Arbeitstage() {
    // Berechnungsdaten:
    this.m_iBundesland;
    this.m_iAbzuegeTage;
    this.m_dAbzuegeProzent;
    this.m_iPersonen;
    this.m_iBerechnungsart;
    this.m_DatumVon; // = new CMobileDate();
    this.m_DatumBis; // = new CMobileDate();
    this.m_iProjektdauer;
    this.m_iKonfession;

    //Ergebnis-Daten:
    this.m_iArbeitstage;
    this.m_iBrueckentage;
    this.m_iFeiertage;
    this.m_iSonntage;
    this.m_iSamstage;
    this.m_dAbgezogenProzent;
    this.m_iAbgezogenTage;

    this.feiertageDetails = [];

    //=============================================================================
    // Fuehert die Berechnung durch.
    // Die Ergebnise koennen mit den Get-Methoden abgefragt werden
    this.Calc = function () {
      var iYear = this.m_DatumVon.GetYear();
      var iLastYear = this.m_DatumBis.GetYear();
      var aiYearTable = [];
      this.DelResult();
      this.m_iAbgezogenTage = this.m_iAbzuegeTage;
      if (this.m_iBerechnungsart == 1) {
        while (iYear <= iLastYear) {
          for (var i = 0; i < 366; i++)
            aiYearTable[i] = 0;
          aiYearTable = this.SetFeiertage(iYear, aiYearTable);
          aiYearTable = this.SetSamstage(iYear, aiYearTable);
          aiYearTable = this.SetSonntage(iYear, aiYearTable);
          aiYearTable = this.AddToResult(iYear, aiYearTable, this.m_DatumVon, this.m_DatumBis);
          iYear++;
        }
      }
      else {
        //Endtermin-Berechnung
        var Searched = this.m_DatumBis;
        var VorOderZureck = 1;
        var iPos = this.m_DatumVon.GetNr();
        iYear = this.m_DatumVon.GetYear();
        if (this.m_iBerechnungsart == 2) {
          //Startermin-Berechnung
          iPos = this.m_DatumBis.GetNr();
          iYear = this.m_DatumBis.GetYear();
          VorOderZureck = -1;
          Searched = this.m_DatumVon;
        }

        for (var i = 0; i < 366; i++)
          aiYearTable[i] = 0;

        aiYearTable = this.SetFeiertage(iYear, aiYearTable);
        aiYearTable = this.SetSamstage(iYear, aiYearTable);
        aiYearTable = this.SetSonntage(iYear, aiYearTable);
        Searched.SetNr(iPos, iYear);
        aiYearTable = this.AddToResult(iYear, aiYearTable, Searched, Searched);

        while (this.GetArbeitstage(true, true) < this.m_iProjektdauer) {
          iPos += VorOderZureck;
          if (iPos < 1) {
            iYear--;
            iPos += Searched.GetNrDaysInYear(iYear);
            for (var i = 0; i < 366; i++)
              aiYearTable[i] = 0;
            aiYearTable = this.SetFeiertage(iYear, aiYearTable);
            aiYearTable = this.SetSamstage(iYear, aiYearTable);
            aiYearTable = this.SetSonntage(iYear, aiYearTable);
          }
          if (iPos > Searched.GetNrDaysInYear(iYear)) {
            iPos -= Searched.GetNrDaysInYear(iYear);
            iYear++;
            for (var i = 0; i < 366; i++)
              aiYearTable[i] = 0;
            aiYearTable = this.SetFeiertage(iYear, aiYearTable);
            aiYearTable = this.SetSamstage(iYear, aiYearTable);
            aiYearTable = this.SetSonntage(iYear, aiYearTable);
          }
          Searched.SetNr(iPos, iYear);
          aiYearTable = this.AddToResult(iYear, aiYearTable, Searched, Searched);
        }
      }
      if ((this.GetArbeitstage(true, false) - this.m_iAbzuegeTage) >= 0) {
        this.m_iAbgezogenTage = this.m_iAbzuegeTage;
      }
      else {
        this.m_iAbgezogenTage = this.GetArbeitstage(true, false);
      }


    };

    //=============================================================================
    // Setzt in einer Jahrestabelle alle Sonntage mit dem Wert 3
    this.SetSonntage = function (Jahr, YearTable) {
      var date = new CMobileDate();
      var iNrDays = date.GetNrDaysInYear(Jahr);
      var iCurrentDay = date.GetFirstDayOfWeekInYear(Jahr);
      for (var iZaehler = 0; iZaehler < iNrDays; iZaehler++) {
        if (iCurrentDay == 6)
          YearTable[iZaehler] = 3;
        iCurrentDay++;
        if (iCurrentDay == 7)
          iCurrentDay = 0;
      }
      return YearTable;
    };

    //=============================================================================
    // Setzt in einer Jahrestabelle alle Samstage mit dem Wert 2
    this.SetSamstage = function (Jahr, YearTable) {
      var date = new CMobileDate();
      var iNrDays = date.GetNrDaysInYear(Jahr);
      var iCurrentDay = date.GetFirstDayOfWeekInYear(Jahr);
      for (var iZaehler = 0; iZaehler < iNrDays; iZaehler++) {
        if (iCurrentDay == 5)
          YearTable[iZaehler] = 2;
        iCurrentDay++;
        if (iCurrentDay == 7)
          iCurrentDay = 0;
      }
      return YearTable;
    };

    //=============================================================================
    // Setzt in einer Jahrestabelle alle Feiertage mit dem Wert 1
    this.SetFeiertage = function (Jahr, YearTable) {
      var feiertage = new CFeiertage();
      for (var iZaehler = 1; iZaehler <= 20; iZaehler++) {
        if (feiertage.GueltigerFeiertag(Jahr, this.m_iBundesland, this.m_iKonfession, iZaehler)) {
          var temp = feiertage.GetFeiertag(Jahr, iZaehler);
          var temp2 = temp.GetNr() - 1;
          YearTable[temp2] = 1;
        }
      }
      return YearTable;
    };

    //=============================================================================
    // Gibt die Liste mit Feiertags-Details zurück
    this.getFeiertageDetails = function () {
      return this.feiertageDetails;
    };

    //=============================================================================
    // Setzt die Ergebnise zurueck
    this.DelResult = function () {
      this.m_iArbeitstage = 0;
      this.m_iBrueckentage = 0;
      this.m_iFeiertage = 0;
      this.m_iSonntage = 0;
      this.m_iSamstage = 0;
      this.m_dAbgezogenProzent = 0;
      this.m_iAbgezogenTage = 0;

      this.feiertageDetails = [];
    };

    //=============================================================================
    // Fuegt die Tage im Zeitbereich den Ergebnisvariablen hinzu
    this.AddToResult = function (Jahr, YearTable, DatumVon, DatumBis) {
      var date = new CMobileDate();
      var feiertage = new CFeiertage();
      var iStart, iEnde;
      var bBrueckentag = true;
      if (Jahr > DatumVon.GetYear()) {
        iStart = 0;
      }
      else
        iStart = DatumVon.GetNr() - 1;

      if (Jahr < DatumBis.GetYear()) {
        iEnde = date.GetNrDaysInYear(Jahr) - 1;
      }
      else
        iEnde = DatumBis.GetNr() - 1;

      for (iStart; iStart <= iEnde; iStart++) {
        switch (YearTable[iStart]) {
        case 0:
          this.m_iArbeitstage++;
          if (iStart != 0) {
            var temp = (iStart - 1);
            if (YearTable[temp] == 0)
              bBrueckentag = false;
          }
          else {
            //silvester?
            if (feiertage.GueltigerFeiertag(Jahr - 1, this.m_iBundesland, this.m_iKonfession, 12) == false &&
              date.GetDayOfWeek(1, 1, Jahr - 1) < 5
            ) bBrueckentag = false;
          }
          if (iStart != date.GetNrDaysInYear(Jahr) - 1) {
            if (YearTable[iStart + 1] == 0)
              bBrueckentag = false;
          }
          else {
            //neujahr?
            if (feiertage.GueltigerFeiertag(Jahr + 1, this.m_iBundesland, this.m_iKonfession, 1) == false &&
              date.GetDayOfWeek(date.GetNrDaysInMonth(Jahr + 1, 12), 12, Jahr + 1) < 5
            ) bBrueckentag = false;
          }
          if (bBrueckentag)
            this.m_iBrueckentage++;
          else
            bBrueckentag = true;
          break;
        case 1:
          this.m_iFeiertage++;
          var feiertagName = feiertage.GetFeiertagName(feiertage.GetFeiertagID(Jahr, this.m_iBundesland, this.m_iKonfession, iStart));
          var temp = new CMobileDate();
          temp.SetNr(iStart + 1, Jahr);
          this.feiertageDetails.push({
            feiertag: feiertagName,
            datum: new Date(temp.GetYear(), temp.GetMonth() - 1, temp.GetDay())
          });
          break;
        case 2:
          this.m_iSamstage++;
          break;
        case 3:
          this.m_iSonntage++;
          break;
        }
      }
      return YearTable;
    };

    //=============================================================================
    // Setzt das Bundesland fuer die Berechnung
    //-----------------------------------------------------------------------------
    // int | BundeslandID | Bundesland
    // 1 | Brandenburg
    // 2 | Berlin
    // 3 | Baden-Württemberg
    // 4 | Bayern
    // 5 | Bremen
    // 6 | Hessen
    // 7 | Hamburg
    // 8 | Mecklenburg-Vorpommern
    // 9 | Niedersachsen
    //10 | Nordrhein-Westfalen
    //11 | Rheinland-Pfalz
    //12 | Schlewsig-Holstein
    //13 | Saarland
    //14 | Sachsen
    //15 | Sachsen-Anhalt
    //16 | Thüringen
    this.SetBundesland = function (BundeslandID) {
      this.m_iBundesland = BundeslandID;
    };

    //=============================================================================
    // Setzt die Konffession fuer die Berechnung
    //-----------------------------------------------------------------------------
    // int | KonfessionsID | Konfession
    // 0 | Keine Konfession
    // 1 | Katholisch
    // 2 | Protestantisch
    this.SetKonfession = function (KonfessionsID) {
      this.m_iKonfession = KonfessionsID;
    };

    //=============================================================================
    // Setzt die Abzuge in Tagen fuer die Berechnung
    this.SetAbzuegeTage = function (AbzuegeTage) {
      this.m_iAbzuegeTage = AbzuegeTage;
    };

    //=============================================================================
    // Setzt die Abzuege in Prozent fuer die Berechnung
    this.SetAbzuegeProzent = function (AbzuegeProzent) {
      this.m_dAbzuegeProzent = AbzuegeProzent;
    };

    //=============================================================================
    // Setzt die Anzahl der Personen fuer die Berechnung
    this.SetNrPersonen = function (Personen) {
      this.m_iPersonen = Personen;
    };

    //=============================================================================
    // Setzt die Art der Berechnung
    //-----------------------------------------------------------------------------
    // int | Berechnungsart | Berechnungsart
    // 0 | Zeitraumberechnung Von-Bis
    // 1 | Berechnung des Endtermins
    // 2 | Berechnung des Starttermins
    this.SetBerechnungsart = function (Berechnungsart) {
      this.m_iBerechnungsart = Berechnungsart;
    };

    //=============================================================================
    // Setzt das Startdatum fuer die Berechnung (CMobileDate)
    // Nicht notwendig bei Berechnungsart Starttermin
    this.SetDatumVon = function (DatumVon) {
      this.m_DatumVon = DatumVon;
    };

    //=============================================================================
    // Setzt das Enddatum fuer die Berechnung (CMobileDate)
    // Nicht notwendig bei Berechnungsart Endtermin
    this.SetDatumBis = function (DatumBis) {
      this.m_DatumBis = DatumBis;
    };

    //=============================================================================
    // Setzt die Dauer eines Projektes fuer die Berechnung
    // Nicht notwendig bei Berechnungsart Zeitraumberechnung
    this.SetProjektdauer = function (Projektdauer) {
      this.m_iProjektdauer = Projektdauer;
    };

    //=============================================================================
    // Gibt das gesetze Bundesland zurueck
    this.GetBundesland = function () {
      return this.m_iBundesland;
    };

    //=============================================================================
    // Gibt die gestzten Abzuege in Tagen zurueck
    this.GetAbzuegeTage = function () {
      return this.m_iAbzuegeTage;
    };

    //=============================================================================
    // Gibt die gesetzen Abzuege in Prozent zurueck
    this.GetAbzuegeProzent = function () {
      return this.m_dAbzuegeProzent;
    };

    //=============================================================================
    // Gibt die gesetzte Anzahl der Personen zurueck
    this.GetNrPersonen = function () {
      return this.m_iPersonen;
    };

    //=============================================================================
    // Gibt die gesetzte Berechnungsart zurueck
    this.GetBerechnungsart = function () {
      return this.m_iPersonen;
    };

    //=============================================================================
    // Gibt das gesetze DatumVon zurueck (CMobileDate)
    // Bei Starttermin Berechnung wird der berechnete Starttermin zurueckgegeben
    this.GetDatumVon = function () {
      return this.m_DatumVon;
    };

    //=============================================================================
    // Gibt das gesetze DatumBis zurueck
    // Bei Endtermin Berechnung wird der berechnete Endttermin zurueckgegeben
    this.GetDatumBis = function () {
      return this.m_DatumBis;
    };

    //=============================================================================
    // Gibt die Anzahl der berechneten Samstage zurueck
    this.GetNrSamstage = function () {
      return this.m_iSamstage;
    };

    //=============================================================================
    // Gibt die Anzahl der berechneten Brueckentage zurueck
    this.GetNrBrueckentage = function () {
      return this.m_iBrueckentage;
    };

    //=============================================================================
    // Gibt die Anzahl berechneten Feiertage zurueck, die nicht auf einen Sonn- oder Samstag fallen
    this.GetNrFeiertage = function () {
      return this.m_iFeiertage;
    };

    //=============================================================================
    // Gibt die Anzahl der berechneten Sonntage zurueck
    this.GetNrSonntage = function () {
      return this.m_iSonntage;
    };

    //=============================================================================
    // Gibt die gesetzte Konfession zurueck
    this.GetKonfession = function () {
      return this.m_iKonfession;
    };

    //=============================================================================
    // Gibt die gesetzte Projektdauer zurueck
    this.GetProjektdauer = function () {
      return this.m_iProjektdauer;
    };

    //=============================================================================
    // Gibt die Anzahl der abgezogenen Arbeitstage zurueck
    //-----------------------------------------------------------------------------
    // bool | Gruppe | GruppenFlag
    // true | Fuer die ganze Gruppe wieder
    // false | Fuer eine Person wieder
    //
    // int | Typ | Wahl der Abzuege
    // 1 | Alle Abzüge
    // 2 | Nur Fixe
    // 3 | Nur Prozentuale

    this.GetAbgezogen = function (Gruppe, Typ) {
      if (Typ == 1) {
        return this.GetAbgezogen(Gruppe, 2) + this.GetAbgezogen(Gruppe, 3);
      }
      else if (Typ == 2) {
        var dAbgezogenTage = this.m_iAbgezogenTage;
        if (!Gruppe)
          dAbgezogenTage /= this.GetNrPersonen();
        return dAbgezogenTage;
      }
      else if (Typ == 3) {
        return Math.ceil((this.GetArbeitstage(Gruppe, false) - this.GetAbgezogen(Gruppe, 2)) * (this.m_dAbzuegeProzent / 100));
      }
      return 0;
    };

    //=============================================================================
    // Gibt die Anzahl aller Kalenadertage im Zeitraum von DatumVon bis DatumBis zurueck
    this.GetTageInsgesamt = function () {
      return Math.floor(this.GetArbeitstage(false, false) + this.GetNrSonntage() + this.GetNrSamstage() + this.GetNrFeiertage());
    };

    //=============================================================================
    //@ Gibt die Anzahl der Arbeitstage zurueck
    //-----------------------------------------------------------------------------
    // bool | Gruppe | GruppenFlag
    // true | Fuer die ganze Gruppe wieder
    // false | Fuer eine Person wieder
    //
    // bool | MitAbzuegen | AbzuegeFlag
    // true | Mit allen Abzuegen
    // false | Ohne Abzuegen
    this.GetArbeitstage = function (Gruppe, MitAbzuegen) {
      var dArbeitstage = this.m_iArbeitstage; //this.m_iKonfession;
      if (Gruppe)
        dArbeitstage *= this.GetNrPersonen();
      if (MitAbzuegen) {
        dArbeitstage -= this.GetAbgezogen(Gruppe, 1);
      }
      return dArbeitstage;
    };
  }

  return Arbeitstage;

});
