define([
  "./estTarif",
  "../shared/Euroumrechnung"
], function (
  estTarif,
  EuroUmrechnung
) {
  "use strict";

  return function CEstPar2() {
    var Euro = new EuroUmrechnung();

    this.SetBerechnungswerte = function (Veranlagungszeitraum,
                                         Veranlagungsform,
                                         Kirchensteuer,
                                         EinkuenfteGewerbebetrieb,
                                         Messbetrag,
                                         weitere_pos_Einkuenfte,
                                         weitere_neg_Einkuenfte,
                                         Sonderausgaben
    ) {
      this.m_Veranlagungszeitraum = Veranlagungszeitraum;
      this.m_Veranlagungsform = Veranlagungsform;
      this.m_Kirchensteuer = Kirchensteuer;
      this.m_EinkuenfteGewerbebetrieb = EinkuenfteGewerbebetrieb;
      this.m_Messbetrag = Messbetrag;
      this.m_weitere_pos_Einkuenfte = weitere_pos_Einkuenfte;
      this.m_weitere_neg_Einkuenfte = weitere_neg_Einkuenfte;
      this.m_Sonderausgaben = Sonderausgaben;
    };

    // Gibt die Summe der Einkuenfte zurueck, vorher muss SetBerechnungswerte ausgeführt werden
    this.GetGesamtEinkuenfte = function () {
      var EinkueGesamt;
      var MaxAbzug;

      //		EinkueGesamt = this.m_weitere_pos_Einkuenfte;

      //		if (this.m_EinkuenfteGewerbebetrieb < 0)
      //			this.m_weitere_neg_Einkuenfte += this.m_EinkuenfteGewerbebetrieb;

      //		MaxAbzug = EinkueGesamt + ( 51500 * (1 + this.m_Veranlagungsform));
      //		MaxAbzug = MaxAbzug / 2;
      //		if (MaxAbzug >= MaxAbzug + 0.5)
      //			MaxAbzug += 1;
      //		//MaxAbzug = long(MaxAbzug);
      //
      //		if ((this.m_weitere_neg_Einkuenfte * (-1)) > MaxAbzug){
      //			EinkueGesamt -= MaxAbzug;
      //		}else{
      //			EinkueGesamt += this.m_weitere_neg_Einkuenfte;
      //		}

      //		EinkueGesamt += this.m_weitere_neg_Einkuenfte;

      //		if (EinkueGesamt < 0) EinkueGesamt = this.m_weitere_pos_Einkuenfte + this.m_EinkuenfteGewerbebetrieb + this.m_weitere_neg_Einkuenfte;

      EinkueGesamt = this.m_weitere_neg_Einkuenfte + this.m_weitere_pos_Einkuenfte + this.m_EinkuenfteGewerbebetrieb;

      if (this.m_EinkuenfteGewerbebetrieb < 0)
        this.m_weitere_neg_Einkuenfte += this.m_EinkuenfteGewerbebetrieb;

      return EinkueGesamt;
    };

    // Berechnet die Ergebniswerte, vorher ist notwending das SetBerechnungswerte() ausgeführt wird
    this.GetErgebniswerte = function () { //(double *GesamtEinkuenfte, double *zvK, double *TarifEst, double *festEst, double *Sol, double *Kirchst, double *Durchschnitt, double *Grenz){
      var zwisch;
      var SoliSteuersatz = 0.055;
      var SoliFreigrenze = 972;
      var EinkueGesamt = this.GetGesamtEinkuenfte();

      var GesamtEinkuenfte = EinkueGesamt;

      //zu versteuerndes Einkommen wird berechnet
      var zvK = EinkueGesamt - this.m_Sonderausgaben;
      var TarifEst = 0;
      var festEst = 0;
      var Sol = 0;
      var Kirchst = 0;
      var Durchschnitt = 0;
      var Grenz = 0;

      //Es muss nur berechnet werden, falls wir überhaupt ein positives zu versteuerndes Einkommen haben
      if (zvK > 0) {
        //Tarif, Grenzsteuersatz und Durchschnitssteuersatz werden ermittelt mit hilfe der CEstTarif Klasse
        var derTarif = new estTarif(zvK, Euro.WAEHRUNG_EUR, 0, this.m_Veranlagungszeitraum, this.m_Veranlagungsform);

        //CEstTarif derTarif(*zvK, WAEHRUNG_EUR, 0, m_Veranlagungszeitraum, m_Veranlagungsform);
        derTarif.BerechneTarife();
        zwisch = zvK;
        //derTarif.getErgebniswerte(1, zwisch, *TarifEst, *Durchschnitt, *Grenz, *Sol);
        var temp = derTarif.getErgebniswerte(1);
        zvK = temp.zvE;
        TarifEst = temp.Tarif;
        Durchschnitt = temp.Durchschnitt;
        Grenz = temp.Grenzsteuer;
        Sol = temp.Soli;

        //Festzusetzende Einkommenssteuer wird berechnet:
        festEst = TarifEst - this.GetSteuerermaessigung(EinkueGesamt, TarifEst);

        //Solidaritätszuschlag wird berechnet:
        Sol = festEst * SoliSteuersatz;
        zwisch = (festEst - (SoliFreigrenze * (1 + this.m_Veranlagungsform))) * 0.2;
        if (Sol > zwisch)
          Sol = zwisch;
        Sol = Math.floor(Sol);

        //Kirchensteuer wird berechnet:
        Kirchst = TarifEst * this.m_Kirchensteuer / 100; //festEst * this.m_Kirchensteuer / 100;
        Kirchst = Math.floor(Kirchst);

        //negative Ergebnise sind unzulässig
        if (TarifEst < 0)
          TarifEst = 0;
        if (festEst < 0)
          festEst = 0;
        if (Sol < 0)
          Sol = 0;
        if (Kirchst < 0)
          Kirchst = 0;
        if (Durchschnitt < 0)
          Durchschnitt = 0;
        if (Grenz < 0)
          Grenz = 0;
      }
      else {
        TarifEst = 0;
        festEst = 0;
        Sol = 0;
        Kirchst = 0;
        Durchschnitt = 0;
        Grenz = 0;
      }

      var result = {
        GesamtEinkuenfte: GesamtEinkuenfte,
        zvK: zvK,
        TarifEst: TarifEst,
        festEst: festEst,
        Sol: Sol,
        Kirchst: Kirchst,
        Durchschnitt: Durchschnitt,
        Grenz: Grenz
      };

      return result;
    };


    //=============================================================================
    //@MFUNC   Berechnet die Steuerermaessigung die ggf bei Einkuenften aus Gewerbebetrieben
    // auftritt
    //-----------------------------------------------------------------------------
    //@PARM    double | EinkueGesamt | Die Summe der Einkuenfte
    //@PARM    double | Tarif | Die Tarifliche Einkommenssteuer
    //@RDESC   double
    //@XREF    <c CEstPar2>
    //@END
    // Autor: Schnuck Christoph, DATEV eG / E661
    //-----------------------------------------------------------------------------
    this.GetSteuerermaessigung = function (EinkueGesamt, Tarif) {
      var Faktor = 1.8;
      if (this.m_Veranlagungszeitraum >= 2008) {
        Faktor = 3.8;
      }
      var MaxMessbetrag = this.m_Messbetrag * Faktor;
      var MaxTarifEst;
      var SummePosEinku = this.m_weitere_pos_Einkuenfte + this.m_EinkuenfteGewerbebetrieb;
      var ReleEinkue;

      if (this.m_EinkuenfteGewerbebetrieb > 0) {
        if (EinkueGesamt < SummePosEinku) {
          ReleEinkue = (SummePosEinku - EinkueGesamt) / SummePosEinku * this.m_EinkuenfteGewerbebetrieb;
          ReleEinkue = this.m_EinkuenfteGewerbebetrieb - ReleEinkue;
        }
        else {
          ReleEinkue = this.m_EinkuenfteGewerbebetrieb;
        }

        if (ReleEinkue > EinkueGesamt)
          ReleEinkue = EinkueGesamt;

        MaxTarifEst = ReleEinkue / EinkueGesamt * Tarif;

        if (MaxTarifEst < MaxMessbetrag) {
          return MaxTarifEst;
        }
        else {
          return MaxMessbetrag;
        }
      }
      else return 0;
    };
  }

});
