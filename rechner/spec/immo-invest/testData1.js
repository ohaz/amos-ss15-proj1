define({

  input: {
    monatlMiete: 500,
    zahlungszeitraum: 5,
    prozMietsteigerung: 5.00,
    zusaetzlichVerfuegbar: 0,
    einsetzbaresEK: 40000,
    zinsUndTilgung: 1.00,
    nebenkostenInProz: 1.00
  },

  expectedOutput: {
    aufnehmbaresFK: 600000,
    bezahlteMiete: 33154,
    eingesetztesEK: 40000,
    gesamtinvestition: 640000,
    maxKaufpreis: 633663,
    monatsmiete: 638,
    mtlKapitaldienst: 500,
    nebenkosten: 6337
  }
});
