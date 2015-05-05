define({

  input: {
    InputOrdentlErgebnis: 99999999,
    InputBankLieferVerbindlichkeiten: 99999999,
    InputZinsaufwand: 99999999,
    InputKurzFristVerbindlichkeiten: 99999999,
    InputRatingEigenkapital: 99999999,
    InputNettoBilanzsumme: 99999999,
    InputFremdkapital: 99999999,
    InputUmsatzerloese: 99999999,
    InputRatingBilanzsumme: 99999999,
    OutputOrdenlichesErgebnis: 99999999,
    OutputBankLieferanten: 99999999,
    OutputFremdkapitalkosten: 99999999,
    OutputKurzFristVerbindlichkeit: 99999999,
    OutputEigenmittel: 99999999
  },

  expectedOutput: {
    bankLieferanten: {
      bankLieferanten: 99999999,
      nettobilanzsumme: 99999999,
      quote: "1.00"
    },

    eigenmittel: {
      quote: "1.00",
      ratingBilanzsumme: 99999999,
      ratingEigenkapital: 99999999
    },

    fremdkapitalkosten: {
      fremdkapital: 99999999,
      quote: "1.00",
      zinsaufwand: 99999999
    },

    krisenSignalwert: {
      ausfallwahrscheinlichkeit: 99.98072568151961,
      ausfallwahrscheinlichkeitNote: 6,
      quote: -10.055
    },

    krisenSignalwertBerechnet: -1409499981.8650002,

    kurzFristVerbindlichkeit: {
      kurzFristVerbindlichkeit: 99999999,
      quote: "1.00",
      umsatzerloese: 99999999
    },

    ordenlichesErgebnis: {
      nettobilanzsumme: 99999999,
      ordenlichesErgebnis: 99999999,
      quote: "1.00"
    }
  }
});
