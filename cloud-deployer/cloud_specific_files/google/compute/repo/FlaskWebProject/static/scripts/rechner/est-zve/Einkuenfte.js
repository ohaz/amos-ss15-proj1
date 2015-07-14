define(function () {
  "use strict";

  return function Einkuenfte(ek_LuF,
                             ek_Gewerbebetrieb,
                             ek_Messbetrag,
                             ek_SelbstArbeit,
                             ek_NichtSelbstArbeit,
                             ek_Kapital,
                             ek_Kapital2009,
                             ek_Vermietung,
                             ek_Sonstiges
  ) {
    this.LuF = ek_LuF;
    this.Gewerbebetrieb = ek_Gewerbebetrieb;
    this.Messbetrag = ek_Messbetrag;
    this.SelbstArbeit = ek_SelbstArbeit;
    this.NichtSelbstArbeit = ek_NichtSelbstArbeit;
    this.Kapital = ek_Kapital;
    this.KapitalAb2009 = ek_Kapital2009;
    this.Vermietung = ek_Vermietung;
    this.SonstEinkuenfte = ek_Sonstiges;

    this.weitere_pos_Einkuenfte = 0;
    this.weitere_neg_Einkuenfte = 0;

    // Konvertiert Einkünfte Object in Einkuenfte Gewerbebetrieb, weitere pos. und neg. Einkuenfte, sowie Messbetrag
    this.Convert_Einkuenfte = function () { //(CEstPar2::T_Einkuenfte DieEinkuenfte, double *EinkuenfteGewerbebetrieb, double *Messbetrag, double *weitere_pos_Einkuenfte, double *weitere_neg_Einkuenfte){

      if (this.LuF > 0)
        this.weitere_pos_Einkuenfte += this.LuF;
      else
        this.weitere_neg_Einkuenfte += this.LuF;

      //    if (this.Kapital > 0)
      //      this.weitere_pos_Einkuenfte += this.Kapital;
      //    else
      //      this.weitere_neg_Einkuenfte += this.Kapital;

      if (this.NichtSelbstArbeit > 0)
        this.weitere_pos_Einkuenfte += this.NichtSelbstArbeit;
      else
        this.weitere_neg_Einkuenfte += this.NichtSelbstArbeit;

      if (this.SelbstArbeit > 0)
        this.weitere_pos_Einkuenfte += this.SelbstArbeit;
      else
        this.weitere_neg_Einkuenfte += this.SelbstArbeit;

      if (this.SonstEinkuenfte > 0)
        this.weitere_pos_Einkuenfte += this.SonstEinkuenfte;
      else
        this.weitere_neg_Einkuenfte += this.SonstEinkuenfte;

      if (this.Vermietung > 0)
        this.weitere_pos_Einkuenfte += this.Vermietung;
      else
        this.weitere_neg_Einkuenfte += this.Vermietung;
    };
  }

});
