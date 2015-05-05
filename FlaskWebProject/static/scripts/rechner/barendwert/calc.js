define([
  './math',
  './config',
  '../shared/resultTable'
], function (
  math,
  config,
  resultTable
) {

  function tabelle(zinssatz, laufzeit, zinsschritt, jahrschritt, cellFunc) {
    return resultTable.build(
      10 /* numRows */ , 5 /* numCols */ , cellFunc,
      resultTable.makeSequencerFunc(laufzeit, jahrschritt), /* rowHeadingFunc */
      resultTable.makeSequencerFunc(zinssatz, zinsschritt) /* colHeadingFunc */
    );
  }

  function getCellFunc(zeitraum, modus, betrag) {
    var cellFunctions = {
      jaehrlich: {
        barwert: function (rowIndex, colIndex, jahre /* rowHeading */ , zins /* colHeading */ ) {
          return math.barwertRegelzahlung(betrag, zins, jahre);
        },
        endwert: function (rowIndex, colIndex, jahre /* rowHeading */ , zins /* colHeading */ ) {
          return math.endwertRegelzahlung(betrag, zins, jahre);
        }
      },
      monatlich: {
        barwert: function (rowIndex, colIndex, jahre /* rowHeading */ , zins /* colHeading */ ) {
          return math.barwertRegelzahlung(betrag, math.monatsZinssatz(zins), jahre);
        },
        endwert: function (rowIndex, colIndex, jahre /* rowHeading */ , zins /* colHeading */ ) {
          return math.endwertRegelzahlung(betrag, math.monatsZinssatz(zins), jahre);
        }
      },
      einmalig: {
        barwert: function (rowIndex, colIndex, jahre /* rowHeading */ , zins /* colHeading */ ) {
          return math.barwertEinmalzahlung(betrag, zins, jahre);
        },
        endwert: function (rowIndex, colIndex, jahre /* rowHeading */ , zins /* colHeading */ ) {
          return math.endwertEinmalzahlung(betrag, zins, jahre);
        }
      }
    };

    return cellFunctions[zeitraum] && cellFunctions[zeitraum][modus];
  }

  var constants = config.constants;

  return function (data) {
    var barendwert = Number(data.barendwert), // Berechnungsmodus
      betrag = data.betrag,
      zeitraum = Number(data.zeitraum),
      zinssatz = data.zinssatz,
      laufzeit = data.laufzeit,
      zinsschritt = data.zinsschritt,
      jahrschritt = data.laufzeitschritt,
      cellFn,
      barendwertStr,
      zeitraumStr;

    switch (barendwert) {
    case constants.BERECHNUNG_BARWERT:
      barendwertStr = 'barwert';
      break;

    case constants.BERECHNUNG_ENDWERT:
      barendwertStr = 'endwert';
      break;
    }

    switch (zeitraum) {
    case constants.ZAHLUNG_JAEHRLICH:
      zeitraumStr = 'jaehrlich';
      break;

    case constants.ZAHLUNG_MONATLICH:
      zeitraumStr = 'monatlich';
      break;

    case constants.ZAHLUNG_EINMALIG:
      zeitraumStr = 'einmalig';
      break;
    }

    cellFn = getCellFunc(zeitraumStr, barendwertStr, betrag);

    if (typeof cellFn !== 'function') {
      throw new Error('Ungültiger Zeitraum oder Berechnungsmodus');
    }

    return {
      resultTable: tabelle(zinssatz, laufzeit, zinsschritt, jahrschritt, cellFn)
    };
  };

});
