define({

  input: {
    eingabe: {
      gegenstandswert: 100
    },
    gebuehr: 0,
    hebesatz: {
      mittelwert: "",
      nenner: undefined,
      zaehler: undefined,
      zaehler_max: undefined,
      zaehler_min: undefined
    },
    paragraph: "8",
    paragraph16: {
      checked: true
    },
    tabelle: "Pauschal",
    taetigkeit: "Vorschuss (netto)"
  },

  expectedOutput: {
    eingabe: {
      gegenstandswert: 100
    },
    gebuehr: -100,
    hebesatz: {
      mittelwert: "",
      nenner: undefined,
      zaehler: undefined,
      zaehler_max: undefined,
      zaehler_min: undefined
    },
    paragraph: "8",
    paragraph16: {
      checked: true,
      value: 20
    },
    tabelle: "Pauschal",
    taetigkeit: "Vorschuss (netto)"
  }
});
