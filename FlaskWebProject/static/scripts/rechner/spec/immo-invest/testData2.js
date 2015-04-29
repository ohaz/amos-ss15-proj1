define({

  input: {
    monatlMiete: 0,
    zahlungszeitraum: 0,
    prozMietsteigerung: 0.00,
    zusaetzlichVerfuegbar: 0,
    einsetzbaresEK: 0,
    zinsUndTilgung: 1.00,
    nebenkostenInProz: 1.00
  },

  expectedOutput: {
    aufnehmbaresFK: 0,
    bezahlteMiete: 0,
    eingesetztesEK: 0,
    gesamtinvestition: 0,
    maxKaufpreis: 0,
    monatsmiete: 0,
    mtlKapitaldienst: 0,
    nebenkosten: 0
  }
});
