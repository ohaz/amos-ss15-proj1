define({

  input: {
    zve: 100000,
    veranlagungsjahr: 2012,
    veranlagungsform: 1,
    zve_schrittweite: 500
  },

  expectedOutput: {
    results: [
      {
        durchschnittssteuersatz: 25.31,
        est: 24684,
        grenzsteuersatz: 40.11,
        solz: 1357,
        zve: 97500
      },
      {
        durchschnittssteuersatz: 25.39,
        est: 24884,
        grenzsteuersatz: 40.22,
        solz: 1368,
        zve: 98000
      },
      {
        durchschnittssteuersatz: 25.46,
        est: 25086,
        grenzsteuersatz: 40.33,
        solz: 1379,
        zve: 98500
      },
      {
        durchschnittssteuersatz: 25.54,
        est: 25288,
        grenzsteuersatz: 40.45,
        solz: 1390,
        zve: 99000
      },
      {
        durchschnittssteuersatz: 25.61,
        est: 25490,
        grenzsteuersatz: 40.56,
        solz: 1401,
        zve: 99500
      },
      {
        durchschnittssteuersatz: 25.69,
        est: 25694,
        grenzsteuersatz: 40.68,
        solz: 1413,
        zve: 100000
      },
      {
        durchschnittssteuersatz: 25.76,
        est: 25896,
        grenzsteuersatz: 40.79,
        solz: 1424,
        zve: 100500
      },
      {
        durchschnittssteuersatz: 25.84,
        est: 26102,
        grenzsteuersatz: 40.91,
        solz: 1435,
        zve: 101000
      },
      {
        durchschnittssteuersatz: 25.91,
        est: 26306,
        grenzsteuersatz: 41.02,
        solz: 1446,
        zve: 101500
      },
      {
        durchschnittssteuersatz: 25.99,
        est: 26512,
        grenzsteuersatz: 41.13,
        solz: 1458,
        zve: 102000
      },
      {
        durchschnittssteuersatz: 26.06,
        est: 26718,
        grenzsteuersatz: 41.25,
        solz: 1469,
        zve: 102500
      }
    ],
    highlight: 5
  }
});
