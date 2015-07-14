define([
  "text!./tables/Tabelle_A.csv",
  "text!./tables/Tabelle_B.csv",
  "text!./tables/Tabelle_C.csv",
  "text!./tables/Tabelle_D-a.csv",
  "text!./tables/Tabelle_D-b.csv",
  "text!./tables/Tabelle_E-RVG.csv"
], function (
  tabelleA,
  tabelleB,
  tabelleC,
  tabelleDa,
  tabelleDb,
  tabelleERVG
) {

  function calc(position) {

    position = position || {};

    var dGebuehren = null;
    var tab;
    var TabelleTABELLE;

    position.hebesatz.mittelwert = hebesatzMittelwert(position.hebesatz);


    switch (position.tabelle) {
    case "Pauschal":
      dGebuehren = position.eingabe.gegenstandswert;
      if (position.taetigkeit == "Nachlass (netto)" || position.taetigkeit == "Vorschuss (netto)") {
        dGebuehren = (dGebuehren) * (-1);
      }
      else {
        dGebuehren = MindestgebuehrCheck(dGebuehren);
      }
      break;
    case "Zeit":
      dGebuehren = MindestgebuehrCheck(position.eingabe.gegenstandswert * 60 * position.hebesatz.zaehler / position.hebesatz.nenner);
      break;
    case "AN":
      dGebuehren = MindestgebuehrCheck(position.eingabe.gegenstandswert * position.hebesatz.zaehler);
      break;
    case "A":
      TabelleTABELLE = tabToArray(tabelleA);
      dGebuehren = berechneGebuehrTabelle(TabelleTABELLE, TabelleTABELLE.length, position.eingabe.gegenstandswert,
        position.hebesatz.zaehler, position.hebesatz.nenner);
      break;
    case "B":
      TabelleTABELLE = tabToArray(tabelleB);
      dGebuehren = berechneGebuehrTabelle(TabelleTABELLE, TabelleTABELLE.length, position.eingabe.gegenstandswert,
        position.hebesatz.zaehler, position.hebesatz.nenner);
      break;
    case "C":
      TabelleTABELLE = tabToArray(tabelleC);
      dGebuehren = berechneGebuehrTabelle(TabelleTABELLE, TabelleTABELLE.length, position.eingabe.gegenstandswert,
        position.hebesatz.zaehler, position.hebesatz.nenner);
      break;
    case "D-a":
      TabelleTABELLE = tabToArray(tabelleDa);
      dGebuehren = berechneGebuehrTabelle(TabelleTABELLE, TabelleTABELLE.length, position.eingabe.gegenstandswert,
        position.hebesatz.zaehler, position.hebesatz.nenner);
      break;
    case "D-b":
      TabelleTABELLE = tabToArray(tabelleDb);
      dGebuehren = berechneGebuehrTabelle(TabelleTABELLE, TabelleTABELLE.length, position.eingabe.gegenstandswert,
        position.hebesatz.zaehler, position.hebesatz.nenner);
      break;
    case "E":
      TabelleTABELLE = tabToArray(tabelleERVG);
      dGebuehren = berechneGebuehrTabelle(TabelleTABELLE, TabelleTABELLE.length, position.eingabe.gegenstandswert,
        position.hebesatz.zaehler, position.hebesatz.nenner);
      break;

    default:
      break;
    }

    position.paragraph16.value = BerechneEntgelteP16StBGebV(dGebuehren);
    position.gebuehr = dGebuehren;


    return position;
  }

  /* Tabelle_X.csv in Array mit Tabellenobjekten umwandeln */
  function tabToArray(csv) {
    var tabCsv = csv.split("\n");
    for (var i = 0; i < tabCsv.length; i++) {
      var temp_tab = tabCsv[i].split(";");
      tabCsv[i] = new tab(temp_tab[0], temp_tab[1], temp_tab[2], temp_tab[3]);
    }
    return tabCsv;
  }

  /* Tabellenobjekt */
  function tab(steigerungsfaktor, gegenstandswert, gebuehr, summe) {
    this.Steigungsfaktor = steigerungsfaktor;
    this.Gegenstandswert = gegenstandswert;
    this.Gebuehr = gebuehr;
    this.Summe = summe;
  }

  /* Berechne Gebühren Detail */
  function berechneGebuehrTabelle(TabTABELLE_Typ, iCountTab, dGegenstandswert, dHebesatzZaehler, dHebesatzNenner) {
    var dGebuehren = 0.0;

    for (var i = 1; i < iCountTab; i++) {
      var temp1 = TabTABELLE_Typ[i];

      var gebuehr = parseFloat((TabTABELLE_Typ[i].Gebuehr || "")
        .replace(/\./g, "")
        .replace(/,/g, "."));
      var gegenstandswert = parseFloat((TabTABELLE_Typ[i].Gegenstandswert || "")
        .replace(/\./g, "")
        .replace(/,/g, "."));
      var steigungsfaktor = parseFloat((TabTABELLE_Typ[i].Steigungsfaktor || "")
        .replace(/\./g, "")
        .replace(/,/g, "."));
      var summe = parseFloat((TabTABELLE_Typ[i].Summe || "")
        .replace(/\./g, "")
        .replace(/,/g, "."));

      var gebuehr_min_eins = parseFloat((TabTABELLE_Typ[i - 1].Gebuehr || "")
        .replace(/\./g, "")
        .replace(/,/g, "."));
      var gegenstandswert_min_eins = parseFloat((TabTABELLE_Typ[i - 1].Gegenstandswert || "")
        .replace(/\./g, "")
        .replace(/,/g, "."));
      var steigungsfaktor_min_eins = parseFloat((TabTABELLE_Typ[i - 1].Steigungsfaktor || "")
        .replace(/\./g, "")
        .replace(/,/g, "."));
      var summe_min_eins = parseFloat((TabTABELLE_Typ[i - 1].Summe || "")
        .replace(/\./g, "")
        .replace(/,/g, "."));

      dGegenstandswert = parseFloat(dGegenstandswert);
      dHebesatzZaehler = parseFloat(dHebesatzZaehler);
      dHebesatzNenner = parseFloat(dHebesatzNenner);

      if (dGegenstandswert <= gegenstandswert) {
        if (steigungsfaktor > 0) // Steigerungsfaktor ist vorhanden
        {
          if (summe_min_eins > 0) {
            dGebuehren = summe_min_eins;
          }
          else {
            dGebuehren = gebuehr_min_eins;
          }

          // Faktor ermitteln
          var dFaktor = (dGegenstandswert - gegenstandswert_min_eins) / steigungsfaktor;
          // Faktor aufrunden
          dFaktor = Runde(dFaktor, 0, true);

          dGebuehren = dGebuehren + dFaktor * gebuehr;
        }
        else {
          dGebuehren = gebuehr;
        }

        dGebuehren = MindestgebuehrCheck(dGebuehren * dHebesatzZaehler / dHebesatzNenner); // Mindestgebühr 10 Euro abprüfen

        i = iCountTab; // Eintrag wurde gefunden, damit wird die Schleife verlassen, deshalb i = iCountTab

        return dGebuehren;

      }
    }

    return dGebuehren;
  }

  function MindestgebuehrCheck(dGebuehren) {
    return (dGebuehren < 10) ? 10 : dGebuehren; // Mindestgebühr 10 Euro abprüfen
  }

  /* Entgeld nach Paragraph 16 berechnen */
  function BerechneEntgelteP16StBGebV(dGebuehren) {
    // Entgelte §16 StBGebV berechnen
    var dEntgelteP16StBGebV = Math.abs(0.2 * dGebuehren);
    if (dEntgelteP16StBGebV > 20) // Begrenzung auf den Höchstbetrag von 20 Euro
    {
      dEntgelteP16StBGebV = 20.0;
    }
    return dEntgelteP16StBGebV; //dEntgelteP16StBGebV;
  }

  /* Hebesatz Mittelwert */
  function hebesatzMittelwert(hebesatz) {
    var zaehler_max = parseFloat(hebesatz.zaehler_max);
    var zaehler_min = parseFloat(hebesatz.zaehler_min);


    if (zaehler_max > 0 && zaehler_min < zaehler_max) {
      if (zaehler_min != 0) {
        return ((zaehler_min / 2) + (zaehler_max / 2));
      }
      else {
        return zaehler_max / 2;
      }
    }
    else if (zaehler_max == zaehler_min) {
      return zaehler_max;
    }
    else {
      return "";
    }
  }

  return calc;

});

function Runde(dWert, iNachkommastellen, bAufrunden) {

  var doBase = 10.0;
  var doComplete5, doComplete5i;

  doComplete5 = dWert * Math.pow(doBase, iNachkommastellen);

  doComplete5i = Math.floor(doComplete5);

  if ((doComplete5 - doComplete5i) != 0) {
    if (bAufrunden && dWert > 0)
      doComplete5i += 1;
    else if (!bAufrunden && dWert < 0)
      doComplete5i -= 1;
  }

  return doComplete5i / Math.pow(doBase, iNachkommastellen);

}
