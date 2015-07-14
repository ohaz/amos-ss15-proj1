define([
  "breakeven/config"
], function (
  config
) {

  return {

    input: {
      verkaufspreis: 100,
      absatzmenge: 1000,
      variable_kosten: 20000,
      fixkosten: 50000,
      fixkosten_in_prozent: 71.43,
      stueckkosten: 20,
      deckungsbeitrag: 80,
      gewinnschwelle: 625,
      umsatzerloese: 100000,
      gesamtkosten: 70000,
      ergebnis: 30000,
      berechnungsart: 0,
      veraenderliche_groese: 1,
      config: config
    },

    expectedOutput: {
      verkaufspreis: 100,
      absatzmenge: 1000,
      variable_kosten: 20000,
      fixkosten: 50000,
      fixkosten_in_prozent: 71.42857142857143,
      stueckkosten: 20,
      deckungsbeitrag: 80,
      gewinnschwelle: 625,
      umsatzerloese: 100000,
      gesamtkosten: 70000,
      ergebnis: 30000,
      error: false
    }

  }

});
