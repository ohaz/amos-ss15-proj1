define(['./BruttoNettoLohn'], function (BruttoNettoLohn) {

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
      zusatzbeitragssatz_1 = input.zusatzbeitragssatz_1,
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
      zusatzbeitragssatz_2 = input.zusatzbeitragssatz_2,
      beitrag_private_kv_2 = input.beitrag_private_kv_2,
      zuschuss_private_kv_2 = input.zuschuss_private_kv_2,

      config = input.config;

    var stpfl1 = new BruttoNettoLohn(veranlagungsjahr,
      lohnzahlzeitraum, faktor, steuerklasse_1, bruttolohn_1,
      nettolohn_1, alter_1, hinzurechnungsbetrag_1,
      versorgungsbezuege_1, versorgungsbeginn_1,
      freibetrag_1, rv_pflicht_1, ks_pflicht_1,
      kinderfreibetrag_1, arbeitsstaette_1, gesetzliche_kv_1,
      zuschlag_gesetzliche_kv_1, beitrag_private_kv_1,
      zuschuss_private_kv_1, zusatzbeitragssatz_1);
    var stpfl2 = new BruttoNettoLohn(veranlagungsjahr,
      lohnzahlzeitraum, faktor, steuerklasse_2, bruttolohn_2,
      nettolohn_2, alter_2, hinzurechnungsbetrag_2,
      versorgungsbezuege_2, versorgungsbeginn_2,
      freibetrag_2, rv_pflicht_2, ks_pflicht_2,
      kinderfreibetrag_2, arbeitsstaette_2, gesetzliche_kv_2,
      zuschlag_gesetzliche_kv_2, beitrag_private_kv_2,
      zuschuss_private_kv_2, zusatzbeitragssatz_2);

    var erg = {
      bne: null,
      skv: null
    };

    if (BruttoOderNetto) {
      /* Brutto nach Netto */
      erg.bne = new Array(stpfl1.bruttoToNetto(), stpfl2
        .bruttoToNetto());
    }
    else {
      /* Netto nach Brutto */
      erg.bne = new Array(stpfl1.nettoToBrutto(), stpfl2
        .nettoToBrutto());
    }
    /* Steuerklassenvergleich */
    var stkvg1 = stpfl1.steuerklassenvergleich();
    var stkvg2 = stpfl2.steuerklassenvergleich();

    var stpfl1_2_III_V = stkvg1.stpfl_III + stkvg2.stpfl_V;
    var stpfl1_2_IV_IV = stkvg1.stpfl_IV + stkvg2.stpfl_IV;
    var stpfl1_2_IV_IV_faktor = stkvg1.stpfl_IV_faktor + stkvg2.stpfl_IV_faktor;
    var stpfl1_2_V_III = stkvg1.stpfl_V + stkvg2.stpfl_III;

    var vorteilsTyp = stpfl1.getVorteilsTyp(stpfl1_2_III_V,
      stpfl1_2_IV_IV, stpfl1_2_IV_IV_faktor, stpfl1_2_V_III);

    erg.skv = {
      skv_drei_fuenf: stpfl1_2_III_V,
      skv_vier_vier: stpfl1_2_IV_IV,
      skv_vier_vier_faktor: stpfl1_2_IV_IV_faktor,
      skv_fuenf_drei: stpfl1_2_V_III,
      faktor: faktor,

      /**
       * TYP_III_V = 0; TYP_V_III = 1; TYP_IV_IV = 2;
       * TYP_IV_IV_FAKTOR = 3;
       */
      vorteil: vorteilsTyp
    };

    return erg;
  }

  return {
    calc: calc
  };

});
