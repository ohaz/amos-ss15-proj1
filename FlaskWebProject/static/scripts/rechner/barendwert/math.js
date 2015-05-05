define({

  endwertEinmalzahlung: function (dblKapital, dblZinssatz, iJahre) {
    return (dblKapital * Math.pow((1 + dblZinssatz / 100), iJahre));
  },

  barwertEinmalzahlung: function (dblKapital, dblZinssatz, iJahre) {
    return (dblKapital / Math.pow((1 + dblZinssatz / 100), iJahre));
  },

  endwertRegelzahlung: function (dblRate, dblZinssatz, iLaufzeit) {
    return (dblRate * (1 + dblZinssatz / 100) * (((Math.pow((1 + dblZinssatz / 100), iLaufzeit)) - 1) / ((1 + dblZinssatz / 100) - 1)));
  },

  barwertRegelzahlung: function (dblRate, dblZinssatz, iLaufzeit) {
    return (dblRate * (1 / Math.pow((1 + dblZinssatz / 100), (iLaufzeit - 1))) * ((Math.pow((1 + dblZinssatz / 100), iLaufzeit) - 1) / ((1 + dblZinssatz / 100) - 1)));
  },

  monatsZinssatz: function (dblJahresZinssatz) {
    return (Math.pow((dblJahresZinssatz / 100) + 1, 1.0 / 12.0) - 1) * 100;
  }

});
