define([
  "./estTarifZeile",
  "../shared/Euroumrechnung"
], function (
  Tarifzeile,
  EuroUmrechnung
) {
  "use strict";

  //var mytarif = new estTarif(1000, EUR, 45, 2012, 2323);
  //var tarifzeilemy = mytarif.BerechneTarif_2000(dfd, dfsdf);

  return function estTarif(zvE, zvEWaehrung, Aenderungsbetrag, Jahr, Veranlagung) {
    this.MAX_EST_TARIF_ZEILEN = 11;

    this.ZVE_UNTERGRENZE = 1.0;
    this.ZVE_OBERGRENZE = 99999999.99;
    this.AENDERUNGSBETRAG_UNTERGRENZE = -999999.99;
    this.AENDERUNGSBETRAG_OBERGRENZE = 999999.99;

    this.m_ZuVersteuerndesEinkommen = zvE;
    this.m_ZuVersteuerndesEinkommenWaehrung = zvEWaehrung;
    this.m_Aenderungsbetrag = Aenderungsbetrag;
    this.m_Jahr = Jahr;
    this.m_Veranlagung = Veranlagung;

    this.tarifzeilenliste;
    this.highlightTarif;

    this.BerechneTarif = function (Tarifzeile, zvE) {
      switch (this.m_Jahr) {

      case 2000:
        return this.BerechneTarif_2000(Tarifzeile, zvE);
        break;
      case 2001:
        return this.BerechneTarif_2001(Tarifzeile, zvE);
        break;
      case 2002:
      case 2003: // Achtung! verschobene Stufe der Steuerreform
        return this.BerechneTarif_2002_bis_2003(Tarifzeile, zvE);
        break;
      case 2004:
        return this.BerechneTarif_2004(Tarifzeile, zvE);
        break;
      case 2005:
      case 2006:
        return this.BerechneTarif_2005(Tarifzeile, zvE);
        break;
      case 2007:
      case 2008:
        return this.BerechneTarif_2007(Tarifzeile, zvE);
        break;
      case 2009:
        return this.BerechneTarif_2009(Tarifzeile, zvE);
      case 2010:
      case 2011:
      case 2012:
        return this.BerechneTarif_2010(Tarifzeile, zvE);
        break;
      case 2013:
        return this.BerechneTarif_2013(Tarifzeile, zvE);
        break;
      case 2014:
      case 2015:
      default:
        return this.BerechneTarif_2014(Tarifzeile, zvE);
        break;
      }
    };

    this.BerechneTarife = function () {
      var Euro = new EuroUmrechnung();
      var i = 0;

      var ZuVersteuerndesEinkommen = 0.0;
      var KumuliertesZuVersteuerndesEinkommen = 0.0;
      var Aenderungsbetrag = 0.0;
      var Soli = 0.0;

      // Währung der Ausgangsbeträge festlegen
      if (this.m_Jahr <= 2001) {
        this.m_Waehrung = Euro.WAEHRUNG_DEM;
      }
      else {
        this.m_Waehrung = Euro.WAEHRUNG_EUR;
      }

      // Auf gleiche Währung bringen!
      if (this.m_ZuVersteuerndesEinkommenWaehrung != this.m_Waehrung) {
        ZuVersteuerndesEinkommen = Euro.KonvertEuroWaehrung(this.m_ZuVersteuerndesEinkommen, //Euro-Umrechnung#################
          this.m_ZuVersteuerndesEinkommenWaehrung,
          this.m_Waehrung);

        Aenderungsbetrag = Euro.KonvertEuroWaehrung(this.m_Aenderungsbetrag, //Euro-Umrechnung#################
          this.m_ZuVersteuerndesEinkommenWaehrung,
          this.m_Waehrung);
      }
      else {
        ZuVersteuerndesEinkommen = this.m_ZuVersteuerndesEinkommen;
        Aenderungsbetrag = this.m_Aenderungsbetrag;
      }

      var rowCounter = 0;
      for (var i = 1; i < 7; i++) {
        if ((ZuVersteuerndesEinkommen - i * Aenderungsbetrag) <= 0) {
          break;
        }
        else {
          rowCounter = i - 1;
        }
      }

      this.highlightTarif = rowCounter;

      KumuliertesZuVersteuerndesEinkommen = ZuVersteuerndesEinkommen - (rowCounter * Aenderungsbetrag);

      /* Liste der EstTarifzeilen leeren
		 while (!m_EstTarifzeileList.IsEmpty())
		 {
		 delete m_EstTarifzeileList.GetHead();
		 m_EstTarifzeileList.RemoveHead();
		 }*/
      var TarifZeileListe = [];
      for (i = 0;
        (i < this.MAX_EST_TARIF_ZEILEN) && (KumuliertesZuVersteuerndesEinkommen >= this.ZVE_UNTERGRENZE) && (KumuliertesZuVersteuerndesEinkommen <= this.ZVE_OBERGRENZE); i++) {
        var myZeile = new Tarifzeile(0);
        this.BerechneTarif(myZeile, KumuliertesZuVersteuerndesEinkommen);
        TarifZeileListe.push(myZeile);

        KumuliertesZuVersteuerndesEinkommen = KumuliertesZuVersteuerndesEinkommen + Aenderungsbetrag;
      }

      this.tarifzeilenliste = TarifZeileListe;
    };

    this.getErgebniswerte = function (Index) //, double& zvE, double& Tarif, double& Durchschnitt, double& Grenzsteuer, double& Soli)
    {
      var result = {
        zvE: this.tarifzeilenliste[Index].getZuVersteuerndesEinkommen(),
        Tarif: this.tarifzeilenliste[Index].getTarif(),
        Durchschnitt: this.tarifzeilenliste[Index].getDurchschnittsteuersatz(),
        Grenzsteuer: this.tarifzeilenliste[Index].getGrenzsteuersatz(),
        Soli: this.tarifzeilenliste[Index].getSolidaritaetszuschlag()

      };
      return result;
    };

    this.getHighlightTarif = function () {
      return this.highlightTarif;
    };

    this.BerechneTarif_2000 = function (Tarifzeile, zvE) {
      var Bereich1 = 13499.0;
      var Bereich2 = 17495.0;
      var Bereich3 = 114695.0;
      var Tarif = 0.0;
      var Durchschnitt = 0.0;
      var Grenzsteuer = 0.0;
      var Soli = 0.0;

      Tarifzeile.setzvE(zvE);

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        zvE = Math.floor(zvE / 2);
      }

      var g = 54.0;
      var x = Math.floor((zvE / g) * g);
      var y = (x - 13446.0) / 10000.0;
      var z = (x - 17442.0) / 10000.0;

      if (zvE <= Bereich1) {
        Tarif = 0.0;
        Durchschnitt = 0.0;
        Grenzsteuer = 0.0;
        Soli = 0.0;
      }
      else {
        if (zvE > Bereich1 && zvE <= Bereich2) {
          Tarif = ((262.76 * y) + 2290.0) * y;
          Grenzsteuer = (262.76 * 2.0 * y) + 2290.0;
        }
        else {
          if (zvE > Bereich2 && zvE <= Bereich3) {
            Tarif = ((133.74 * z) + 2500.0) * z + 957.0;
            Grenzsteuer = (133.74 * 2.0 * z) + 2500.0;
          }
          else {
            if (zvE > Bereich3) {
              Tarif = 0.51 * x - 20575.0;
              Grenzsteuer = 0.51 * 10000.0;
            }
          }
        }
      }

      Grenzsteuer = Math.floor(Grenzsteuer) / 100.0;

      // Durchschnittsteuersatz
      Durchschnitt = Math.floor((Tarif / zvE) * 10000.0) / 100;

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        Tarif = Math.floor(Tarif) * 2.0;
      }
      else {
        Tarif = Math.floor(Tarif);
      }

      // Soli berechnen
      Soli = this.BerechneSoli(Tarif, 1836.0, this.m_Veranlagung, 5.5, 20.0);

      // Klassenvariablen
      Tarifzeile.setTarif(Tarif);
      Tarifzeile.setGrenzsteuer(Grenzsteuer);
      Tarifzeile.setDurchschnitt(Durchschnitt);
      Tarifzeile.setSoli(Soli);
      Tarifzeile.setWaehrung(this.m_Waehrung);

      return Tarifzeile;
    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // void CEstTarif::BerechneTarif_2001(CEstTarifZeile *Tarifzeile, double zvE)
    //
    // (c) Stefan Hack
    //
    // 13.03.2001
    //
    // Berechnet den Tarif, Durchschnitt- u. Grenzsteuersatz und Soli für 2001
    // Werte in DEM !!!
    //
    this.BerechneTarif_2001 = function (Tarifzeile, zvE) {
      var Bereich1 = 14093.0;
      var Bereich2 = 18089.0;
      var Bereich3 = 107567.0;
      var Tarif = 0.0;
      var Durchschnitt = 0.0;
      var Grenzsteuer = 0.0;
      var Soli = 0.0;

      Tarifzeile.setzvE(zvE);

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        zvE = Math.floor(zvE / 2);
      }

      var g = 54.0;
      var x = Math.floor((((zvE / g)) * g) + 27.0);
      var y = (x - 14040.0) / 10000.0;
      var z = (x - 18036.0) / 10000.0;

      if (zvE <= Bereich1) {
        Tarif = 0.0;
        Durchschnitt = 0.0;
        Grenzsteuer = 0.0;
        Soli = 0.0;
      }
      else {
        if (zvE > Bereich1 && zvE <= Bereich2) {
          Tarif = ((387.89 * y) + 1990.0) * y;
          Grenzsteuer = ((387.89 * 2.0 * y) + 1990.0);
        }
        else {
          if (zvE > Bereich2 && zvE <= Bereich3) {
            Tarif = ((142.49 * z) + 2300.0) * z + 857.0;
            Grenzsteuer = ((142.49 * 2.0 * z) + 2300.0);
          }
          else {
            if (zvE > Bereich3) {
              Tarif = 0.485 * x - 19299.0;
              Grenzsteuer = 0.485 * 10000.0;
            }
          }
        }
      }

      Grenzsteuer = Math.floor(Grenzsteuer) / 100.0;

      // Durchschnittsteuersatz
      Durchschnitt = Math.floor((Tarif / zvE) * 10000.0) / 100;

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        Tarif = Math.floor(Tarif) * 2.0;
      }
      else {
        Tarif = Math.floor(Tarif);
      }

      // Soli berechnen
      Soli = BerechneSoli(Tarif, 1836.0, m_Veranlagung, 5.5, 20.0);

      // Klassenvariablen
      Tarifzeile.setTarif(Tarif);
      Tarifzeile.setGrenzsteuer(Grenzsteuer);
      Tarifzeile.setDurchschnitt(Durchschnitt);
      Tarifzeile.setSoli(Soli);
      Tarifzeile.setWaehrung(this.m_Waehrung);

      return (Tarifzeile);
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // void CEstTarif::BerechneTarif_2002_bis_2003(CEstTarifZeile *Tarifzeile, double zvE)
    //
    // (c) Stefan Hack
    //
    // 13.03.2001
    //
    // Berechnet den Tarif, Durchschnitt- u. Grenzsteuersatz und Soli für 2002 und 2003
    // Werte in EUR !!!
    //
    this.BerechneTarif_2002_bis_2003 = function (Tarifzeile, zvE) {
      var Bereich1 = 7235.0;
      var Bereich2 = 9251.0;
      var Bereich3 = 55007.0;
      var Tarif = 0.0;
      var Durchschnitt = 0.0;
      var Grenzsteuer = 0.0;
      var Soli = 0.0;

      Tarifzeile.setzvE(zvE);

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        zvE = Math.floor(zvE / 2);
      }

      var g = 36.0;
      var x = Math.floor(((zvE / g) * g) + 18.0);
      var y = (x - 7200.0) / 10000.0;
      var z = (x - 9216.0) / 10000.0;

      if (zvE <= Bereich1) {
        Tarif = 0.0;
        Durchschnitt = 0.0;
        Grenzsteuer = 0.0;
        Soli = 0.0;
      }
      else {
        if (zvE > Bereich1 && zvE <= Bereich2) {
          Tarif = ((768.85 * y) + 1990.0) * y;
          Grenzsteuer = ((768.85 * 2.0 * y) + 1990.0);
        }
        else {
          if (zvE > Bereich2 && zvE <= Bereich3) {
            Tarif = ((278.65 * z) + 2300.0) * z + 432.0;
            Grenzsteuer = ((278.65 * 2.0 * z) + 2300.0);
          }
          else {
            if (zvE > Bereich3) {
              Tarif = 0.485 * x - 9872.0;
              Grenzsteuer = 0.485 * 10000.0;
            }
          }
        }
      }

      Grenzsteuer = Math.floor(Grenzsteuer) / 100.0;

      // Durchschnittsteuersatz
      Durchschnitt = Math.floor((Tarif / zvE) * 10000.0) / 100;

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        Tarif = Math.floor(Tarif) * 2.0;
      }
      else {
        Tarif = Math.floor(Tarif);
      }

      // Soli berechnen
      Soli = BerechneSoli(Tarif, 972.0, m_Veranlagung, 5.5, 20.0);

      // Klassenvariablen
      Tarifzeile.setTarif(Tarif);
      Tarifzeile.setGrenzsteuer(Grenzsteuer);
      Tarifzeile.setDurchschnitt(Durchschnitt);
      Tarifzeile.setSoli(Soli);
      Tarifzeile.setWaehrung(this.m_Waehrung);

      return Tarifzeile;
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // void CEstTarif::BerechneTarif_2004(CEstTarifZeile *Tarifzeile, double zvE)
    //
    // (c) Stefan Hack
    //
    // 13.03.2001
    // Letzte Änderung: 18.12.2003 RW
    //
    // Berechnet den Tarif, Durchschnitt- u. Grenzsteuersatz und Soli für 2004
    // Werte in EUR !!!
    //
    this.BerechneTarif_2004 = function (Tarifzeile, zvE) {
      var Bereich1 = 7664.0;
      var Bereich2 = 12739.0;
      var Bereich3 = 52151.0;
      var Tarif = 0.0;
      var Durchschnitt = 0.0;
      var Grenzsteuer = 0.0;
      var Soli = 0.0;

      Tarifzeile.setzvE(zvE);

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        zvE = floor(zvE / 2);
      }

      var g = 1.0;
      var x = ((Math.floor(zvE / g)) * g);
      var y = (x - 7664.0) / 10000.0;
      var z = (x - 12739.0) / 10000.0;

      if (zvE <= Bereich1) {
        Tarif = 0.0;
        Durchschnitt = 0.0;
        Grenzsteuer = 0.0;
        Soli = 0.0;
      }
      else {
        if (zvE > Bereich1 && zvE <= Bereich2) {
          Tarif = ((793.1 * y) + 1600.0) * y;
          Grenzsteuer = ((793.1 * y * 2) + 1600.0);
        }
        else {
          if (zvE > Bereich2 && zvE <= Bereich3) {
            Tarif = ((265.78 * z) + 2405.0) * z + 1016.0;
            Grenzsteuer = ((265.78 * z * 2) + 2405.0);
          }
          else {
            if (zvE > Bereich3) {
              Tarif = 0.45 * x - 8845.0;
              Grenzsteuer = 0.45 * 10000.0;
            }
          }
        }
      }

      Grenzsteuer = Math.floor(Grenzsteuer) / 100.0;

      // Durchschnittsteuersatz
      Durchschnitt = Math.floor((Tarif / zvE) * 10000.0) / 100;

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        Tarif = Math.floor(Tarif) * 2.0;
      }
      else {
        Tarif = Math.floor(Tarif);
      }

      // Soli berechnen
      Soli = BerechneSoli(Tarif, 972.0, m_Veranlagung, 5.5, 20.0);

      // Klassenvariablen
      Tarifzeile.setTarif(Tarif);
      Tarifzeile.setGrenzsteuer(Grenzsteuer);
      Tarifzeile.setDurchschnitt(Durchschnitt);
      Tarifzeile.setSoli(Soli);
      Tarifzeile.setWaehrung(this.m_Waehrung);

      return Tarifzeile;
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // void CEstTarif::BerechneTarif_2005(CEstTarifZeile *Tarifzeile, double zvE)
    //
    // (c) Stefan Hack
    //
    // 13.03.2001
    // Letzte Änderung: 18.12.2003 RW
    //
    // Berechnet den Tarif, Durchschnitt- u. Grenzsteuersatz und Soli für 2005
    // Werte in EUR !!!
    //
    this.BerechneTarif_2005 = function (Tarifzeile, zvE) {
      var Bereich1 = 7664.0;
      var Bereich2 = 12739.0;
      var Bereich3 = 52151.0;
      var Tarif = 0.0;
      var Durchschnitt = 0.0;
      var Grenzsteuer = 0.0;
      var Soli = 0.0;

      Tarifzeile.setzvE(zvE);

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        zvE = Math.floor(zvE / 2);
      }

      var g = 1.0;
      var x = Math.floor((zvE / g) * g);
      var y = (x - 7664.0) / 10000.0;
      var z = (x - 12739.0) / 10000.0;

      if (zvE <= Bereich1) {
        Tarif = 0.0;
        Durchschnitt = 0.0;
        Grenzsteuer = 0.0;
        Soli = 0.0;
      }
      else {
        if (zvE > Bereich1 && zvE <= Bereich2) {
          Tarif = ((883.74 * y) + 1500.0) * y;
          Grenzsteuer = ((883.74 * y * 2.0) + 1500.0);
        }
        else {
          if (zvE > Bereich2 && zvE <= Bereich3) {
            Tarif = ((228.74 * z) + 2397.0) * z + 989.0;
            Grenzsteuer = ((228.74 * z * 2.0) + 2397.0);
          }
          else {
            if (zvE > Bereich3) {
              Tarif = 0.42 * x - 7914.0;
              Grenzsteuer = 0.42 * 10000.0;
            }
          }
        }
      }

      Grenzsteuer = Math.floor(Grenzsteuer) / 100.0;

      // Durchschnittsteuersatz
      Durchschnitt = Math.floor((Tarif / zvE) * 10000.0) / 100;

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        Tarif = Math.floor(Tarif) * 2.0;
      }
      else {
        Tarif = Math.floor(Tarif);
      }

      // Soli berechnen
      Soli = BerechneSoli(Tarif, 972.0, m_Veranlagung, 5.5, 20.0);

      // Klassenvariablen
      Tarifzeile.setTarif(Tarif);
      Tarifzeile.setGrenzsteuer(Grenzsteuer);
      Tarifzeile.setDurchschnitt(Durchschnitt);
      Tarifzeile.setSoli(Soli);
      Tarifzeile.setWaehrung(this.m_Waehrung);

      return Tarifzeile;
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // void CEstTarif::BerechneTarif_2007(CEstTarifZeile *Tarifzeile, double zvE)
    //
    // (c) Stefan Hack
    //
    // 13.03.2001
    // Letzte Änderung: 14.11.2006 RW
    //
    // Berechnet den Tarif, Durchschnitt- u. Grenzsteuersatz und Soli für 2007
    // Werte in EUR !!!
    //
    this.BerechneTarif_2007 = function (Tarifzeile, zvE) {
      var Bereich1 = 7664.0;
      var Bereich2 = 12739.0;
      var Bereich3 = 52151.0;
      var Bereich4 = 250000.0;
      var Tarif = 0.0;
      var Durchschnitt = 0.0;
      var Grenzsteuer = 0.0;
      var Soli = 0.0;

      Tarifzeile.setzvE(zvE);

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        zvE = Math.floor(zvE / 2);
      }

      var g = 1.0;
      var x = Math.floor((zvE / g) * g);
      var y = (x - 7664.0) / 10000.0;
      var z = (x - 12739.0) / 10000.0;

      if (zvE <= Bereich1) {
        Tarif = 0.0;
        Durchschnitt = 0.0;
        Grenzsteuer = 0.0;
        Soli = 0.0;
      }
      else {
        if (zvE > Bereich1 && zvE <= Bereich2) {
          Tarif = ((883.74 * y) + 1500.0) * y;
          Grenzsteuer = ((883.74 * y * 2.0) + 1500.0);
        }
        else {
          if (zvE > Bereich2 && zvE <= Bereich3) {
            Tarif = ((228.74 * z) + 2397.0) * z + 989.0;
            Grenzsteuer = ((228.74 * z * 2.0) + 2397.0);
          }
          else {
            if (zvE > Bereich3 && zvE <= Bereich4) {
              Tarif = 0.42 * x - 7914.0;
              Grenzsteuer = 0.42 * 10000.0;
            }
            else {
              if (zvE > Bereich4) {
                Tarif = 0.45 * x - 15414.0;
                Grenzsteuer = 0.45 * 10000.0;
              }
            }
          }
        }
      }

      Grenzsteuer = Math.floor(Grenzsteuer) / 100.0;

      // Durchschnittsteuersatz
      Durchschnitt = Math.floor((Tarif / zvE) * 10000.0) / 100;

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        Tarif = Math.floor(Tarif) * 2.0;
      }
      else {
        Tarif = Math.floor(Tarif);
      }

      // Soli berechnen
      Soli = BerechneSoli(Tarif, 972.0, this.m_Veranlagung, 5.5, 20.0);

      // Klassenvariablen
      Tarifzeile.setTarif(Tarif);
      Tarifzeile.setGrenzsteuer(Grenzsteuer);
      Tarifzeile.setDurchschnitt(Durchschnitt);
      Tarifzeile.setSoli(Soli);
      Tarifzeile.setWaehrung(this.m_Waehrung);

      return Tarifzeile;
    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // void CEstTarif::BerechneTarif_2009(CEstTarifZeile *Tarifzeile, double zvE)
    //
    // (c) Stefan Hack
    //
    // 25.02.2009
    // Letzte Änderung: 25.02.2009 FS
    //
    // Berechnet den Tarif, Durchschnitt- u. Grenzsteuersatz und Soli für 2009
    // Werte in EUR !!!
    //
    this.BerechneTarif_2009 = function (Tarifzeile, zvE) {
      var Bereich1 = 7834.0;
      var Bereich2 = 13139.0;
      var Bereich3 = 52551.0;
      var Bereich4 = 250400.0;
      var Tarif = 0.0;
      var Durchschnitt = 0.0;
      var Grenzsteuer = 0.0;
      var Soli = 0.0;

      Tarifzeile.setzvE(zvE);

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        zvE = Math.floor(zvE / 2);
      }

      var g = 1.0;
      var x = ((Math.floor(zvE / g)) * g);
      var y = (x - 7834.0) / 10000.0;
      var z = (x - 13139.0) / 10000.0;

      if (zvE <= Bereich1) {
        Tarif = 0.0;
        Durchschnitt = 0.0;
        Grenzsteuer = 0.0;
        Soli = 0.0;
      }
      else {
        if ((zvE > Bereich1) && (zvE <= Bereich2)) {
          Tarif = ((939.68 * y) + 1400.0) * y;
          Grenzsteuer = ((939.68 * y * 2.0) + 1400.0);
        }
        else {
          if (zvE > Bereich2 && zvE <= Bereich3) {
            Tarif = ((228.74 * z) + 2397.0) * z + 1007.0;
            Grenzsteuer = ((228.74 * z * 2.0) + 2397.0);
          }
          else {
            if (zvE > Bereich3 && zvE <= Bereich4) {
              Tarif = 0.42 * x - 8064.0;
              Grenzsteuer = 0.42 * 10000.0;
            }
            else {
              if (zvE > Bereich4) {
                Tarif = 0.45 * x - 15576.0;
                Grenzsteuer = 0.45 * 10000.0;
              }
            }
          }
        }
      }

      Grenzsteuer = Math.floor(Grenzsteuer) / 100.0;

      // Durchschnittsteuersatz
      Durchschnitt = Math.floor((Tarif / zvE) * 10000.0) / 100;

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        Tarif = Math.floor(Tarif) * 2.0;
      }
      else {
        Tarif = Math.floor(Tarif);
      }

      // Soli berechnen
      Soli = BerechneSoli(Tarif, 972.0, this.m_Veranlagung, 5.5, 20.0);

      // Klassenvariablen
      Tarifzeile.setTarif(Tarif);
      Tarifzeile.setGrenzsteuer(Grenzsteuer);
      Tarifzeile.setDurchschnitt(Durchschnitt);
      Tarifzeile.setSoli(Soli);
      Tarifzeile.setWaehrung(this.m_Waehrung);

      return Tarifzeile;
    };


    this.BerechneTarif_2010 = function (Tarifzeile, zvE) {
      var Bereich1 = 8004.0;
      var Bereich2 = 13469.0;
      var Bereich3 = 52881.0;
      var Bereich4 = 250730.0;
      var Tarif = 0.0;
      var Durchschnitt = 0.0;
      var Grenzsteuer = 0.0;
      var Soli = 0.0;

      Tarifzeile.setzvE(zvE);

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        zvE = Math.floor(zvE / 2);
      }

      var g = 1.0;
      var x = ((Math.floor(zvE / g)) * g);
      var y = (x - 8004.0) / 10000.0;
      var z = (x - 13469.0) / 10000.0;

      if (zvE <= Bereich1) {
        Tarif = 0.0;
        Durchschnitt = 0.0;
        Grenzsteuer = 0.0;
        Soli = 0.0;
      }
      else {
        if ((zvE > Bereich1) && (zvE <= Bereich2)) {
          Tarif = ((912.17 * y) + 1400.0) * y;
          Grenzsteuer = ((912.17 * y * 2.0) + 1400.0);
        }
        else {
          if (zvE > Bereich2 && zvE <= Bereich3) {
            Tarif = ((228.74 * z) + 2397.0) * z + 1038.0;
            Grenzsteuer = ((228.74 * z * 2.0) + 2397.0);
          }
          else {
            if (zvE > Bereich3 && zvE <= Bereich4) {
              Tarif = 0.42 * x - 8172.0;
              Grenzsteuer = 0.42 * 10000.0;
            }
            else {
              if (zvE > Bereich4) {
                Tarif = 0.45 * x - 15694.0;
                Grenzsteuer = 0.45 * 10000.0;
              }
            }
          }
        }
      }

      Grenzsteuer = Math.floor(Grenzsteuer) / 100.0;

      // Durchschnittsteuersatz
      Durchschnitt = Math.floor((Tarif / zvE) * 10000.0) / 100;

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        Tarif = Math.floor(Tarif) * 2.0;
      }
      else {
        Tarif = Math.floor(Tarif);
      }

      // Soli berechnen
      Soli = BerechneSoli(Tarif, 972.0, this.m_Veranlagung, 5.5, 20.0);

      // Klassenvariablen
      Tarifzeile.setTarif(Tarif);
      Tarifzeile.setGrenzsteuer(Grenzsteuer);
      Tarifzeile.setDurchschnitt(Durchschnitt);
      Tarifzeile.setSoli(Soli);
      Tarifzeile.setWaehrung(this.m_Waehrung);

      return Tarifzeile;
    };


    this.BerechneTarif_2013 = function (Tarifzeile, zvE) {
      var Bereich1 = 8130.0;
      var Bereich2 = 13469.0;
      var Bereich3 = 52881.0;
      var Bereich4 = 250730.0;
      var Tarif = 0.0;
      var Durchschnitt = 0.0;
      var Grenzsteuer = 0.0;
      var Soli = 0.0;

      Tarifzeile.setzvE(zvE);

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        zvE = Math.floor(zvE / 2);
      }

      var g = 1.0;
      var x = ((Math.floor(zvE / g)) * g);
      var y = (x - 8130.0) / 10000.0;
      var z = (x - 13469.0) / 10000.0;

      if (zvE <= Bereich1) {
        Tarif = 0.0;
        Durchschnitt = 0.0;
        Grenzsteuer = 0.0;
        Soli = 0.0;
      }
      else {
        if ((zvE > Bereich1) && (zvE <= Bereich2)) {
          Tarif = ((933.7 * y) + 1400.0) * y;
          Grenzsteuer = ((933.7 * y * 2.0) + 1400.0);
        }
        else {
          if (zvE > Bereich2 && zvE <= Bereich3) {
            Tarif = ((228.74 * z) + 2397.0) * z + 1014.0;
            Grenzsteuer = ((228.74 * z * 2.0) + 2397.0);
          }
          else {
            if (zvE > Bereich3 && zvE <= Bereich4) {
              Tarif = 0.42 * x - 8196.0;
              Grenzsteuer = 0.42 * 10000.0;
            }
            else {
              if (zvE > Bereich4) {
                Tarif = 0.45 * x - 15718.0;
                Grenzsteuer = 0.45 * 10000.0;
              }
            }
          }
        }
      }

      Grenzsteuer = Math.floor(Grenzsteuer) / 100.0;

      // Durchschnittsteuersatz
      Durchschnitt = Math.floor((Tarif / zvE) * 10000.0) / 100;

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        Tarif = Math.floor(Tarif) * 2.0;
      }
      else {
        Tarif = Math.floor(Tarif);
      }

      // Soli berechnen
      Soli = BerechneSoli(Tarif, 972.0, this.m_Veranlagung, 5.5, 20.0);

      // Klassenvariablen
      Tarifzeile.setTarif(Tarif);
      Tarifzeile.setGrenzsteuer(Grenzsteuer);
      Tarifzeile.setDurchschnitt(Durchschnitt);
      Tarifzeile.setSoli(Soli);
      Tarifzeile.setWaehrung(this.m_Waehrung);

      return Tarifzeile;
    };

    this.BerechneTarif_2014 = function (Tarifzeile, zvE) {
      var Bereich1 = 8354.0;
      var Bereich2 = 13469.0;
      var Bereich3 = 52881.0;
      var Bereich4 = 250730.0;
      var Tarif = 0.0;
      var Durchschnitt = 0.0;
      var Grenzsteuer = 0.0;
      var Soli = 0.0;

      Tarifzeile.setzvE(zvE);

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        zvE = Math.floor(zvE / 2);
      }

      var g = 1.0;
      var x = ((Math.floor(zvE / g)) * g);
      var y = (x - 8354.0) / 10000.0;
      var z = (x - 13469.0) / 10000.0;

      if (zvE <= Bereich1) {
        Tarif = 0.0;
        Durchschnitt = 0.0;
        Grenzsteuer = 0.0;
        Soli = 0.0;
      }
      else {
        if ((zvE > Bereich1) && (zvE <= Bereich2)) {
          Tarif = ((974.58 * y) + 1400.0) * y;
          Grenzsteuer = ((974.58 * y * 2.0) + 1400.0);
        }
        else {
          if (zvE > Bereich2 && zvE <= Bereich3) {
            Tarif = ((228.74 * z) + 2397.0) * z + 971.0;
            Grenzsteuer = ((228.74 * z * 2.0) + 2397.0);
          }
          else {
            if (zvE > Bereich3 && zvE <= Bereich4) {
              Tarif = 0.42 * x - 8239.0;
              Grenzsteuer = 0.42 * 10000.0;
            }
            else {
              if (zvE > Bereich4) {
                Tarif = 0.45 * x - 15761.0;
                Grenzsteuer = 0.45 * 10000.0;
              }
            }
          }
        }
      }

      Grenzsteuer = Math.floor(Grenzsteuer) / 100.0;

      // Durchschnittsteuersatz
      Durchschnitt = Math.floor((Tarif / zvE) * 10000.0) / 100;

      // Veranlagung mit einbeziehen
      if (this.m_Veranlagung == 1) // (Splitting)
      {
        Tarif = Math.floor(Tarif) * 2.0;
      }
      else {
        Tarif = Math.floor(Tarif);
      }

      // Soli berechnen
      Soli = BerechneSoli(Tarif, 972.0, this.m_Veranlagung, 5.5, 20.0);

      // Klassenvariablen
      Tarifzeile.setTarif(Tarif);
      Tarifzeile.setGrenzsteuer(Grenzsteuer);
      Tarifzeile.setDurchschnitt(Durchschnitt);
      Tarifzeile.setSoli(Soli);
      Tarifzeile.setWaehrung(this.m_Waehrung);

      return Tarifzeile;
    };

    //##############################

    function BerechneSoli(Tarif, Basis, Veranlagung, SoliProzentsatz, SoliProzentsatzMax) {
      var Untergrenze = 0.0;
      var Obergrenze = 0.0;
      var Soli = 0.0;

      if (Veranlagung == 1) // (Splitting)
      {
        Untergrenze = (Basis * 2.0);
      }
      else {
        Untergrenze = Basis;
      }

      // Soli berechnen
      Obergrenze = (SoliProzentsatzMax / (SoliProzentsatzMax - SoliProzentsatz)) * Untergrenze;

      if (Tarif < Untergrenze) {
        Soli = 0.0;
      }
      else {
        if (Tarif >= Untergrenze && Tarif <= Obergrenze) { // Nachkommastellen kürzen
          Soli = Math.floor(((Tarif - Untergrenze) * SoliProzentsatzMax) / 100.0);
        }
        else {
          Soli = Math.floor(Tarif * SoliProzentsatz / 100.0);
        }
      }

      return (Soli);
    };

  }

});
