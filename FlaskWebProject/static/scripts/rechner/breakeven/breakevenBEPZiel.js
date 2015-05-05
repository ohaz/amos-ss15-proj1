define(function () {

  function CBEPZiel(bep, ziel, bepZiel, bepVar, constants) {
    this.m_Bep = bep;
    this.m_BepZiel = bepZiel;
    this.m_BepVar = bepVar;
    this.m_Zielwert = ziel;


    this.BEPZIEL_STUECKKOSTEN = constants.BEPZIEL_STUECKKOSTEN;
    this.BEPZIEL_FIXKOSTENPROZ = constants.BEPZIEL_FIXKOSTENPROZ;
    this.BEPZIEL_DB = constants.BEPZIEL_DB;
    this.BEPZIEL_BEP = constants.BEPZIEL_BEP;
    this.BEPZIEL_GESAMTKOSTEN = constants.BEPZIEL_GESAMTKOSTEN;
    this.BEPZIEL_UMSATZERLOESE = constants.BEPZIEL_UMSATZERLOESE;
    this.BEPZIEL_ERGEBNIS = constants.BEPZIEL_ERGEBNIS;

    this.BEPVAR_VARKOSTEN = constants.BEPVAR_VARKOSTEN;
    this.BEPVAR_FIXKOSTEN = constants.BEPVAR_FIXKOSTEN;
    this.BEPVAR_ABSATZMENGE = constants.BEPVAR_ABSATZMENGE;
    this.BEPVAR_VKPREIS = constants.BEPVAR_VKPREIS;

    this.BEPDIRECTION_UP = true;
    this.BEPDIRECTION_DOWN = false;

    this.BEPERROR_NOERROR = constants.BEPERROR_NOERROR;
    this.BEPERROR_ITERATION = constants.BEPERROR_ITERATION; // Grenzwert-Problematik bei der Iteration
    this.BEPERROR_NOTFOUND = constants.BEPERROR_NOTFOUND;
    this.BEPERROR_BELOWZERO = constants.BEPERROR_BELOWZERO; // Abhängige Variable wäre unter Null
    this.BEPERROR_BEPNOTEXACT = constants.BEPERROR_BEPNOTEXACT;



    this.Calc = function () //int *error)
    {
      var dblErgebnis = 0;
      var error = this.BEPERROR_NOERROR;

      switch (this.m_BepZiel) {
      case this.BEPZIEL_STUECKKOSTEN:
        switch (this.m_BepVar) {
        case this.BEPVAR_ABSATZMENGE:
          dblErgebnis = this.m_Bep.getVarKosten() / this.m_Zielwert;
          break;
        case this.BEPVAR_VARKOSTEN:
          dblErgebnis = this.m_Bep.getAbsatzmenge() * this.m_Zielwert;
          break;
        default:
          break;
        }
        break;

      case this.BEPZIEL_FIXKOSTENPROZ:
        switch (this.m_BepVar) {
        case this.BEPVAR_FIXKOSTEN:
          dblErgebnis = (this.m_Bep.getVarKosten() / (100 - this.m_Zielwert)) * this.m_Zielwert;
          break;
        case this.BEPVAR_VARKOSTEN:
          dblErgebnis = this.m_Bep.getFixKosten() / this.m_Zielwert * (100 - this.m_Zielwert);
          break;
        default:
          break;
        }
        break;

      case this.BEPZIEL_DB:
        switch (this.m_BepVar) {
        case this.BEPVAR_VKPREIS:
          dblErgebnis = this.m_Zielwert + (this.m_Bep.getVarKosten() / this.m_Bep.getAbsatzmenge());
          break;
        case this.BEPVAR_VARKOSTEN:
          dblErgebnis = (this.m_Bep.getVKPreis() - this.m_Zielwert) * this.m_Bep.getAbsatzmenge();
          break;
        case this.BEPVAR_ABSATZMENGE:
          dblErgebnis = this.m_Bep.getVarKosten() / (this.m_Bep.getVKPreis() - this.m_Zielwert);
          break;
        default:
          break;
        }
        break;

      case this.BEPZIEL_BEP:
        switch (this.m_BepVar) {
        case this.BEPVAR_VKPREIS:
          dblErgebnis = this.m_Bep.getFixKosten() / this.m_Zielwert + this.m_Bep.getVarKosten() / this.m_Bep.getAbsatzmenge();
          break;
        case this.BEPVAR_VARKOSTEN:
          dblErgebnis = (this.m_Bep.getVKPreis() - this.m_Bep.getFixKosten() / this.m_Zielwert) * this.m_Bep.getAbsatzmenge();
          break;
        case this.BEPVAR_FIXKOSTEN:
          dblErgebnis = this.m_Zielwert * (this.m_Bep.getVKPreis() - this.m_Bep.getVarKosten() / this.m_Bep.getAbsatzmenge());
          break;
        case this.BEPVAR_ABSATZMENGE:
          dblErgebnis = this.m_Bep.getVarKosten() / (this.m_Bep.getVKPreis() - this.m_Bep.getFixKosten() / this.m_Zielwert);
          break;
        default:
          break;
        }
        break;

      case this.BEPZIEL_GESAMTKOSTEN:
        switch (this.m_BepVar) {
        case this.BEPVAR_VARKOSTEN:
          dblErgebnis = this.m_Zielwert - this.m_Bep.getFixKosten();
          break;
        case this.BEPVAR_FIXKOSTEN:
          dblErgebnis = this.m_Zielwert - this.m_Bep.getVarKosten();
          break;
        default:
          break;
        }
        break;

      case this.BEPZIEL_UMSATZERLOESE:
        switch (this.m_BepVar) {
        case this.BEPVAR_VKPREIS:
          dblErgebnis = this.m_Zielwert / this.m_Bep.getAbsatzmenge();
          break;
        case this.BEPVAR_ABSATZMENGE:
          dblErgebnis = this.m_Zielwert / this.m_Bep.getVKPreis();
          break;
        default:
          break;
        }
        break;

      case this.BEPZIEL_ERGEBNIS:
        switch (this.m_BepVar) {
        case this.BEPVAR_VKPREIS:
          dblErgebnis = (this.m_Zielwert + this.m_Bep.getVarKosten() + this.m_Bep.getFixKosten()) / this.m_Bep.getAbsatzmenge();
          break;
        case this.BEPVAR_VARKOSTEN:
          dblErgebnis = this.m_Bep.getAbsatzmenge() * this.m_Bep.getVKPreis() - this.m_Bep.getFixKosten() - this.m_Zielwert;
          break;
        case this.BEPVAR_FIXKOSTEN:
          dblErgebnis = this.m_Bep.getAbsatzmenge() * this.m_Bep.getVKPreis() - this.m_Bep.getVarKosten() - this.m_Zielwert;
          break;
        case this.BEPVAR_ABSATZMENGE:
          dblErgebnis = (this.m_Zielwert + this.m_Bep.getVarKosten() + this.m_Bep.getFixKosten()) / this.m_Bep.getVKPreis();
          if (this.m_Zielwert == 0 && (dblErgebnis - Math.floor(dblErgebnis) > 0)) {
            error = this.BEPERROR_BEPNOTEXACT; // unscharfe Absatzmenge würde zu irritierendem BEP-Wert führen
            dblErgebnis = parseInt((Math.ceil(dblErgebnis))
              .toFixed(0)); // deswegen Signalisierung und Aufrunden auf nächsten vollen Wert
            //				dblErgebnis = CFormatWert::RundeNachkommastellen(dblErgebnis, 0);	// deswegen Signalisierung und Runden
          }
          break;
        default:
          break;
        }
        break;
      default:
        break;
      }

      if (!(isFinite(dblErgebnis)))
        error = this.BEPERROR_ITERATION;
      else if (dblErgebnis < 0)
        error = this.BEPERROR_BELOWZERO;

      var returnVal = {
        result: dblErgebnis,
        error: error
      };

      return returnVal;
    };

  }

  return CBEPZiel;

});
