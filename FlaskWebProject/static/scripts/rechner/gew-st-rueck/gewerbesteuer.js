define([
  '../shared/Euroumrechnung',
  '../shared/RundeNachkommastellen'
], function (
  EuroUmrechnung,
  RundeNachkommastellen
) {

  function CGewerbesteuer() {
    var waehrung = new EuroUmrechnung();

    var WAEHRUNG_EUR = waehrung.WAEHRUNG_EUR; //EuroUmrechnung.WAEHRUNG_EUR;
    var GESFORM_KAP = 0;
    var GESFORM_ANDERE = 1;

    var MAX_AUSGABEZEILEN = 30;
    var MAX_AUSGABESPALTEN = 5;

    var LIST_INDEX_EUR = 0;
    var LIST_INDEX_DEM = 1;

    this.m_Gewerbeertrag = 0.0;
    this.m_Hebesatz = 0.0;
    this.m_Vorauszahlung = 0.0;
    this.m_GesForm = GESFORM_KAP; // + GESFORM_ANDERE
    this.m_EingabewaehrungIndex = 0;
    this.m_AusgabewaehrungIndex = 0;
    this.m_Ausgangswaehrung = WAEHRUNG_EUR;
    this.m_Zielwaehrung = WAEHRUNG_EUR;


    this.setBerechnungswerte = function (sJahr, Gewerbeertrag, Hebesatz, Vorauszahlung, GesForm) {
      this.m_sJahr = sJahr;
      this.m_Gewerbeertrag = Gewerbeertrag;
      this.m_Hebesatz = Hebesatz;
      this.m_Vorauszahlung = Vorauszahlung;
      this.m_GesForm = GesForm;

      this.m_Ausgangswaehrung = WAEHRUNG_EUR;
      this.m_Zielwaehrung = WAEHRUNG_EUR;
    };


    this.BerechneGewerbesteuerRueckstellungUndMessbetrag = function (GewerbesteuerBetrag, GewerbesteuerProzent, GewerbeMessbetrag) {
      if (this.m_sJahr <= 2007) {
        return this.BerechneGewerbesteuerRueckstellungUndMessbetragBis2007(GewerbesteuerBetrag, GewerbesteuerProzent, GewerbeMessbetrag);
      }
      else // ab 2008
      {
        return this.BerechneGewerbesteuerRueckstellungUndMessbetragAb2008(GewerbesteuerBetrag, GewerbesteuerProzent, GewerbeMessbetrag);
      }
    };


    // Berechnet aufgrund der gesetzten Membervariablen die Gewerbesteuerrückstellung
    this.BerechneGewerbesteuerRueckstellungUndMessbetragBis2007 = function (GewerbesteuerBetrag, GewerbesteuerProzent, GewerbeMessbetrag)
    //TODO: Nicht vergessen: function( double &GewerbesteuerBetrag, double &GewerbesteuerProzent, double &GewerbeMessbetrag )
    {
      var Freibetrag = 0.0;
      var Grenzbetrag1 = 0.0;
      var Grenzbetrag2 = 0.0;
      var Grenzbetrag3 = 0.0;
      var Grenzbetrag4 = 0.0;
      var Grenzbetrag5 = 0.0;
      var Gewerbeertrag = 0.0;
      var Hebesatz = 0.0;
      var Vorauszahlung = 0.0;
      var BasisMessbetrag = 0.0;
      var Steuermesszahl = 0;
      var DivisorMessbetrag = 50;

      // Beträge in die Entsprechende Währung umrechnen (wenn nötig)
      if (this.m_Ausgangswaehrung != this.m_Zielwaehrung) { // Gewerbeertrag
        var Gewerbeertrag = EuroUmrechnung.KonvertEuroWaehrung(m_Gewerbeertrag, m_Ausgangswaehrung, m_Zielwaehrung);
        // Vorauszahlung
        var Vorauszahlung = EuroUmrechnung.KonvertEuroWaehrung(m_Vorauszahlung, m_Ausgangswaehrung, m_Zielwaehrung);
      }
      else {
        var Gewerbeertrag = m_Gewerbeertrag;
        var Vorauszahlung = m_Vorauszahlung;
      }

      // Hebesatz
      var Hebesatz = m_Hebesatz;

      // Runden des Gewerbeertrags
      switch (this.m_Zielwaehrung) {
      case WAEHRUNG_EUR:
        Gewerbeertrag = Math.floor((Gewerbeertrag / 50) * 50);
        break;
      case WAEHRUNG_DEM:
        Gewerbeertrag = Math.floor((Gewerbeertrag / 100) * 100);
        break;
      }

      // Grenzbeträge je nach Währung setzen
      switch (this.m_Zielwaehrung) {
      case WAEHRUNG_EUR:
        Grenzbetrag1 = 24500.0;
        Grenzbetrag2 = 36500.0;
        Grenzbetrag3 = 48500.0;
        Grenzbetrag4 = 60500.0;
        Grenzbetrag5 = 72500.0;
        break;
      case WAEHRUNG_DEM:
        Grenzbetrag1 = 48000.0;
        Grenzbetrag2 = 72000.0;
        Grenzbetrag3 = 96000.0;
        Grenzbetrag4 = 120000.0;
        Grenzbetrag5 = 144000.0;
        break;
      }

      if (this.m_GesForm == GESFORM_ANDERE) {
        if (Gewerbeertrag <= Grenzbetrag1) {
          Steuermesszahl = 0;
          Freibetrag = 0.0;
        }
        else {
          if (Gewerbeertrag > Grenzbetrag1 &&
            Gewerbeertrag <= Grenzbetrag2) {
            Steuermesszahl = 1;
            switch (m_Zielwaehrung) {
            case WAEHRUNG_EUR:
              Freibetrag = 24500.0;
              break;
            case WAEHRUNG_DEM:
              Freibetrag = 48000.0;
              break;
            }
          }
          else {
            if (Gewerbeertrag > Grenzbetrag2 &&
              Gewerbeertrag <= Grenzbetrag3) {
              Steuermesszahl = 2;
              switch (m_Zielwaehrung) {
              case WAEHRUNG_EUR:
                Freibetrag = 30500.0;
                break;
              case WAEHRUNG_DEM:
                Freibetrag = 60000.0;
                break;
              }
            }
            else {
              if (Gewerbeertrag > Grenzbetrag3 &&
                Gewerbeertrag <= Grenzbetrag4) {
                Steuermesszahl = 3;
                switch (m_Zielwaehrung) {
                case WAEHRUNG_EUR:
                  Freibetrag = 36500.0;
                  break;
                case WAEHRUNG_DEM:
                  Freibetrag = 72000.0;
                  break;
                }
              }
              else {
                if (Gewerbeertrag > Grenzbetrag4 &&
                  Gewerbeertrag <= Grenzbetrag5) {
                  Steuermesszahl = 4;
                  switch (m_Zielwaehrung) {
                  case WAEHRUNG_EUR:
                    Freibetrag = 42500.0;
                    break;
                  case WAEHRUNG_DEM:
                    Freibetrag = 84000.0;
                    break;
                  }
                }
                else {
                  if (Gewerbeertrag > Grenzbetrag5) {
                    Steuermesszahl = 5;
                    switch (m_Zielwaehrung) {
                    case WAEHRUNG_EUR:
                      Freibetrag = 48500.0;
                      break;
                    case WAEHRUNG_DEM:
                      Freibetrag = 96000.0;
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }
      else // Kapitalgesellschaft
      {
        Steuermesszahl = 5;
        Freibetrag = 0.0;
      }

      // Gewerbesteuerrückstellung berechnen
      GewerbesteuerBetrag = Math.floor((((((Gewerbeertrag - Freibetrag + Vorauszahlung) * Steuermesszahl) / 100) * (Hebesatz / 100)) / (1 + (Steuermesszahl * Hebesatz) / 10000)) - Vorauszahlung);

      GewerbesteuerProzent = ((GewerbesteuerBetrag + Vorauszahlung) * 100) / Gewerbeertrag;

      // Runden
      GewerbesteuerProzent = RundeNachkommastellen((GewerbesteuerProzent), 3);

      // Die Basis für den Gewerbesteuermessbetrag berechnen
      var BasisMessbetrag = Math.floor(((Gewerbeertrag - (GewerbesteuerBetrag)) / DivisorMessbetrag) * DivisorMessbetrag);

      // Gewerbemessbetrag berechnen
      GewerbeMessbetrag = Math.floor(((BasisMessbetrag - Freibetrag) * Steuermesszahl) / 100);

      var erg = {
        GewerbesteuerBetrag: GewerbesteuerBetrag,
        GewerbesteuerProzent: GewerbesteuerProzent,
        GewerbeMessbetrag: GewerbeMessbetrag
      }

      return erg;

    };

    this.BerechneGewerbesteuerRueckstellungUndMessbetragAb2008 = function (dGewerbesteuerrueckstellung, GewerbesteuerProzent, GewerbeMessbetrag) {
      //ab 2008
      var dSteuermesszahl = 0.0,
        dGewerbeertrag = 0.0;
      var lFreibetrag = 0;

      var Gewerbeertrag = this.m_Gewerbeertrag;

      if (this.m_GesForm == 1) {
        dSteuermesszahl = 3.5;
        lFreibetrag = 24500;
      }
      else {
        dSteuermesszahl = 3.5;
        lFreibetrag = 0;
      }
      dGewerbeertrag = Math.floor((Gewerbeertrag / 100) * 100);
      GewerbeMessbetrag = Math.floor(((dGewerbeertrag - lFreibetrag) * (dSteuermesszahl / 100)));
      //GewerbeMessbetrag = ((dGewerbeertrag - lFreibetrag) * (dSteuermesszahl / 100));


      if (this.m_GesForm == 1 && Gewerbeertrag <= 24500) {
        dSteuermesszahl = 0;
        lFreibetrag = 0;
      }
      //dGewerbesteuerrueckstellung = Math.floor(((Gewerbeertrag - lFreibetrag) * (dSteuermesszahl / 100)) * (this.m_Hebesatz / 100) - this.m_Vorauszahlung);
      dGewerbesteuerrueckstellung = Math.floor((Gewerbeertrag - lFreibetrag) * (dSteuermesszahl / 100)) * (this.m_Hebesatz / 100) - this.m_Vorauszahlung;

      GewerbesteuerProzent = ((dGewerbesteuerrueckstellung + this.m_Vorauszahlung) * 100) / Gewerbeertrag;
      GewerbesteuerProzent = RundeNachkommastellen((GewerbesteuerProzent), 3);

      //return new Array(dGewerbesteuerrueckstellung, GewerbesteuerProzent, GewerbeMessbetrag);
      var erg = {
        GewerbesteuerBetrag: dGewerbesteuerrueckstellung,
        GewerbesteuerProzent: GewerbesteuerProzent,
        GewerbeMessbetrag: GewerbeMessbetrag
      }

      return erg;
    };
  }

  return CGewerbesteuer;

});
