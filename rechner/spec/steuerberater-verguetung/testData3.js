define({

  input: {
    eingabe: {
      gegenstandswert: 3500
    },
    gebuehr: 0,
    hebesatz: {
      mittelwert: 5.5,
      nenner: 10,
      zaehler: 5,
      zaehler_max: 10,
      zaehler_min: 1
    },
    paragraph: "21",
    paragraph16: {
      checked: true
    },
    tabelle: "A",
    taetigkeit: "Rat / Auskunft"
  },

  expectedOutput: {
    eingabe: {
      gegenstandswert: 3500
    },
    gebuehr: 114,
    hebesatz: {
      mittelwert: 5.5,
      nenner: 10,
      zaehler: 5,
      zaehler_max: 10,
      zaehler_min: 1
    },
    paragraph: "21",
    paragraph16: {
      checked: true,
      value: 20
    },
    tabelle: "A",
    taetigkeit: "Rat / Auskunft"
  }
});
