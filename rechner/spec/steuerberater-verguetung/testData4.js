define({

  input: {
    eingabe: {
      gegenstandswert: 3500
    },
    gebuehr: 0,
    hebesatz: {
      mittelwert: 12.5,
      nenner: 10,
      zaehler: 12,
      zaehler_max: 20,
      zaehler_min: 5
    },
    paragraph: "25",
    paragraph16: {
      checked: true
    },
    tabelle: "B",
    taetigkeit: "Überschussermittlung"
  },

  expectedOutput: {
    eingabe: {
      gegenstandswert: 3500
    },
    gebuehr: 57.6,
    hebesatz: {
      mittelwert: 12.5,
      nenner: 10,
      zaehler: 12,
      zaehler_max: 20,
      zaehler_min: 5
    },
    paragraph: "25",
    paragraph16: {
      checked: true,
      value: 11.52
    },
    tabelle: "B",
    taetigkeit: "Überschussermittlung"
  }
});
