define({

  input: {
    monatlMiete: 460,
    zahlungszeitraum: 20,
    prozMietsteigerung: 5.00,
    zusaetzlichVerfuegbar: 50000,
    einsetzbaresEK: 10000,
    zinsUndTilgung: 3.00,
    nebenkostenInProz: 5.00
  },

  expectedOutput: {
    aufnehmbaresFK: 20184000,
    bezahlteMiete: 182524,
    eingesetztesEK: 10000,
    gesamtinvestition: 20194000,
    maxKaufpreis: 19232381,
    monatsmiete: 1221,
    mtlKapitaldienst: 50460,
    nebenkosten: 961619
  }
});
