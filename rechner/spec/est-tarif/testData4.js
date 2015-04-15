define({

  input: {
    zve: 64000,
    veranlagungsjahr: 2012,
    veranlagungsform: 1,
    zve_schrittweite: 500
  },

  expectedOutput: {
    results: [
      {
        durchschnittssteuersatz: 19.06,
        est: 11726,
        grenzsteuersatz: 31.87,
        solz: 644,
        zve: 61500
      },
      {
        durchschnittssteuersatz: 19.17,
        est: 11886,
        grenzsteuersatz: 31.99,
        solz: 653,
        zve: 62000
      },
      {
        durchschnittssteuersatz: 19.27,
        est: 12046,
        grenzsteuersatz: 32.10,
        solz: 662,
        zve: 62500
      },
      {
        durchschnittssteuersatz: 19.37,
        est: 12206,
        grenzsteuersatz: 32.21,
        solz: 671,
        zve: 63000
      },
      {
        durchschnittssteuersatz: 19.47,
        est: 12368,
        grenzsteuersatz: 32.33,
        solz: 680,
        zve: 63500
      },
      {
        durchschnittssteuersatz: 19.57,
        est: 12530,
        grenzsteuersatz: 32.44,
        solz: 689,
        zve: 64000
      },
      {
        durchschnittssteuersatz: 19.67,
        est: 12692,
        grenzsteuersatz: 32.56,
        solz: 698,
        zve: 64500
      },
      {
        durchschnittssteuersatz: 19.77,
        est: 12856,
        grenzsteuersatz: 32.67,
        solz: 707,
        zve: 65000
      },
      {
        durchschnittssteuersatz: 19.87,
        est: 13020,
        grenzsteuersatz: 32.79,
        solz: 716,
        zve: 65500
      },
      {
        durchschnittssteuersatz: 19.97,
        est: 13184,
        grenzsteuersatz: 32.90,
        solz: 725,
        zve: 66000
      },
      {
        durchschnittssteuersatz: 20.07,
        est: 13348,
        grenzsteuersatz: 33.01,
        solz: 734,
        zve: 66500
      }
    ],
    highlight: 5
  }
});
