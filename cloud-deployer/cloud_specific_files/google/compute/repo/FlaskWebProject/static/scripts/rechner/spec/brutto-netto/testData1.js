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
    veranlagungsjahr: 2013,
    lohnzahlzeitraum: 2,
    faktor: 1,

    steuerklasse_1: 1,
    bruttolohn_1: 3000,
    nettolohn_1: 0,
    alter_1: 30,
    hinzurechnungsbetrag_1: 0,
    versorgungsbezuege_1: 0,
    versorgungsbeginn_1: 2005,
    freibetrag_1: 0,
    rv_pflicht_1: true,
    ks_pflicht_1: true,
    kinderfreibetrag_1: 0,
    arbeitsstaette_1: 2,
    gesetzliche_kv_1: true,
    zuschlag_gesetzliche_kv_1: false,
    beitrag_private_kv_1: 0,
    zuschuss_private_kv_1: false,

    steuerklasse_2: 1,
    bruttolohn_2: 3000,
    nettolohn_2: 0,
    alter_2: 30,
    hinzurechnungsbetrag_2: 0,
    versorgungsbezuege_2: 0,
    versorgungsbeginn_2: 2005,
    freibetrag_2: 0,
    rv_pflicht_2: true,
    ks_pflicht_2: true,
    kinderfreibetrag_2: 0,
    arbeitsstaette_2: 2,
    gesetzliche_kv_2: true,
    zuschlag_gesetzliche_kv_2: false,
    beitrag_private_kv_2: 0,
    zuschuss_private_kv_2: false,

    config: config
  };

  output = {
    "bne": [
      {
        "av_beitrag": 45,
        "beitrag_private_kv": 0,
        "bmg_kirchensteuer": 466.25,
        "bruttolohn": 3000,
        "kirchensteuer": 37.3,
        "kv_beitrag": 245.99,
        "lohnsteuer": 466.25,
        "nettolohn": 1865.57,
        "pv_beitrag": 30.75,
        "rv_beitrag": 283.5,
        "solizuschlag": 25.64
      },
      {
        "av_beitrag": 45,
        "beitrag_private_kv": 0,
        "bmg_kirchensteuer": 466.25,
        "bruttolohn": 3000,
        "kirchensteuer": 37.3,
        "kv_beitrag": 245.99,
        "lohnsteuer": 466.25,
        "nettolohn": 1865.57,
        "pv_beitrag": 30.75,
        "rv_beitrag": 283.5,
        "solizuschlag": 25.64
      }
    ],
    "skv": {
      "faktor": 1,
      "skv_drei_fuenf": 1150.1163999999998,
      "skv_fuenf_drei": 1150.1163999999998,
      "skv_vier_vier": 1058.3799999999998,
      "skv_vier_vier_faktor": 1058.3799999999998,
      "vorteil": 2
    }
  };

  return {
    input: input,
    expectedOutput: output
  };

});
