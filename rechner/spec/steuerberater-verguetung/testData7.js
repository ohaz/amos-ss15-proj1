define({

  input: {
    eingabe: {
      gegenstandswert: 70000
    },
    gebuehr: 0,
    hebesatz: {
      mittelwert: 3.5,
      nenner: 10,
      zaehler: 4,
      zaehler_max: 6,
      zaehler_min: 1
    },
    paragraph: "8",
    paragraph16: {
      checked: true
    },
    tabelle: "D-b",
    taetigkeit: "Einrichtung der Buchführung"
  },

  expectedOutput: {
    eingabe: {
      gegenstandswert: 70000
    },
    gebuehr: 204,
    hebesatz: {
      mittelwert: 3.5,
      nenner: 10,
      zaehler: 4,
      zaehler_max: 6,
      zaehler_min: 1
    },
    paragraph: "8",
    paragraph16: {
      checked: true,
      value: 20
    },
    tabelle: "D-b",
    taetigkeit: "Einrichtung der Buchführung"
  }
});
