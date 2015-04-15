define([
  "breakeven/config"
], function (
  config
) {

  return {

    input: {
      verkaufspreis: 2000,
      absatzmenge: 3,
      variable_kosten: 50,
      fixkosten: 120,
      fixkosten_in_prozent: 95,
      stueckkosten: 0.5,
      deckungsbeitrag: -5000,
      gewinnschwelle: -250,
      umsatzerloese: 25,
      gesamtkosten: 230,
      ergebnis: -75000,
      berechnungsart: 7,
      veraenderliche_groese: 2,
      config: config
    },

    expectedOutput: {
      verkaufspreis: 2000,
      absatzmenge: 3,
      variable_kosten: 50,
      fixkosten: 80950,
      fixkosten_in_prozent: 99.93827160493827,
      stueckkosten: 16.666666666666668,
      deckungsbeitrag: 1983.3333333333333,
      gewinnschwelle: 40.81512605042017,
      umsatzerloese: 6000,
      gesamtkosten: 81000,
      ergebnis: -75000,
      error: false
    }

  }

});
