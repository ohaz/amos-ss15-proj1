define(function () {
  "use strict";

  /* Ergebnis Objekt mit allen Zahlen die ausgegeben werden sollen */

  return function ergebnis(GesamtEinkuenfte,
                           einkommen_12,
                           tarifliche_est_14,
                           festzusetzende_est_16,
                           solidaritaetszuschlag_18,
                           kirchensteuer_20,
                           abgeltungsteuer_22,
                           durchschn_steuersatz_24,
                           grenzsteuersatz_26
    ) {
    this.GesamtEinkuenfte = GesamtEinkuenfte;
    this.einkommen_12 = einkommen_12;
    this.tarifliche_est_14 = tarifliche_est_14;
    this.festzusetzende_est_16 = festzusetzende_est_16;
    this.solidaritaetszuschlag_18 = solidaritaetszuschlag_18;
    this.kirchensteuer_20 = kirchensteuer_20;
    this.abgeltungsteuer_22 = abgeltungsteuer_22;
    this.durchschn_steuersatz_24 = durchschn_steuersatz_24;
    this.grenzsteuersatz_26 = grenzsteuersatz_26;
  };

});