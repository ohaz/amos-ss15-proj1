define({

  input: {
    eingabe: {
      gegenstandswert: 450
    },
    gebuehr: 0,
    hebesatz: {
      mittelwert: 13,
      nenner: 20,
      zaehler: 13,
      zaehler_max: 13,
      zaehler_min: 13
    },
    paragraph: "8",
    paragraph16: {
      checked: true
    },
    tabelle: "E",
    taetigkeit: "Prüfung Berufung/Revision"
  },

  expectedOutput: {
    eingabe: {
      gegenstandswert: 450
    },
    gebuehr: 30.55,
    hebesatz: {
      mittelwert: 13,
      nenner: 20,
      zaehler: 13,
      zaehler_max: 13,
      zaehler_min: 13
    },
    paragraph: "8",
    paragraph16: {
      checked: true,
      value: 6.11
    },
    tabelle: "E",
    taetigkeit: "Prüfung Berufung/Revision"
  }
});
