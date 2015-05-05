define([
  './gewerbesteuer'
], function (
  CGewerbesteuer
) {

  function calc(input) {

    var berechnungsjahr_2 = input.Berechnungsjahr_2,
        gesellschaftsform_4 = input.Gesellschaftsform_4,
        hebesatz_6 = input.Hebesatz_6,
        ergebnis_gewst_8 = input.Ergebnis_GewSt_8,
        vorauszahlungen_10 = input.Vorauszahlungen_10,
        hinzurechnungen_12 = input.Hinzurechnungen_12,
        kuerzungen_14 = input.Kuerzungen_14,
        einstellungen_gewerbeertrag_schritt_2 = input.Einstellungen_gewerbeertrag_schritt_2,
        einstellungen_hebesatz_schritt_4 = input.Einstellungen_hebesatz_schritt_4;

    var cGewSt = new CGewerbesteuer();
    var m_BereInput = new CBereInput(berechnungsjahr_2, gesellschaftsform_4, hebesatz_6, ergebnis_gewst_8, vorauszahlungen_10, hinzurechnungen_12, kuerzungen_14);
    var GewerbesteuerBetrag, GewerbesteuerProzent, GewerbesteuerMessbetrag;

    var dGewErtrag = m_BereInput.dErgVorGewSt + m_BereInput.dHinzurech - m_BereInput.dKuerzung;
    if (m_BereInput.sJahr >= 2008) {
      dGewErtrag = m_BereInput.dErgVorGewSt + m_BereInput.dVorauszahlung + m_BereInput.dHinzurech - m_BereInput.dKuerzung;
      dGewErtrag = Math.floor(dGewErtrag / 100) * 100;
    }

    if (dGewErtrag < 0) {
      dGewErtrag = 0;
    }

    var result = null;

    gewStMessbetrag_tabelle = [];
    gewStSchuld_tabelle = [];
    gewStRestschuld_tabelle = [];

    gewStMessbetrag_tabelle[0] = [];
    gewStSchuld_tabelle[0] = [];
    gewStRestschuld_tabelle[0] = [];

    //Tabellen erstellen
    for (var int1 = 1; int1 < 7; int1++) {

      gewStMessbetrag_tabelle[int1] = [];
      gewStSchuld_tabelle[int1] = [];
      gewStRestschuld_tabelle[int1] = [];

      gewStMessbetrag_tabelle[int1][0] = dGewErtrag + (int1 - 1) * einstellungen_gewerbeertrag_schritt_2;
      gewStSchuld_tabelle[int1][0] = dGewErtrag + (int1 - 1) * einstellungen_gewerbeertrag_schritt_2;
      gewStRestschuld_tabelle[int1][0] = dGewErtrag + (int1 - 1) * einstellungen_gewerbeertrag_schritt_2;

      for (var int2 = 1; int2 < 4; int2++) {
        cGewSt.setBerechnungswerte(m_BereInput.sJahr,
          dGewErtrag + (int1 - 1) * einstellungen_gewerbeertrag_schritt_2,
          m_BereInput.dHebesatz + (int2 - 1) * einstellungen_hebesatz_schritt_4,
          m_BereInput.dVorauszahlung,
          m_BereInput.nGesform);
        var gewst = cGewSt.BerechneGewerbesteuerRueckstellungUndMessbetrag(GewerbesteuerBetrag,
          GewerbesteuerProzent,
          GewerbesteuerMessbetrag);

        gewStMessbetrag_tabelle[0][int2] = m_BereInput.dHebesatz + (int2 - 1) * einstellungen_hebesatz_schritt_4;
        gewStSchuld_tabelle[0][int2] = m_BereInput.dHebesatz + (int2 - 1) * einstellungen_hebesatz_schritt_4;
        gewStRestschuld_tabelle[0][int2] = m_BereInput.dHebesatz + (int2 - 1) * einstellungen_hebesatz_schritt_4;

        gewStMessbetrag_tabelle[int1][int2] = gewst.GewerbeMessbetrag;
        gewStSchuld_tabelle[int1][int2] = gewst.GewerbesteuerBetrag + m_BereInput.dVorauszahlung;
        gewStRestschuld_tabelle[int1][int2] = gewst.GewerbesteuerBetrag;
      }
    }

    var vorlGewSt = (parseInt((dGewErtrag / 100)
      .toFixed(0))) * 100;




    return {
      vorlGewerbeertrag_16: vorlGewSt,
      gewStMessbetrag_18: gewStMessbetrag_tabelle,
      gewStSchuld_20: gewStSchuld_tabelle,
      gewStRestschuld_22: gewStRestschuld_tabelle
    };
  }

  function CBereInput(berechnungsjahr_2,
    gesellschaftsform_4,
    hebesatz_6,
    ergebnis_gewst_8,
    vorauszahlungen_10,
    hinzurechnungen_12,
    kuerzungen_14) {
    this.sJahr = berechnungsjahr_2;
    this.dHebesatz = hebesatz_6;
    this.nGesform = gesellschaftsform_4;
    this.dErgVorGewSt = ergebnis_gewst_8;
    this.dVorauszahlung = vorauszahlungen_10;
    this.dHinzurech = hinzurechnungen_12;
    this.dKuerzung = kuerzungen_14;
  }

  return calc;

});
