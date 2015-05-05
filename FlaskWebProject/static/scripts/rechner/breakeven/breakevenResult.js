define(function () {

  function BEPresult(verkaufspreis,
                     absatzmenge,
                     variable_kosten,
                     fixkosten,

                     fixkosten_in_prozent,
                     stueckkosten,
                     deckungsbeitrag,
                     gewinnschwelle,

                     umsatzerloese,
                     gesamtkosten,
                     ergebnis,

                     error
    ) {

    this.verkaufspreis = verkaufspreis;
    this.absatzmenge = absatzmenge;
    this.variable_kosten = variable_kosten;
    this.fixkosten = fixkosten;

    this.fixkosten_in_prozent = fixkosten_in_prozent;
    this.stueckkosten = stueckkosten;
    this.deckungsbeitrag = deckungsbeitrag;
    this.gewinnschwelle = gewinnschwelle;

    this.umsatzerloese = umsatzerloese;
    this.gesamtkosten = gesamtkosten;
    this.ergebnis = ergebnis;

    this.error = error;

  }

  return BEPresult;

});
