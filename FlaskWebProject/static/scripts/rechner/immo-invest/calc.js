define(function () {

  function calc(input) {

    var monatlMiete = input.monatlMiete,
        zahlungszeitraum = input.zahlungszeitraum,
        mietsteigerung = input.prozMietsteigerung,

        zusatzBelastung = input.zusaetzlichVerfuegbar,
        einsetzbEK = input.einsetzbaresEK,
        zinsUndTilgung = input.zinsUndTilgung,
        nebenkostenInProz = input.nebenkostenInProz;

    // Maske 1: iphone-rechner-immo-invest.html
    var dblMietSumme = 0,
      dblLfdMiete;

    dblLfdMiete = monatlMiete;
    for (var i = 1; i <= zahlungszeitraum; i++) {
      dblMietSumme += dblLfdMiete * 12;
      dblLfdMiete *= (mietsteigerung / 100) + 1;
    }

    dblMietSumme = parseInt(dblMietSumme.toFixed(0));
    dblLfdMiete = parseInt(dblLfdMiete.toFixed(0));


    // Maske 2: iphone-iminv-kauf
    var dblKapitaldienstBetrag,
      dblAufnehmbaresFremdkapital,
      dblGesamtinvestition;
    var dblNebenkostenBetrag,
      dblMaxKaufpreis;



    dblKapitaldienstBetrag = parseInt((monatlMiete + zusatzBelastung)
      .toFixed(0));
    dblAufnehmbaresFremdkapital = parseInt(((dblKapitaldienstBetrag * 12) / (zinsUndTilgung / 100))
      .toFixed(0));
    dblGesamtinvestition = parseInt((dblAufnehmbaresFremdkapital + einsetzbEK)
      .toFixed(0));

    dblNebenkostenBetrag = parseInt((dblGesamtinvestition / (100 + nebenkostenInProz) * nebenkostenInProz)
      .toFixed(0));
    dblMaxKaufpreis = parseInt((dblGesamtinvestition - dblNebenkostenBetrag)
      .toFixed(0));

    var result = {
      bezahlteMiete: dblMietSumme,
      monatsmiete: dblLfdMiete,
      mtlKapitaldienst: dblKapitaldienstBetrag,
      aufnehmbaresFK: dblAufnehmbaresFremdkapital,
      eingesetztesEK: einsetzbEK,
      gesamtinvestition: dblGesamtinvestition,
      nebenkosten: dblNebenkostenBetrag,
      maxKaufpreis: dblMaxKaufpreis
    };

    return result;

  }

  return calc;

});
