define([
  "breakeven/config"
], function (
  config
) {

  return {

    input: {
      verkaufspreis: 75000,
      absatzmenge: 200,
      variable_kosten: 2500,
      fixkosten: 8000,
      fixkosten_in_prozent: 22.4,
      stueckkosten: 150,
      deckungsbeitrag: 50,
      gewinnschwelle: 1250,
      umsatzerloese: 250000,
      gesamtkosten: 28000,
      ergebnis: 10000,
      berechnungsart: 5,
      veraenderliche_groese: 4,
      config: config
    },

    expectedOutput: {
      verkaufspreis: 0,
      absatzmenge: 200,
      variable_kosten: 2500,
      fixkosten: 8000,
      fixkosten_in_prozent: 76.19047619047619,
      stueckkosten: 12.5,
      deckungsbeitrag: -12.5,
      gewinnschwelle: -640,
      umsatzerloese: 0,
      gesamtkosten: 10500,
      ergebnis: -10500,
      error: false
    }

  }

});
