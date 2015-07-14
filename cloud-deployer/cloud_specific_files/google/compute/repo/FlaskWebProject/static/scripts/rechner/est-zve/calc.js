define([
  "./Einkuenfte",
  "./estPar2",
  "./Ergebnis"
], function (
  Einkuenfte,
  CEstPar2,
  ergebnis
) {
  "use strict";

  //=============================================================================
  // Setzt die Einkunftsarten sowie alle Parameter in einer
  // <c CEstPar2> Klasse. Fuehrt die Berechnung <mf CEstPar2::GetErgebniswerte> aus
  // und zeigt das Ergebnis in einen <c CErgebnis> Dialog an.
  //-----------------------------------------------------------------------------
  return function calc(input) //m_DieEinkuenfte)
  {
    //var Veranlagungszeitraum = Veranlagungszeitraum;//this->m_cboZeitraum.GetCurSel() + JAHR_AB;
    //var Veranlagungsform = Veranlagungsform;//this->m_cboVeranlagung.GetCurSel();
    //var Kirchensteuer = Kirchensteuer;//this->m_numKSteuer.Get_Number();
    //var Sonderausgaben = Sonderausgaben;//this->m_numSonderausgaben.Get_Number();

    var Veranlagungszeitraum = input.Veranlagungszeitraum,
      Veranlagungsform = input.Veranlagungsform,
      Kirchensteuer = input.Kirchensteuer,
      Sonderausgaben = input.Sonderausgaben,
      ek_LuF = input.ek_LuF,
      ek_Gewerbebetrieb = input.ek_Gewerbebetrieb,
      ek_Messbetrag = input.ek_Messbetrag,
      ek_SelbstArbeit = input.ek_SelbstArbeit,
      ek_NichtSelbstArbeit = input.ek_NichtSelbstArbeit,
      ek_Kapital = input.ek_Kapital,
      ek_Vermietung = input.ek_Vermietung,
      ek_Sonstiges = input.ek_Sonstiges;

    if (ek_Kapital < 0)
      ek_Kapital = 0;

    if (Veranlagungszeitraum >= 2009) {
      var EinkuenfteKapital = ek_Kapital / (4 + (Kirchensteuer / 100.0)); //var EinkuenfteKapital = m_DieEinkuenfte.KapitalAb2009 / (4 + (Kirchensteuer/100.0));
      ek_Kapital = 0;
    }
    else {
      var EinkuenfteKapital = 0;
    }

    var m_DieEinkuenfte = new Einkuenfte(ek_LuF, ek_Gewerbebetrieb, ek_Messbetrag, ek_SelbstArbeit, ek_NichtSelbstArbeit, ek_Kapital, EinkuenfteKapital, ek_Vermietung, ek_Sonstiges);
    m_DieEinkuenfte.Convert_Einkuenfte(); //Konvertiert Einkünfte Object in Einkuenfte Gewerbebetrieb, weitere pos. und neg. Einkuenfte, sowie Messbetrag

    //CEstPar2 MyRechner;
    var GesamtEinkuenfte, zvK, TarifEst, festEst, Sol, Kirchst, Durchschnitt, Grenz;

    //var rechner = rechner(Veranlagungszeitraum, Veranlagungsform, Kirchensteuer, m_DieEinkuenfte, Sonderausgaben);

    var MyRechner = new CEstPar2();
    MyRechner.SetBerechnungswerte(Veranlagungszeitraum,
      Veranlagungsform,
      Kirchensteuer,
      ek_Gewerbebetrieb, //EinkuenfteGewerbebetrieb,
      ek_Messbetrag, //Messbetrag,
      m_DieEinkuenfte.weitere_pos_Einkuenfte, //weitere_pos_Einkuenfte,
      m_DieEinkuenfte.weitere_neg_Einkuenfte, //weitere_neg_Einkuenfte,
      Sonderausgaben);

    var Ergebnisse = MyRechner.GetErgebniswerte();
    GesamtEinkuenfte = Ergebnisse.GesamtEinkuenfte;
    zvK = Ergebnisse.zvK;
    TarifEst = Ergebnisse.TarifEst;
    festEst = Ergebnisse.festEst;
    Sol = Ergebnisse.Sol;
    Kirchst = Ergebnisse.Kirchst;
    Durchschnitt = Ergebnisse.Durchschnitt;
    Grenz = Ergebnisse.Grenz;

    //CErgebnis myErgebnis;
    if (Veranlagungszeitraum >= 2009) {
      festEst += EinkuenfteKapital;
      Sol += (EinkuenfteKapital * 0.055);
      Kirchst += ((EinkuenfteKapital * Kirchensteuer) / 100.0);
    }

    //  if (EinkuenfteKapital < 0)
    //    EinkuenfteKapital = 0;

    var result = new ergebnis(GesamtEinkuenfte, zvK, TarifEst, festEst, Sol, Kirchst, EinkuenfteKapital, Durchschnitt, Grenz);

    //myErgebnis.SetErgebniswerte(GesamtEinkuenfte, zvK, TarifEst, festEst, Sol, Kirchst, Durchschnitt, Grenz, EinkuenfteKapital);
    return result;
  }

});
