define({

  input: {
    eingabe: {
      gegenstandswert: 2000
    },
    gebuehr: 0,
    hebesatz: {
      mittelwert: 9,
      nenner: 10,
      zaehler: 6,
      zaehler_max: 15,
      zaehler_min: 3
    },
    paragraph: "8",
    paragraph16: {
      checked: true
    },
    tabelle: "D-a",
    taetigkeit: "Erfassung Anfangswerte"
  },

  expectedOutput: {
    eingabe: {
      gegenstandswert: 2000
    },
    gebuehr: 1783.2,
    hebesatz: {
      mittelwert: 9,
      nenner: 10,
      zaehler: 6,
      zaehler_max: 15,
      zaehler_min: 3
    },
    paragraph: "8",
    paragraph16: {
      checked: true,
      value: 20
    },
    tabelle: "D-a",
    taetigkeit: "Erfassung Anfangswerte"
  }
});
