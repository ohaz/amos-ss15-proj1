define({

  input: {
    InputOrdentlErgebnis: 0,
    InputBankLieferVerbindlichkeiten: 0,
    InputZinsaufwand: 0,
    InputKurzFristVerbindlichkeiten: 0,
    InputRatingEigenkapital: 0,
    InputNettoBilanzsumme: 0,
    InputFremdkapital: 0,
    InputUmsatzerloese: 0,
    InputRatingBilanzsumme: 0,
    OutputOrdenlichesErgebnis: 0,
    OutputBankLieferanten: 0,
    OutputFremdkapitalkosten: 0,
    OutputKurzFristVerbindlichkeit: 0,
    OutputEigenmittel: 0
  },

  expectedOutput: {
    bankLieferanten: {
      bankLieferanten: 0,
      nettobilanzsumme: 0,
      quote: 0
    },

    eigenmittel: {
      quote: 0,
      ratingBilanzsumme: 0,
      ratingEigenkapital: 0
    },

    fremdkapitalkosten: {
      fremdkapital: 0,
      quote: 0,
      zinsaufwand: 0
    },

    krisenSignalwert: {
      ausfallwahrscheinlichkeit: 18.22703348524398,
      ausfallwahrscheinlichkeitNote: 6,
      quote: 0
    },

    krisenSignalwertBerechnet: 0,

    kurzFristVerbindlichkeit: {
      kurzFristVerbindlichkeit: 0,
      quote: 0,
      umsatzerloese: 0
    },

    ordenlichesErgebnis: {
      nettobilanzsumme: 0,
      ordenlichesErgebnis: 0,
      quote: 0
    }
  }
});
