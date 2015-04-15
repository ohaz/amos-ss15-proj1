define({

  input: {
    eingabe: {
      gegenstandswert: 50
    },
    gebuehr: 0,
    hebesatz: {
      mittelwert: 50,
      nenner: 30,
      zaehler: 45,
      zaehler_max: 70,
      zaehler_min: 30
    },
    paragraph: "8",
    paragraph16: {
      checked: true
    },
    tabelle: "Zeit",
    taetigkeit: "Zeitgebühr"
  },

  expectedOutput: {
    eingabe: {
      gegenstandswert: 50
    },
    gebuehr: 4500,
    hebesatz: {
      mittelwert: 50,
      nenner: 30,
      zaehler: 45,
      zaehler_max: 70,
      zaehler_min: 30
    },
    paragraph: "8",
    paragraph16: {
      checked: true,
      value: 20
    },
    tabelle: "Zeit",
    taetigkeit: "Zeitgebühr"
  }
});
