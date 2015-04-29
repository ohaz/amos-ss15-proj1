define(function () {

  return function BNOutput(bmg_kirchensteuer, lohnsteuer, kirchensteuer, solizuschlag, nettolohn, tabellen_oben, tabellen_unten,
    pauschabzug, nettolohn_mit_pauschabzug, rv_beitrag, av_beitrag, kv_beitrag, pv_beitrag, beitrag_private_kv, bruttolohn, steuerklasse, versorgungsbeginn) {
    this.bmg_kirchensteuer = bmg_kirchensteuer;
    this.lohnsteuer = lohnsteuer;
    this.kirchensteuer = kirchensteuer;
    this.solizuschlag = solizuschlag;
    this.nettolohn = nettolohn;
    this.tabellen_oben = tabellen_oben;
    this.tabellen_unten = tabellen_unten;
    this.pauschabzug = pauschabzug;
    this.nettolohn_mit_pauschabzug = nettolohn_mit_pauschabzug;
    this.rv_beitrag = rv_beitrag;
    this.av_beitrag = av_beitrag;
    this.kv_beitrag = kv_beitrag;
    this.pv_beitrag = pv_beitrag;
    this.beitrag_private_kv = beitrag_private_kv;
    this.bruttolohn = bruttolohn;
    this.steuerklasse = steuerklasse;
  };

});
