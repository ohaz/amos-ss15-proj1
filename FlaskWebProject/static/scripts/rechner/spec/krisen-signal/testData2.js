define({

  input: {
    InputOrdentlErgebnis: 24000,
    InputBankLieferVerbindlichkeiten: 96000,
    InputZinsaufwand: 5000,
    InputKurzFristVerbindlichkeiten: 18000,
    InputRatingEigenkapital: 140000,
    InputNettoBilanzsumme: 2020,
    InputFremdkapital: 11000,
    InputUmsatzerloese: 80000,
    InputRatingBilanzsumme: 10000,
    OutputOrdenlichesErgebnis: 55555,
    OutputBankLieferanten: 99000,
    OutputFremdkapitalkosten: 250,
    OutputKurzFristVerbindlichkeit: 200000,
    OutputEigenmittel: 102900
  },

  expectedOutput: {
    bankLieferanten: {
      bankLieferanten: 96000,
      nettobilanzsumme: 2020,
      quote: "47.52"
    },

    eigenmittel: {
      quote: "14.00",
      ratingBilanzsumme: 10000,
      ratingEigenkapital: 140000
    },

    fremdkapitalkosten: {
      fremdkapital: 11000,
      quote: "0.45",
      zinsaufwand: 5000
    },

    krisenSignalwert: {
      ausfallwahrscheinlichkeit: 1.0383482069204662e-20,
      ausfallwahrscheinlichkeitNote: 1,
      quote: 49.1182
    },

    krisenSignalwertBerechnet: 403400.885,

    kurzFristVerbindlichkeit: {
      kurzFristVerbindlichkeit: 18000,
      quote: "0.23",
      umsatzerloese: 80000
    },

    ordenlichesErgebnis: {
      nettobilanzsumme: 2020,
      ordenlichesErgebnis: 24000,
      quote: "11.88"
    }
  }
});
