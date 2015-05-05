define({

  input: {
    zve: 100000,
    veranlagungsjahr: 2012,
    veranlagungsform: 0,
    zve_schrittweite: 500
  },

  expectedOutput: {
    results: [
      {
        durchschnittssteuersatz: 33.61,
        est: 32778,
        grenzsteuersatz: 42,
        solz: 1802,
        zve: 97500
      },
      {
        durchschnittssteuersatz: 33.66,
        est: 32988,
        grenzsteuersatz: 42,
        solz: 1814,
        zve: 98000
      },
      {
        durchschnittssteuersatz: 33.70,
        est: 33198,
        grenzsteuersatz: 42,
        solz: 1825,
        zve: 98500
      },
      {
        durchschnittssteuersatz: 33.74,
        est: 33408,
        grenzsteuersatz: 42,
        solz: 1837,
        zve: 99000
      },
      {
        durchschnittssteuersatz: 33.78,
        est: 33618,
        grenzsteuersatz: 42,
        solz: 1848,
        zve: 99500
      },
      {
        durchschnittssteuersatz: 33.82,
        est: 33828,
        grenzsteuersatz: 42,
        solz: 1860,
        zve: 100000
      },
      {
        durchschnittssteuersatz: 33.86,
        est: 34038,
        grenzsteuersatz: 42,
        solz: 1872,
        zve: 100500
      },
      {
        durchschnittssteuersatz: 33.90,
        est: 34248,
        grenzsteuersatz: 42,
        solz: 1883,
        zve: 101000
      },
      {
        durchschnittssteuersatz: 33.94,
        est: 34458,
        grenzsteuersatz: 42,
        solz: 1895,
        zve: 101500
      },
      {
        durchschnittssteuersatz: 33.98,
        est: 34668,
        grenzsteuersatz: 42,
        solz: 1906,
        zve: 102000
      },
      {
        durchschnittssteuersatz: 34.02,
        est: 34878,
        grenzsteuersatz: 42,
        solz: 1918,
        zve: 102500
      }
    ],
    highlight: 5
  }
});
