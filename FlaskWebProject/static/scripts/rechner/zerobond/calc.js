define(function () {

  function calc(input) {

    var zerobond = input.zerobond,
        laufzeit = input.laufzeit,
        emission_rendite = input.emission_rendite,
        laufzeit_schritt = input.laufzeit_schritt,
        emission_rendite_schritt = input.emission_rendite_schritt;

    var result = null;

    if (zerobond == 0) { //Rendite von Zerobonds
      var jahre = laufzeit;
      var zins = emission_rendite;

      result = [];
      result[0] = [];
      result[0][0] = "";
      for (var int1 = 1; int1 < 11; int1++) {
        result[int1] = [];
        result[int1][0] = jahre;
        for (var int2 = 1; int2 < 6; int2++) {
          result[0][int2] = zins;
          result[int1][int2] = r(BerechneRendite(zins, jahre));
          zins = emission_rendite + int2 * emission_rendite_schritt;
        }
        jahre = laufzeit + int1 * laufzeit_schritt;
        zins = emission_rendite;
      }
      jahre = laufzeit;
    }
    else if (zerobond == 1) { // Kaufkurs von Zerobonds
      var jahre = laufzeit;
      var zins = emission_rendite;

      result = [];
      result[0] = [];
      result[0][0] = "";
      for (var int1 = 1; int1 < 11; int1++) {
        result[int1] = [];
        result[int1][0] = jahre;
        for (var int2 = 1; int2 < 6; int2++) {
          result[0][int2] = zins;
          result[int1][int2] = r(BerechneKaufkurs(zins, jahre));
          zins = emission_rendite + int2 * emission_rendite_schritt;
        }
        jahre = laufzeit + int1 * laufzeit_schritt;
        zins = emission_rendite;
      }
      jahre = laufzeit;
    }

    return {
      resultTable: result
    };

  }

  var NOMINALWERT = 100;

  //Berechnet die Rendite

  function BerechneRendite(Kaufkurs, Laufzeit) {
    var Rendite = 0;

    if (Kaufkurs > 0 && Laufzeit > 0) {
      var dTemp = NOMINALWERT / Kaufkurs;
      Rendite = Math.pow(dTemp, (1 / Laufzeit));
      Rendite -= 1;
      Rendite *= 100;
    }

    return Rendite;
  }


  // Berechnet den Kaufkurs

  function BerechneKaufkurs(Rendite, Laufzeit) {
    var Kaufkurs = 0;

    if (Rendite > 0 && Laufzeit > 0) {
      var dTemp = 0.0;
      Rendite = (Rendite / 100) + 1;
      dTemp = Math.pow(Rendite, Laufzeit);
      Kaufkurs = NOMINALWERT / dTemp;
    }

    return Kaufkurs;
  }

  //function zum Runden auf 2 Stellen nach Komma

  function r(number) {
    var k = (Math.round(number * 100) / 100)
      .toString();
    k += (k.indexOf('.') == -1) ? '.00' : '00';
    return k.substring(0, k.indexOf('.') + 3);
  }

  return calc;

});
