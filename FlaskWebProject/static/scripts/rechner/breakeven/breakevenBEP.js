define(function () {

  function CBEP(VarKosten, FixKosten, VKPreis, Absatzmenge) {
    this.m_VarKosten = VarKosten;
    this.m_FixKosten = FixKosten;
    this.m_VKPreis = VKPreis;
    this.m_Absatzmenge = Absatzmenge;


    this.getAbsatzmenge = function () {
      return this.m_Absatzmenge;
    };

    this.getFixKosten = function () {
      return this.m_FixKosten;
    };

    this.getVarKosten = function () {
      return this.m_VarKosten;
    };

    this.getVKPreis = function () {
      return this.m_VKPreis;
    };

    this.getGesamtkosten = function () {
      return (this.m_VarKosten + this.m_FixKosten);
    };

    this.getUmsatzerloese = function () {
      return (this.m_VKPreis * this.m_Absatzmenge);
    };

    this.getErgebnis = function () {
      return (this.m_Absatzmenge * this.m_VKPreis) - (this.m_VarKosten + this.m_FixKosten);
    };

    this.getVarStueckkosten = function () {
      if (this.m_Absatzmenge == 0)
        return 0;
      else
        return (this.m_VarKosten / this.m_Absatzmenge);
    };

    this.getFixKostenProzent = function () {
      if (this.getGesamtkosten() == 0)
        return 0;
      else
        return (this.m_FixKosten / this.getGesamtkosten() * 100);
    };

    this.getDeckungsbeitrag = function () {
      if (this.m_Absatzmenge == 0)
        return 0;
      else
        return (this.m_VKPreis - this.getVarStueckkosten());
    };

    this.getGewinnschwelle = function () {
      if (this.m_Absatzmenge == 0)
        return 0;
      else
        return (this.m_FixKosten / this.getDeckungsbeitrag());
    };

  }

  return CBEP;

});
