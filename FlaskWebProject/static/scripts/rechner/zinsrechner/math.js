define(function () {
  //Rechnet den Zinssatz auf ein Jahr um
  function getJahreszins(Zinssatz, Periodenanzahl, Periodentyp) {
    var Jahreszins = 0;
    var Periode = 0;

    //Periodenanzahl 0 ist nicht zul�ssig
    if (Periodenanzahl == 0) return 0;

    //Nach Periodentyp unterscheiden
    switch (Periodentyp) {
    case 0: //Jahre
      Periode = (1 / 1) * Periodenanzahl;
      break;

    case 1: //Quartale
      Periode = (1 / 4) * Periodenanzahl;
      break;

    case 2: //Monate
      Periode = (1 / 12) * Periodenanzahl;
      break;

    case 3: //Tage
      Periode = (1 / 365) * Periodenanzahl;
      break;

    default:
      return 0;
      break;
    }

    Zinssatz *= 0.01; //Zins = Zins*0.01
    Jahreszins = Math.pow(++Zinssatz, 1 / Periode) - 1;
    Jahreszins *= 100;
    return Jahreszins;
  }

  //Rechnet den Jahreszinssatz auf eine bestimmte Periode um
  //Rechnet von Jahr auf Quartal, Monat, Tage um

  function GetPeriodenzins(Jahreszins, Periodenanzahl, Periodentyp) {
    var Zins = 0;
    var Periode = 0;

    //Periodenzahl 0 ist nicht zul�ssig
    if (Periodenanzahl == 0) return 0;

    //Nach Periodentyp  unterscheiden
    switch (Periodentyp) {
    case 0:
      Periode = 1 * Periodenanzahl;
      break;

    case 1:
      Periode = 4 * Periodenanzahl;
      break;

    case 2:
      Periode = 12 * Periodenanzahl;
      break;

    case 3:
      Periode = 365 * Periodenanzahl;
      break;

    default:
      return 0;
      break;
    }

    Jahreszins *= 0.01;
    Zins = Math.pow(++Jahreszins, 1 / Periode) - 1;
    Zins *= 100;
    return Zins;
  }

  return {
    getJahreszins: getJahreszins,
    GetPeriodenzins: GetPeriodenzins
  }

});
