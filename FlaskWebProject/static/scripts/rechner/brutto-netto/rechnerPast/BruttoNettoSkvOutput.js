define(function () {

  return function BruttoNettoSkvOutput(drei_fuenf, vier_vier, vier_vier_faktor, fuenf_drei, faktor, vorteil) {
    this.skv_drei_fuenf = drei_fuenf;
    this.skv_vier_vier = vier_vier;
    this.skv_vier_vier_faktor = vier_vier_faktor;
    this.skv_fuenf_drei = fuenf_drei;
    this.faktor = faktor;

    /**
     * TYP_III_V = 0;
     * TYP_V_III = 1;
     * TYP_IV_IV = 2;
     * TYP_IV_IV_FAKTOR = 3;
     */
    this.vorteil = vorteil;
  };

});
