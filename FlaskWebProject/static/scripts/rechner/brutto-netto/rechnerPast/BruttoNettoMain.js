define([
  './BruttoNettoLohn',
  './BruttoNettoErgebnis',
  './BruttoNettoOutput',
  './BruttoNettoSkvOutput'
], function (
  BruttoNettoLohn,
  CBruttoNettoErgebnis,
  BNOutput,
  BruttoNettoSkvOutput
) {

  var CBruttoNettolohn = BruttoNettoLohn.CBruttoNettolohn;

  function calc(input) {

    var BruttoOderNetto = input.brutto_oder_netto,
      veranlagungsjahr = input.veranlagungsjahr,
      lohnzahlzeitraum = input.lohnzahlzeitraum,
      faktor = input.faktor,

      steuerklasse_1 = input.steuerklasse_1,
      bruttolohn_1 = input.bruttolohn_1,
      nettolohn_1 = input.nettolohn_1,
      alter_1 = input.alter_1,
      hinzurechnungsbetrag_1 = input.hinzurechnungsbetrag_1,
      versorgungsbezuege_1 = input.versorgungsbezuege_1,
      versorgungsbeginn_1 = input.versorgungsbeginn_1,
      freibetrag_1 = input.freibetrag_1,
      rv_pflicht_1 = input.rv_pflicht_1,
      ks_pflicht_1 = input.ks_pflicht_1,
      kinderfreibetrag_1 = input.kinderfreibetrag_1,
      arbeitsstaette_1 = input.arbeitsstaette_1,
      gesetzliche_kv_1 = input.gesetzliche_kv_1,
      zuschlag_gesetzliche_kv_1 = input.zuschlag_gesetzliche_kv_1,
      beitrag_private_kv_1 = input.beitrag_private_kv_1,
      zuschuss_private_kv_1 = input.zuschuss_private_kv_1,

      steuerklasse_2 = input.steuerklasse_2,
      bruttolohn_2 = input.bruttolohn_2,
      nettolohn_2 = input.nettolohn_2,
      alter_2 = input.alter_2,
      hinzurechnungsbetrag_2 = input.hinzurechnungsbetrag_2,
      versorgungsbezuege_2 = input.versorgungsbezuege_2,
      versorgungsbeginn_2 = input.versorgungsbeginn_2,
      freibetrag_2 = input.freibetrag_2,
      rv_pflicht_2 = input.rv_pflicht_2,
      ks_pflicht_2 = input.ks_pflicht_2,
      kinderfreibetrag_2 = input.kinderfreibetrag_2,
      arbeitsstaette_2 = input.arbeitsstaette_2,
      gesetzliche_kv_2 = input.gesetzliche_kv_2,
      zuschlag_gesetzliche_kv_2 = input.zuschlag_gesetzliche_kv_2,
      beitrag_private_kv_2 = input.beitrag_private_kv_2,
      zuschuss_private_kv_2 = input.zuschuss_private_kv_2,

      config = input.config;

    var erg = {
      bne: null,
      skv: null
    };

    // if (versorgungsbeginn_1 == null || versorgungsbeginn_1 >
    // veranlagungsjahr)
    // versorgungsbeginn_1 = config.versorgungsbeginn.min;
    //
    // if (versorgungsbeginn_2 == null || versorgungsbeginn_1 >
    // veranlagungsjahr)
    // versorgungsbeginn_2 = config.versorgungsbeginn.min;
    //

    versorgungsbeginn_1 = versorgungsbeginn_1 - config.values.versorgungsbeginn.min;
    versorgungsbeginn_2 = versorgungsbeginn_2 - config.values.versorgungsbeginn.min;

    if (BruttoOderNetto) {
      erg.bne = BruttoNetto(veranlagungsjahr, lohnzahlzeitraum,
        faktor, steuerklasse_1, bruttolohn_1, nettolohn_1,
        alter_1, hinzurechnungsbetrag_1,
        versorgungsbezuege_1, versorgungsbeginn_1,
        freibetrag_1, rv_pflicht_1, ks_pflicht_1,
        kinderfreibetrag_1, arbeitsstaette_1,
        gesetzliche_kv_1, zuschlag_gesetzliche_kv_1,
        beitrag_private_kv_1, zuschuss_private_kv_1,
        steuerklasse_2, bruttolohn_2, nettolohn_2, alter_2,
        hinzurechnungsbetrag_2, versorgungsbezuege_2,
        versorgungsbeginn_2, freibetrag_2, rv_pflicht_2,
        ks_pflicht_2, kinderfreibetrag_2, arbeitsstaette_2,
        gesetzliche_kv_2, zuschlag_gesetzliche_kv_2,
        beitrag_private_kv_2, zuschuss_private_kv_2, config);
    }
    else {
      erg.bne = NettoBrutto(veranlagungsjahr, lohnzahlzeitraum,
        faktor, steuerklasse_1, bruttolohn_1, nettolohn_1,
        alter_1, hinzurechnungsbetrag_1,
        versorgungsbezuege_1, versorgungsbeginn_1,
        freibetrag_1, rv_pflicht_1, ks_pflicht_1,
        kinderfreibetrag_1, arbeitsstaette_1,
        gesetzliche_kv_1, zuschlag_gesetzliche_kv_1,
        beitrag_private_kv_1, zuschuss_private_kv_1,
        steuerklasse_2, bruttolohn_2, nettolohn_2, alter_2,
        hinzurechnungsbetrag_2, versorgungsbezuege_2,
        versorgungsbeginn_2, freibetrag_2, rv_pflicht_2,
        ks_pflicht_2, kinderfreibetrag_2, arbeitsstaette_2,
        gesetzliche_kv_2, zuschlag_gesetzliche_kv_2,
        beitrag_private_kv_2, zuschuss_private_kv_2, config);
    }
    erg.skv = Klassenvergleich(veranlagungsjahr, lohnzahlzeitraum,
      faktor, steuerklasse_1, bruttolohn_1, nettolohn_1,
      alter_1, hinzurechnungsbetrag_1, versorgungsbezuege_1,
      versorgungsbeginn_1, freibetrag_1, rv_pflicht_1,
      ks_pflicht_1, kinderfreibetrag_1, arbeitsstaette_1,
      gesetzliche_kv_1, zuschlag_gesetzliche_kv_1,
      beitrag_private_kv_1, zuschuss_private_kv_1,
      steuerklasse_2, bruttolohn_2, nettolohn_2, alter_2,
      hinzurechnungsbetrag_2, versorgungsbezuege_2,
      versorgungsbeginn_2, freibetrag_2, rv_pflicht_2,
      ks_pflicht_2, kinderfreibetrag_2, arbeitsstaette_2,
      gesetzliche_kv_2, zuschlag_gesetzliche_kv_2,
      beitrag_private_kv_2, zuschuss_private_kv_2, config);

    return erg;
  }

  function isRechteKreisOst(arbeitsstaette, constants) {
    var retValue = false;
    retValue = arbeitsstaette === constants.BRANDENBURG || arbeitsstaette === constants.MECKLENBURG_VORPOMMERN || arbeitsstaette === constants.SACHSEN || arbeitsstaette === constants.SACHSEN_ANHALT || arbeitsstaette === constants.THUERINGEN;

    return retValue;
  }

  function getKirchensteuersatz(arbeitsstaette, constants) {
    var retValue = 9.00;
    if (arbeitsstaette === constants.BADEN_WUERTTEMBERG || arbeitsstaette === constants.BAYERN)
      retValue = 8.00;

    return retValue;
  }

  function isArbeitsstaetteSachsen(arbeitsstaette, constants) {
    var retValue = false;
    retValue = arbeitsstaette === constants.SACHSEN;

    return retValue;
  }

  function BruttoNetto(veranlagungsjahr, lohnzahlzeitraum, faktor,
    steuerklasse_1, bruttolohn_1, nettolohn_1, alter_1,
    hinzurechnungsbetrag_1, versorgungsbezuege_1,
    versorgungsbeginn_1, freibetrag_1, rv_pflicht_1,
    ks_pflicht_1, kinderfreibetrag_1, arbeitsstaette_1,
    gesetzliche_kv_1, zuschlag_gesetzliche_kv_1,
    beitrag_private_kvpv_1, zuschuss_private_kv_1,

    steuerklasse_2, bruttolohn_2, nettolohn_2, alter_2,
    hinzurechnungsbetrag_2, versorgungsbezuege_2,
    versorgungsbeginn_2, freibetrag_2, rv_pflicht_2,
    ks_pflicht_2, kinderfreibetrag_2, arbeitsstaette_2,
    gesetzliche_kv_2, zuschlag_gesetzliche_kv_2,
    beitrag_private_kvpv_2, zuschuss_private_kv_2,

    config)

  {

    var bne1 = new CBruttoNettoErgebnis();
    var bncalc1 = new CBruttoNettolohn(alter_1, // iAlter,
      hinzurechnungsbetrag_1, // dHinzurechnungsbetrag,
      bruttolohn_1, // dArbeitslohn,
      versorgungsbezuege_1, // dVersorgungsbezuege,
      versorgungsbeginn_1, // iVersorgungsbeginnIdx,
      freibetrag_1, // dFreibetrag,
      !rv_pflicht_1, // iRentenversicherungsfrei, m_iRVFrei1
      lohnzahlzeitraum, // iLohnzahlungszeitraum,
      ks_pflicht_1 ? getKirchensteuersatz(arbeitsstaette_1,
        config.constants) : 0, // (arbeitsstaette_1 ? 9.00 :
      // 8.00) : 0,//float
      // fKirchensteuersatz,
      steuerklasse_1, // iSteuerklasse,
      kinderfreibetrag_1, // fKinder,
      BruttoNettoLohn.bemessungen.m_dblBemessungRVAV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBemessungRVAV,
      BruttoNettoLohn.bemessungen.m_dblBemessungKVPV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBemessungKVPV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzRV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzRV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzAV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzAV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzKV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzKV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzPV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzPV,
      !gesetzliche_kv_1, // bPrivateKV,
      beitrag_private_kvpv_1, // dBeitragPrivateKV,
      0, // beitrag_private_kvpv_1,//dBeitragPrivatePV,
      gesetzliche_kv_1 ? zuschlag_gesetzliche_kv_1 : zuschuss_private_kv_1, // zuschuss_private_kv_1,
      // //bZuschussAG,
      isArbeitsstaetteSachsen(arbeitsstaette_1, config.constants), // bPVS,
      isRechteKreisOst(arbeitsstaette_1, config.constants), // bRechtskreisOst,
      veranlagungsjahr // iVeranlagungsjahr
    );

    bncalc1.BerechneEx2(bne1);

    var bne2 = new CBruttoNettoErgebnis();
    var bncalc2 = new CBruttoNettolohn(alter_2, // iAlter,
      hinzurechnungsbetrag_2, // dHinzurechnungsbetrag,
      bruttolohn_2, // dArbeitslohn,
      versorgungsbezuege_2, // dVersorgungsbezuege,
      versorgungsbeginn_2, // iVersorgungsbeginnIdx,
      freibetrag_2, // dFreibetrag,
      !rv_pflicht_2, // iRentenversicherungsfrei, m_iRVFrei2
      lohnzahlzeitraum, // iLohnzahlungszeitraum,
      ks_pflicht_2 ? getKirchensteuersatz(arbeitsstaette_2,
        config.constants) : 0, // fKirchensteuersatz,
      steuerklasse_2, // iSteuerklasse,
      kinderfreibetrag_2, // fKinder,
      BruttoNettoLohn.bemessungen.m_dblBemessungRVAV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBemessungRVAV,
      BruttoNettoLohn.bemessungen.m_dblBemessungKVPV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBemessungKVPV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzRV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzRV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzAV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzAV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzKV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzKV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzPV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzPV,
      !gesetzliche_kv_2, // bPrivateKV,
      beitrag_private_kvpv_2, // dBeitragPrivateKV,
      0, // dBeitragPrivatePV,
      gesetzliche_kv_2 ? zuschlag_gesetzliche_kv_2 : zuschuss_private_kv_2, // zuschuss_private_kv_2,//bZuschussAG,
      isArbeitsstaetteSachsen(arbeitsstaette_2, config.constants), // bPVS,
      isRechteKreisOst(arbeitsstaette_2, config.constants), // bRechtskreisOst,
      veranlagungsjahr // iVeranlagungsjahr
    );

    bncalc2.BerechneEx2(bne2);

    bne1.setBruttoLohn(bruttolohn_1);
    bne2.setBruttoLohn(bruttolohn_2);
    // bne1.setBeitragPrivateKVPV(beitrag_private_kvpv_1);
    // bne2.setBeitragPrivateKVPV(beitrag_private_kvpv_2);

    var ouput1 = new BNOutput(bne1.m_dBMGKirchensteuer,
      bne1.m_dLohnsteuer, bne1.m_dKirchensteuer,
      bne1.m_dSolidaritaetszuschlag, bne1.m_dNettolohn,
      bne1.m_dTabellenOben, bne1.m_dTabellenUnten,
      bne1.m_dPauschAbzug, bne1.m_dNettolohnmitPauschAbzug,
      bne1.m_dRVBeitrag, bne1.m_dAVBeitrag,
      bne1.m_dKVBeitrag, bne1.m_dPVBeitrag,
      bne1.m_dBeitragPrivateKV, bne1.m_dBruttolohn,
      bne1.m_dSteuerklasse, versorgungsbeginn_1);

    var ouput2 = new BNOutput(bne2.m_dBMGKirchensteuer,
      bne2.m_dLohnsteuer, bne2.m_dKirchensteuer,
      bne2.m_dSolidaritaetszuschlag, bne2.m_dNettolohn,
      bne2.m_dTabellenOben, bne2.m_dTabellenUnten,
      bne2.m_dPauschAbzug, bne2.m_dNettolohnmitPauschAbzug,
      bne2.m_dRVBeitrag, bne2.m_dAVBeitrag,
      bne2.m_dKVBeitrag, bne2.m_dPVBeitrag,
      bne2.m_dBeitragPrivateKV, bne2.m_dBruttolohn,
      bne2.m_dSteuerklasse, versorgungsbeginn_2);

    return new Array(ouput1, ouput2);

  }

  function NettoBrutto(veranlagungsjahr, lohnzahlzeitraum, faktor,
    steuerklasse_1, bruttolohn_1, nettolohn_1, alter_1,
    hinzurechnungsbetrag_1, versorgungsbezuege_1,
    versorgungsbeginn_1, freibetrag_1, rv_pflicht_1,
    ks_pflicht_1, kinderfreibetrag_1, arbeitsstaette_1,
    gesetzliche_kv_1, zuschlag_gesetzliche_kv_1,
    beitrag_private_kvpv_1, zuschuss_private_kv_1,

    steuerklasse_2, bruttolohn_2, nettolohn_2, alter_2,
    hinzurechnungsbetrag_2, versorgungsbezuege_2,
    versorgungsbeginn_2, freibetrag_2, rv_pflicht_2,
    ks_pflicht_2, kinderfreibetrag_2, arbeitsstaette_2,
    gesetzliche_kv_2, zuschlag_gesetzliche_kv_2,
    beitrag_private_kvpv_2, zuschuss_private_kv_2,

    config) {

    var bne1 = new CBruttoNettoErgebnis();
    var bncalc1 = new CBruttoNettolohn(alter_1, // iAlter,
      hinzurechnungsbetrag_1, // dHinzurechnungsbetrag,
      bruttolohn_1, // dArbeitslohn,
      versorgungsbezuege_1, // dVersorgungsbezuege,
      versorgungsbeginn_1, // iVersorgungsbeginnIdx,
      freibetrag_1, // dFreibetrag,
      !rv_pflicht_1, // iRentenversicherungsfrei, m_iRVFrei1
      lohnzahlzeitraum, // iLohnzahlungszeitraum,
      ks_pflicht_1 ? getKirchensteuersatz(arbeitsstaette_1,
        config.constants) : 0, // fKirchensteuersatz,
      steuerklasse_1, // iSteuerklasse,
      kinderfreibetrag_1, // fKinder,
      BruttoNettoLohn.bemessungen.m_dblBemessungRVAV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBemessungRVAV,
      BruttoNettoLohn.bemessungen.m_dblBemessungKVPV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBemessungKVPV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzRV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzRV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzAV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzAV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzKV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzKV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzPV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzPV,
      !gesetzliche_kv_1, // bPrivateKV,
      beitrag_private_kvpv_1, // dBeitragPrivateKV,
      0, // beitrag_private_kvpv_1,//dBeitragPrivatePV,
      gesetzliche_kv_1 ? zuschlag_gesetzliche_kv_1 : zuschuss_private_kv_1, // zuschuss_private_kv_1,//bZuschussAG,
      isArbeitsstaetteSachsen(arbeitsstaette_1, config.constants), // bPVS,
      isRechteKreisOst(arbeitsstaette_1, config.constants), // bRechtskreisOst,
      veranlagungsjahr // iVeranlagungsjahr
    );

    var bne2 = new CBruttoNettoErgebnis();
    var bncalc2 = new CBruttoNettolohn(alter_2, // iAlter,
      hinzurechnungsbetrag_2, // dHinzurechnungsbetrag,
      bruttolohn_2, // dArbeitslohn,
      versorgungsbezuege_2, // dVersorgungsbezuege,
      versorgungsbeginn_2, // iVersorgungsbeginnIdx,
      freibetrag_2, // dFreibetrag,
      !rv_pflicht_2, // iRentenversicherungsfrei, m_iRVFrei2
      lohnzahlzeitraum, // iLohnzahlungszeitraum,
      ks_pflicht_2 ? getKirchensteuersatz(arbeitsstaette_2,
        config.constants) : 0, // fKirchensteuersatz,
      steuerklasse_2, // iSteuerklasse,
      kinderfreibetrag_2, // fKinder,
      BruttoNettoLohn.bemessungen.m_dblBemessungRVAV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBemessungRVAV,
      BruttoNettoLohn.bemessungen.m_dblBemessungKVPV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBemessungKVPV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzRV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzRV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzAV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzAV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzKV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzKV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzPV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzPV,
      !gesetzliche_kv_2, // bPrivateKV,
      beitrag_private_kvpv_2, // dBeitragPrivateKV,
      0, // beitrag_private_kvpv_2,//dBeitragPrivatePV,
      gesetzliche_kv_2 ? zuschlag_gesetzliche_kv_2 : zuschuss_private_kv_2, // zuschuss_private_kv_2,//bZuschussAG,
      isArbeitsstaetteSachsen(arbeitsstaette_2, config.constants), // bPVS,
      isRechteKreisOst(arbeitsstaette_2, config.constants), // bRechtskreisOst,
      veranlagungsjahr // iVeranlagungsjahr
    );

    var brutto_neu_1 = bncalc1.BerechneBruttoLohnEx2(nettolohn_1,
      bne1);
    var brutto_neu_2 = bncalc2.BerechneBruttoLohnEx2(nettolohn_2,
      bne2);

    if (brutto_neu_1 > config.values.bruttolohn_1.max) {
      brutto_neu_1 = config.values.bruttolohn_1.max;
    }

    if (brutto_neu_2 > config.values.bruttolohn_2.max) {
      brutto_neu_2 = config.values.bruttolohn_2.max;
    }

    return BruttoNetto(veranlagungsjahr, lohnzahlzeitraum, faktor,
      steuerklasse_1, brutto_neu_1, nettolohn_1, alter_1,
      hinzurechnungsbetrag_1, versorgungsbezuege_1,
      versorgungsbeginn_1, freibetrag_1, rv_pflicht_1,
      ks_pflicht_1, kinderfreibetrag_1, arbeitsstaette_1,
      gesetzliche_kv_1, zuschlag_gesetzliche_kv_1,
      beitrag_private_kvpv_1, zuschuss_private_kv_1,

      steuerklasse_2, brutto_neu_2, nettolohn_2, alter_2,
      hinzurechnungsbetrag_2, versorgungsbezuege_2,
      versorgungsbeginn_2, freibetrag_2, rv_pflicht_2,
      ks_pflicht_2, kinderfreibetrag_2, arbeitsstaette_2,
      gesetzliche_kv_2, zuschlag_gesetzliche_kv_2,
      beitrag_private_kvpv_2, zuschuss_private_kv_2,

      config);

  }

  function Klassenvergleich(veranlagungsjahr, lohnzahlzeitraum,
    faktor, steuerklasse_1, bruttolohn_1, nettolohn_1, alter_1,
    hinzurechnungsbetrag_1, versorgungsbezuege_1,
    versorgungsbeginn_1, freibetrag_1, rv_pflicht_1,
    ks_pflicht_1, kinderfreibetrag_1, arbeitsstaette_1,
    gesetzliche_kv_1, zuschlag_gesetzliche_kv_1,
    beitrag_private_kvpv_1, zuschuss_private_kv_1,

    steuerklasse_2, bruttolohn_2, nettolohn_2, alter_2,
    hinzurechnungsbetrag_2, versorgungsbezuege_2,
    versorgungsbeginn_2, freibetrag_2, rv_pflicht_2,
    ks_pflicht_2, kinderfreibetrag_2, arbeitsstaette_2,
    gesetzliche_kv_2, zuschlag_gesetzliche_kv_2,
    beitrag_private_kvpv_2, zuschuss_private_kv_2,

    config) {

    var bneStpfl1_III = new CBruttoNettoErgebnis();
    var bneStpfl1_IV = new CBruttoNettoErgebnis();
    var bneStpfl1_IV_Faktor = new CBruttoNettoErgebnis();
    var bneStpfl1_V = new CBruttoNettoErgebnis();
    var bneStpfl2_III = new CBruttoNettoErgebnis();
    var bneStpfl2_IV = new CBruttoNettoErgebnis();
    var bneStpfl2_IV_Faktor = new CBruttoNettoErgebnis();
    var bneStpfl2_V = new CBruttoNettoErgebnis();

    var bncalcStpfl1 = new CBruttoNettolohn(alter_1, // iAlter,
      hinzurechnungsbetrag_1, // dHinzurechnungsbetrag,
      bruttolohn_1, // dArbeitslohn,
      versorgungsbezuege_1, // dVersorgungsbezuege,
      versorgungsbeginn_1, // iVersorgungsbeginnIdx,
      freibetrag_1, // dFreibetrag,
      !rv_pflicht_1, // iRentenversicherungsfrei, m_iRVFrei1
      lohnzahlzeitraum, // iLohnzahlungszeitraum,
      ks_pflicht_1 ? getKirchensteuersatz(arbeitsstaette_1,
        config.constants) : 0, // fKirchensteuersatz,
      steuerklasse_1, // iSteuerklasse,
      kinderfreibetrag_1, // fKinder,
      BruttoNettoLohn.bemessungen.m_dblBemessungRVAV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBemessungRVAV,
      BruttoNettoLohn.bemessungen.m_dblBemessungKVPV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBemessungKVPV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzRV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzRV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzAV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzAV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzKV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzKV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzPV1[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzPV,
      !gesetzliche_kv_1, // bPrivateKV,
      beitrag_private_kvpv_1, // dBeitragPrivateKV,
      0, // beitrag_private_kvpv_1,//dBeitragPrivatePV,
      gesetzliche_kv_1 ? zuschlag_gesetzliche_kv_1 : zuschuss_private_kv_1, // zuschuss_private_kv_1,//bZuschussAG,
      isArbeitsstaetteSachsen(arbeitsstaette_1, config.constants), // bPVS,
      isRechteKreisOst(arbeitsstaette_1, config.constants), // bRechtskreisOst,
      veranlagungsjahr // iVeranlagungsjahr
    );

    bncalcStpfl1.setSteuerklasse(config.constants.STEUERKLASSE_III);
    bncalcStpfl1.BerechneEx2(bneStpfl1_III);

    bncalcStpfl1.setSteuerklasse(config.constants.STEUERKLASSE_V);
    bncalcStpfl1.BerechneEx2(bneStpfl1_V);

    // bncalcStpfl1.setKinderfreibetrag(0);

    bncalcStpfl1.setSteuerklasse(config.constants.STEUERKLASSE_IV);
    bncalcStpfl1.BerechneEx2(bneStpfl1_IV);

    bncalcStpfl1.setSteuerklasse(config.constants.STEUERKLASSE_IV);
    bncalcStpfl1.setFaktor(faktor);
    bncalcStpfl1.setFreibetrag(0);
    bncalcStpfl1.BerechneEx2(bneStpfl1_IV_Faktor);

    var bncalcStpfl2 = new CBruttoNettolohn(alter_2, // iAlter,
      hinzurechnungsbetrag_2, // dHinzurechnungsbetrag,
      bruttolohn_2, // dArbeitslohn,
      versorgungsbezuege_2, // dVersorgungsbezuege,
      versorgungsbeginn_2, // iVersorgungsbeginnIdx,
      freibetrag_2, // dFreibetrag,
      !rv_pflicht_2, // iRentenversicherungsfrei, m_iRVFrei2
      lohnzahlzeitraum, // iLohnzahlungszeitraum,
      ks_pflicht_2 ? getKirchensteuersatz(arbeitsstaette_2,
        config.constants) : 0, // fKirchensteuersatz,
      steuerklasse_2, // iSteuerklasse,
      kinderfreibetrag_2, // fKinder,
      BruttoNettoLohn.bemessungen.m_dblBemessungRVAV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBemessungRVAV,
      BruttoNettoLohn.bemessungen.m_dblBemessungKVPV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBemessungKVPV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzRV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzRV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzAV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzAV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzKV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzKV,
      BruttoNettoLohn.bemessungen.m_dblBeitragssatzPV2[veranlagungsjahr - config.values.veranlagungsjahr.min], // dBeitragssatzPV,
      !gesetzliche_kv_2, // bPrivateKV,
      beitrag_private_kvpv_2, // dBeitragPrivateKV,
      0, // beitrag_private_kvpv_2,//dBeitragPrivatePV,
      gesetzliche_kv_2 ? zuschlag_gesetzliche_kv_2 : zuschuss_private_kv_2, // zuschuss_private_kv_2,//bZuschussAG,
      isArbeitsstaetteSachsen(arbeitsstaette_2, config.constants), // bPVS,
      isRechteKreisOst(arbeitsstaette_2, config.constants), // bRechtskreisOst,
      veranlagungsjahr // iVeranlagungsjahr
    );

    bncalcStpfl2.setSteuerklasse(config.constants.STEUERKLASSE_III);
    bncalcStpfl2.BerechneEx2(bneStpfl2_III);

    bncalcStpfl2.setSteuerklasse(config.constants.STEUERKLASSE_V);
    bncalcStpfl2.BerechneEx2(bneStpfl2_V);

    // bncalcStpfl2.setKinderfreibetrag(0);

    bncalcStpfl2.setSteuerklasse(config.constants.STEUERKLASSE_IV);
    bncalcStpfl2.BerechneEx2(bneStpfl2_IV);

    bncalcStpfl2.setSteuerklasse(config.constants.STEUERKLASSE_IV);
    bncalcStpfl2.setFaktor(faktor);
    bncalcStpfl2.setFreibetrag(0);
    bncalcStpfl2.BerechneEx2(bneStpfl2_IV_Faktor);

    var dblSummeStpfl1_III_V = bneStpfl1_III.getLohnsteuer() + bneStpfl1_III.getSolidaritaetszuschlag() + bneStpfl1_III.getKirchensteuer();
    var dblSummeStpfl1_IV_IV = bneStpfl1_IV.getLohnsteuer() + bneStpfl1_IV.getSolidaritaetszuschlag() + bneStpfl1_IV.getKirchensteuer();
    var dblSummeStpfl1_IV_IV_Faktor = bneStpfl1_IV_Faktor
      .getLohnsteuer() + bneStpfl1_IV_Faktor.getSolidaritaetszuschlag() + bneStpfl1_IV_Faktor.getKirchensteuer();
    var dblSummeStpfl1_V_III = bneStpfl1_V.getLohnsteuer() + bneStpfl1_V.getSolidaritaetszuschlag() + bneStpfl1_V.getKirchensteuer();

    var dblSummeStpfl2_V_III = bneStpfl2_III.getLohnsteuer() + bneStpfl2_III.getSolidaritaetszuschlag() + bneStpfl2_III.getKirchensteuer();
    var dblSummeStpfl2_IV_IV = bneStpfl2_IV.getLohnsteuer() + bneStpfl2_IV.getSolidaritaetszuschlag() + bneStpfl2_IV.getKirchensteuer();
    var dblSummeStpfl2_IV_IV_Faktor = bneStpfl2_IV_Faktor
      .getLohnsteuer() + bneStpfl2_IV_Faktor.getSolidaritaetszuschlag() + bneStpfl2_IV_Faktor.getKirchensteuer();
    var dblSummeStpfl2_III_V = bneStpfl2_V.getLohnsteuer() + bneStpfl2_V.getSolidaritaetszuschlag() + bneStpfl2_V.getKirchensteuer();

    var dblGesamt_III_V = dblSummeStpfl1_III_V + dblSummeStpfl2_III_V;
    var dblGesamt_IV_IV = dblSummeStpfl1_IV_IV + dblSummeStpfl2_IV_IV;
    var dblGesamt_IV_IV_Faktor = dblSummeStpfl1_IV_IV_Faktor + dblSummeStpfl2_IV_IV_Faktor;
    var dblGesamt_V_III = dblSummeStpfl1_V_III + dblSummeStpfl2_V_III;

    var intVorteilsTyp;

    if ((dblGesamt_III_V <= dblGesamt_IV_IV) && (dblGesamt_III_V <= dblGesamt_V_III) && (dblGesamt_III_V <= dblGesamt_IV_IV_Faktor)) {
      intVorteilsTyp = config.constants.TYP_III_V;
    }
    else if ((dblGesamt_IV_IV <= dblGesamt_III_V) && (dblGesamt_IV_IV <= dblGesamt_V_III) && (dblGesamt_IV_IV <= dblGesamt_IV_IV_Faktor)) {
      intVorteilsTyp = config.constants.TYP_IV_IV;
    }
    else if ((dblGesamt_IV_IV_Faktor <= dblGesamt_III_V) && (dblGesamt_IV_IV_Faktor <= dblGesamt_V_III) && (dblGesamt_IV_IV_Faktor <= dblGesamt_IV_IV)) {
      intVorteilsTyp = config.constants.TYP_IV_IV_FAKTOR;
      if (veranlagungsjahr < 2010) // Vor 2010 kein Faktorverfahren
      {
        intVorteilsTyp = config.constants.TYP_IV_IV;
      }
    }
    else
      intVorteilsTyp = config.constants.TYP_V_III;

    return new BruttoNettoSkvOutput(dblGesamt_III_V,
      dblGesamt_IV_IV, dblGesamt_IV_IV_Faktor,
      dblGesamt_V_III, faktor, intVorteilsTyp);
  }

  return {
    calc: calc
  };

});
