define([
  "brutto-netto/config"
], function (
  config
) {
  "use strict";

  var input,
      output;

  input = {
    brutto_oder_netto: true,
    veranlagungsjahr: 2011,
    lohnzahlzeitraum: 1,
    faktor: 0,

    steuerklasse_1: 1,
    bruttolohn_1: 0,
    nettolohn_1: 0,
    alter_1: 1,
    hinzurechnungsbetrag_1: 0,
    versorgungsbezuege_1: 0,
    versorgungsbeginn_1: 2005,
    freibetrag_1: 0,
    rv_pflicht_1: true,
    ks_pflicht_1: true,
    kinderfreibetrag_1: 0,
    arbeitsstaette_1: 1,
    gesetzliche_kv_1: true,
    zuschlag_gesetzliche_kv_1: false,
    beitrag_private_kv_1: 0,
    zuschuss_private_kv_1: false,

    steuerklasse_2: 6,
    bruttolohn_2: 999999,
    nettolohn_2: 499999,
    alter_2: 99,
    hinzurechnungsbetrag_2: 50000,
    versorgungsbezuege_2: 99999,
    versorgungsbeginn_2: 2013,
    freibetrag_2: 50000,
    rv_pflicht_2: false,
    ks_pflicht_2: false,
    kinderfreibetrag_2: 15,
    arbeitsstaette_2: 16,
    gesetzliche_kv_2: false,
    zuschlag_gesetzliche_kv_2: true,
    beitrag_private_kv_2: 99999,
    zuschuss_private_kv_2: true,

    config: config
  };

  output = {
    "bne": [
      {
        "av_beitrag": 0,
        "beitrag_private_kv": 0,
        "bmg_kirchensteuer": 0,
        "bruttolohn": 0,
        "kirchensteuer": 0,
        "kv_beitrag": 0,
        "lohnsteuer": 0,
        "nettolohn": 0,
        "nettolohn_mit_pauschabzug": undefined,
        "pauschabzug": undefined,
        "pv_beitrag": 0,
        "rv_beitrag": 0,
        "solizuschlag": 0,
        "steuerklasse": undefined,
        "tabellen_oben": undefined,
        "tabellen_unten": undefined
      },
      {
        "av_beitrag": 864,
        "beitrag_private_kv": 99999,
        "bmg_kirchensteuer": 0,
        "bruttolohn": 999999,
        "kirchensteuer": 0,
        "kv_beitrag": 0,
        "lohnsteuer": 438156,
        "nettolohn": 436881.42000000004,
        "nettolohn_mit_pauschabzug": undefined,
        "pauschabzug": undefined,
        "pv_beitrag": 0,
        "rv_beitrag": 0,
        "solizuschlag": 24098.58,
        "steuerklasse": undefined,
        "tabellen_oben": undefined,
        "tabellen_unten": undefined
      }
    ],
    "skv": {
      "faktor": 0,
      "skv_drei_fuenf": 416538.26,
      "skv_fuenf_drei": 390541.92,
      "skv_vier_vier": 408401,
      "skv_vier_vier_faktor": 0,
      "vorteil": 3
    }
  };

  return {
    input: input,
    expectedOutput: output
  };

});
