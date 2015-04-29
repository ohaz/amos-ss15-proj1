define([
  './math'
], function (
  math
) {
  function ZinsrechnerMain(input) {
    var Zinssatz = input.zinssatz,
        Periodentyp = Number(input.periodentyp),
        Periodenanzahl = input.periodenanzahl,
        ZinssatzSchrittweite = input.zinssatzSchrittweite,
        PeriodenSchrittweite = input.periodenSchrittweite;

    //Erzeugung eines Objekts des Typs 'result' durch new
    var resultObj = {
      tabelle_zinsvariation: {
        Jahr: new Array(),
        Quartal: new Array(),
        Monat: new Array,
        Tag: new Array()
      },
      tabelle_laufzeitvariation: {
        Jahr: new Array(),
        Quartal: new Array(),
        Monat: new Array,
        Tag: new Array()
      }
    };

    var temp_zins = Zinssatz;
    var temp_periodenanzahl = Periodenanzahl;

    for (var x = 0; x < 11; x++) {
      //Der Jahreszins wird hier ausgerechnet um bei den n�chsten Berechnungen schon existent zu sein
      var Jahreszins = r(math.getJahreszins(temp_zins, temp_periodenanzahl, Periodentyp));

      /*Im resultObj wird ein neues Array erstellt
            welches die Ergebnisse aus der Berechnung
            des Zinssatz und den Jahreszins enth�lt*/
      resultObj.tabelle_zinsvariation.Jahr[x] = [];
      resultObj.tabelle_zinsvariation.Jahr[x][0] = r(temp_zins);
      resultObj.tabelle_zinsvariation.Jahr[x][1] = Jahreszins;

      resultObj.tabelle_zinsvariation.Quartal[x] = [];
      resultObj.tabelle_zinsvariation.Quartal[x][0] = r(temp_zins);
      resultObj.tabelle_zinsvariation.Quartal[x][1] = r(math.GetPeriodenzins(Jahreszins, 1, 1));

      resultObj.tabelle_zinsvariation.Monat[x] = [];
      resultObj.tabelle_zinsvariation.Monat[x][0] = r(temp_zins);
      resultObj.tabelle_zinsvariation.Monat[x][1] = r(math.GetPeriodenzins(Jahreszins, 1, 2)); //math.GetPeriodenzins

      resultObj.tabelle_zinsvariation.Tag[x] = [];
      resultObj.tabelle_zinsvariation.Tag[x][0] = r(temp_zins);
      resultObj.tabelle_zinsvariation.Tag[x][1] = r(math.GetPeriodenzins(Jahreszins, 1, 3)); //math.GetPeriodenzins

      temp_zins += ZinssatzSchrittweite;
    }

    temp_zins = Zinssatz

    for (var x = 0; x < 11; x++) {
      //Der Jahreszins wird hier ausgerechnet um bei den n�chsten Berechnungen schon existent zu sein
      var Jahreszins = r(math.getJahreszins(temp_zins, temp_periodenanzahl, Periodentyp));

      /*Im resultObj wird ein neues Array erstellt
            welches die Ergebnisse aus der Berechnung
            des Zinssatz und den Jahreszins enth�lt*/
      resultObj.tabelle_laufzeitvariation.Jahr[x] = [];
      resultObj.tabelle_laufzeitvariation.Jahr[x][0] = r(temp_periodenanzahl);
      resultObj.tabelle_laufzeitvariation.Jahr[x][1] = Jahreszins;

      resultObj.tabelle_laufzeitvariation.Quartal[x] = [];
      resultObj.tabelle_laufzeitvariation.Quartal[x][0] = r(temp_periodenanzahl);
      resultObj.tabelle_laufzeitvariation.Quartal[x][1] = r(math.GetPeriodenzins(Jahreszins, 1, 1));

      resultObj.tabelle_laufzeitvariation.Monat[x] = [];
      resultObj.tabelle_laufzeitvariation.Monat[x][0] = r(temp_periodenanzahl);
      resultObj.tabelle_laufzeitvariation.Monat[x][1] = r(math.GetPeriodenzins(Jahreszins, 1, 2)); //math.GetPeriodenzins

      resultObj.tabelle_laufzeitvariation.Tag[x] = [];
      resultObj.tabelle_laufzeitvariation.Tag[x][0] = r(temp_periodenanzahl);
      resultObj.tabelle_laufzeitvariation.Tag[x][1] = r(math.GetPeriodenzins(Jahreszins, 1, 3)); //math.GetPeriodenzins

      temp_periodenanzahl += PeriodenSchrittweite;
    }

    return resultObj; //R�ckgabe des Objektes
  }

  //Hilfsfunktion zum Runden der Ergebnisse auf 2 Stellen nach dem Komma

  function r(number) {
    var k = (Math.round(number * 1000) / 1000)
      .toString();
    k += (k.indexOf('.') == -1) ? '.000' : '000';
    return k.substring(0, k.indexOf('.') + 4);
  }

  return ZinsrechnerMain;

});
