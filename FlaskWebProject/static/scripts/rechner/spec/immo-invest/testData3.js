define({

  input: {
    monatlMiete: 5000,
    zahlungszeitraum: 30,
    prozMietsteigerung: 10.00,
    zusaetzlichVerfuegbar: 5000,
    einsetzbaresEK: 999999,
    zinsUndTilgung: 15.00,
    nebenkostenInProz: 25.00
  },

  expectedOutput: {
    aufnehmbaresFK: 800000,
    bezahlteMiete: 9869641,
    eingesetztesEK: 999999,
    gesamtinvestition: 1799999,
    maxKaufpreis: 1439999,
    monatsmiete: 87247,
    mtlKapitaldienst: 10000,
    nebenkosten: 360000
  }
});
