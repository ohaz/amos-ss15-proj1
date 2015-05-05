define(function () {

  function RundeNachkommastellen(zahl, Nachkommastellen) {
    var doBase = 10.0;
    var doComplete5, doComplete5i;

    doComplete5 = zahl * Math.pow(doBase, Nachkommastellen + 1);

    if (zahl < 0.0)
      doComplete5 -= 5.0;
    else
      doComplete5 += 5.0;

    doComplete5 /= doBase;
    doComplete5i = Math.floor(doComplete5);

    return doComplete5i / Math.pow(doBase, Nachkommastellen);
  }

  function Runde(dWert, iNachkommastellen, bAufrunden) {
    var doBase = 10.0;
    var doComplete5, doComplete5i;

    doComplete5 = dWert * Math.pow(doBase, iNachkommastellen);

    doComplete5i = Math.floor(doComplete5);

    if ((doComplete5 - doComplete5i) != 0) {
      if (bAufrunden && dWert > 0)
        doComplete5i += 1;
      else if (!bAufrunden && dWert < 0)
        doComplete5i -= 1;
    }

    return doComplete5i / Math.pow(doBase, iNachkommastellen);
  }

  return {
    RundeNachkommastellen: RundeNachkommastellen,
    Runde: Runde
  };

});
