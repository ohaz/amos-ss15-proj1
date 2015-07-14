define([
  "./estTarif",
  "../shared/Euroumrechnung"
], function (
  estTarif,
  EuroUmrechnung
) {
  "use strict";

  return function calc(input) {

    var zve = input.zve, //iphone-rechner-est-tarif.html 2
      veranlagungsjahr = input.veranlagungsjahr, //iphone-rechner-est-tarif.html 4
      veranlagungsform = input.veranlagungsform, //iphone-rechner-est-tarif.html 6 (0: Einzeln, 1: Zusammen)
      zve_schrittweite = input.zve_schrittweite; //iphone-esttar_einstellungen.html 2

    var inp_zVE, inp_Aenderung;
    var inp_Waehrung, inp_Jahr, inp_Veranlagung;

    var euro = new EuroUmrechnung();

    inp_Waehrung = euro.WAEHRUNG_EUR;

    inp_Jahr = veranlagungsjahr;
    inp_Veranlagung = veranlagungsform;
    inp_zVE = zve;
    inp_Aenderung = zve_schrittweite;

    var myTarif = new estTarif(zve, inp_Waehrung, zve_schrittweite, veranlagungsjahr, veranlagungsform);
    myTarif.BerechneTarife();

    var count = myTarif.tarifzeilenliste.length;
    var results = [];

    for (var i = 0; i < count; i++) {
      var zVE, Tarif, Durchschnitt, Grenzsteuer, Soli;
      var result = myTarif.getErgebniswerte(i); //, zVE, Tarif, Durchschnitt, Grenzsteuer, Soli);

      zVE = result.zvE;
      Tarif = result.Tarif;
      Durchschnitt = result.Durchschnitt;
      Grenzsteuer = result.Grenzsteuer;
      Soli = result.Soli;

      if ((inp_Waehrung == euro.WAEHRUNG_DEM) && (inp_Jahr >= 2002)) {
        zVE = euro.KonvertEuroWaehrung(zVE, euro.WAEHRUNG_EUR, euro.WAEHRUNG_DEM);
        Tarif = euro.KonvertEuroWaehrung(Tarif, euro.WAEHRUNG_EUR, euro.WAEHRUNG_DEM);
        Soli = euro.KonvertEuroWaehrung(Soli, euro.WAEHRUNG_EUR, euro.WAEHRUNG_DEM);
      }

      if ((inp_Waehrung == euro.WAEHRUNG_EUR) && (inp_Jahr < 2002)) {
        zVE = euro.KonvertEuroWaehrung(zVE, euro.WAEHRUNG_DEM, euro.WAEHRUNG_EUR);
        Tarif = euro.KonvertEuroWaehrung(Tarif, euro.WAEHRUNG_DEM, euro.WAEHRUNG_EUR);
        Soli = euro.KonvertEuroWaehrung(Soli, euro.WAEHRUNG_DEM, euro.WAEHRUNG_EUR);
      }

      results[i] = {
        zve: zVE,
        est: Tarif,
        solz: Soli,
        durchschnittssteuersatz: Durchschnitt,
        grenzsteuersatz: Grenzsteuer
      };

    }

    var list = {
      results: results,
      highlight: myTarif.getHighlightTarif()
    };

    return list;
  }

});
