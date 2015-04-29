define(function () {

  function Prognose() {

    this.SetBerechnungswerte = function (dBankLieferVerbindlichkeiten,
                                         dFremdKapital,
                                         dKurzFristVerbindlichkeiten,
                                         dNettoBilanzsumme,
                                         dOrdentlErgebnis,
                                         dRatingBilanzsumme,
                                         dRatingEigenkapital,
                                         dUmsatzerloese, dZinsaufwand
    ) {
      this.m_dBankLieferVerbindlichkeiten = dBankLieferVerbindlichkeiten;
      this.m_dFremdkapital = dFremdKapital;
      this.m_dKurzFristVerbindlichkeiten = dKurzFristVerbindlichkeiten;
      this.m_dNettoBilanzsumme = dNettoBilanzsumme;
      this.m_dOrdentlErgebnis = dOrdentlErgebnis;
      this.m_dRatingBilanzsumme = dRatingBilanzsumme;
      this.m_dRatingEigenkapital = dRatingEigenkapital;
      this.m_dUmsatzerloese = dUmsatzerloese;
      this.m_dZinsaufwand = dZinsaufwand;
    };

    this.GetBankLieferVerbindlichkeiten = function () {
      return this.m_dBankLieferVerbindlichkeiten;
    };

    this.GetFremdkapital = function () {
      return this.m_dFremdkapital;
    };

    this.GetKurzFristVerbindlichkeiten = function () {
      return this.m_dKurzFristVerbindlichkeiten;
    };

    this.GetNettoBilanzsumme = function () {
      return this.m_dNettoBilanzsumme;
    };

    this.GetOrdentlErgebnis = function () {
      return this.m_dOrdentlErgebnis;
    };

    this.GetRatingBilanzsumme = function () {
      return this.m_dRatingBilanzsumme;
    };

    this.GetRatingEigenkapital = function () {
      return this.m_dRatingEigenkapital;
    };

    this.GetUmsatzerloese = function () {
      return this.m_dUmsatzerloese;
    };

    this.GetZinsaufwand = function () {
      return this.m_dZinsaufwand;
    };



    this.GetQOrdentlErgebnis = function () {
      if (this.m_dNettoBilanzsumme > 0)
        return (this.m_dOrdentlErgebnis / this.m_dNettoBilanzsumme)
          .toFixed(2);
      else
        return 0;
    };

    this.GetQBankLieferanten = function () {
      if (this.m_dNettoBilanzsumme > 0)
        return (this.m_dBankLieferVerbindlichkeiten / this.m_dNettoBilanzsumme)
          .toFixed(2);
      else
        return 0;
    };

    this.GetQFremdkapitalkosten = function () {
      if (this.m_dFremdkapital > 0)
        return (this.m_dZinsaufwand / this.m_dFremdkapital)
          .toFixed(2);
      else
        return 0;
    };

    this.GetQKurzFristVerbindlichkeiten = function () {
      if (this.m_dUmsatzerloese > 0)
        return (this.m_dKurzFristVerbindlichkeiten / this.m_dUmsatzerloese)
          .toFixed(2);
      else
        return 0;
    };

    this.GetQEigenmittel = function () {
      if (this.m_dRatingBilanzsumme > 0)
        return (this.m_dRatingEigenkapital / this.m_dRatingBilanzsumme)
          .toFixed(2);
      else
        return 0;
    };

    this.GetKrisensignalw_man = function (QOrdentlErgebnis,
      QBankLieferanten,
      QFremdkapitalkosten,
      QKurzFristVerbindlichkeiten,
      QEigenmittel) {
      if (QOrdentlErgebnis == 0 && QBankLieferanten == 0 && QFremdkapitalkosten == 0 && QKurzFristVerbindlichkeiten == 0 && QEigenmittel == 0)
        return 000;

      var temp = (4.040 + (9.299 * QOrdentlErgebnis) + (2.381 * QEigenmittel) - (23.076 * QFremdkapitalkosten) - (1.855 * QBankLieferanten) - (0.844 * QKurzFristVerbindlichkeiten));
      return temp;
    };

    this.GetKrisensignalw = function () {
      return this.GetKrisensignalw_man(this.GetQOrdentlErgebnis(),
        this.GetQBankLieferanten(),
        this.GetQFremdkapitalkosten(),
        this.GetQKurzFristVerbindlichkeiten(),
        this.GetQEigenmittel());
    };

    this.GetAusfallwahrscheinlichkeit = function (Krisensignalwert) {
      return (1 / (1 + (Math.exp(Krisensignalwert) * 4.48635630043456))) * 100;
    };

    this.GetAusfallwahrscheinlichkeitNote = function (ausfallwahrscheinlichkeit) {
      if (ausfallwahrscheinlichkeit < 0.3)
        return 1;
      else if (ausfallwahrscheinlichkeit < 0.7)
        return 2;
      else if (ausfallwahrscheinlichkeit < 1.5)
        return 3;
      else if (ausfallwahrscheinlichkeit < 3)
        return 4;
      else if (ausfallwahrscheinlichkeit < 8)
        return 5;
      else
        return 6;
    };
  }

  return Prognose;

});
