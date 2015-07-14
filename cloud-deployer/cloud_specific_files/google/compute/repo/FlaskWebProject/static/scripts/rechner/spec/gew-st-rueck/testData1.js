define({

  input: {
    Berechnungsjahr_2: 2012,
    Gesellschaftsform_4: 0,
    Hebesatz_6: 0,
    Ergebnis_GewSt_8: 0,
    Vorauszahlungen_10: 0,
    Hinzurechnungen_12: 0,
    Kuerzungen_14: 0,
    Einstellungen_gewerbeertrag_schritt_2: 50,
    Einstellungen_hebesatz_schritt_4: 5
  },

  expectedOutput: {
    gewStMessbetrag_18: [
      [ undefined, 0, 5, 10 ],
      [ 0,         0, 0, 0  ],
      [ 50,        1, 1, 1  ],
      [ 100,       3, 3, 3  ],
      [ 150,       5, 5, 5  ],
      [ 200,       7, 7, 7  ],
      [ 250,       8, 8, 8  ]
    ],

    gewStRestschuld_22: [
      [ undefined, 0, 5,    10   ],
      [ 0,         0, 0,     0   ],
      [ 50,        0, 0.05,  0.1 ],
      [ 100,       0, 0.15,  0.3 ],
      [ 150,       0, 0.25,  0.5 ],
      [ 200,       0, 0.35,  0.7 ],
      [ 250,       0, 0.4,   0.8 ]
    ],

    gewStSchuld_20: [
      [ undefined, 0, 5,    10   ],
      [ 0,         0, 0,     0   ],
      [ 50,        0, 0.05,  0.1 ],
      [ 100,       0, 0.15,  0.3 ],
      [ 150,       0, 0.25,  0.5 ],
      [ 200,       0, 0.35,  0.7 ],
      [ 250,       0, 0.4,   0.8 ]
    ],

    vorlGewerbeertrag_16: 0
  }
});
