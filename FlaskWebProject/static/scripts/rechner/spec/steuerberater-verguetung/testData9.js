define({

  input: {
    eingabe: {
      gegenstandswert: 42
    },
    gebuehr: 0,
    hebesatz: {
      mittelwert: 10.5,
      nenner: undefined,
      zaehler: 70,
      zaehler_max: 16,
      zaehler_min: 5
    },
    paragraph: "8",
    paragraph16: {
      checked: true
    },
    tabelle: "AN",
    taetigkeit: "Erstmalige Einrichtung von Lohnkonten"
  },

  expectedOutput: {
    eingabe: {
      gegenstandswert: 42
    },
    gebuehr: 2940,
    hebesatz: {
      mittelwert: 10.5,
      nenner: undefined,
      zaehler: 70,
      zaehler_max: 16,
      zaehler_min: 5
    },
    paragraph: "8",
    paragraph16: {
      checked: true,
      value: 20
    },
    tabelle: "AN",
    taetigkeit: "Erstmalige Einrichtung von Lohnkonten"
  }
});
