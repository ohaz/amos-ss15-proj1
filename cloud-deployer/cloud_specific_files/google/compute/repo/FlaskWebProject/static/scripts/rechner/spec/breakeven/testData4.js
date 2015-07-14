define([
  "breakeven/config"
], function (
  config
) {

  return {

    input: {
      verkaufspreis: 100,
      absatzmenge: 1000,
      variable_kosten: 4000,
      fixkosten: 1,
      fixkosten_in_prozent: 0.02,
      stueckkosten: 4,
      deckungsbeitrag: 96,
      gewinnschwelle: 1,
      umsatzerloese: 100000,
      gesamtkosten: 4001,
      ergebnis: 95999,
      berechnungsart: 0,
      veraenderliche_groese: 1,
      config: config
    },

    expectedOutput: {
      verkaufspreis: 100,
      absatzmenge: 1000,
      variable_kosten: 4000,
      fixkosten: 1,
      fixkosten_in_prozent: 0.024993751562109475,
      stueckkosten: 4,
      deckungsbeitrag: 96,
      gewinnschwelle: 0.010416666666666666,
      umsatzerloese: 100000,
      gesamtkosten: 4001,
      ergebnis: 95999,
      error: false
    }

  }

});
