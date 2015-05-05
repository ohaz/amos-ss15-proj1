define([
  './breakevenBEP',
  './breakevenBEPZiel',
  './breakevenResult'
], function (
  CBEP,
  CBEPZiel,
  BEPresult
) {

  var constants = null;

  function calc(input) {

    var verkaufspreis = input.verkaufspreis,
        absatzmenge = input.absatzmenge,
        variable_kosten = input.variable_kosten,
        fixkosten = input.fixkosten,

        fixkosten_in_prozent = input.fixkosten_in_prozent,
        stueckkosten = input.stueckkosten,
        deckungsbeitrag = input.deckungsbeitrag,
        gewinnschwelle = input.gewinnschwelle,

        umsatzerloese = input.umsatzerloese,
        gesamtkosten = input.gesamtkosten,
        ergebnis = input.ergebnis,

        berechnungsart = input.berechnungsart,
        veraenderliche_groese = input.veraenderliche_groese;

        constants = input.config.constants;

    if (berechnungsart == constants.BEPZIEL_STANDARD) {
      return WerteingabeDlg(verkaufspreis, variable_kosten, fixkosten, absatzmenge, berechnungsart);
    }
    else {
      var temp = ZieleingabeDlg(variable_kosten, fixkosten, verkaufspreis, absatzmenge, berechnungsart, veraenderliche_groese, fixkosten_in_prozent,
        stueckkosten,
        deckungsbeitrag,
        gewinnschwelle,

        umsatzerloese,
        gesamtkosten,
        ergebnis);
      return temp;
    }

  }


  function WerteingabeDlg(m_dblMerkVKPreis, m_dblMerkVarikosten, m_dblMerkFixkosten, m_dblMerkAbsatzmenge, bepVar) {

    var error = false; //null;

    if (IstDbNull(m_dblMerkVKPreis, m_dblMerkVarikosten, m_dblMerkFixkosten, m_dblMerkAbsatzmenge)) {
      error = true; //"Der Deckungsbeitrag ist 0. Mathematisch ist die Gewinnschwelle nicht ermittelbar. Variieren Sie den Zielwert.";

      var result = new BEPresult(m_dblMerkVKPreis, m_dblMerkAbsatzmenge, m_dblMerkVarikosten, m_dblMerkFixkosten,
        null, null, null, null, null, null, null, error);

      return result;
    }

    if (Werteueberlauf(m_dblMerkVKPreis, m_dblMerkVarikosten, m_dblMerkFixkosten, m_dblMerkAbsatzmenge)) {
      error = true; //"Mindestens ein errechneter Wert kann nicht dargestellt werden (> 9 Stellen); verwenden Sie andere Ausgangswerte.";

      var result = new BEPresult(m_dblMerkVKPreis, m_dblMerkAbsatzmenge, m_dblMerkVarikosten, m_dblMerkFixkosten,
        null, null, null, null, null, null, null, error);

      return result;
    }

    var bep = new CBEP(m_dblMerkVarikosten, m_dblMerkFixkosten, m_dblMerkVKPreis, m_dblMerkAbsatzmenge);

    var result = new BEPresult(bep.getVKPreis(),
      bep.getAbsatzmenge(),
      bep.getVarKosten(),
      bep.getFixKosten(),
      bep.getFixKostenProzent(),
      bep.getVarStueckkosten(),
      bep.getDeckungsbeitrag(),
      bep.getGewinnschwelle(),
      bep.getUmsatzerloese(),
      bep.getGesamtkosten(),
      bep.getErgebnis(),
      error);

    return result;
  }


  function ZieleingabeDlg(m_Varkosten, m_Fixkosten, m_VKPreis, m_Absatzmenge, iBepZiel, BEPVar, fixkosten_in_prozent,
    stueckkosten,
    deckungsbeitrag,
    gewinnschwelle,

    umsatzerloese,
    gesamtkosten,
    ergebnis) {
    var bep = new CBEP(m_Varkosten, m_Fixkosten, m_VKPreis, m_Absatzmenge);
    var ziel = 0;
    var intVar = BEPVar;
    var calcError = constants.BEPERROR_NOERROR;

    switch (iBepZiel) {
    case constants.BEPZIEL_STUECKKOSTEN:
      ziel = stueckkosten;
      break;
    case constants.BEPZIEL_FIXKOSTENPROZ:
      ziel = fixkosten_in_prozent;
      break;
    case constants.BEPZIEL_DB:
      ziel = deckungsbeitrag;
      break;
    case constants.BEPZIEL_BEP:
      ziel = gewinnschwelle;
      break;
    case constants.BEPZIEL_GESAMTKOSTEN:
      ziel = gesamtkosten;
      break;
    case constants.BEPZIEL_UMSATZERLOESE:
      ziel = umsatzerloese;
      break;
    case constants.BEPZIEL_ERGEBNIS:
      ziel = ergebnis;
      break;
    }



    var BEPziel = new CBEPZiel(bep, ziel, iBepZiel, BEPVar, constants);

    var BEPziel_result = BEPziel.Calc();

    var calcError = BEPziel_result.error;

    var dblZiel = BEPziel_result.result;

    var error = "";



    if (calcError == constants.BEPERROR_NOERROR || calcError == constants.BEPERROR_BEPNOTEXACT) {
      switch (intVar) {
      case constants.BEPVAR_VARKOSTEN:
        var m_Varkosten_neu;
        dblZiel = parseInt(dblZiel.toFixed(0));

        if (IstDbNull(m_VKPreis, dblZiel, m_Fixkosten, m_Absatzmenge)) {
          error = "Der Deckungsbeitrag ist 0. Mathematisch ist die Gewinnschwelle nicht ermittelbar. Variieren Sie den Zielwert.";
          m_Varkosten_neu = null;
        }
        else if (Werteueberlauf(m_VKPreis, dblZiel, m_Fixkosten, m_Absatzmenge)) {
          error = "Mindestens ein errechneter Wert kann nicht dargestellt werden (> 9 Stellen). Bitte wählen Sie einen anderen Zielwert.";
          m_Varkosten_neu = null;
        }
        else {
          m_Varkosten_neu = dblZiel;
        }

        bep.m_VarKosten = m_Varkosten_neu;

        /*var result = new BEPresult( bep.getVKPreis(),
  					bep.getAbsatzmenge(),
  					m_Varkosten_neu,
  					bep.getFixKosten(),
  					bep.getFixKostenProzent(),
  					bep.getVarStueckkosten(),
  					bep.getDeckungsbeitrag(),
  					bep.getGewinnschwelle(),
  					bep.getUmsatzerloese(),
  					bep.getGesamtkosten(),
  					bep.getErgebnis(),
  					error);*/

        break;

      case constants.BEPVAR_FIXKOSTEN:
        var m_Fixkosten_neu;
        dblZiel = parseInt(dblZiel.toFixed(0));

        if (IstDbNull(m_VKPreis, m_Varkosten, dblZiel, m_Absatzmenge)) {
          error = "Der Deckungsbeitrag ist 0. Mathematisch ist die Gewinnschwelle nicht ermittelbar. Variieren Sie den Zielwert.";
          m_Fixkosten_neu = null;
        }
        else if (Werteueberlauf(m_VKPreis, m_Varkosten, dblZiel, m_Absatzmenge)) {
          error = "Mindestens ein errechneter Wert kann nicht dargestellt werden (> 9 Stellen). Bitte wählen Sie einen anderen Zielwert.";
          m_Fixkosten_neu = null;
        }
        else {
          m_Fixkosten_neu = dblZiel;
        }

        bep.m_FixKosten = m_Fixkosten_neu;

        /*var result = new BEPresult( bep.getVKPreis(),
  					bep.getAbsatzmenge(),
  					bep.getVarKosten(),
  					m_Fixkosten_neu,
  					bep.getFixKostenProzent(),
  					bep.getVarStueckkosten(),
  					bep.getDeckungsbeitrag(),
  					bep.getGewinnschwelle(),
  					bep.getUmsatzerloese(),
  					bep.getGesamtkosten(),
  					bep.getErgebnis(),
  					error);*/

        break;

      case constants.BEPVAR_ABSATZMENGE:
        var m_Absatzmenge_neu;
        dblZiel = parseInt(dblZiel.toFixed(0));

        if (IstDbNull(m_VKPreis, m_Varkosten, m_Fixkosten, dblZiel)) {
          error = "Der Deckungsbeitrag ist 0. Mathematisch ist die Gewinnschwelle nicht ermittelbar. Variieren Sie den Zielwert.";
          m_Absatzmenge_neu = null;
        }
        else if (Werteueberlauf(m_VKPreis, m_Varkosten, m_Fixkosten, dblZiel)) {
          error = "Mindestens ein errechneter Wert kann nicht dargestellt werden (> 9 Stellen). Bitte wählen Sie einen anderen Zielwert.";
          m_Absatzmenge_neu = null;
        }
        else {
          m_Absatzmenge_neu = dblZiel;
        }

        bep.m_Absatzmenge = m_Absatzmenge_neu;

        /*var result = new BEPresult( bep.getVKPreis(),
  					m_Absatzmenge_neu,
  					bep.getVarKosten(),
  					bep.getFixKosten(),
  					bep.getFixKostenProzent(),
  					bep.getVarStueckkosten(),
  					bep.getDeckungsbeitrag(),
  					bep.getGewinnschwelle(),
  					bep.getUmsatzerloese(),
  					bep.getGesamtkosten(),
  					bep.getErgebnis(),
  					error);*/

        break;

      case constants.BEPVAR_VKPREIS:
        var m_VKPreis_neu;
        dblZiel = parseFloat(dblZiel.toFixed(2));



        if (IstDbNull(dblZiel, m_Varkosten, m_Fixkosten, m_Absatzmenge)) {
          error = "Der Deckungsbeitrag ist 0. Mathematisch ist die Gewinnschwelle nichte ermittelbar. Variieren Sie den Zilwert.";
          m_VKPreis_neu = null;
        }
        else if (Werteueberlauf(dblZiel, m_Varkosten, m_Fixkosten, m_Absatzmenge)) {
          error = "Mindestens ein errechneter Wert kann nicht dargestellt werden (> 9 Stellen). Bitte wählen Sie einen anderen Zielwert.";
          m_VKPreis_neu = null;
        }
        else {
          m_VKPreis_neu = dblZiel;
        }

        bep.m_VKPreis = m_VKPreis_neu;

        /*var result = new BEPresult( m_VKPreis_neu,
  					bep.getAbsatzmenge(),
  					bep.getVarKosten(),
  					bep.getFixKosten(),
  					bep.getFixKostenProzent(),
  					bep.getVarStueckkosten(),
  					bep.getDeckungsbeitrag(),
  					bep.getGewinnschwelle(),
  					bep.getUmsatzerloese(),
  					bep.getGesamtkosten(),
  					bep.getErgebnis(),
  					error);*/

        break;
      }
    }
    else {



      switch (calcError) {
      case constants.BEPERROR_ITERATION:
        error = "Die Annäherung an den vorgegebenen Zielwert war nicht erfolgreich. Bitte wählen Sie einen anderen Zielwert.";
        break;
      case constants.BEPERROR_NOTFOUND:
        error = "Die Annäherung an den vorgegebenen Zielwert blieb erfolglos.";
        break;
      case constants.BEPERROR_BELOWZERO:
        error = "Das ermittelte Ergebnis ist negativ und somit nicht zulässig. Variieren Sie den Zielwert.";
        break;
      }

      /*var result = new BEPresult( bep.getVKPreis(),
  				bep.getAbsatzmenge(),
  				bep.getVarKosten(),
  				bep.getFixKosten(),
  				bep.getFixKostenProzent(),
  				bep.getVarStueckkosten(),
  				bep.getDeckungsbeitrag(),
  				bep.getGewinnschwelle(),
  				bep.getUmsatzerloese(),
  				bep.getGesamtkosten(),
  				bep.getErgebnis(),
  				error);*/

      switch (intVar) {
      case constants.BEPVAR_VARKOSTEN:
        result.variable_kosten = null;
        break;
      case constants.BEPVAR_FIXKOSTEN:
        result.fixkosten = null;
        break;
      case constants.BEPVAR_ABSATZMENGE:
        result.absatzmenge = null;
        break;
      case constants.BEPVAR_VKPREIS:
        result.verkaufspreis = null;
        break;
      default:
        break;
      }




    }

    var result = null;

    if (error == "") {
      result = new BEPresult(bep.getVKPreis(),
        bep.getAbsatzmenge(),
        bep.getVarKosten(),
        bep.getFixKosten(),
        bep.getFixKostenProzent(),
        bep.getVarStueckkosten(),
        bep.getDeckungsbeitrag(),
        bep.getGewinnschwelle(),
        bep.getUmsatzerloese(),
        bep.getGesamtkosten(),
        bep.getErgebnis(),
        false);
    }
    else {
      result = new BEPresult(bep.getVKPreis(),
        bep.getAbsatzmenge(),
        bep.getVarKosten(),
        bep.getFixKosten(),
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        true);
      switch (iBepZiel) {
      case constants.BEPZIEL_STUECKKOSTEN:
        result.stueckkosten = stueckkosten;
        break;
      case constants.BEPZIEL_FIXKOSTENPROZ:
        result.fixkosten_in_prozent = fixkosten_in_prozent;
        break;
      case constants.BEPZIEL_DB:
        result.deckungsbeitrag = deckungsbeitrag;
        break;
      case constants.BEPZIEL_BEP:
        result.gewinnschwelle = gewinnschwelle;
        break;
      case constants.BEPZIEL_GESAMTKOSTEN:
        result.gesamtkosten = gesamtkosten;
        break;
      case constants.BEPZIEL_UMSATZERLOESE:
        result.umsatzerloese = umsatzerloese;
        break;
      case constants.BEPZIEL_ERGEBNIS:
        result.ergebnis = ergebnis;
        break;
      }
    }




    return result;


  }


  function Werteueberlauf(dblVKPreis, dblVarkosten, dblFixkosten, dblAbsatzmenge) {
    var MAXOUTPUTVALUEINT = 999999999;
    var MAXOUTPUTVALUEDBL = 9999999.99;

    var bep = new CBEP(dblVarkosten, dblFixkosten, dblVKPreis, dblAbsatzmenge);

    if (Math.abs(bep.getDeckungsbeitrag()) > MAXOUTPUTVALUEDBL ||
      Math.abs(bep.getErgebnis()) > MAXOUTPUTVALUEINT ||
      Math.abs(bep.getGesamtkosten()) > MAXOUTPUTVALUEINT ||
      Math.abs(bep.getGewinnschwelle()) > MAXOUTPUTVALUEINT ||
      Math.abs(bep.getUmsatzerloese()) > MAXOUTPUTVALUEINT)
      return true;
    else
      return false;
  }


  function IstDbNull(dblVKPreis, dblVarkosten, dblFixkosten, dblAbsatzmenge) {
    var bep = new CBEP(dblVarkosten, dblFixkosten, dblVKPreis, dblAbsatzmenge);

    if (bep.getDeckungsbeitrag() == 0)
      return true;
    else
      return false;
  }

  return calc;

});
