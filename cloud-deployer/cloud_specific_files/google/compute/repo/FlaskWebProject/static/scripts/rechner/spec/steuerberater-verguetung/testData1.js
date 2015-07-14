define({

  input: {
    eingabe: {
      gegenstandswert: 0
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
      checked: false
    },
    tabelle: "Pauschal",
    taetigkeit: "Vorschuss (netto)"
  },

  expectedOutput: {
    eingabe: {
      gegenstandswert: 0
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
      checked: false,
      value: 0
    },
    tabelle: "Pauschal",
    taetigkeit: "Vorschuss (netto)"
  }
});
