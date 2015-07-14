define({

  input: {
    berechnungsart: 0,
    darlehensbetrag: 50000,
    restschuld_jahr_schrittweite: 1,
    restschuld_jahr_start: 5,
    teilbetrag_jahr_schrittweite: 1,
    teilbetrag_jahr_start: 5,
    teilbetrag_restschuld: 15000,
    vorgegebene_annuitaet: 15000,
    vorgegebene_annuitaet_schrittweite: 500,
    vorgegebene_laufzeit: 5,
    vorgegebene_laufzeit_schrittweite: 1,
    vorgegebener_tilgungssatz: 1.5,
    vorgegebener_tilgungssatz_schrittweite: 0.1,
    zahlungsturnus: 1,
    zinssatz: 5,
    zinssatz_schrittweite: 0.1
  },

  expectedOutput: [
    {
      annuitaet: [
        [ '',  1.5,  1.6,  1.7  ],
        [ 5,   3250, 3300, 3350 ],
        [ 5.1, 3300, 3350, 3400 ],
        [ 5.2, 3350, 3400, 3450 ],
        [ 5.3, 3400, 3450, 3500 ],
        [ 5.4, 3450, 3500, 3550 ]
      ],

      tilgung: [
        [ '',  1.5,  1.6,  1.7  ],
        [ 5,   3250, 3300, 3350 ],
        [ 5.1, 3300, 3350, 3400 ],
        [ 5.2, 3350, 3400, 3450 ],
        [ 5.3, 3400, 3450, 3500 ],
        [ 5.4, 3450, 3500, 3550 ]
      ],

      rueckzahlsumme: [
        [ '',       1.5,               1.6,               1.7           ],
        [ 5,    97679.40759137706, 95848.92199758941, 94175.6948785131  ],
        [ 5.1,  98306.6624272395,  96462.18514657987, 94766.31467006766 ],
        [ 5.2,  98925.1773140436,  97066.5929673446,  95360.22341045967 ],
        [ 5.3,  99526.04965986004, 97654.73533129222, 95939.25098717754 ],
        [ 5.4, 100108.91257975335, 98226.28724073713, 96503.11213783981 ]
      ],

      laufzeit: [
        [ '',  1.5,          1.6,          1.7          ],
        [ 5,   '~30J - 1M',  '~29J - 1M',  '~28J - 2M'  ],
        [ 5.1, '~29J - 10M', '~28J - 10M', '~27J - 11M' ],
        [ 5.2, '~29J - 7M',  '~28J - 7M',  '~27J - 8M'  ],
        [ 5.3, '~29J - 4M',  '~28J - 4M',  '~27J - 5M'  ],
        [ 5.4, '~29J - 1M',  '~28J - 1M',  '~27J - 3M'  ]
      ],

      restschuld: [
        [ 5,  45855.7765625     ],
        [ 6,  44898.56539062499 ],
        [ 7,  43893.49366015625 ],
        [ 8,  42838.16834316406 ],
        [ 9,  41730.07676032226 ],
        [ 10, 40566.58059833838 ]
      ],

      teilbetrag: [
        [ 5,  '8834.12' ],
        [ 6,  '7645.61' ],
        [ 7,  '6798.69' ],
        [ 8,  '6165.26' ],
        [ 9,  '5674.15' ],
        [ 10, '5282.66' ]
      ],

      resultIsOK: true
    }
  ]
});
