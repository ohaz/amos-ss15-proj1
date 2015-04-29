define([
  "brutto-netto/config"
], function (
  config
) {
  "use strict";

  var input,
      output;

  input = {
    brutto_oder_netto: false,
    veranlagungsjahr: 2012,
    lohnzahlzeitraum: 2,
    faktor: 1,

    steuerklasse_1: 3,
    bruttolohn_1: 0,
    nettolohn_1: 12500,
    alter_1: 63,
    hinzurechnungsbetrag_1: 0,
    versorgungsbezuege_1: 0,
    versorgungsbeginn_1: 2011,
    freibetrag_1: 1234,
    rv_pflicht_1: true,
    ks_pflicht_1: false,
    kinderfreibetrag_1: 0,
    arbeitsstaette_1: 1,
    gesetzliche_kv_1: false,
    zuschlag_gesetzliche_kv_1: true,
    beitrag_private_kv_1: 0,
    zuschuss_private_kv_1: false,

    steuerklasse_2: 5,
    bruttolohn_2: 0,
    nettolohn_2: 2541,
    alter_2: 28,
    hinzurechnungsbetrag_2: 0,
    versorgungsbezuege_2: 0,
    versorgungsbeginn_2: 2008,
    freibetrag_2: 42000,
    rv_pflicht_2: false,
    ks_pflicht_2: true,
    kinderfreibetrag_2: 0,
    arbeitsstaette_2: 14,
    gesetzliche_kv_2: true,
    zuschlag_gesetzliche_kv_2: false,
    beitrag_private_kv_2: 0,
    zuschuss_private_kv_2: true,

    config: config
  };

  output = {
    "bne": [
      {
        "av_beitrag": 84,
        "beitrag_private_kv": 0,
        "bmg_kirchensteuer": 0,
        "bruttolohn": 19542.45,
        "kirchensteuer": 0,
        "kv_beitrag": 0,
        "lohnsteuer": 6075.5,
        "nettolohn": 12500,
        "nettolohn_mit_pauschabzug": undefined,
        "pauschabzug": undefined,
        "pv_beitrag": 0,
        "rv_beitrag": 548.8,
        "solizuschlag": 334.15,
        "steuerklasse": undefined,
        "tabellen_oben": undefined,
        "tabellen_unten": undefined
      },
      {
        "av_beitrag": 42.67,
        "beitrag_private_kv": 0,
        "bmg_kirchensteuer": 0,
        "bruttolohn": 2844.67,
        "kirchensteuer": 0,
        "kv_beitrag": 233.26,
        "lohnsteuer": 0,
        "nettolohn": 2541,
        "nettolohn_mit_pauschabzug": undefined,
        "pauschabzug": undefined,
        "pv_beitrag": 27.74,
        "rv_beitrag": 0,
        "solizuschlag": 0,
        "steuerklasse": undefined,
        "tabellen_oben": undefined,
        "tabellen_unten": undefined
      }
    ],
    "skv": {
      "faktor": 1,
      "skv_drei_fuenf": 0,
      "skv_fuenf_drei": 0,
      "skv_vier_vier": 0,
      "skv_vier_vier_faktor": 0,
      "vorteil": 0
    }
  };

  return {
    input: input,
    expectedOutput: output
  };

});
