define([
  './pap/pap2013',
  './pap/pap2014',
  './pap/pap2015_entwurf',
  './helper/BigDecimal',
  './helper/RoundHelper',
  './SvBeitraege',
  '../config'
], function (
  pap2013,
  pap2014,
  pap2015,
  BigDecimal,
  roundHelper,
  SvBeitraege,
  config
) {

  return function (veranlagungsjahr, lohnzahlzeitraum, faktor,
    steuerklasse_1, bruttolohn_1, nettolohn_1, alter_1, hinzurechnungsbetrag_1,
    versorgungsbezuege_1, versorgungsbeginn_1, freibetrag_1, rv_pflicht_1,
    ks_pflicht_1, kinderfreibetrag_1, arbeitsstaette_1, gesetzliche_kv_1,
    zuschlag_gesetzliche_kv_1, beitrag_private_kvpv_1, zuschuss_private_kv_1, zusatzbeitragssatz_1) {

	switch(veranlagungsjahr) {
		case 2013:
			this.stpfl = new pap2013();
			break;
		case 2014:
			this.stpfl = new pap2014();
			break;
		case 2015:
			this.stpfl = new pap2015();
			break;
	}
	
    function setPapToInputValues(pap) {

      pap.LZZ = lohnzahlzeitraum;
      pap.STKL = steuerklasse_1;
      pap.RE4 = new BigDecimal(bruttolohn_1 * 100);
      pap.ALTER1 = alter_1 >= 64 ? 1 : 0;
      pap.AJAHR = new Date()
        .getFullYear() - (alter_1 - 64);
      pap.LZZHINZU = new BigDecimal(hinzurechnungsbetrag_1 * 100);
      pap.VBEZ = new BigDecimal(versorgungsbezuege_1 * 100);
      pap.ZMVB = new BigDecimal(getMonthsSince(versorgungsbeginn_1));
      pap.LZZFREIB = new BigDecimal(freibetrag_1 * 100);
      pap.KRV = rv_pflicht_1 ? (isBeitragsbemessungsgrenzeOst(arbeitsstaette_1, config.constants) ? 1 : 0) : 2;
      pap.R = ks_pflicht_1 ? 1 : 0;
      pap.ZKF = new BigDecimal(kinderfreibetrag_1);
      pap.PKV = gesetzliche_kv_1 ? 0 : (zuschuss_private_kv_1 ? 2 : 1);
      pap.PKPV = new BigDecimal(beitrag_private_kvpv_1 * 100);
      pap.PVZ = zuschlag_gesetzliche_kv_1 ? 1 : 0;
      pap.PVS = isArbeitsstaetteSachsen(arbeitsstaette_1, config.constants) ? 1 : 0;
      pap.f = faktor;
      pap.af = 0;
      pap.KVZ = new BigDecimal(zusatzbeitragssatz_1);

      if (pap.STKL == 2)
        pap.PVZ = 0;

      return pap;

    }

    this.lzz_backup = lohnzahlzeitraum;


    this.bruttoToNetto = function () {
      this.stpfl = setPapToInputValues(this.stpfl);
      this.stpfl.main();

      var sv_beitraege = new SvBeitraege()
        .BerechneSVBeitraegeAN(veranlagungsjahr, this.stpfl.RE4.value / 100, !gesetzliche_kv_1, this.stpfl.PKPV.value / 100,
          zuschlag_gesetzliche_kv_1, this.stpfl.STKL, this.lzz_backup, isBeitragsbemessungsgrenzeOst(arbeitsstaette_1, config.constants), rv_pflicht_1, this.stpfl.PVS, zusatzbeitragssatz_1);



      return {
        lohnsteuer: this.stpfl.LSTLZZ.value / 100,
        solizuschlag: this.stpfl.SOLZLZZ.value / 100,
        kirchensteuer: getKirchensteuer(arbeitsstaette_1, config.constants, this.stpfl.BK.value / 100) / 100,
        rv_beitrag: sv_beitraege.rv,
        av_beitrag: sv_beitraege.av,
        kv_beitrag: sv_beitraege.kv,
        pv_beitrag: sv_beitraege.pv,
        beitrag_private_kv: sv_beitraege.pkpv,
        bruttolohn: this.stpfl.RE4.value / 100,
        bmg_kirchensteuer: this.stpfl.BK.value / 100,
        nettolohn: (this.stpfl.RE4.value / 100) - (getKirchensteuer(arbeitsstaette_1, config.constants, this.stpfl.BK.value / 100) / 100) - (this.stpfl.SOLZLZZ.value / 100) - (this.stpfl.LSTLZZ.value / 100) - (sv_beitraege.rv) - (sv_beitraege.av) - (sv_beitraege.kv) - (sv_beitraege.pv) - (sv_beitraege.pkpv)
      };
    };

    this.nettoToBrutto = function () {

      var dErg = nettolohn_1 * 100;
      var sv_beitraege = null;
      var dFaktor = (0.485 + (getKirchensteuersatz(arbeitsstaette_1, config.constants) + 25) / 100.0 + 0.055) + 0.1;


      this.stpfl = setPapToInputValues(this.stpfl);
      this.stpfl.RE4.value = (nettolohn_1 / (1 - dFaktor)) * 100;

      this.stpfl.main();

      sv_beitraege = new SvBeitraege()
        .BerechneSVBeitraegeAN(veranlagungsjahr, this.stpfl.RE4.value / 100, !gesetzliche_kv_1, this.stpfl.PKPV.value / 100,
          zuschlag_gesetzliche_kv_1, this.stpfl.STKL, this.lzz_backup, isBeitragsbemessungsgrenzeOst(arbeitsstaette_1, config.constants), rv_pflicht_1, this.stpfl.PVS, zusatzbeitragssatz_1);



      var dObenSatz = this.stpfl.RE4.value;
      var dObenNetto = (this.stpfl.RE4.value / 100) -
        (getKirchensteuer(arbeitsstaette_1, config.constants, this.stpfl.BK.value / 100) / 100) -
        (this.stpfl.SOLZLZZ.value / 100) -
        (this.stpfl.LSTLZZ.value / 100) -
        (sv_beitraege.rv) -
        (sv_beitraege.av) -
        (sv_beitraege.kv) -
        (sv_beitraege.pv) -
        (sv_beitraege.pkpv);

      var dUntenSatz = nettolohn_1;

      this.stpfl = setPapToInputValues(this.stpfl);
      this.stpfl.RE4.value = nettolohn_1 * 100;

      this.stpfl.main();

      sv_beitraege = new SvBeitraege()
        .BerechneSVBeitraegeAN(veranlagungsjahr, this.stpfl.RE4.value / 100, !gesetzliche_kv_1, this.stpfl.PKPV.value / 100,
          zuschlag_gesetzliche_kv_1, this.stpfl.STKL, this.lzz_backup, isBeitragsbemessungsgrenzeOst(arbeitsstaette_1, config.constants), rv_pflicht_1, this.stpfl.PVS, zusatzbeitragssatz_1);

      var dUntenNetto = (this.stpfl.RE4.value / 100) -
        (getKirchensteuer(arbeitsstaette_1, config.constants, this.stpfl.BK.value / 100) / 100) -
        (this.stpfl.SOLZLZZ.value / 100) -
        (this.stpfl.LSTLZZ.value / 100) -
        (sv_beitraege.rv) -
        (sv_beitraege.av) -
        (sv_beitraege.kv) -
        (sv_beitraege.pv) -
        (sv_beitraege.pkpv);

      var whilestopper = true;

      if (dUntenNetto == nettolohn_1) {
        dErg = dUntenNetto;
        whilestopper = false;
      }

      else if (dObenNetto == nettolohn_1) {
        dErg = dObenNetto;
        whilestopper = false;
      }


      var i = 2;
      while (whilestopper) {
        i++;
        if (i > 30) {
          dErg = this.stpfl.RE4.value;
          break;
        }

        this.stpfl = setPapToInputValues(this.stpfl);
        this.stpfl.RE4.value = roundHelper.Runde((dObenSatz * 100 + dUntenSatz * 100) * 0.5 / 100, 2, true);

        this.stpfl.main();

        sv_beitraege = new SvBeitraege()
          .BerechneSVBeitraegeAN(veranlagungsjahr, this.stpfl.RE4.value / 100, !gesetzliche_kv_1, this.stpfl.PKPV.value / 100,
            zuschlag_gesetzliche_kv_1, this.stpfl.STKL, this.lzz_backup, isBeitragsbemessungsgrenzeOst(arbeitsstaette_1, config.constants), rv_pflicht_1, this.stpfl.PVS, zusatzbeitragssatz_1);

        var netto = (this.stpfl.RE4.value / 100) -
          (getKirchensteuer(arbeitsstaette_1, config.constants, this.stpfl.BK.value / 100) / 100) -
          (this.stpfl.SOLZLZZ.value / 100) -
          (this.stpfl.LSTLZZ.value / 100) -
          (sv_beitraege.rv) -
          (sv_beitraege.av) -
          (sv_beitraege.kv) -
          (sv_beitraege.pv) -
          (sv_beitraege.pkpv);

        if (netto > nettolohn_1) {
          dObenNetto = netto;
          dObenSatz = this.stpfl.RE4.value;
        }
        else if (netto < nettolohn_1) {
          dUntenNetto = netto;
          dUntenSatz = this.stpfl.RE4.value;
        }
        else {
          dErg = this.stpfl.RE4.value;
          break;
        }


        if (roundHelper.RundeNachkommastellen(dUntenNetto, 2) == nettolohn_1) {
          dErg = this.stpfl.RE4.value;
          break;
        }
        else if (roundHelper.RundeNachkommastellen(dObenNetto, 2) == nettolohn_1) {
          dErg = this.stpfl.RE4.value;
          break;
        }

      }

      this.stpfl = setPapToInputValues(this.stpfl);
      this.stpfl.RE4.value = dErg;
      this.stpfl.main();
      sv_beitraege = new SvBeitraege()
        .BerechneSVBeitraegeAN(veranlagungsjahr, this.stpfl.RE4.value / 100, !gesetzliche_kv_1, this.stpfl.PKPV.value / 100,
          zuschlag_gesetzliche_kv_1, this.stpfl.STKL, this.lzz_backup, isBeitragsbemessungsgrenzeOst(arbeitsstaette_1, config.constants), rv_pflicht_1, this.stpfl.PVS, zusatzbeitragssatz_1);


      return {
        lohnsteuer: this.stpfl.LSTLZZ.value / 100,
        solizuschlag: this.stpfl.SOLZLZZ.value / 100,
        kirchensteuer: getKirchensteuer(arbeitsstaette_1, config.constants, this.stpfl.BK.value / 100) / 100,
        rv_beitrag: sv_beitraege.rv,
        av_beitrag: sv_beitraege.av,
        kv_beitrag: sv_beitraege.kv,
        pv_beitrag: sv_beitraege.pv,
        beitrag_private_kv: sv_beitraege.pkpv,
        bruttolohn: this.stpfl.RE4.value / 100,
        bmg_kirchensteuer: this.stpfl.BK.value / 100,
        nettolohn: (this.stpfl.RE4.value / 100) - (getKirchensteuer(arbeitsstaette_1, config.constants, this.stpfl.BK.value / 100) / 100) - (this.stpfl.SOLZLZZ.value / 100) - (this.stpfl.LSTLZZ.value / 100) - (sv_beitraege.rv) - (sv_beitraege.av) - (sv_beitraege.kv) - (sv_beitraege.pv) - (sv_beitraege.pkpv)
      };
    };

    this.steuerklassenvergleich = function () {
      this.stpfl1_III,
      this.stpfl1_IV,
      this.stpfl1_IV_faktor,
      this.stpfl1_V;

      this.stpfl = setPapToInputValues(this.stpfl);
      this.stpfl.STKL = config.constants.STEUERKLASSE_III;
      this.stpfl.main();
      this.stpfl1_III = this.stpfl.LSTLZZ.value / 100 + this.stpfl.SOLZLZZ.value / 100 + getKirchensteuer(arbeitsstaette_1, config.constants, this.stpfl.BK.value / 100) / 100;

      this.stpfl = setPapToInputValues(this.stpfl);
      this.stpfl.STKL = config.constants.STEUERKLASSE_IV;
      this.stpfl.main();
      this.stpfl1_IV = this.stpfl.LSTLZZ.value / 100 + this.stpfl.SOLZLZZ.value / 100 + getKirchensteuer(arbeitsstaette_1, config.constants, this.stpfl.BK.value / 100) / 100;

      this.stpfl = setPapToInputValues(this.stpfl);
      this.stpfl.STKL = config.constants.STEUERKLASSE_V;
      this.stpfl.main();
      this.stpfl1_V = this.stpfl.LSTLZZ.value / 100 + this.stpfl.SOLZLZZ.value / 100 + getKirchensteuer(arbeitsstaette_1, config.constants, this.stpfl.BK.value / 100) / 100;

      this.stpfl = setPapToInputValues(this.stpfl);
      this.stpfl.STKL = config.constants.STEUERKLASSE_IV;
      this.stpfl.LZZFREIB = new BigDecimal(0);
      this.stpfl.af = 1;
      this.stpfl.main();
      this.stpfl1_IV_faktor = this.stpfl.LSTLZZ.value / 100 + this.stpfl.SOLZLZZ.value / 100 + getKirchensteuer(arbeitsstaette_1, config.constants, this.stpfl.BK.value / 100) / 100;

      return {
        stpfl_III: this.stpfl1_III,
        stpfl_IV: this.stpfl1_IV,
        stpfl_IV_faktor: this.stpfl1_IV_faktor,
        stpfl_V: this.stpfl1_V
      };
    };

    this.getVorteilsTyp = function (stpfl1_2_III_V, stpfl1_2_IV_IV, stpfl1_2_IV_IV_faktor, stpfl1_2_V_III) {

      var vorteilsTyp;

      if ((stpfl1_2_III_V <= stpfl1_2_IV_IV) && (stpfl1_2_III_V <= stpfl1_2_V_III) && (stpfl1_2_III_V <= stpfl1_2_IV_IV_faktor)) {
        vorteilsTyp = config.constants.TYP_III_V;
      }
      else if ((stpfl1_2_IV_IV <= stpfl1_2_III_V) && (stpfl1_2_IV_IV <= stpfl1_2_V_III) && (stpfl1_2_IV_IV <= stpfl1_2_IV_IV_faktor)) {
        vorteilsTyp = config.constants.TYP_IV_IV;
      }
      else if ((stpfl1_2_IV_IV_faktor <= stpfl1_2_III_V) && (stpfl1_2_IV_IV_faktor <= stpfl1_2_V_III) && (stpfl1_2_IV_IV_faktor <= stpfl1_2_IV_IV)) {
        vorteilsTyp = config.constants.TYP_IV_IV_FAKTOR;
        if (veranlagungsjahr < 2010) // Vor 2010 kein Faktorverfahren
        {
          vorteilsTyp = config.constants.TYP_IV_IV;
        }
      }
      else
        vorteilsTyp = config.constants.TYP_V_III;


      return vorteilsTyp;
    };

    function getMonthsSince(year) {
      var months = 0;
      months += (new Date()
        .getFullYear() - year) / 12;
      months += new Date()
        .getMonth() + 1;

      return months;
    }

    function isBeitragsbemessungsgrenzeOst(arbeitsstaette, constants) {
      var retValue = false;
      retValue = arbeitsstaette === constants.BRANDENBURG ||
        arbeitsstaette === constants.MECKLENBURG_VORPOMMERN ||
        arbeitsstaette === constants.SACHSEN ||
        arbeitsstaette === constants.SACHSEN_ANHALT ||
        arbeitsstaette === constants.THUERINGEN;

      return retValue;
    }

    function isArbeitsstaetteSachsen(arbeitsstaette, constants) {
      var retValue = false;
      retValue = arbeitsstaette === constants.SACHSEN;

      return retValue;
    }

    function getKirchensteuer(arbeitsstaette, constants, bmg) {
      return bmg * getKirchensteuersatz(arbeitsstaette, constants);
    }

    function getKirchensteuersatz(arbeitsstaette, constants) {
      var ksts = 9.00;
      if (arbeitsstaette === constants.BADEN_WUERTTEMBERG || arbeitsstaette === constants.BAYERN)
        ksts = 8.00;

      return ksts;
    }
  };

});
