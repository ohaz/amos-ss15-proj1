define([
  './projektPlanerMobileDate'
], function (
  CMobileDate
) {

  function CFeiertage() {
    /*
        BB = Brandenburg
        BE = Berlin
        BW = Baden-Württemberg
        BY = Bayern
        HB = Bremen
        HE = Hessen
        HH = Hamburg
        MV = Mecklenburg-Vorpommern
        NI = Niedersachsen
        NW = Nordrhein-Westfalen
        RP = Rheinland-Pfalz
        SH = Schlewsig-Holstein
        SL = Saarland
        SN = Sachsen
        ST = Sachsen-Anhalt
        TH = Thüringen
        */

    // Werte: 0 = Kein Feiertag  1 = Feiertag
    // 2 = Feiertag bei Gemeinden mit überwiegend katholischer Bevölkerung
    // 3 = Feiertag bei Gemeinden mit überwiegend evangelischer Bevölkerung

    this.m_FeiertagsTabellen = [
      //                    BB BE BW BY HB HE HH MV NI NW RP SH SL SN ST TH
      /*Neujahrstag*/       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      /*Drei Könige*/       [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      /*Karfreitag*/        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      /*Rosenmontag*/       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /*Aschermittwoch*/    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /*Grünndonnerstag*/   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /*Ostermontag*/       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      /*Maifeiertag*/       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      /*Chri.Himmelfahrt*/  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      /*Pfingstmontag*/     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      /*Fronleichnam*/      [0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 2, 0, 0, 2],
      /*TDeut. Einheit*/    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      /*Allerheiligen*/     [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
      /*Heiligabend*/       [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /*1.Weihnachtstag*/   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      /*2.Weihnachtstag*/   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      /*Silvester*/         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      /*MariaHimmelfahrt*/  [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      /*Reformationstag*/   [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1],
      /*Buß- und Bettag*/   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
    ];

    this.m_strFeiertagsNamen = [
      "Neujahrstag",
      "Hl. Drei Könige",
      "Karfreitag",
      "Rosenmontag",
      "Aschermittwoch",
      "Gründonnerstag",
      "Ostermontag",
      "Maifeiertag",
      "Himmelfahrt",
      "Pfingstmontag",
      "Fronleichnam",
      "Tag der Dt. Einheit",
      "Allerheiligen",
      "Heiligabend",
      "1. Weihnachtstag",
      "2. Weihnachtstag",
      "Silvester",
      "Maria Himmelfahrt",
      "Reformationstag",
      "Buß- und Bettag"
    ];

    //=============================================================================
    // Ueberprueft ob ein Feiertag gueltig ist
    this.GueltigerFeiertag = function (Jahr, BundeslandID, KonfessionsID, FeiertagsID) {
      if (this.m_FeiertagsTabellen[FeiertagsID - 1][BundeslandID - 1] == 1)
        return true;
      else {
        if (KonfessionsID > 1) {
          if (this.m_FeiertagsTabellen[FeiertagsID - 1][BundeslandID - 1] == (KonfessionsID))
            return true;
        }
        else {
          if (this.m_FeiertagsTabellen[FeiertagsID - 1][BundeslandID - 1] > 1)
            return true;
        }
      }
      return false;
    };

    //=============================================================================
    // Berechnet das Datum eines Feiertages (CMobileDate)
    this.GetFeiertag = function (Jahr, FeiertagsID) {
      var TempDate = new CMobileDate();
      TempDate.SetYear(Jahr);

      switch (FeiertagsID) {
      case 1:
        // Neujahrstag:
        TempDate.SetDate(1, 1, Jahr);
        return TempDate;
      case 2:
        // Hl. Drei Könige:
        TempDate.SetDate(6, 1, Jahr);
        return TempDate;
      case 3:
        {
          // Karfreitag:
          var a, b, c, d, e, s, M, N;
          a = Jahr % 19;
          b = Jahr % 4;
          c = Jahr % 7;

          M = Math.floor((Math.floor(8 * Math.floor(Jahr / 100) + 13) / 25 - 2));
          s = Math.floor((Math.floor(Jahr / 100) - Math.floor(Jahr / 400) - 2));
          M = (15 + s - M) % 30;
          N = (6 + s) % 7;
          d = (19 * a + M) % 30;
          if (d == 29) d = 28;
          else {
            if (d == 28 && a > 10) d = 27;
          }
          e = (2 * b + 4 * c + 6 * d + N) % 7;

          TempDate.SetDate(21, 3, Jahr);
          TempDate.SetNr(TempDate.GetNr() + d + e - 1, Jahr);
          return TempDate;
        }

      case 4:
        TempDate.SetNr(this.GetFeiertag(Jahr, 3)
          .GetNr() - 46);
        return TempDate;

      case 5:
        TempDate.SetNr(this.GetFeiertag(Jahr, 3)
          .GetNr() - 44);
        return TempDate;

      case 6:
        // Gründonnerstag:
        TempDate.SetNr(this.GetFeiertag(Jahr, 3)
          .GetNr() - 1);
        return TempDate;

      case 7:
        // Ostermontag:
        TempDate.SetNr(this.GetFeiertag(Jahr, 3)
          .GetNr() + 3);
        return TempDate;

      case 8:
        // Maifeiertag:
        TempDate.SetDate(1, 5, Jahr);
        return TempDate;

      case 9:
        // Himmelfahrt:
        TempDate.SetNr(this.GetFeiertag(Jahr, 3)
          .GetNr() + 3 + 38);
        return TempDate;
      case 10:
        // Pfingstmontag:
        TempDate.SetNr(this.GetFeiertag(Jahr, 3)
          .GetNr() + 3 + 49);
        return TempDate;

      case 11:
        // Fronleichnam:
        TempDate.SetNr(this.GetFeiertag(Jahr, 3)
          .GetNr() + 3 + 59);
        return TempDate;

      case 12:
        // Tag der Deut. Einheit:
        TempDate.SetDate(3, 10, Jahr);
        return TempDate;

      case 13:
        // Allerheiligen:
        TempDate.SetDate(1, 11, Jahr);
        return TempDate;

      case 14:
        // Heiligabend:
        TempDate.SetDate(24, 12, Jahr);
        return TempDate;

      case 15:
        // 1. Weihnachtstag:
        TempDate.SetDate(25, 12, Jahr);
        return TempDate;

      case 16:
        // 2. Weihnachtstag:
        TempDate.SetDate(26, 12, Jahr);
        return TempDate;

      case 17:
        // Silvester:
        var date = new CMobileDate();
        TempDate.SetDate(date.GetNrDaysInMonth(Jahr, 12), 12, Jahr);
        return TempDate;

      case 18:
        //Maria Himmelfahrt 15.august?
        TempDate.SetDate(15, 8, Jahr);
        return TempDate;

      case 19:
        //Reformationstag 31.oktober?
        TempDate.SetDate(31, 10, Jahr);
        return TempDate;

      case 20:
        //Buß- und Bettag
        TempDate.SetDate(24, 12, Jahr);
        if (TempDate.GetDayOfWeek(24, 12, Jahr) == 6)
          TempDate.SetNr(TempDate.GetNr() - 32, Jahr);
        else {
          var tempNr = TempDate.GetNr();
          var tempWe = TempDate.GetDayOfWeek(24, 12, Jahr);
          TempDate.SetNr(tempNr - 33 - tempWe, Jahr);
        }

        return TempDate;
      default:
        //Error
        TempDate.SetDate(1, 1, Jahr);
        return TempDate;
      }
    };

    this.GetFeiertagName = function (FeiertagsID) {
      return this.m_strFeiertagsNamen[FeiertagsID - 1];
    };

    this.GetFeiertagID = function (jahr, bundesland, konfession, jahrTag) {
      for (var iZaehler = 1; iZaehler <= 20; iZaehler++) {
        if (this.GueltigerFeiertag(jahr, bundesland, konfession, iZaehler)) {
          var feierTagDate = this.GetFeiertag(jahr, iZaehler);
          if (jahrTag == feierTagDate.GetNr() - 1) {
            return iZaehler;
          }
        }
      }
    }
  }

  return CFeiertage;

});