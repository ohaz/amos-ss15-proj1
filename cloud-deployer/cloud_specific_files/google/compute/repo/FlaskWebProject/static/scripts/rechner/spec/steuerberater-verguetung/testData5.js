define({

  input: {
    eingabe: {
      gegenstandswert: 4200
    },
    gebuehr: 0,
    hebesatz: {
      mittelwert: 7,
      nenner: 10,
      zaehler: 7,
      zaehler_max: 12,
      zaehler_min: 2
    },
    paragraph: "8",
    paragraph16: {
      checked: true
    },
    tabelle: "C",
    taetigkeit: "Buchführung"
  },

  expectedOutput: {
    eingabe: {
      gegenstandswert: 4200
    },
    gebuehr: 42.7,
    hebesatz: {
      mittelwert: 7,
      nenner: 10,
      zaehler: 7,
      zaehler_max: 12,
      zaehler_min: 2
    },
    paragraph: "8",
    paragraph16: {
      checked: true,
      value: 8.54
    },
    tabelle: "C",
    taetigkeit: "Buchführung"
  }
});
