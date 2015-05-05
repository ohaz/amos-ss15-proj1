define([
  './helper'
], function (
  helper
) {

  var GetWert = helper.GetWert;
  var Runde = helper.Runde;
  var RundeNachkommastellen = helper.RundeNachkommastellen;

  /** ************************************************************************ */
  //	Klasse CBruttoNettoLohn

  //	Dient zur Berechnung von Netto-Beträgen aus Brutto-Werten unter Berück-
  //	sichtigung der steuerlichen Gegebenheiten und maßgeblicher Sozialver-
  //	sicherungssätze. Möglich ist auch die Rückwärts-Rechnung (Netto->Brutto).

  //	Die für die Berechnung notwendigen Parameter werden entweder in den ent-
  //	sprechenden Konstruktoren oder jeweils in einzelnen set-Funktionen mit
  //	Werten versorgt.

  //	Zum Ermitteln der Ergebnisse ist jeweils eine Instanz der Klasse
  //	CBruttoNettoErgebnis erforderlich.

  //	Die jahresabhängige Berechnung bildet sich in der Funktion Berechne bzw.
  //	BerechneEx und den davon aufgerufenen Funktionen (insbesondere in
  //	BerechneTariflicheEinkommensteuer_XXXX) ab.

  //	Die aus Abwärtskompatibilitätsgründen weiterhin enthaltenen Funktionen
  //	Berechne und BerechneBruttoLohn sind bei nachfolgenden jährlichen Er-
  //	weiterungen nicht mehr abzuändern.

  //	Wegen der ab 2005 möglichen Unterschiede der SV-Anteile AG und AN wurde
  //	die Berechnung von der hälftigen Betrachtung des Gesamt-SV-Satzes auf eine
  //	rein AN-bezogene Berechnung umgestellt. Deshalb wurden ab VAZ 2005 die
  //	neuen Berechnungsfunktionen BerechneEx2 und BerechneBruttoLohnEx2 erstellt.
  //	Die alten "Ex"-Funktionen müssen aus Kompatibilitätsgründen unverändert
  //	bestehen bleiben.

  //	Aktuell: BerechneEx2 und BerechneBruttoLohnEx2
  //	Kompatibilität: BerechneEx und BerechneBruttoLohnEx (SV-Gesamtsätze)
  //	Berechne und BerechneBruttoLohn (SV pauschaliert)

  /** ************************************************************************ */


  /** ************************************************************************ */
  //	Beschreibung: Konstanten definieren
  /** ************************************************************************ */

  var MAX_ALTER = 64;
  var LZZ_JAEHRLICH = 1;
  var LZZ_MONATLICH = 2;
  var LZZ_WOECHENTLICH = 3;
  var LZZ_TAEGLICH = 4;

  var JW_VERSORGUNGSFREIBETRAG = 307200;
  var JW_ALTERSENTLASTUNGSBETRAG = 190800;


  var STEUERKLASSE_I = 1;
  var STEUERKLASSE_II = 2;
  var STEUERKLASSE_III = 3;
  var STEUERKLASSE_IV = 4;
  var STEUERKLASSE_V = 5;
  var STEUERKLASSE_VI = 6;


  var VersFreiBetrag = [{
      dblSatz: 0.400,
      intHoechstbetrag: 3000,
      intZuschlag: 900
    }, // 2005
    {
      dblSatz: 0.384,
      intHoechstbetrag: 2880,
      intZuschlag: 864
    }, // 2006
    {
      dblSatz: 0.368,
      intHoechstbetrag: 2760,
      intZuschlag: 828
    }, // 2007
    {
      dblSatz: 0.352,
      intHoechstbetrag: 2640,
      intZuschlag: 792
    }, // 2008
    {
      dblSatz: 0.336,
      intHoechstbetrag: 2520,
      intZuschlag: 756
    }, // 2009
    {
      dblSatz: 0.320,
      intHoechstbetrag: 2400,
      intZuschlag: 720
    }, // 2010
    {
      dblSatz: 0.304,
      intHoechstbetrag: 2280,
      intZuschlag: 684
    }, // 2011
    {
      dblSatz: 0.288,
      intHoechstbetrag: 2160,
      intZuschlag: 648
    }, // 2012
    {
      dblSatz: 0.272,
      intHoechstbetrag: 2040,
      intZuschlag: 612
    }, // 2013
    {
      dblSatz: 0.256,
      intHoechstbetrag: 1920,
      intZuschlag: 576
    }, // 2014
    {
      dblSatz: 0.240,
      intHoechstbetrag: 1800,
      intZuschlag: 540
    }, // 2015
    {
      dblSatz: 0.224,
      intHoechstbetrag: 1680,
      intZuschlag: 504
    }, // 2016
    {
      dblSatz: 0.208,
      intHoechstbetrag: 1560,
      intZuschlag: 468
    }, // 2017
    {
      dblSatz: 0.192,
      intHoechstbetrag: 1440,
      intZuschlag: 432
    }, // 2018
    {
      dblSatz: 0.176,
      intHoechstbetrag: 1320,
      intZuschlag: 396
    }, // 2019
    {
      dblSatz: 0.160,
      intHoechstbetrag: 1200,
      intZuschlag: 360
    }, // 2020
    {
      dblSatz: 0.152,
      intHoechstbetrag: 1140,
      intZuschlag: 342
    }, // 2021
    {
      dblSatz: 0.144,
      intHoechstbetrag: 1080,
      intZuschlag: 324
    }, // 2022
    {
      dblSatz: 0.136,
      intHoechstbetrag: 1020,
      intZuschlag: 306
    }, // 2023
    {
      dblSatz: 0.128,
      intHoechstbetrag: 960,
      intZuschlag: 288
    }, // 2024
    {
      dblSatz: 0.120,
      intHoechstbetrag: 900,
      intZuschlag: 270
    }, // 2025
    {
      dblSatz: 0.112,
      intHoechstbetrag: 840,
      intZuschlag: 252
    }, // 2026
    {
      dblSatz: 0.104,
      intHoechstbetrag: 780,
      intZuschlag: 234
    }, // 2027
    {
      dblSatz: 0.96,
      intHoechstbetrag: 720,
      intZuschlag: 216
    }, // 2028
    {
      dblSatz: 0.88,
      intHoechstbetrag: 660,
      intZuschlag: 198
    }, // 2029
    {
      dblSatz: 0.80,
      intHoechstbetrag: 600,
      intZuschlag: 180
    }, // 2030
    {
      dblSatz: 0.72,
      intHoechstbetrag: 540,
      intZuschlag: 162
    }, // 2031
    {
      dblSatz: 0.64,
      intHoechstbetrag: 480,
      intZuschlag: 144
    }, // 2032
    {
      dblSatz: 0.56,
      intHoechstbetrag: 420,
      intZuschlag: 126
    }, // 2033
    {
      dblSatz: 0.48,
      intHoechstbetrag: 360,
      intZuschlag: 108
    }, // 2034
    {
      dblSatz: 0.40,
      intHoechstbetrag: 300,
      intZuschlag: 90
    }, // 2035
    {
      dblSatz: 0.32,
      intHoechstbetrag: 240,
      intZuschlag: 72
    }, // 2036
    {
      dblSatz: 0.24,
      intHoechstbetrag: 180,
      intZuschlag: 54
    }, // 2037
    {
      dblSatz: 0.16,
      intHoechstbetrag: 120,
      intZuschlag: 36
    }, // 2038
    {
      dblSatz: 0.08,
      intHoechstbetrag: 60,
      intZuschlag: 18
    }, // 2039
    {
      dblSatz: 0.00,
      intHoechstbetrag: 0,
      intZuschlag: 0
    } // 2040
  ];

  var AlterEntlastBetrag = [{
      dblSatz: 0.400,
      intHoechstbetrag: 1900
    }, // bis 2005
    {
      dblSatz: 0.384,
      intHoechstbetrag: 1824
    }, // 2006
    {
      dblSatz: 0.368,
      intHoechstbetrag: 1748
    }, // 2007
    {
      dblSatz: 0.352,
      intHoechstbetrag: 1672
    }, // 2008
    {
      dblSatz: 0.336,
      intHoechstbetrag: 1596
    }, // 2009
    {
      dblSatz: 0.320,
      intHoechstbetrag: 1520
    }, // 2010
    {
      dblSatz: 0.304,
      intHoechstbetrag: 1444
    }, // 2011
    {
      dblSatz: 0.288,
      intHoechstbetrag: 1368
    }, // 2012
    {
      dblSatz: 0.272,
      intHoechstbetrag: 1292
    }, // 2013
    {
      dblSatz: 0.256,
      intHoechstbetrag: 1216
    }, // 2014
    {
      dblSatz: 0.240,
      intHoechstbetrag: 1140
    }, // 2015
    {
      dblSatz: 0.224,
      intHoechstbetrag: 1064
    }, // 2016
    {
      dblSatz: 0.208,
      intHoechstbetrag: 998
    }, // 2017
    {
      dblSatz: 0.192,
      intHoechstbetrag: 912
    }, // 2018
    {
      dblSatz: 0.176,
      intHoechstbetrag: 836
    }, // 2019
    {
      dblSatz: 0.160,
      intHoechstbetrag: 760
    }, // 2020
    {
      dblSatz: 0.152,
      intHoechstbetrag: 722
    }, // 2021
    {
      dblSatz: 0.144,
      intHoechstbetrag: 684
    }, // 2022
    {
      dblSatz: 0.136,
      intHoechstbetrag: 646
    }, // 2023
    {
      dblSatz: 0.128,
      intHoechstbetrag: 608
    }, // 2024
    {
      dblSatz: 0.120,
      intHoechstbetrag: 570
    }, // 2025
    {
      dblSatz: 0.112,
      intHoechstbetrag: 532
    }, // 2026
    {
      dblSatz: 0.104,
      intHoechstbetrag: 494
    }, // 2027
    {
      dblSatz: 0.096,
      intHoechstbetrag: 456
    }, // 2028
    {
      dblSatz: 0.088,
      intHoechstbetrag: 418
    }, // 2029
    {
      dblSatz: 0.080,
      intHoechstbetrag: 380
    }, // 2030
    {
      dblSatz: 0.072,
      intHoechstbetrag: 342
    }, // 2031
    {
      dblSatz: 0.064,
      intHoechstbetrag: 304
    }, // 2032
    {
      dblSatz: 0.056,
      intHoechstbetrag: 266
    }, // 2033
    {
      dblSatz: 0.048,
      intHoechstbetrag: 228
    }, // 2034
    {
      dblSatz: 0.040,
      intHoechstbetrag: 190
    }, // 2035
    {
      dblSatz: 0.032,
      intHoechstbetrag: 152
    }, // 2036
    {
      dblSatz: 0.024,
      intHoechstbetrag: 114
    }, // 2037
    {
      dblSatz: 0.016,
      intHoechstbetrag: 76
    }, // 2038
    {
      dblSatz: 0.008,
      intHoechstbetrag: 38
    }, // 2039
    {
      dblSatz: 0.000,
      intHoechstbetrag: 0
    } // 2040
  ];

  var JAHR_AB = 2011;
  var JAHR_BIS = 2013;

  var LOHN_DECIMAL = 2;

  var VAZ_START = JAHR_AB;
  var VAZ_ANZAHL = 5;

  var SVW_BBG_RVAV_WEST = 1; // Betragsbemessungsgrenze RV u. AV West
  var SVW_BBG_RVAV_OST = 2; // Betragsbemessungsgrenze RV u. AV Ost
  var SVW_BBG_KVPV_WEST = 3; // Betragsbemessungsgrenze KV u. PV West
  var SVW_BBG_KVPV_OST = 4; // Betragsbemessungsgrenze KV u. PV Ost

  var SVW_SATZ_RV = 10; // Rentenversicherungssatz Gesamt
  var SVW_SATZ_AV = 11; // Arbeitslosenversicherungssatz Gesamt
  var SVW_SATZ_KVDS = 12; // Krankenversicherungsdurchschnittssatz
  var SVW_SATZ_PV = 13; // Pflegeversicherungssatz Gesamt

  var SVW_AN_SATZ_RV = 20; // Rentenversicherungssatz Arbeitnehmer
  var SVW_AN_SATZ_AV = 21; // Arbeitslosenversicherungssatz Arbeitnehmer
  var SVW_AN_SATZ_KVDS = 22; // Krankenversicherungssatz Arbeitnehmer
  var SVW_AN_SATZ_PV = 23; // Pflegeversicherungssatz Arbeitnehmer
  var SVW_AG_SATZ_KV = 24; // Beitragssatz des Arbeitgebers zur
  // Krankenversicherung
  var SVW_AN_SATZ_KV = 25; // ermäßigter Beitragssatz des Arbeitnehmers zur
  // Krankenversicherung

  var m_intAlter1 = 30;
  var m_intAlter2 = 30;
  var m_dblHinzurechnung1 = 0;
  var m_dblHinzurechnung2 = 0;
  var m_dblArbeitslohn1 = 5000;
  var m_dblArbeitslohn2 = 5000;
  var m_dblVersorgbezug1 = 0;
  var m_dblVersorgbezug2 = 0;
  var m_intVersorgbeginn1 = 0;
  var m_intVersorgbeginn2 = 0;
  var m_dblFreibetrag1 = 0;
  var m_dblFreibetrag2 = 0;
  var m_iRVFrei1 = 0;
  var m_iRVFrei2 = 0;
  var m_intZeitraum1 = LZZ_JAEHRLICH;
  var m_intZeitraum2 = LZZ_JAEHRLICH;
  var m_dblKiStSatz1 = 9.0;
  var m_dblKiStSatz2 = 9.0;
  var m_intStKlasse1 = STEUERKLASSE_I;
  var m_intStKlasse2 = STEUERKLASSE_I;
  var m_dblKinder1 = 0;
  var m_dblKinder2 = 0;
  var iVeranlagungszeitraum = JAHR_BIS;

  var m_dblBemessungRVAV1 = new Array();
  var m_dblBemessungRVAV2 = new Array();
  var m_dblBemessungKVPV1 = new Array();
  var m_dblBemessungKVPV2 = new Array();
  var m_dblBeitragssatzRV1 = new Array();
  var m_dblBeitragssatzRV2 = new Array();
  var m_dblBeitragssatzAV1 = new Array();
  var m_dblBeitragssatzAV2 = new Array();
  var m_dblBeitragssatzPV1 = new Array();
  var m_dblBeitragssatzPV2 = new Array();
  var m_dblBeitragssatzKV1 = new Array();
  var m_dblBeitragssatzKV2 = new Array();

  for (var i = 0; i < VAZ_ANZAHL; i++) {
    m_dblBemessungRVAV1[i] = GetWert(i + VAZ_START, SVW_BBG_RVAV_WEST);
    m_dblBemessungRVAV2[i] = GetWert(i + VAZ_START, SVW_BBG_RVAV_WEST);
    m_dblBemessungKVPV1[i] = GetWert(i + VAZ_START, SVW_BBG_KVPV_WEST);
    m_dblBemessungKVPV2[i] = GetWert(i + VAZ_START, SVW_BBG_KVPV_WEST);
    m_dblBeitragssatzRV1[i] = GetWert(i + VAZ_START, SVW_AN_SATZ_RV);
    m_dblBeitragssatzRV2[i] = GetWert(i + VAZ_START, SVW_AN_SATZ_RV);
    m_dblBeitragssatzAV1[i] = GetWert(i + VAZ_START, SVW_AN_SATZ_AV);
    m_dblBeitragssatzAV2[i] = GetWert(i + VAZ_START, SVW_AN_SATZ_AV);
    m_dblBeitragssatzPV1[i] = GetWert(i + VAZ_START, SVW_AN_SATZ_PV);
    m_dblBeitragssatzPV2[i] = GetWert(i + VAZ_START, SVW_AN_SATZ_PV);
    m_dblBeitragssatzKV1[i] = GetWert(i + VAZ_START, SVW_AN_SATZ_KVDS);
    m_dblBeitragssatzKV2[i] = GetWert(i + VAZ_START, SVW_AN_SATZ_KVDS);
  }

  var bemessungen = {
    m_dblBemessungRVAV1: m_dblBemessungRVAV1,
    m_dblBemessungRVAV2: m_dblBemessungRVAV2,
    m_dblBemessungKVPV1: m_dblBemessungKVPV1,
    m_dblBemessungKVPV2: m_dblBemessungKVPV2,
    m_dblBeitragssatzRV1: m_dblBeitragssatzRV1,
    m_dblBeitragssatzRV2: m_dblBeitragssatzRV2,
    m_dblBeitragssatzAV1: m_dblBeitragssatzAV1,
    m_dblBeitragssatzAV2: m_dblBeitragssatzAV2,
    m_dblBeitragssatzPV1: m_dblBeitragssatzPV1,
    m_dblBeitragssatzPV2: m_dblBeitragssatzPV2,
    m_dblBeitragssatzKV1: m_dblBeitragssatzKV1,
    m_dblBeitragssatzKV2: m_dblBeitragssatzKV2
  };


  var m_blnPrivateKV1 = false;
  var m_blnPrivateKV2 = false;
  var m_dblBeitragPrivateKV1 = 0;
  var m_dblBeitragPrivateKV2 = 0;
  var m_dblBeitragPrivatePV1 = 0;
  var m_dblBeitragPrivatePV2 = 0;

  var m_blnPKVZuschuss1 = false;
  var m_blnPKVZuschuss2 = false;
  var m_blnPVSachsen1 = false;
  var m_blnPVSachsen2 = false;
  var m_blnRechtskreisOst1 = false;
  var m_blnRechtskreisOst2 = false;

  var m_dblFaktor = 1.0;


  /** ************************************************************************* */
  //	Beschreibung: Konstruktor für die Berechnung des Nettolohns
  //	(mit SV-Berechnung - BruttoNettoRechner ab V.1.01)

  //	erweitert für V.3.1 wegen PAP-Änderungen ab VAZ 2006 im Bereich Freibeträge
  //	für Versorgungsbezüge, Altersentlastungbetrag RW 25.11.2005
  /** ************************************************************************* */

  function CBruttoNettolohn(iAlter,
    dHinzurechnungsbetrag,
    dArbeitslohn,
    dVersorgungsbezuege,
    iVersorgungsbeginnIdx,
    dFreibetrag,
    iRentenversicherungsfrei,
    iLohnzahlungszeitraum,
    fKirchensteuersatz,
    iSteuerklasse,
    fKinder,
    dBemessungRVAV,
    dBemessungKVPV,
    dBeitragssatzRV,
    dBeitragssatzAV,
    dBeitragssatzKV,
    dBeitragssatzPV,
    bPrivateKV,
    dBeitragPrivateKV,
    dBeitragPrivatePV,
    bZuschussAG,
    bPVS,
    bRechtskreisOst,
    iVeranlagungsjahr) {

    this.setSteuerklasse = function (iSteuerklasse) {
      this.m_iSteuerklasse = iSteuerklasse;
    };
    this.getSteuerklasse = function () {
      return this.m_iSteuerklasse;
    };
    this.setKinderfreibetrag = function (fKinder) {
      this.m_fKinder = fKinder;
    };
    this.setFreibetrag = function (dFreibetrag) {
      this.m_dLZZFREIB = dFreibetrag;
    };

    if (bRechtskreisOst) {
      dBemessungRVAV = GetWert(iVeranlagungsjahr, SVW_BBG_RVAV_OST);
      dBemessungKVPV = GetWert(iVeranlagungsjahr, SVW_BBG_KVPV_OST);
    }






    /** ************************************************************************* */
    //		Beschreibung: Berechnung des Bruttolohns (mit SV-Abzug AN-Anteile - ab
    //		V.3.00)

    /** ************************************************************************* */

    this.BerechneBruttoLohnEx2 = function (dNettoLohn, erg) {
      var dErg = dNettoLohn;

      var dFaktor = (0.485 + (this.m_fKirchensteuersatz + 25) / 100.0 + 0.055) + 0.1;

      this.m_dRE4 = dNettoLohn / (1 - dFaktor);
      this.BerechneEx2(erg);

      var dObenSatz = this.m_dRE4;
      var dObenNetto = erg.getNettolohn();
      var dUntenSatz = dNettoLohn;
      this.m_dRE4 = dNettoLohn;
      this.BerechneEx2(erg);
      var dUntenNetto = erg.getNettolohn();

      if (dUntenNetto == dNettoLohn)
        return dUntenNetto;
      else if (dObenNetto == dNettoLohn)
        return dObenNetto;

      var i = 2;
      while (true) {
        i++;
        if (i > 30)
          return this.m_dRE4;
        this.m_dRE4 = Runde((dObenSatz * 100 + dUntenSatz * 100) * 0.5 / 100, 2, true);
        this.BerechneEx2(erg);
        if (erg.getNettolohn() > dNettoLohn) {
          dObenNetto = erg.getNettolohn();
          dObenSatz = this.m_dRE4;
        }
        else if (erg.getNettolohn() < dNettoLohn) {
          dUntenNetto = erg.getNettolohn();
          dUntenSatz = this.m_dRE4;
        }
        else
          return this.m_dRE4;


        if (RundeNachkommastellen(dUntenNetto, 2) == dNettoLohn)
          return this.m_dRE4;
        else if (RundeNachkommastellen(dObenNetto, 2) == dNettoLohn)
          return this.m_dRE4;

      }

      return dErg;
    };


    /** ************************************************************************* */
    //		Beschreibung: Berechnung von Lohnsteuer, Solidaritaetszuschlag,
    //		Kirchensteuer und SV-Abzug (ab V.3.00) mit AN-Sätzen

    /** ************************************************************************* */
    this.BerechneEx2 = function (erg) {
      var lJWVersorgungsfreibetrag = 0;
      var lJWAltersentlastungsbetrag = 0;
      var iHFB = 0; // Wert fuer Haushaltsfreibetrag
      var iANP = 0; // Wert fuer Arbeitnehmerpauschale
      var iSAP = 0; // Wert fuer Sonderausgabenbetrag
      var iKFB = 0; // Wert für Kinderfreibetrag
      // Faktoren fuer die Berechnung der Vorsorgepauschale
      var iFakVSPVOR = 0;
      var iFakVSPMAX1 = 0;
      var iFakVSPMAX2 = 0;
      var iFakVSPKURZ = 0;
      var iSol = 0;

      m_bnErgebnis = erg;
      switch (this.m_iVeranlagungsjahr) {
      case 2002:
      case 2003:
        lJWVersorgungsfreibetrag = 307200;
        lJWAltersentlastungsbetrag = 190800;
        iHFB = 2340;
        iANP = 1044;
        iSAP = 36;
        iKFB = 2904;
        iFakVSPVOR = 3068;
        iFakVSPMAX1 = 1334;
        iFakVSPMAX2 = 667;
        iFakVSPKURZ = 1134;
        iSol = 972;
        break;

      case 2004:
        lJWVersorgungsfreibetrag = 307200;
        lJWAltersentlastungsbetrag = 190800;
        iHFB = 1308;
        iANP = 920;
        iSAP = 36;
        iKFB = 2904;
        iFakVSPVOR = 3068;
        iFakVSPMAX1 = 1334;
        iFakVSPMAX2 = 667;
        iFakVSPKURZ = 1134;
        iSol = 972;
        break;

      case 2005:
        lJWVersorgungsfreibetrag = 300000;
        lJWAltersentlastungsbetrag = 190000;
        iHFB = 1308;
        iANP = 920;
        iSAP = 36;
        iKFB = 2904;
        iFakVSPVOR = 3068;
        iFakVSPMAX1 = 1334;
        iFakVSPMAX2 = 667;
        iFakVSPKURZ = 1134;
        iSol = 972;
        break;

      case 2006:
      case 2007:
      case 2008: // keine Änderungen im PAP
        iHFB = 1308;
        iANP = 920;
        iSAP = 36;
        iKFB = 2904;
        iFakVSPVOR = 3068;
        iFakVSPMAX1 = 1334;
        iFakVSPMAX2 = 667;
        iFakVSPKURZ = 1134;
        iSol = 972;
        break;

      case 2009:
        iHFB = 1308;
        iANP = 920;
        iSAP = 36;
        iKFB = 3012;
        iFakVSPVOR = 3068;
        iFakVSPMAX1 = 1334;
        iFakVSPMAX2 = 667;
        iFakVSPKURZ = 1134;
        iSol = 972;
        break;

      case 2010: // Änderungen im PAP 2010
        iHFB = 1308;
        iANP = 920;
        iSAP = 36;
        iKFB = 3504; // NEU für 2010
        iFakVSPVOR = 3068;
        iFakVSPMAX1 = 1334;
        iFakVSPMAX2 = 667;
        iFakVSPKURZ = 1134;
        iSol = 972;
        break;

      default: // damit wird immer Vorjahr genommen ab 2011
        iHFB = 1308;
        iANP = 1000;
        iSAP = 36;
        iKFB = 3504; // NEU für 2010
        iFakVSPVOR = 3068;
        iFakVSPMAX1 = 1334;
        iFakVSPMAX2 = 667;
        iFakVSPKURZ = 1134;
        iSol = 972;
        break;
      }
      var dRE4LZZ = 0.0;
      var dRE4LZZV = 0.0;
      switch (this.m_iVeranlagungsjahr) {
      case 2005:
        dRE4LZZ = this.BerechneFreibetraege(lJWVersorgungsfreibetrag, lJWAltersentlastungsbetrag, dRE4LZZ, dRE4LZZV)[0];
        dRE4LZZV = this.BerechneFreibetraege(lJWVersorgungsfreibetrag, lJWAltersentlastungsbetrag, dRE4LZZ, dRE4LZZV)[1];
        break;
      case 2006:
      case 2007:
        dRE4LZZ = this.BerechneFreibetraegeAb2006(dRE4LZZ, dRE4LZZV)[0]; // MRE4LZZ
        // PAP2007
        dRE4LZZV = this.BerechneFreibetraegeAb2006(dRE4LZZ, dRE4LZZV)[1];
        break;

      case 2008:
        this.BerechneJahreslohn(); // MRE4JL PAP2008
        this.BerechneFreibetraegeAb2008(); // MRE4 PAP2008
        break;

      case 2009:
      default: // damit wird immer Vorjahr genommen
        this.BerechneJahreslohn(); // MRE4JL PAP2008
        this.BerechneFreibetraegeAb2009(); // MRE4 PAP2009
        break;
      }

      var dZRE4 = 0.0;
      var dZRE4VP = 0.0;

      if (this.m_iVeranlagungsjahr >= 2008) {
        dZRE4 = this.MRE4ABZ(dZRE4, dZRE4VP)[0];
        dZRE4VP = this.MRE4ABZ(dZRE4, dZRE4VP)[1];
      }
      else {
        dZRE4 = this.BerechneMassgeblichenArbeitslohn(dRE4LZZ, dRE4LZZV, dZRE4, dZRE4VP)[0];
        dZRE4VP = this.BerechneMassgeblichenArbeitslohn(dRE4LZZ, dRE4LZZV, dZRE4, dZRE4VP)[1];
      }

      var dKinderfreibetrag = 0.0;
      var dFestenTabellenfreibetrag;
      switch (this.m_iVeranlagungsjahr) {
      case 2005:
        dFestenTabellenfreibetrag = this.BerechneTabellenFreibetraege(iHFB, iANP, iSAP, iKFB, dKinderfreibetrag)[0];
        dKinderfreibetrag = this.BerechneTabellenFreibetraege(iHFB, iANP, iSAP, iKFB, dKinderfreibetrag)[1];
        break;
      case 2006:
      case 2007:
      case 2008:
      default: // damit wird immer Vorjahr genommen
        dFestenTabellenfreibetrag = this.BerechneTabellenFreibetraegeAb2006(iHFB, iANP, iSAP, iKFB, dKinderfreibetrag, dZRE4)[0];
        dKinderfreibetrag = this.BerechneTabellenFreibetraegeAb2006(iHFB, iANP, iSAP, iKFB, dKinderfreibetrag, dZRE4)[1];
        break;
      }

      var dTarif = this.BerechneLohnsteuer(iFakVSPVOR, iFakVSPMAX1, iFakVSPMAX2, iFakVSPKURZ, dZRE4, dZRE4VP, dFestenTabellenfreibetrag);
      var dJahreswert = dTarif * 100;

      dJahreswert = dJahreswert * this.m_dblFaktor;
      dJahreswert = Runde(dJahreswert / 100.0, 0, false) * 100.0;

      var lAnteil1 = this.UpAnteil(dJahreswert, false);
      m_bnErgebnis.setLohnsteuer(lAnteil1 / 100.0);
      var dJahresBMG = 0.0;
      // Berechnung der Bemessunggrundlage für Kirchensteuer und SOLZ
      if (this.m_fKinder > 0.0) {
        dFestenTabellenfreibetrag += dKinderfreibetrag;
        if (this.m_iVeranlagungsjahr >= 2010) {
          if (this.m_iSteuerklasse != 5 && this.m_iSteuerklasse != 6) {
            //dFestenTabellenfreibetrag += dKinderfreibetrag;

            dZRE4 = this.MRE4ABZ(dZRE4, dZRE4VP)[0]; // Anpassung
            // korrigierter PAP2010
            dZRE4VP = this.MRE4ABZ(dZRE4, dZRE4VP)[1];

            dJahresBMG = this.BerechneLohnsteuer(iFakVSPVOR, iFakVSPMAX1, iFakVSPMAX2, iFakVSPKURZ, dZRE4, dZRE4VP, dFestenTabellenfreibetrag);

          }
          else {
            //dJahresBMG = this.BerechneLohnsteuer(iFakVSPVOR, iFakVSPMAX1, iFakVSPMAX2, iFakVSPKURZ, dZRE4, dZRE4VP, dFestenTabellenfreibetrag);
            dJahresBMG = dTarif;
          }
        }
      }
      else
        dJahresBMG = dTarif;

      dJahresBMG = dJahresBMG * this.m_dblFaktor;
      dJahresBMG = Runde(dJahresBMG, 0, false);

      // throw (dJahresBMG);

      this.BerechneSolzUndKist(dJahresBMG, iSol);

      // Hier fehlt noch die Behandlung der sonstigen Bezuege und der
      // mehrjaehrigen Verguetungen

      // SV-Berechnung
      this.BerechneSVBeitraegeAN();

      // Berechnung des Nettolohns
      var dNettolohn = this.m_dRE4 -
        erg.getKirchensteuer() -
        erg.getSolidaritaetszuschlag() -
        erg.getLohnsteuer() -
        erg.getRVBeitrag() -
        erg.getAVBeitrag() -
        erg.getKVBeitrag() -
        erg.getPVBeitrag() -
        erg.getBeitragPrivateKVPV();
      erg.setNettolohn(dNettolohn);
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der einzelnen SV-Beiträge (ab V.1.01)

    /** ************************************************************************* */
    this.BerechneSVBeitraege = function () {
      var dBemessung_RVAV = 0.0;
      var dBemessung_KVPV = 0.0;

      switch (this.m_iLZZ) {
      case LZZ_JAEHRLICH:
        dBemessung_RVAV = this.m_dBemessungRVAV;
        dBemessung_KVPV = this.m_dBemessungKVPV;
        break;
      case LZZ_MONATLICH:
        dBemessung_RVAV = this.m_dBemessungRVAV / 12;
        dBemessung_KVPV = this.m_dBemessungKVPV / 12;
        break;
      case LZZ_WOECHENTLICH:
        dBemessung_RVAV = this.m_dBemessungRVAV / 360 * 7;
        dBemessung_KVPV = this.m_dBemessungKVPV / 360 * 7;
        break;
      case LZZ_TAEGLICH:
        dBemessung_RVAV = this.m_dBemessungRVAV / 360;
        dBemessung_KVPV = this.m_dBemessungKVPV / 360;
        break;
      }

      var dRechenWertRVAV = (this.m_dRE4 < dBemessung_RVAV) ? this.m_dRE4 : dBemessung_RVAV;

      m_bnErgebnis.setRVBeitrag(RundeNachkommastellen(dRechenWertRVAV * this.m_dBeitragssatzRV / 100 / 2, 2));
      m_bnErgebnis.setAVBeitrag(Runde(dRechenWertRVAV * this.m_dBeitragssatzAV / 100 / 2, 2, false));

      if (this.m_bPrivateKV == TRUE) {
        //				switch (this.m_iLZZ)
        //				{
        //				case LZZ_JAEHRLICH:
        //				m_bnErgebnis.setKVBeitrag(0);
        //				m_bnErgebnis.setPVBeitrag(0);
        //				m_bnErgebnis.setBeitragPrivateKVPV(this.m_dBeitragPrivateKV);
        //				break;
        //				case LZZ_MONATLICH:
        //				m_bnErgebnis.setKVBeitrag(0);
        //				m_bnErgebnis.setPVBeitrag(0);
        //				m_bnErgebnis.setBeitragPrivateKVPV(Runde(this.m_dBeitragPrivateKV / 12, 2,
        //				false));
        //				break;
        //				case LZZ_WOECHENTLICH:
        //				m_bnErgebnis.setKVBeitrag(0);
        //				m_bnErgebnis.setPVBeitrag(0);
        //				m_bnErgebnis.setBeitragPrivateKVPV(Runde(this.m_dBeitragPrivateKV / 360 * 7,
        //				2, false));
        //				break;
        //				case LZZ_TAEGLICH:
        //				m_bnErgebnis.setKVBeitrag(0);
        //				m_bnErgebnis.setPVBeitrag(0);
        //				m_bnErgebnis.setBeitragPrivateKVPV(Runde(this.m_dBeitragPrivateKV / 360, 2,
        //				false));
        //				break;
        //				}

        m_bnErgebnis.setKVBeitrag(0);
        m_bnErgebnis.setPVBeitrag(0);
        m_bnErgebnis.setBeitragPrivateKVPV(this.m_dBeitragPrivateKV);
      }
      else {
        var dRechenWertKVPV = (this.m_dRE4 < dBemessung_KVPV) ? this.m_dRE4 : dBemessung_KVPV;

        m_bnErgebnis.setKVBeitrag(Runde(dRechenWertKVPV * this.m_dBeitragssatzKV / 100 / 2, 2, false));
        m_bnErgebnis.setPVBeitrag(Runde(dRechenWertKVPV * this.m_dBeitragssatzPV / 100 / 2, 2, false));
        m_bnErgebnis.setBeitragPrivateKVPV(0);
      }
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der einzelnen SV-Beiträge (ab V.3.00) mit AN-Sätzen

    /** ************************************************************************* */
    this.BerechneSVBeitraegeAN = function () {
      var dBemessung_RVAV = 0.0;
      var dBemessung_KVPV = 0.0;

      switch (this.m_iLZZ) {
      case LZZ_JAEHRLICH:
        dBemessung_RVAV = this.m_dBemessungRVAV;
        dBemessung_KVPV = this.m_dBemessungKVPV;
        break;
      case LZZ_MONATLICH:
        dBemessung_RVAV = this.m_dBemessungRVAV / 12;
        dBemessung_KVPV = this.m_dBemessungKVPV / 12;
        break;
      case LZZ_WOECHENTLICH:
        dBemessung_RVAV = this.m_dBemessungRVAV / 360 * 7;
        dBemessung_KVPV = this.m_dBemessungKVPV / 360 * 7;
        break;
      case LZZ_TAEGLICH:
        dBemessung_RVAV = this.m_dBemessungRVAV / 360;
        dBemessung_KVPV = this.m_dBemessungKVPV / 360;
        break;
      }

      var dRechenWertRVAV = (this.m_dRE4 < dBemessung_RVAV) ? this.m_dRE4 : dBemessung_RVAV;

      m_bnErgebnis.setRVBeitrag(RundeNachkommastellen(dRechenWertRVAV * this.m_dBeitragssatzRV / 100, 2));
      m_bnErgebnis.setAVBeitrag(Runde(dRechenWertRVAV * this.m_dBeitragssatzAV / 100, 2, false));

      if (this.m_bPrivateKV == true) {
        //				switch (this.m_iLZZ)
        //				{
        //				case LZZ_JAEHRLICH:
        //				m_bnErgebnis.setKVBeitrag(0);
        //				m_bnErgebnis.setPVBeitrag(0);
        //				m_bnErgebnis.setBeitragPrivateKVPV(this.m_dBeitragPrivateKV);
        //				break;
        //				case LZZ_MONATLICH:
        //				m_bnErgebnis.setKVBeitrag(0);
        //				m_bnErgebnis.setPVBeitrag(0);
        //				m_bnErgebnis.setBeitragPrivateKVPV(Runde(this.m_dBeitragPrivateKV / 12, 2,
        //				false));
        //				break;
        //				case LZZ_WOECHENTLICH:
        //				m_bnErgebnis.setKVBeitrag(0);
        //				m_bnErgebnis.setPVBeitrag(0);
        //				m_bnErgebnis.setBeitragPrivateKVPV(Runde(this.m_dBeitragPrivateKV / 360 * 7,
        //				2, false));
        //				break;
        //				case LZZ_TAEGLICH:
        //				m_bnErgebnis.setKVBeitrag(0);
        //				m_bnErgebnis.setPVBeitrag(0);
        //				m_bnErgebnis.setBeitragPrivateKVPV(Runde(this.m_dBeitragPrivateKV / 360, 2,
        //				false));
        //				break;
        //				}

        m_bnErgebnis.setKVBeitrag(0);
        m_bnErgebnis.setPVBeitrag(0);
        m_bnErgebnis.setBeitragPrivateKVPV(this.m_dBeitragPrivateKV);
      }
      else {
        var dRechenWertKVPV = (this.m_dRE4 < dBemessung_KVPV) ? this.m_dRE4 : dBemessung_KVPV;

        m_bnErgebnis.setKVBeitrag(Runde(dRechenWertKVPV * this.m_dBeitragssatzKV / 100, 2, false));

        if (this.zuschlagPV && this.m_iSteuerklasse != 2) {
          var temp12 = dRechenWertKVPV * (this.m_dBeitragssatzPV + 0.25) / 100;
          m_bnErgebnis.setPVBeitrag(RundeNachkommastellen(temp12, 2));
        }
        else {
          var temp12 = dRechenWertKVPV * this.m_dBeitragssatzPV / 100;
          m_bnErgebnis.setPVBeitrag(RundeNachkommastellen(temp12, 2));
        }

        m_bnErgebnis.setBeitragPrivateKVPV(0);
      }
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der Freibetraege (Versorgungsfreibetrag und
    //		Altersentlastungsbetrag

    //		Änderung ab VAZ 2005: Es wird ein Zuschlag zum Versorgungsfreibetrag
    //		eingeführt
    //		(vgl. PAP Variable FVBZ). Da fachlich festgelegt wurde, dass wir im Brutto-
    //		NettoRechner immer von 12 Zahlmonaten (PAP: ZMVB) und 0 voraussichtlichen
    //		Sonderzahlungen (PAP: VBEZS) ausgehen, ergibt sich automatisch immer eine
    //		Höhe von 900 (für FVBZ) für Versorgungsempfänger (unabhängig vom LZZ)
    /** ************************************************************************* */

    this.BerechneFreibetraege = function (lJWVersorgungsfreibetrag, lJWAltersentlastungsbetrag, dRE4LZZ, dRE4LZZV) {
      var dVersorgungsfreibetrag = 0.0;
      var dAltersentlastungsbetrag = 0.0;
      var dBemessgrundlageVersorgungsfreibetrag = 0.0;

      this.m_dFVBZ = 0.0; // nur relevant ab VAZ2005

      if (this.m_dVBEZ != 0.0 || this.m_iVersorgungsbeginnIdx > 0) {
        var lAnteil2;
        switch (this.m_iVeranlagungsjahr) {
        case 2002:
        case 2003:
        case 2004:
          dVersorgungsfreibetrag = Runde(this.m_dVBEZ * 0.4, 0, true);
          lAnteil2 = this.UpAnteil(lJWVersorgungsfreibetrag / 100, true);

          if (dVersorgungsfreibetrag > lAnteil2)
            dVersorgungsfreibetrag = lAnteil2;
          break;
        case 2005:
          this.m_dFVBZ = 900.00;
          switch (this.m_iLZZ) {
          case LZZ_JAEHRLICH:
            dBemessgrundlageVersorgungsfreibetrag = this.m_dVBEZ;
            break;
          case LZZ_MONATLICH:
            dBemessgrundlageVersorgungsfreibetrag = this.m_dVBEZ * 12;
            break;
          case LZZ_WOECHENTLICH:
            dBemessgrundlageVersorgungsfreibetrag = this.m_dVBEZ * 360 / 7;
            break;
          case LZZ_TAEGLICH:
            dBemessgrundlageVersorgungsfreibetrag = this.m_dVBEZ * 360;
            break;
          }

          dVersorgungsfreibetrag = Runde(dBemessgrundlageVersorgungsfreibetrag * 0.4, 0, true);
          if (dVersorgungsfreibetrag > lJWVersorgungsfreibetrag / 100)
            dVersorgungsfreibetrag = lJWVersorgungsfreibetrag / 100;
          lAnteil2 = this.UpAnteil(dVersorgungsfreibetrag, true);
          dVersorgungsfreibetrag = lAnteil2;
          break;
        }
      }

      if (this.m_iAlter >= MAX_ALTER) {
        dAltersentlastungsbetrag = Runde((this.m_dRE4 - dVersorgungsfreibetrag) * 0.4, 0, true);
        var lAnteil2 = this.UpAnteil(lJWAltersentlastungsbetrag / 100, true);
        if (dAltersentlastungsbetrag > lAnteil2)
          dAltersentlastungsbetrag = lAnteil2;
      }
      dRE4LZZ = (this.m_dRE4 - dVersorgungsfreibetrag - dAltersentlastungsbetrag - this.m_dLZZFREIB + this.m_dLZZHINZU) * 100;
      dRE4LZZV = (this.m_dRE4 - dVersorgungsfreibetrag - dAltersentlastungsbetrag) * 100;

      return newArray(dRE4LZZ, dRE4LZZV);
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der Freibetraege (Versorgungsfreibetrag und
    //		Altersentlastungsbetrag

    //		Änderung ab VAZ 2006: Außer den Variablen dRE4LZZ und dRE4LZZV wird im Rahmen
    //		der weiteren Berechnung auch der Versorgungsfreibetrag benötigt (vgl. Modul
    //		MRE4 ab PAP2006). Deshalb wurde die Methode neu implementiert. Außerdem
    //		werden
    //		ab 2006 zur Ermittlung der Freibeträge Tabellen benutzt!
    /** ************************************************************************* */
    this.BerechneFreibetraegeAb2006 = function (dRE4LZZ, dRE4LZZV) {
      var dAltersentlastungsbetrag = 0.0;
      var dBemessgrundlageVersorgungsfreibetrag = 0.0;

      this.m_dFVB = 0.0;
      this.m_dFVBZ = 0.0;

      if (this.m_dVBEZ != 0.0 || this.m_iVersorgungsbeginnIdx > 0) {
        this.m_dFVBZ = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intZuschlag;

        // hier wird die Bemessungsgrundlage (d.i. bei uns immer der
        // hochgerechnete Jahreswert!) ermittelt
        switch (this.m_iLZZ) {
        case LZZ_JAEHRLICH:
          dBemessgrundlageVersorgungsfreibetrag = this.m_dVBEZ;
          break;
        case LZZ_MONATLICH:
          dBemessgrundlageVersorgungsfreibetrag = this.m_dVBEZ * 12;
          break;
        case LZZ_WOECHENTLICH:
          dBemessgrundlageVersorgungsfreibetrag = this.m_dVBEZ * 360 / 7;
          break;
        case LZZ_TAEGLICH:
          dBemessgrundlageVersorgungsfreibetrag = this.m_dVBEZ * 360;
          break;
        }

        var dVersorgungsfreibetrag = Runde(dBemessgrundlageVersorgungsfreibetrag * VersFreiBetrag[this.m_iVersorgungsbeginnIdx].dblSatz, 0, true);
        var dHoechstbetragVersorgungsfreibetrag = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intHoechstbetrag;

        if (dVersorgungsfreibetrag > dHoechstbetragVersorgungsfreibetrag)
          dVersorgungsfreibetrag = dHoechstbetragVersorgungsfreibetrag;

        var lAnteil2 = UpAnteil(dVersorgungsfreibetrag, true);
        this.m_dFVB = lAnteil2;
      }
      else
        this.m_dFVB = 0.0;

      if (this.m_iAlter >= MAX_ALTER) {
        var iJahr65 = this.m_iVeranlagungsjahr - (this.m_iAlter - 64);
        var iAlterIdx = iJahr65 <= 2005 ? 0 : iJahr65 - 2005;

        if (iAlterIdx > 35)
          iAlterIdx = 35;

        var dBemessgrundlageAltersentlastungsbetrag = this.m_dRE4 - this.m_dVBEZ;
        dAltersentlastungsbetrag = dBemessgrundlageAltersentlastungsbetrag * AlterEntlastBetrag[iAlterIdx].dblSatz;
        var lAnteil2 = this.UpAnteil(AlterEntlastBetrag[iAlterIdx].intHoechstbetrag, true);
        if (dAltersentlastungsbetrag > lAnteil2)
          dAltersentlastungsbetrag = lAnteil2;
      }
      else
        dAltersentlastungsbetrag = 0.0;

      dRE4LZZ = (this.m_dRE4 - this.m_dFVB - dAltersentlastungsbetrag - this.m_dLZZFREIB + this.m_dLZZHINZU) * 100;
      dRE4LZZV = (this.m_dRE4 - this.m_dFVB - dAltersentlastungsbetrag) * 100;

      return new Array(dRE4LZZ, dRE4LZZV);
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der Freibetraege (Versorgungsfreibetrag und
    //		Altersentlastungsbetrag

    //		Änderung ab VAZ 2008: MRE4 PAP2008
    /** ************************************************************************* */
    this.BerechneFreibetraegeAb2008 = function () {
      var dVBEZB = 0.0; // Bemessungsgrundlage für den Versorgungsfreibetrag in
      // Cent
      var dZMVB = 12; // Zahl der Monate, für die Versorgungsbezüge gezahlt werden
      // (nur
      // erforderlich bei Jahresberechnung (LZZ = 1)
      var dVBEZS = 0.0; // Voraussichtliche Sonderzahlungen von
      // Versorgungsbezügen im
      // Kalenderjahr des Versorgungsbeginns bei
      // Versorgungsempfängern
      // ohne Sterbegeld, Kapitalauszahlungen/Abfindungen in
      // Cent
      var dHFVB = 0.0; // Maßgeblicher maximaler Versorgungsfreibetrag in €

      var dVBEZBSO = 0.0; // Bemessungsgrundlage für den Versorgungsfreibetrag in
      // Cent für
      // den sonstigen Bezug
      var dHFVBZSO = 0.0; // maßgeblicher maximaler Zuschlag zum
      // Versorgungsfreibetrag in €,
      // Cent (2 Dezimalstellen) für die Berechnung der
      // Lohnsteuer beim
      // sonstigen Bezug

      var dHFVBZ = 0.0; // Maßgeblicher maximaler Zuschlag zum
      // Versorgungsfreibetrag in €,
      // Cent (2 Dezimalstellen)

      var J = this.m_iVersorgungsbeginnIdx; // Nummer der Tabellenwerte für
      // Versorgungsparameter


      if (this.m_dZVBEZJ == 0.0 || this.m_iVersorgungsbeginnIdx < 0) {
        this.m_dFVBZ = 0.0;
        this.m_dFVB = 0.0;
        this.m_dFVBZSO = 0.0;
        this.m_dFVBSO = 0.0;
      }
      else {
        if (this.m_iLZZ == LZZ_JAEHRLICH) {
          dVBEZB = this.m_dVBEZM * dZMVB + dVBEZS;
          dHFVB = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intHoechstbetrag /* TAB2 */ / 12 * dZMVB;
          this.m_dFVBZ = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intZuschlag /* TAB3 */ / 12 * dZMVB;
          this.m_dFVBZ = Runde(this.m_dFVBZ, 0, true);
        }
        else {
          dVBEZB = this.m_dVBEZM * 12 + dVBEZS;
          dHFVB = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intHoechstbetrag /* TAB2 */ ;
          this.m_dFVBZ = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intZuschlag /* TAB3 */ ;
        }
        this.m_dFVB = dVBEZB * VersFreiBetrag[this.m_iVersorgungsbeginnIdx].dblSatz /* TAB1 */ ;
        this.m_dFVB = Runde(this.m_dFVB, 2, true);

        if (this.m_dFVB > dHFVB) {
          this.m_dFVB = dHFVB;
        }

        dVBEZBSO = this.m_dSTERBE + this.m_dVKAPA;
        this.m_dFVBSO = this.m_dFVB + dVBEZBSO * VersFreiBetrag[this.m_iVersorgungsbeginnIdx].dblSatz /* TAB1 */ ;
        this.m_dFVBSO = Runde(this.m_dFVBSO, 2, true);

        if (this.m_dFVBSO > VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intHoechstbetrag /* TAB2 */ ) {
          this.m_dFVBSO = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intHoechstbetrag /* TAB2 */ ;
        }
        dHFVBZSO = (dVBEZB + dVBEZBSO) - this.m_dFVBSO;

        if (VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intZuschlag /* TAB3 */ > dHFVBZSO) {
          this.m_dFVBZSO = dHFVBZSO;
          this.m_dFVBZSO = Runde(this.m_dFVBZSO, 0, true);
        }
        else {
          this.m_dFVBZSO = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intZuschlag /* TAB3 */ ;
        }
        dHFVBZ = dVBEZB - this.m_dFVB;
        if (this.m_dFVBZ > dHFVBZ) {
          this.m_dFVBZ = dHFVBZ;
          this.m_dFVBZ = Runde(this.m_dFVBZ, 0, true);
        }
      }
      this.MRE4ALTE();
    };


    /** ************************************************************************* */
    //		Beschreibung: Berechnung der Freibetraege (Versorgungsfreibetrag und
    //		Altersentlastungsbetrag

    //		Änderung ab VAZ 2008: MRE4 PAP2009
    /** ************************************************************************* */
    this.BerechneFreibetraegeAb2009 = function () {
      var dVBEZB = 0.0; // Bemessungsgrundlage für den Versorgungsfreibetrag in
      // Cent
      var dZMVB = 12; // Zahl der Monate, für die Versorgungsbezüge gezahlt werden
      // (nur
      // erforderlich bei Jahresberechnung (LZZ = 1)
      var dVBEZS = 0.0; // Voraussichtliche Sonderzahlungen von
      // Versorgungsbezügen im
      // Kalenderjahr des Versorgungsbeginns bei Versorgungsempfängern
      // ohne Sterbegeld, Kapitalauszahlungen/Abfindungen in Cent
      var dHFVB = 0.0; // Maßgeblicher maximaler Versorgungsfreibetrag in €

      var dVBEZBSO = 0.0; // Bemessungsgrundlage für den Versorgungsfreibetrag in
      // Cent für
      // den sonstigen Bezug
      var dHFVBZSO = 0.0; // maßgeblicher maximaler Zuschlag zum
      // Versorgungsfreibetrag in €,
      // Cent (2 Dezimalstellen) für die Berechnung der Lohnsteuer beim
      // sonstigen Bezug

      var dHFVBZ = 0.0; // Maßgeblicher maximaler Zuschlag zum
      // Versorgungsfreibetrag in €,
      // Cent (2 Dezimalstellen)

      var J = this.m_iVersorgungsbeginnIdx; // Nummer der Tabellenwerte für
      // Versorgungsparameter


      if (this.m_dZVBEZJ == 0.0 || this.m_iVersorgungsbeginnIdx < 0) {
        this.m_dFVBZ = 0.0;
        this.m_dFVB = 0.0;
        this.m_dFVBZSO = 0.0;
        this.m_dFVBSO = 0.0;

      }
      else {

        if (this.m_iLZZ == LZZ_JAEHRLICH) {
          dVBEZB = this.m_dVBEZM * dZMVB + dVBEZS;
          dHFVB = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intHoechstbetrag /* TAB2 */ / 12 * dZMVB;
          this.m_dFVBZ = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intZuschlag /* TAB3 */ / 12 * dZMVB;
          this.m_dFVBZ = Runde(this.m_dFVBZ, 0, true);
        }
        else {
          dVBEZB = this.m_dVBEZM * 12 + dVBEZS;
          dHFVB = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intHoechstbetrag /* TAB2 */ ;
          this.m_dFVBZ = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intZuschlag /* TAB3 */ ;
          this.m_dFVBZ = Runde(this.m_dFVBZ, 0, true);
        }
        this.m_dFVB = dVBEZB * VersFreiBetrag[this.m_iVersorgungsbeginnIdx].dblSatz /* TAB1 */ ;
        this.m_dFVB = Runde(this.m_dFVB, 2, true);

        if (this.m_dFVB > dHFVB) {
          this.m_dFVB = dHFVB;
        }

        this.m_dFVBSO = this.m_dFVB + dVBEZBSO * VersFreiBetrag[this.m_iVersorgungsbeginnIdx].dblSatz /* TAB1 */ ;
        this.m_dFVBSO = Runde(this.m_dFVBSO, 2, true);

        if (this.m_dFVBSO > VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intHoechstbetrag /* TAB2 */ ) {
          this.m_dFVBSO = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intHoechstbetrag /* TAB2 */ ;
        }
        dHFVBZSO = (dVBEZB + dVBEZBSO) - this.m_dFVBSO;
        this.m_dFVBZSO = this.m_dFVBZ + dVBEZBSO;
        this.m_dFVBZSO = Runde(this.m_dFVBZSO, 0, true);

        if (this.m_dFVBZSO > dHFVBZSO) {
          this.m_dFVBZSO = dHFVBZSO;
          this.m_dFVBZSO = Runde(this.m_dFVBZSO, 0, true);
        }
        if (this.m_dFVBZSO > VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intZuschlag /* TAB3 */ ) {
          this.m_dFVBZSO = VersFreiBetrag[this.m_iVersorgungsbeginnIdx].intZuschlag /* TAB3 */ ;
        }
        dHFVBZ = dVBEZB - this.m_dFVB;
        if (this.m_dFVBZ > dHFVBZ) {
          this.m_dFVBZ = dHFVBZ;
          this.m_dFVBZ = Runde(this.m_dFVBZ, 0, true);
        }
      }
      this.MRE4ALTE();
    };

    /** ************************************************************************* */
    //		Beschreibung: Ermittlung des Jahreslohns und der Unter- und Obergrenze der
    //		entsprechenden Tabellenstufe

    //		Ab VAZ 2004 keine Unter- und Obergrenzen mehr!!! Die vorhandenen Parameter
    //		dJTabelleUnten/dJTabelleOben werden ab 2004 für ZRE4 (bisher Untergrenze) und
    //		ZRE4VP (bisher Obergrenze) weiterverwendet (vgl. Programmablaufplan des
    //		BMFIN ab 2004, Modul MRE4)

    /** ************************************************************************* */

    this.BerechneMassgeblichenArbeitslohn = function (dRE4LZZ, dRE4LZZV, dZRE4, dZRE4VP) {
      // double dZRE4=0.0;
      // double dZRE4VP=0.0;
      switch (this.m_iLZZ) {
      case LZZ_JAEHRLICH:
        switch (this.m_iVeranlagungsjahr) {
        case 2002:
        case 2003:
        case 2004:
          dZRE4 = dRE4LZZ / 100;
          dZRE4VP = dRE4LZZV / 100;
          break;
        case 2006: // !!! ohne BREAK zum Durchfallen
        case 2007:
        case 2008:
        default: // damit wird immer Vorjahr genommen
          m_dZVBEZ = this.m_dVBEZ - this.m_dFVB;

        case 2005:
          dZRE4 = Runde(dRE4LZZ / 100, 0, false);
          dZRE4VP = Runde(dRE4LZZV / 100, 0, false);
          break;
        }
        break;
      case LZZ_MONATLICH:
        switch (this.m_iVeranlagungsjahr) {
        case 2006:
        case 2007:
        case 2008:
        default: // damit wird immer Vorjahr genommen
          m_dZVBEZ = Runde((this.m_dVBEZ - this.m_dFVB + 0.0067) * 12, 2, false);

        case 2005:
          dZRE4 = Runde((dRE4LZZ + 0.67) * 0.12, 0, false);
          dZRE4VP = Runde((dRE4LZZV + 0.67) * 0.12, 0, false);
          break;
        }
        break;
      case LZZ_WOECHENTLICH:
        switch (this.m_iVeranlagungsjahr) {
        case 2006:
        case 2007:
        case 2008:
        default: // damit wird immer Vorjahr genommen
          m_dZVBEZ = Runde((this.m_dVBEZ - this.m_dFVB + 0.0089) * 360 / 7, 2, false);
        case 2005:
          dZRE4 = Runde((dRE4LZZ + 0.89) * 3.60 / 7.0, 0, false);
          dZRE4VP = Runde((dRE4LZZV + 0.89) * 3.60 / 7.0, 0, false);
          break;
        }
        break;
      case LZZ_TAEGLICH:
        switch (this.m_iVeranlagungsjahr) {
        case 2006:
        case 2007:
        case 2008:
        default: // damit wird immer Vorjahr genommen
          m_dZVBEZ = Runde((this.m_dVBEZ - this.m_dFVB + 0.0056) * 360, 2, false);
        case 2005:
          dZRE4 = Runde((dRE4LZZ + 0.56) * 3.6, 0, false);
          dZRE4VP = Runde((dRE4LZZV + 0.56) * 3.6, 0, false);
          break;
        }
        break;
      default:
        break;
      }

      switch (this.m_iVeranlagungsjahr) {
      case 2007:
      case 2008:
      default: // damit wird immer Vorjahr genommen
        if (dRE4LZZ < 0)
          dZRE4 = 0;
        if (dRE4LZZV < 0)
          dZRE4VP = 0;

        if (this.m_dVBEZ == 0) {
          if (this.m_dFVB == 0)
            m_dZVBEZ = 0;
        }
        else {
          if (this.m_dVBEZ - this.m_dFVB < 0)
            m_dZVBEZ = 0;
        }
        break;

      case 2005:
      case 2006:
        if (dZRE4 < 0.0)
          dZRE4 = 0.0;

        if (m_dZVBEZ < 0.0)
          m_dZVBEZ = 0.0;
        break;
      }

      var lUnten = 0,
        lOben = 0;
      switch (this.m_iVeranlagungsjahr) {
      case 2002:
      case 2003:
        lUnten = Rund36(dZRE4);
        lOben = Rund36(dZRE4VP);
        lOben += 35;
        break;

      case 2004:
      case 2005:
      case 2006:
      case 2007:
      case 2008:
      default: // damit wird immer Vorjahr genommen
        lUnten = dZRE4;
        lOben = dZRE4VP;
        break;
      }

      dZRE4 = lUnten;
      dZRE4VP = lOben;

      if (this.m_iVeranlagungsjahr <= 2003) {
        var dTabUnten = this.UpAnteil(lUnten * 100, false);
        m_bnErgebnis.setTabellenUnten(dTabUnten / 100.0);
        var iJTW = new Array(3599, 299, 69, 9);

        var dTabOben = dTabUnten + (iJTW[this.m_iLZZ - 1]);
        m_bnErgebnis.setTabellenOben(dTabOben / 100.0);
      }

      return new Array(dZRE4, dZRE4VP);
    };

    /** ************************************************************************* */
    //		Beschreibung: Ermittlung der festen Tabellenfreibetraege

    /** ************************************************************************* */

    this.BerechneTabellenFreibetraege = function (iHFB, iANP, iSAP, iKFB, dKinderfreibetrag) {
      var iArbeitnehmerPausch = 0;
      var iSonderausgabenPausch = iSAP;
      var iHaushaltsfreibetrag = 0;
      dKinderfreibetrag = this.m_fKinder * iKFB;

      m_iKennzahlTabellenart = 1;

      var dFestenTabellenfreibetraege = 0.0;

      switch (this.m_iVeranlagungsjahr) {
      case 2002:
      case 2003:
      case 2004:
        iArbeitnehmerPausch = iANP;
        switch (this.m_iSteuerklasse) {
        case STEUERKLASSE_I:
          dKinderfreibetrag *= 2;
          break;
        case STEUERKLASSE_II:
          dKinderfreibetrag *= 2;
          iHaushaltsfreibetrag = iHFB;
          break;
        case STEUERKLASSE_III:
          iSonderausgabenPausch *= 2;
          dKinderfreibetrag *= 2;
          m_iKennzahlTabellenart = 2;
          break;
        case STEUERKLASSE_IV:
          break;
        case STEUERKLASSE_V:
          dKinderfreibetrag = 0.0;
          iSonderausgabenPausch = 0;
          break;
        case STEUERKLASSE_VI:
          dKinderfreibetrag = 0.0;
          iArbeitnehmerPausch = 0;
          iSonderausgabenPausch = 0;
          break;
        default:
          iArbeitnehmerPausch = 0;
          dKinderfreibetrag = 0.0;
          iSonderausgabenPausch = 0;
        }
        dFestenTabellenfreibetraege = (iHaushaltsfreibetrag +
          iArbeitnehmerPausch +
          iSonderausgabenPausch);
        break;
      case 2005:
        if (this.m_iSteuerklasse < 6) {
          if (this.m_dVBEZ > 0)
            iArbeitnehmerPausch = 102;
          if (this.m_dRE4 > this.m_dVBEZ)
            iArbeitnehmerPausch += iANP;
        }
        else
          iArbeitnehmerPausch = 0;

        switch (this.m_iSteuerklasse) {
        case STEUERKLASSE_I:
          dKinderfreibetrag *= 2;
          break;
        case STEUERKLASSE_II:
          dKinderfreibetrag *= 2;
          iHaushaltsfreibetrag = iHFB;
          break;
        case STEUERKLASSE_III:
          m_iKennzahlTabellenart = 2;
          iSonderausgabenPausch *= 2;
          dKinderfreibetrag *= 2;
          break;
        case STEUERKLASSE_IV:
          break;
        default:
          dKinderfreibetrag = 0.0;
          iSonderausgabenPausch = 0;
          break;
        }
        dFestenTabellenfreibetraege = (iHaushaltsfreibetrag +
          iArbeitnehmerPausch +
          iSonderausgabenPausch +
          this.m_dFVBZ);
        break;

      }
      return new Array(dFestenTabellenfreibetraege, dKinderfreibetrag);
    };

    /** ************************************************************************* */
    //		Beschreibung: Ermittlung der festen Tabellenfreibetraege ab VAZ 2006
    //		(MZTABFB)
    //		(iANP derzeit nicht in Benutzung, ev. wenn weitere VAZ in Funktion integriert
    //		werden)

    /** ************************************************************************* */
    this.BerechneTabellenFreibetraegeAb2006 = function (iHFB, iANP, iSAP, iKFB, dKinderfreibetrag, dZRE4) {
      // UNREFERENCED_PARAMETER(iANP);

      var iArbeitnehmerPausch = 0;
      var iSonderausgabenPausch = iSAP;
      var iHaushaltsfreibetrag = 0;
      var dWerbungskostenPausch = 920.0;

      dKinderfreibetrag = this.m_fKinder * iKFB;

      m_iKennzahlTabellenart = 1;

      var dFestenTabellenfreibetraege = 0.0;

      switch (this.m_iVeranlagungsjahr) {
      case 2005:
      case 2006:
        if (m_dZVBEZ > 0) {
          if (m_dZVBEZ < this.m_dFVBZ)
            this.m_dFVBZ = m_dZVBEZ;
        }
        break;

      case 2007:
      case 2008:
      case 2009:
      case 2010:
        if (m_dZVBEZ >= 0) {
          if (m_dZVBEZ < this.m_dFVBZ)
            this.m_dFVBZ = m_dZVBEZ;
        }
        break;

      case 2011:
        if (m_dZVBEZ >= 0) {
          if (m_dZVBEZ < this.m_dFVBZ)
            this.m_dFVBZ = m_dZVBEZ;
        }
        switch (this.m_iLZZ) {
        case LZZ_JAEHRLICH:
          dWerbungskostenPausch = 1000.0;
          break;
        case LZZ_MONATLICH:
          break;
        case LZZ_WOECHENTLICH:
          break;
        case LZZ_TAEGLICH:
          break;
        default:
          break;
        }
        break;

      case 2012:
      default: // damit wird immer Vorjahr genommen
        if (m_dZVBEZ >= 0) {
          if (m_dZVBEZ < this.m_dFVBZ)
            this.m_dFVBZ = m_dZVBEZ;
        }
        dWerbungskostenPausch = 1000.0;
        break;
      }

      if (this.m_iSteuerklasse < 6) {
        if (m_dZVBEZ > 0) {
          if ((m_dZVBEZ - this.m_dFVBZ) < 102)
            iArbeitnehmerPausch = (m_dZVBEZ - this.m_dFVBZ);
          else
            iArbeitnehmerPausch = 102;
        }

        if (dZRE4 > m_dZVBEZ) {

          if ((dZRE4 - m_dZVBEZ) < dWerbungskostenPausch)
          // ab 2009 aufrunden auf volle Euro lassen wir aber weg
          // da max Differenz von 1 Euro
            iArbeitnehmerPausch += (dZRE4 - m_dZVBEZ);
          else
            iArbeitnehmerPausch += dWerbungskostenPausch;
        }
      }
      else {
        // neu ab 2008
        this.m_dFVBZ = 0.0;
        this.m_dFVBZSO = 0.0;
      }

      switch (this.m_iSteuerklasse) {
      case STEUERKLASSE_I:
        dKinderfreibetrag *= 2;
        break;
      case STEUERKLASSE_II:
        dKinderfreibetrag *= 2;
        iHaushaltsfreibetrag = iHFB;
        break;
      case STEUERKLASSE_III:
        m_iKennzahlTabellenart = 2;
        iSonderausgabenPausch = iSAP * 2;
        if (this.m_iVeranlagungsjahr >= 2010) {
          iSonderausgabenPausch = iSAP;
        }
        dKinderfreibetrag *= 2;
        break;
      case STEUERKLASSE_IV:
        break;

      case STEUERKLASSE_V:
        iSonderausgabenPausch = 0; // Korrektur vor 2010
        if (this.m_iVeranlagungsjahr >= 2010) {
          iSonderausgabenPausch = iSAP;
        }
        break;
      default:
        dKinderfreibetrag = 0.0;
        iSonderausgabenPausch = 0;
        break;
      }
      dFestenTabellenfreibetraege = (iHaushaltsfreibetrag +
        iArbeitnehmerPausch +
        iSonderausgabenPausch +
        this.m_dFVBZ);
      return new Array(dFestenTabellenfreibetraege, dKinderfreibetrag);
    };

    /** ************************************************************************* */
    //		Beschreibung: Entsprechung zu MLSTJAHR im PAP des BMFIN

    //		Ab VAZ 2004 werden die Parameter/Variablen dJTabelleUnten bzw. dJTabelleOben
    //		für die dann geltenden ZRE4 (dJTabelleUnten) und ZRE4VP (dJTabelleOben)
    //		verwendet!

    /** ************************************************************************* */

    this.BerechneLohnsteuer = function (iFakVSPVOR, iFakVSPMAX1, iFakVSPMAX2, iFakVSPKURZ, dZRE4, dZRE4VP, dFestenTabellenfreibetrag) {
      var dVorsorgepauschale = 0.0;
      var dX = 0.0;
      var dTarif = 0;
      if (this.m_iSteuerklasse < STEUERKLASSE_V) {
        switch (this.m_iVeranlagungsjahr) {
        case 2002:
        case 2003:
        case 2004:
          dVorsorgepauschale = this.ErmittleVorsorgepauschale(iFakVSPVOR, iFakVSPMAX1, iFakVSPMAX2, iFakVSPKURZ, dZRE4VP);
          break;
        case 2005:
        case 2006:
        case 2007:
        case 2008:
        default: // damit wird immer Vorjahr genommen
          dVorsorgepauschale = this.ErmittleVorsorgepauschaleErweitert(iFakVSPVOR, iFakVSPMAX1, iFakVSPMAX2, iFakVSPKURZ, dZRE4VP);
          break;
        }
      }
      else {
        if (this.m_iVeranlagungsjahr >= 2010) {
          dVorsorgepauschale = this.ErmittleVorsorgepauschaleErweitert(iFakVSPVOR, iFakVSPMAX1, iFakVSPMAX2, iFakVSPKURZ, dZRE4VP);
        }

        // throw "dVorsorgepauschale=["+dVorsorgepauschale+"]";
      }
      var dZuVersteuerndesEinkommen = dZRE4 - dFestenTabellenfreibetrag - dVorsorgepauschale;

      // generell keine Berechnung für mehrjährige Tätigkeiten

      switch (this.m_iVeranlagungsjahr) {
      case 2002:
      case 2003:
        if (dZuVersteuerndesEinkommen < 36)
          dZuVersteuerndesEinkommen = 0;
        else {
          var dRund = dZuVersteuerndesEinkommen / m_iKennzahlTabellenart;
          dX = Rund36(dRund) + 18;
        }
        break;
      case 2004:
      case 2005:
      case 2006:
      case 2007:
      case 2008:
      default: // damit wird immer Vorjahr genommen
        if (dZuVersteuerndesEinkommen < 1)
          dZuVersteuerndesEinkommen = 0;
        else {
          var dRund = dZuVersteuerndesEinkommen / m_iKennzahlTabellenart;
          dX = Runde(dRund, 0, false);
        }
        break;
      }
      if (this.m_iSteuerklasse < STEUERKLASSE_V) {
        // Berechnung der Tariflichen Einkommensteuer
        dTarif = this.BerechneTariflicheEinkommensteuer(dX);
      }
      else {
        dTarif = this.BerechneLohnsteuerV_VI(dX);
      }
      return dTarif;
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der Vorsorgepauschale nach dem erweiterten Verfahren
    //		ab VAZ2005
    //		PAP UPEVP

    /** ************************************************************************* */
    this.ErmittleVorsorgepauschaleErweitert = function (iFakVSPVOR, iFakVSPMAX1, iFakVSPMAX2, iFakVSPKURZ, dZRE4VP) {
      var dVSP1 = 0.0;
      var dVSP2 = 0.0;
      var dVSPN = 0.0; // Vorsorgepauschale nach Alterseinkünftegesetz in €,
      // Cent (2 Dezimalstellen)
      var dVHB = 0.0; // Vorsorgepauschale in €, Cent (2 Dezimalstellen)

      if (this.m_iRentenversicherungsfrei > 0) {
        dVSP1 = 0.0;
      }
      else {
        // TODO jährlich Anpassung nötig
        switch (this.m_iVeranlagungsjahr) {
        case 2005:
          if (dZRE4VP > 62400)
            dZRE4VP = 62400;
          dVSP1 = dZRE4VP * 0.2;
          dVSP1 *= 0.0975;
          break;
        case 2006:
          if (dZRE4VP > 63000)
            dZRE4VP = 63000;
          dVSP1 = dZRE4VP * 0.24;
          dVSP1 *= 0.0975;
          break;
        case 2007:
          if (dZRE4VP > 63000)
            dZRE4VP = 63000;
          dVSP1 = dZRE4VP * 0.28;
          dVSP1 *= 0.0995;
          break;
        case 2008:
          if (dZRE4VP > GetWert(this.m_iVeranlagungsjahr, SVW_BBG_RVAV_WEST))
            dZRE4VP = GetWert(this.m_iVeranlagungsjahr, SVW_BBG_RVAV_WEST);
          dVSP1 = dZRE4VP * 0.32;
          dVSP1 *= 0.0995;
          break;
        case 2009:
          if (dZRE4VP > GetWert(this.m_iVeranlagungsjahr, SVW_BBG_RVAV_WEST))
            dZRE4VP = GetWert(this.m_iVeranlagungsjahr, SVW_BBG_RVAV_WEST);
          dVSP1 = dZRE4VP * 0.36;
          dVSP1 *= 0.0995;
          break;
        case 2010:
        default: // damit wird immer Vorjahr genommen

          if (this.m_bRechtskreisOst) {
            if (dZRE4VP > GetWert(this.m_iVeranlagungsjahr, SVW_BBG_RVAV_OST))
              dZRE4VP = GetWert(this.m_iVeranlagungsjahr, SVW_BBG_RVAV_OST);
          }
          else {
            if (dZRE4VP > GetWert(this.m_iVeranlagungsjahr, SVW_BBG_RVAV_WEST))
              dZRE4VP = GetWert(this.m_iVeranlagungsjahr, SVW_BBG_RVAV_WEST);
          }
          // dieser Faktor <---> wird jedes Jahr um 0.04 erhöht, ab sofort
          // keine Anpassung mehr nötig
          var faktor = (0.4 + ((this.m_iVeranlagungsjahr - 2010) * 0.04));
          dVSP1 = dZRE4VP * faktor;
          // dVSP1 *= 0.0995;
          dVSP1 *= (GetWert(this.m_iVeranlagungsjahr, SVW_AN_SATZ_RV) / 100.0);
          break;
        }
      }

      dVSP2 = dZRE4VP * 0.11;

      if (this.m_iVeranlagungsjahr >= 2010) {
        dVSP2 = dZRE4VP * 0.12;

        if (this.m_iSteuerklasse == STEUERKLASSE_III) {
          dVHB = 3000;
        }
        else {
          dVHB = 1900;
        }
      }
      else {
        dVHB = 1500 * m_iKennzahlTabellenart;
      }

      if (dVSP2 > dVHB)
        dVSP2 = dVHB;

      dVSPN = Runde(dVSP1 + dVSP2, 0, true);

      var dVSP = 0;
      if (this.m_iVeranlagungsjahr >= 2010) {
        dVSP = this.ErmittleVorsorgepauschaleAb2010(dZRE4VP, dVSP1);
      }
      else {
        dVSP = this.ErmittleVorsorgepauschale(iFakVSPVOR, iFakVSPMAX1, iFakVSPMAX2, iFakVSPKURZ, dZRE4VP);
      }

      // throw "dVSP=["+dVSP+"] dVSPN=["+dVSPN+"]";

      if (dVSPN > dVSP)
        dVSP = dVSPN;

      // throw "dVSP=["+dVSP+"] ";

      return dVSP;
    };
    //		MVSP ab 2010
    this.ErmittleVorsorgepauschaleAb2010 = function (dZRE4VP, dVSP1) {
      var dVSP = 0;
      // TODO KOnstanten durch Parameter ersetzen
      var kvsatzag, pvsatzag;
      var kvsatzan, pvsatzan;


      var dPKPV = 0;
      // Dem Arbeitgeber mitgeteilte Zahlungen des Arbeitnehmers zur privaten
      // Kranken- bzw. Pflegeversicherung im
      // Sinne des § 10 Abs. 1 Nr. 3 EStG 2010 als Monatsbetrag in Cent (Der Wert
      // ist unabhängig vom
      // Lohnzahlungszeitraum immer als Monats-betrag anzugeben)


      var privKVPV = 0;

      switch (this.m_iLZZ) {
      case LZZ_JAEHRLICH:
        privKVPV = this.m_dBeitragPrivateKV;
        break;
      case LZZ_MONATLICH:
        privKVPV = this.m_dBeitragPrivateKV * 12;
        break;
      case LZZ_WOECHENTLICH:
        privKVPV = this.m_dBeitragPrivateKV * 52;
        break;
      case LZZ_TAEGLICH:
        privKVPV = this.m_dBeitragPrivateKV * 365;
        break;
      default:
        return 0;
      }

      // if(this.m_dBeitragPrivatePV > 0.0)
      // dPKPV += this.m_dBeitragPrivatePV;
      if (this.m_dBeitragPrivateKV > 0.0)
        dPKPV += privKVPV;

      // throw dPKPV;

      if (dZRE4VP > GetWert(this.m_iVeranlagungsjahr, SVW_BBG_KVPV_WEST)) {
        dZRE4VP = GetWert(this.m_iVeranlagungsjahr, SVW_BBG_KVPV_WEST);
      }
      if (this.m_iPKV > 0) // Privat versichert
      {
        if (this.m_iSteuerklasse == STEUERKLASSE_VI) {
          dVSP = 0;
        }
        else {
          dVSP = dPKPV; // es wird immer angenommen das PV/KV-Beiträge als
          // Jahresbeträge erfasst werden

          // throw "dVSP = dPKPV=["+dVSP+"]";

          if (this.m_iPKV == 2) // privat krankenversicherte Arbeitnehmer
          // mit Arbeitgeberzuschuss
          {
            // ermäßigter Beitragssatz des Arbeitgebers zur
            // Krankenversicherung
            kvsatzag = GetWert(this.m_iVeranlagungsjahr, SVW_AG_SATZ_KV) / 100.0;

            if (this.m_iPVS == true) {
              pvsatzag = 0.00475; // nicht erfaßbar
            }
            else {
              pvsatzag = 0.00975; // nicht erfaßbar
            }

            dVSP = dVSP - dZRE4VP * (kvsatzag + pvsatzag);
          }
        }
      }
      else // gesetzlich versichert
      {

        this.m_dBeitragssatzPV = this.m_dBeitragssatzPV_merker;

        kvsatzan = GetWert(this.m_iVeranlagungsjahr, SVW_AN_SATZ_KV) / 100.0; // ermäßigter
        // Beitragssatz
        // des
        // Arbeitnehmers
        // zur
        // Krankenversicherung

        if (this.m_iPVS == true) {
          pvsatzan = (this.m_dBeitragssatzPV + 0.5) / 100; // erfaßbar

          this.m_dBeitragssatzPV += 0.5;

        }
        else {
          pvsatzan = (this.m_dBeitragssatzPV / 100); // erfaßbar

        }

        if (this.zuschlagPV && this.m_iSteuerklasse != 2) {
          pvsatzan = pvsatzan + 0.0025;
        }

        dVSP = dZRE4VP * (kvsatzan + pvsatzan);
      }



      dVSP = Runde(dVSP + dVSP1, 0, true);
      // throw "dVSP=["+dVSP+"] dVSP1=["+dVSP1+"]";
      // throw "dVSP=["+dVSP+"]";
      return dVSP;
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der Vorsorgepauschale

    //		ab VAZ 2004 wird der Parameter dJTabelleOben für ZRE4VP verwendet (vgl.
    //		PAP des BMFIN, Modul MVSP)

    /** ************************************************************************* */

    this.ErmittleVorsorgepauschale = function (iFakVSPVOR, iFakVSPMAX1, iFakVSPMAX2, iFakVSPKURZ, dZRE4VP) {
      var dVorsorgeVor = dZRE4VP * 0.2; //
      var dVorsorgeHoechst = (iFakVSPVOR * m_iKennzahlTabellenart); // VSPVOR
      var dVorsorgeMax1 = (iFakVSPMAX1 * m_iKennzahlTabellenart);
      var dVorsorgeMax2 = (iFakVSPMAX2 * m_iKennzahlTabellenart);
      var dVorsorgeKurz = (iFakVSPKURZ * m_iKennzahlTabellenart);
      var dVorsorgepauschale = 0.0;

      if (this.m_iRentenversicherungsfrei == 1) {
        if (dVorsorgeVor > dVorsorgeKurz)
          dVorsorgepauschale = dVorsorgeKurz;
        else {
          switch (this.m_iVeranlagungsjahr) {
          case 2002:
          case 2003:
            dVorsorgepauschale = dVorsorgeVor;
            break;
          case 2004:
            dVorsorgepauschale = Runde(dVorsorgeVor, 0, false);
          case 2005:
          case 2006:
          case 2007:
          case 2008:
          default: // damit wird immer Vorjahr genommen
            dVorsorgepauschale = Runde(dVorsorgeVor, 0, true);
            break;
          }
        }
      }
      else {
        // PAP UMVSP Beginn
        // Berechnung der Vorsorgepauschale für die allgemeine Lohnsteuertabelle
        dVorsorgeHoechst -= dZRE4VP * 0.16;
        if (dVorsorgeHoechst < 0)
          dVorsorgeHoechst = 0.0;

        if (dVorsorgeVor > dVorsorgeHoechst) {
          dVorsorgepauschale = dVorsorgeHoechst;
          var dVorsorgeRest = dVorsorgeVor - dVorsorgeHoechst;

          if (dVorsorgeRest > dVorsorgeMax1) {
            dVorsorgepauschale += dVorsorgeMax1;
            dVorsorgeRest = Runde((dVorsorgeRest - dVorsorgeMax1) / 2.0, 2, true);

            if (dVorsorgeRest > dVorsorgeMax2)
              dVorsorgepauschale += dVorsorgeMax2;
            else
              dVorsorgepauschale += dVorsorgeRest;

          }
          else {
            dVorsorgepauschale += dVorsorgeRest;
          }
        }
        else
          dVorsorgepauschale = dVorsorgeVor;

        if (this.m_iVeranlagungsjahr == 2004)
          dVorsorgepauschale = Runde(dVorsorgepauschale, 0, false);
        else if (this.m_iVeranlagungsjahr == 2005 || this.m_iVeranlagungsjahr == 2006)
          dVorsorgepauschale = Runde(dVorsorgepauschale, 0, true);
        else // ab VJ 2007
          dVorsorgepauschale = Runde(dVorsorgepauschale, 0, false);
        // PAP UMVSP Ende
      }

      if (this.m_iVeranlagungsjahr <= 2003) {
        var lVorsorge = (dVorsorgepauschale / 36) * 36;
        dVorsorgepauschale = lVorsorge;
      }
      return dVorsorgepauschale;
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der TariflichenEinkommensteuer

    /** ************************************************************************* */

    this.BerechneTariflicheEinkommensteuer = function (dX) {
      switch (this.m_iVeranlagungsjahr) {
      case 2002:
      case 2003:
        return this.BerechneTariflicheEinkommensteuer_2002(dX);
        break;

      case 2004:
        return this.BerechneTariflicheEinkommensteuer_2004(dX);
        break;

      case 2005:
      case 2006:
        return this.BerechneTariflicheEinkommensteuer_2005(dX);
        break;

      case 2007:
        return this.BerechneTariflicheEinkommensteuer_2007(dX);
        break;

      case 2008:
        return this.BerechneTariflicheEinkommensteuer_2008(dX);
        break;
      case 2009:
        return this.BerechneTariflicheEinkommensteuer_2009(dX);
        break;
      case 2010:
      default: // damit wird immer Vorjahr genommen
        return this.BerechneTariflicheEinkommensteuer_2010(dX);
        break;
      }


    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der TariflichenEinkommensteuer fuer 2002

    /** ************************************************************************* */

    this.BerechneTariflicheEinkommensteuer_2002 = function (dX) {
      var Bereich1 = 7235.0;
      var Bereich2 = 9251.0;
      var Bereich3 = 55007.0;

      var dTarif = 0.0;

      if (dX <= Bereich1)
        dTarif = 0.0;
      else if (dX <= Bereich2) {
        var dY = (dX - 7200.0) / 10000.0;
        var dRW = Runde(dY * 768.85, 3, false);
        dRW += 1990;
        dTarif = Runde(dRW * dY, 0, false);
      }
      else if (dX <= Bereich3) {
        var dY = (dX - 9216) / 10000;
        var dRW = Runde(dY * 278.65, 3, false);
        dRW += 2300;
        dRW = Runde(dY * dRW, 3, false);
        dTarif = Runde(dRW + 432, 0, false);
      }
      else {
        dTarif = Runde(dX * 0.485 - 9872, 0, false);
      }
      dTarif *= m_iKennzahlTabellenart;
      return dTarif;
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der TariflichenEinkommensteuer fuer 2004

    /** ************************************************************************* */

    this.BerechneTariflicheEinkommensteuer_2004 = function (dX) {
      var Bereich1 = 7665.0;
      var Bereich2 = 12740.0;
      var Bereich3 = 52152.0;

      var dTarif = 0.0;

      if (dX < Bereich1)
        dTarif = 0.0;
      else if (dX < Bereich2) {
        var dY = (dX - 7664.0) / 10000.0;
        var dRW = dY * 793.1;
        dRW += 1600;
        dTarif = Runde(dRW * dY, 0, false);
      }
      else if (dX < Bereich3) {
        var dY = (dX - 12739) / 10000;
        var dRW = dY * 265.78;
        dRW += 2405;
        dRW = dY * dRW;
        dTarif = Runde(dRW + 1016, 0, false);
      }
      else {
        dTarif = Runde(dX * 0.45 - 8845, 0, false);
      }
      dTarif *= m_iKennzahlTabellenart;
      return dTarif;
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der TariflichenEinkommensteuer fuer 2005

    /** ************************************************************************* */

    this.BerechneTariflicheEinkommensteuer_2005 = function (dX) {
      var Bereich1 = 7665.0;
      var Bereich2 = 12740.0;
      var Bereich3 = 52152.0;

      var dTarif = 0.0;

      if (dX < Bereich1)
        dTarif = 0.0;
      else if (dX < Bereich2) {
        var dY = (dX - 7664.0) / 10000.0;
        var dRW = dY * 883.74;
        dRW += 1500;
        dTarif = Runde(dRW * dY, 0, false);
      }
      else if (dX < Bereich3) {
        var dY = (dX - 12739) / 10000;
        var dRW = dY * 228.74;
        dRW += 2397;
        dRW = dY * dRW;
        dTarif = Runde(dRW + 989, 0, false);
      }
      else {
        dTarif = Runde(dX * 0.42 - 7914, 0, false);
      }
      dTarif *= m_iKennzahlTabellenart;
      return dTarif;
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der TariflichenEinkommensteuer fuer 2007

    /** ************************************************************************* */

    this.BerechneTariflicheEinkommensteuer_2007 = function (dX) {
      var Bereich1 = 7665.0;
      var Bereich2 = 12740.0;
      var Bereich3 = 52152.0;
      var Bereich4 = 250001.0;

      var dTarif = 0.0;

      if (dX < Bereich1)
        dTarif = 0.0;
      else if (dX < Bereich2) {
        var dY = (dX - 7664.0) / 10000.0;
        var dRW = dY * 883.74;
        dRW += 1500;
        dTarif = Runde(dRW * dY, 0, false);
      }
      else if (dX < Bereich3) {
        var dY = (dX - 12739) / 10000;
        var dRW = dY * 228.74;
        dRW += 2397;
        dRW = dY * dRW;
        dTarif = Runde(dRW + 989, 0, false);
      }
      else if (dX < Bereich4) {
        dTarif = Runde(dX * 0.42 - 7914, 0, false);
      }
      else {
        dTarif = Runde(dX * 0.45 - 15414, 0, false);
      }
      dTarif *= m_iKennzahlTabellenart;
      return dTarif;
    };
    /** ************************************************************************* */
    //		Beschreibung: Berechnung der TariflichenEinkommensteuer fuer 2009

    /** ************************************************************************* */
    this.BerechneTariflicheEinkommensteuer_2009 = function (dX) {
      var Bereich1 = 7835.0;
      var Bereich2 = 13140.0;
      var Bereich3 = 52552.0;
      var Bereich4 = 250401.0;

      var dTarif = 0.0;

      if (dX < Bereich1)
        dTarif = 0.0;
      else if (dX < Bereich2) {
        var dY = (dX - 7834.0) / 10000.0;
        var dRW = dY * 939.68;
        dRW += 1400;
        dTarif = Runde(dRW * dY, 0, false);
      }
      else if (dX < Bereich3) {
        var dY = (dX - 13139) / 10000;
        var dRW = dY * 228.74;
        dRW += 2397;
        dRW = dY * dRW;
        dTarif = Runde(dRW + 1007, 0, false);
      }
      else if (dX < Bereich4) {
        dTarif = Runde(dX * 0.42 - 8064, 0, false);
      }
      else {
        dTarif = Runde(dX * 0.45 - 15576, 0, false);
      }
      dTarif *= m_iKennzahlTabellenart;
      return dTarif;
    };

    this.BerechneTariflicheEinkommensteuer_2010 = function (dX) {
      var returnValue = 0.0;

      try {
        var y;
        var rw;
        var st;

        if (dX < 8005) {
          st = 0.0;
        }
        else if (dX < 13470.0) {
          y = (dX - 8004.0) / 10000.0;
          y = Runde(y, 6, false);
          // rw = down3(y * 883.74);
          rw = y * 912.17; /* SW 25.11.03: PAP 2004 */
          rw = rw + 1400;
          st = Runde(rw * y, 0, false);
          st = st * m_iKennzahlTabellenart;
        }
        else if (dX < 52882.0) {
          y = (dX - 13469) / 10000.0;
          y = Runde(y, 6, false);
          // rw = down3(y * 228.74);
          rw = y * 228.74; /* SW 25.11.03: PAP 2004 */
          rw = rw + 2397;
          // rw=down3(rw * y);
          rw = rw * y; /* SW 25.11.03: PAP 2004 */
          st = Runde(rw + 1038, 0, false);
          st = st * m_iKennzahlTabellenart;
        }
        else if (dX < 250731.0) {
          st = m_iKennzahlTabellenart * Runde(dX * 0.42 - 8172.0, 0, false);
        }
        else {
          st = m_iKennzahlTabellenart * Runde(dX * 0.45 - 15694.0, 0, false);
        }

        returnValue = st;
      }
      catch (e) {
        returnValue = -1.0;
      }

      return returnValue;
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der Lohnsteuer für Steuerklassen V und VI

    /** ************************************************************************* */

    this.BerechneLohnsteuerV_VI = function (dX) {
      var dTarif = 0.0;
      var dZZX = dX;
      var iBereich0 = 0;
      var iBereich1 = 0;
      var iBereich2 = 0;
      var dSSSatz = 0;
      var dSSSatz2 = 0;

      switch (this.m_iVeranlagungsjahr) {
      case 2002:
      case 2003:
        iBereich1 = 27306;
        iBereich2 = 8946;
        dSSSatz = 0.485;
        break;

      case 2004:
        iBereich1 = 26072;
        iBereich2 = 9228;
        dSSSatz = 0.45;
        break;

      case 2006:
      case 2005:
        iBereich1 = 25812;
        iBereich2 = 9144;
        dSSSatz = 0.42;
        break;

      case 2007:
      case 2008:
        iBereich0 = 200000;
        dSSSatz2 = 0.45;
        iBereich1 = 25812;
        iBereich2 = 9144;
        dSSSatz = 0.42;
        break;

      case 2009:
        iBereich0 = 200320;
        dSSSatz2 = 0.45;
        iBereich1 = 26276;
        iBereich2 = 9225;
        dSSSatz = 0.42;
        break;
      case 2010:
      default: // damit wird immer Vorjahr genommen
        iBereich0 = 200584;
        dSSSatz2 = 0.45;
        iBereich1 = 26441;
        iBereich2 = 9429;
        dSSSatz = 0.42;
        break;


      }

      if (dX > iBereich1) {
        var dZX = iBereich1;
        dTarif = this.UpdV_VI(dZX);
        if (this.m_iVeranlagungsjahr >= 2007 && dX > iBereich0) // 4. Stufe
        // ab 2007
        {
          dTarif += (iBereich0 - iBereich1) * dSSSatz;
          dTarif = Runde(dTarif, 0, false);
          dTarif += (dX - iBereich0) * dSSSatz2;
        }
        else
          dTarif += (dX - iBereich1) * dSSSatz;

        dTarif = Runde(dTarif, 0, false);
      }
      else {
        dTarif = this.UpdV_VI(dZZX);

        if (dX > iBereich2) {
          var dVerg = dTarif;
          dTarif = this.UpdV_VI(iBereich2);
          var dHoch = dTarif + (dZZX - iBereich2) * dSSSatz;
          dHoch = Runde(dHoch, 0, false);
          if (dHoch < dVerg)
            dTarif = dHoch;
          else
            dTarif = dVerg;
        }
      }
      return dTarif;
    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung der TariflichenEinkommensteuer fuer StKl V und VI

    /** ************************************************************************* */

    this.UpdV_VI = function (dWert) {
      var dFaktor = 1;
      switch (this.m_iVeranlagungsjahr) {
      case 2002:
      case 2003:
        dFaktor = 0.199;
        break;
      case 2004:
        dFaktor = 0.16;
        break;
      case 2005:
      case 2006:
      case 2007:
      case 2008:
        dFaktor = 0.15;
        break;
      case 2009:
      default: // damit wird immer Vorjahr genommen
        dFaktor = 0.14;
        break;
      }
      var dX = dWert * 1.25;
      var dst1 = this.BerechneTariflicheEinkommensteuer(dX);

      dX = dWert * 0.75;
      var dst2 = this.BerechneTariflicheEinkommensteuer(dX);
      var diff = (dst1 - dst2) * 2;
      var mist = Runde(dWert * dFaktor, 0, false);

      if (mist > diff)
        return mist;
      else
        return diff;

    };


    /** ************************************************************************* */
    //		Beschreibung: Berechnung der Solidaritaetszuschlag und der Kirchensteuer

    /** ************************************************************************* */

    this.BerechneSolzUndKist = function (dJahresBMG, iSol) {
      var dSolzfrei = (iSol * m_iKennzahlTabellenart);
      if (dJahresBMG > dSolzfrei) {

        var dSolzj = Runde(dJahresBMG * 5.5, 0, false);
        var dSolzMin = (dJahresBMG - dSolzfrei) * 20.0;
        if (dSolzMin < dSolzj)
          dSolzj = dSolzMin;
        var dJahreswert = dSolzj;
        var dSol = this.UpAnteil(dJahreswert, false);

        m_bnErgebnis.setSolidaritaetszuschlag(dSol / 100.0);
      }
      else
        m_bnErgebnis.setSolidaritaetszuschlag(0.0);

      if (this.m_fKirchensteuersatz > 0.0) {
        var dJahreswert = dJahresBMG * 100;
        var dKiSt = this.UpAnteil(dJahreswert, false);
        m_bnErgebnis.setBMGKirchensteuer(dKiSt / 100.0);
      }
      else
        m_bnErgebnis.setBMGKirchensteuer(0.0);

      var dKirchensteuer = m_bnErgebnis.getBMGKirchensteuer() * this.m_fKirchensteuersatz;

      m_bnErgebnis.setKirchensteuer(Runde(dKirchensteuer, 0, false) / 100.0);

    };

    /** ************************************************************************* */
    //		Beschreibung: Berechnung des Anteils von Jahresbetraegen fuer einen
    //		Lohnzahlungszeitraum

    /** ************************************************************************* */

    this.UpAnteil = function (dJahreswert, bAufrunden) {

      var dtmp = 0.0;
      var lJahreswert = dJahreswert;
      switch (this.m_iLZZ) {
      case LZZ_JAEHRLICH:
        return dJahreswert;
        break;
      case LZZ_MONATLICH:
        dtmp = lJahreswert / 12.0;
        break;
      case LZZ_WOECHENTLICH:
        dtmp = dJahreswert * 7 / 360.0;
        break;
      case LZZ_TAEGLICH:
        dtmp = dJahreswert / 360.0;
        break;
      default:
        return 0;
      }

      var w = Runde(dtmp, 0, bAufrunden);

      return w;
    };

    this.BerechneTariflicheEinkommensteuer_2008 = function (dX) {
      return this.BerechneTariflicheEinkommensteuer_2007(dX);
    };

    //		MRE4JL PAP2008
    this.BerechneJahreslohn = function () {
      switch (this.m_iLZZ) {
      case LZZ_JAEHRLICH:
        this.m_dZRE4J = this.m_dRE4;
        this.m_dZVBEZJ = this.m_dVBEZ;
        this.m_dJLFREIB = this.m_dLZZFREIB;
        this.m_dJLHINZU = this.m_dLZZHINZU;
        break;

      case LZZ_MONATLICH:
        this.m_dZRE4J = this.m_dRE4 * 12;
        this.m_dZVBEZJ = this.m_dVBEZ * 12;
        this.m_dJLFREIB = this.m_dLZZFREIB * 12;
        this.m_dJLHINZU = this.m_dLZZHINZU * 12;
        break;

      case LZZ_WOECHENTLICH:
        this.m_dZRE4J = this.m_dRE4 * 360 / 7;
        this.m_dZVBEZJ = this.m_dVBEZ * 360 / 7;
        this.m_dJLFREIB = this.m_dLZZFREIB * 360 / 7;
        this.m_dJLHINZU = this.m_dLZZHINZU * 360 / 7;
        break;

      case LZZ_TAEGLICH:
        this.m_dZRE4J = this.m_dRE4 * 360;
        this.m_dZVBEZJ = this.m_dVBEZ * 360;
        this.m_dJLFREIB = this.m_dLZZFREIB * 360;
        this.m_dJLHINZU = this.m_dLZZHINZU * 360;
        break;

      default:
        break;
      }
    };
    //		Ermittlung des Altersentlastungsbetrages
    this.MRE4ALTE = function () {
      if (this.m_iAlter >= MAX_ALTER) {
        var iJahr65 = this.m_iVeranlagungsjahr - (this.m_iAlter - 64);
        var iAlterIdx = iJahr65 <= 2005 ? 0 : iJahr65 - 2005;

        if (iAlterIdx > 35)
          iAlterIdx = 35;

        var dBMG = this.m_dZRE4J - this.m_dZVBEZJ;

        this.m_dALTE = dBMG * AlterEntlastBetrag[iAlterIdx].dblSatz /* TAB4 */ ;
        this.m_dALTE = Runde(this.m_dALTE, 2, true);

        var lHBALTE = AlterEntlastBetrag[iAlterIdx].intHoechstbetrag;
        if (this.m_dALTE > lHBALTE) {
          this.m_dALTE = lHBALTE;
        }
      }
      else {
        this.m_dALTE = 0.0;
      }
    };

    this.MRE4ABZ = function (dZRE4, dZRE4VP) {
      // Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)
      // nach Abzug der Freibeträge nach § 39 b Abs. 2 Satz 3 und 4.
      dZRE4 = this.m_dZRE4J - this.m_dFVB - this.m_dALTE - this.m_dJLFREIB + this.m_dJLHINZU;
      if (dZRE4 < 0.0)
        dZRE4 = 0.0;

      // Auf einen Jahreslohn hochgerechnetes RE4 in €, C (2 Dezimalstellen)
      // nach Abzug des Versorgungsfreibetrags und des Alterentlastungsbetrags
      // zur Berechnung der Vorsorgepauschale in €, C
      // (2 Dezimalstellen)
      dZRE4VP = this.m_dZRE4J - this.m_dFVB - this.m_dALTE;
      if (this.m_iVeranlagungsjahr >= 2010) {
        dZRE4VP = this.m_dZRE4J;
      }
      if (dZRE4VP < 0.0)
        dZRE4VP = 0.0;

      // Auf einen Jahreslohn hochgerechnetes (VBEZ abzüglich FVB) in
      // €, C (2 Dezimalstellen)
      m_dZVBEZ = this.m_dZVBEZJ - this.m_dFVB;
      if (m_dZVBEZ < 0.0)
        m_dZVBEZ = 0.0;

      return new Array(dZRE4, dZRE4VP);
    };

    this.InitMembers = function () {
      this.m_iAlter = 0;
      this.m_dLZZHINZU = 0.0;
      this.m_dRE4 = 0.0;
      this.m_dVBEZ = 0.0;
      this.m_iVersorgungsbeginnIdx = 0;
      this.m_iLZZ = LZZ_JAEHRLICH;
      this.m_dLZZFREIB = 0.0;
      this.m_iSteuerklasse = STEUERKLASSE_I;
      this.m_fKinder = 0.0;
      this.m_iRentenversicherungsfrei = 0;
      this.m_bRechtskreisOst = 0;

      this.m_iPKV = 0;
      this.m_iPVS = false;

      this.m_fKirchensteuersatz = 0.0;
      this.m_fPauschAbzugssatz = 0.0;
      this.m_iVeranlagungsjahr = 2002;

      this.m_dVBEZM = 0.0;
      this.m_dZRE4J = 0.0;
      this.m_dZVBEZJ = 0.0;
      this.m_dJLFREIB = 0.0;
      this.m_dJLHINZU = 0.0;

      this.m_dFVB = 0.0;
      this.m_dFVBSO = 0.0;
      this.m_dFVBZ = 0.0;
      this.m_dFVBZSO = 0.0;

      this.m_dVKAPA = 0.0;
      this.m_dSTERBE = 0.0;

      this.m_dALTE = 0.0;

      this.m_dBemessungRVAV = 0.0;
      this.m_dBemessungKVPV = 0.0;
      this.m_dBeitragssatzRV = 0.0;
      this.m_dBeitragssatzAV = 0.0;
      this.m_dBeitragssatzKV = 0.0;
      this.m_dBeitragssatzPV = 0.0;
      this.m_bPrivateKV = 0;
      this.m_dBeitragPrivateKV = 0.0;
      this.m_dBeitragPrivatePV = 0.0;
      this.m_iVeranlagungsjahr = 0;

      this.m_iPKV = 0; // 0 = gesetzlich krankenversicherte Arbeitnehmer

      this.m_iPVS = false; // 1, wenn bei der sozialen Pflegeversicherung die
      // Besonderheiten in Sachsen zu berücksichtigen sind
      // bzw. zu berücksichtigen wären
      this.m_bRechtskreisOst = false;

      this.m_dblFaktor = 1.0;
    };

    this.InitVBEZM = function () {
      switch (this.m_iLZZ) {
      case LZZ_JAEHRLICH:
        this.m_dVBEZM = this.m_dVBEZ / 12;
        break;

      case LZZ_MONATLICH:
        this.m_dVBEZM = this.m_dVBEZ;
        break;

      case LZZ_WOECHENTLICH:
        this.m_dVBEZM = this.m_dVBEZ / 7 * 30;
        break;

      case LZZ_TAEGLICH:
        this.m_dVBEZM = this.m_dVBEZ * 30;
        break;

      default:
        break;
      }
    };

    this.setFaktor = function (val) {
      this.m_dblFaktor = val;
      if (this.m_dblFaktor < 1.0) {
        this.m_dLZZFREIB = 0.0;
      }
    };
    //void CBruttoNettolohn::setPrivateKV( bool bPrivateKV, bool bZuschussAG =
    //	false )
    //{
    //	this.m_bPrivateKV=bPrivateKV;

    //this.m_iPKV=0; //0 = gesetzlich krankenversicherte Arbeitnehmer

    //if (bPrivateKV)
    //{
    ////1 = ausschließlich privat krankenversicherte Arbeitnehmer ohne
    //Arbeitgeberzuschuss
    //this.m_iPKV=1;
    //if (bZuschussAG)
    //{
    //this.m_iPKV=2;//2 = ausschließlich privat krankenversicherte Arbeitnehmer mit
    //Arbeitgeberzuschuss
    //}
    //}
    //}


    this.InitMembers();

    this.m_iAlter = iAlter;
    this.m_dLZZHINZU = dHinzurechnungsbetrag;
    this.m_dRE4 = dArbeitslohn;

    //this.m_dVBEZ = dVersorgungsbezuege;
    this.m_iVersorgungsbeginnIdx = iVersorgungsbeginnIdx;

    if (this.m_iVersorgungsbeginnIdx < 0) {
      this.m_dVBEZ = 0;
    }
    else {
      this.m_dVBEZ = dVersorgungsbezuege;
    }

    this.m_dLZZFREIB = dFreibetrag;
    this.m_iLZZ = iLohnzahlungszeitraum;
    this.m_iSteuerklasse = iSteuerklasse;
    this.m_fKinder = fKinder;
    this.m_iRentenversicherungsfrei = iRentenversicherungsfrei;

    this.m_fKirchensteuersatz = fKirchensteuersatz;
    this.m_dBemessungRVAV = dBemessungRVAV;
    this.m_dBemessungKVPV = dBemessungKVPV;

    if (!this.m_iRentenversicherungsfrei) {
      this.m_dBeitragssatzRV = dBeitragssatzRV;
    }

    this.m_dBeitragssatzAV = dBeitragssatzAV;
    this.m_dBeitragssatzKV = dBeitragssatzKV;
    this.m_dBeitragssatzPV = dBeitragssatzPV;
    this.m_dBeitragssatzPV_merker = dBeitragssatzPV;
    this.m_bPrivateKV = bPrivateKV;
    this.m_dBeitragPrivateKV = dBeitragPrivateKV;
    this.m_dBeitragPrivatePV = dBeitragPrivatePV;
    this.m_iVeranlagungsjahr = iVeranlagungsjahr;

    if (bPrivateKV == true) {
      // 1 = ausschließlich privat krankenversicherte Arbeitnehmer ohne
      // Arbeitgeberzuschuss
      this.m_iPKV = 1;
      if (bZuschussAG) {
        this.m_iPKV = 2; // 2 = ausschließlich privat krankenversicherte
        // Arbeitnehmer mit Arbeitgeberzuschuss
      }
    }
    else {
      this.m_iPKV = 0; // 0 = gesetzlich krankenversicherte Arbeitnehmer

      if (bZuschussAG) // Zuschschlag zur gesetzlichen PV (ich weiß, blöder
      // Missbrauch, aber naja...)
      {
        this.zuschlagPV = true;
      }
      else {
        this.zuschlagPV = false;
      }
    }

    this.m_iPVS = bPVS; // 1, wenn bei der sozialen Pflegeversicherung die
    // Besonderheiten in Sachsen zu berücksichtigen sind bzw. zu
    // berücksichtigen wären
    this.m_bRechtskreisOst = bRechtskreisOst;
    /*
     * for (var i = 0; i < VAZ_ANZAHL; i++) { m_dblBemessungRVAV1[i] = GetWert(i +
     * VAZ_START, bRechtskreisOst ? SVW_BBG_RVAV_OST : SVW_BBG_RVAV_WEST);
     * m_dblBemessungRVAV2[i] = GetWert(i + VAZ_START, bRechtskreisOst ?
     * SVW_BBG_RVAV_OST : SVW_BBG_RVAV_WEST); m_dblBemessungKVPV1[i] = GetWert(i +
     * VAZ_START, bRechtskreisOst ? SVW_BBG_RVAV_OST : SVW_BBG_KVPV_WEST);
     * m_dblBemessungKVPV2[i] = GetWert(i + VAZ_START, bRechtskreisOst ?
     * SVW_BBG_RVAV_OST : SVW_BBG_KVPV_WEST); m_dblBeitragssatzRV1[i] = GetWert(i +
     * VAZ_START, SVW_AN_SATZ_RV); m_dblBeitragssatzRV2[i] = GetWert(i + VAZ_START,
     * SVW_AN_SATZ_RV); m_dblBeitragssatzAV1[i] = GetWert(i + VAZ_START,
     * SVW_AN_SATZ_AV); m_dblBeitragssatzAV2[i] = GetWert(i + VAZ_START,
     * SVW_AN_SATZ_AV); m_dblBeitragssatzPV1[i] = GetWert(i + VAZ_START,
     * SVW_AN_SATZ_PV); m_dblBeitragssatzPV2[i] = GetWert(i + VAZ_START,
     * SVW_AN_SATZ_PV); m_dblBeitragssatzKV1[i] = GetWert(i + VAZ_START,
     * SVW_AN_SATZ_KVDS); m_dblBeitragssatzKV2[i] = GetWert(i + VAZ_START,
     * SVW_AN_SATZ_KVDS); }
     */
    this.InitVBEZM();
  }

  return {
    CBruttoNettolohn: CBruttoNettolohn,
    bemessungen: bemessungen
  };

});
