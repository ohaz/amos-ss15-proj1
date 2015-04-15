define([
  './helper/RoundHelper'
], function (
  roundHelper
) {

  return function () {
    this.m_dBemessungRVAV = 0;
    this.m_dBemessungKVPV = 0;
    
    var zusatzbeitragssatz_global = 0;

    /****************************************************************************/
    //Beschreibung: Berechnung der einzelnen SV-Beiträge (ab V.3.00) mit AN-Sätzen
    //
    /****************************************************************************/
    this.BerechneSVBeitraegeAN = function (veranlagungsjahr, re4, privKv, pkpv_beitrag,
      zuschlagPv, stkl, lzz, beitragsgrenzeOst, rv_pflicht, isSachsen, zusatzbeitragssatz) {
    	
    	zusatzbeitragssatz_global = zusatzbeitragssatz;
    	
    	
      var m_dBemessungRVAV = beitragsgrenzeOst ? GetWert(veranlagungsjahr, SVW_BBG_RVAV_OST) : GetWert(veranlagungsjahr, SVW_BBG_RVAV_WEST);
      var m_dBemessungKVPV = beitragsgrenzeOst ? GetWert(veranlagungsjahr, SVW_BBG_KVPV_OST) : GetWert(veranlagungsjahr, SVW_BBG_KVPV_WEST);
      var m_dBeitragssatzRV = GetWert(veranlagungsjahr, SVW_AN_SATZ_RV);
      var m_dBeitragssatzAV = GetWert(veranlagungsjahr, SVW_AN_SATZ_AV);
      var m_dBeitragssatzKV = GetWert(veranlagungsjahr, SVW_AN_SATZ_KVDS);
      var m_dBeitragssatzPV = GetWert(veranlagungsjahr, SVW_AN_SATZ_PV);

      var dBemessung_RVAV = 0.0;
      var dBemessung_KVPV = 0.0;

      switch (lzz) {
      case 1: //LZZ_JAEHRLICH
        dBemessung_RVAV = m_dBemessungRVAV;
        dBemessung_KVPV = m_dBemessungKVPV;
        break;
      case 2: //LZZ_MONATLICH
        dBemessung_RVAV = m_dBemessungRVAV / 12;
        dBemessung_KVPV = m_dBemessungKVPV / 12;
        break;
      case 3: //LZZ_WOECHENTLICH
        dBemessung_RVAV = m_dBemessungRVAV / 360 * 7;
        dBemessung_KVPV = m_dBemessungKVPV / 360 * 7;
        break;
      case 4: //LZZ_TAEGLICH
        dBemessung_RVAV = m_dBemessungRVAV / 360;
        dBemessung_KVPV = m_dBemessungKVPV / 360;
        break;
      }

      var dRechenWertRVAV = (re4 < dBemessung_RVAV) ? re4 : dBemessung_RVAV;

      this.rv_beitrag = (roundHelper.RundeNachkommastellen(dRechenWertRVAV * m_dBeitragssatzRV / 100, 2));
      this.av_beitrag = (roundHelper.Runde(dRechenWertRVAV * m_dBeitragssatzAV / 100, 2, false));

      if (privKv == true) {
        this.kv_beitrag = 0; //m_bnErgebnis.setKVBeitrag(0);
        this.pv_beitrag = 0; //m_bnErgebnis.setPVBeitrag(0);
        this.pkpv_beitrag = pkpv_beitrag; //m_bnErgebnis.setBeitragPrivateKVPV(this.m_dBeitragPrivateKV);
      }
      else {
        var dRechenWertKVPV = (re4 < dBemessung_KVPV) ? re4 : dBemessung_KVPV;

        this.kv_beitrag = (roundHelper.Runde(dRechenWertKVPV * m_dBeitragssatzKV / 100, 2, false));

        if (isSachsen) {
          m_dBeitragssatzPV += 0.5;
        }
        if (zuschlagPv && stkl != 2) {
          m_dBeitragssatzPV += 0.25;
        }

        var temp12 = dRechenWertKVPV * m_dBeitragssatzPV / 100;

        this.pv_beitrag = (roundHelper.RundeNachkommastellen(temp12, 2));

        this.pkpv_beitrag = 0; //m_bnErgebnis.setBeitragPrivateKVPV(0);
      }

      if (!rv_pflicht)
        this.rv_beitrag = 0;

      return {
        rv: this.rv_beitrag,
        av: this.av_beitrag,
        kv: this.kv_beitrag,
        pv: this.pv_beitrag,
        pkpv: this.pkpv_beitrag
      };
    };


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
    var SVW_AG_SATZ_KV = 24; // Beitragssatz des Arbeitgebers zur Krankenversicherung
    var SVW_AN_SATZ_KV = 25; // ermäßigter Beitragssatz des Arbeitnehmers zur Krankenversicherung



    function GetWert(iVeranlagungsjahr, iWertID) {
      switch (iVeranlagungsjahr) {
      case 2002:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST:
          return 54000;
          break;
        case SVW_BBG_RVAV_OST:
          return 45000;
          break;
        case SVW_BBG_KVPV_WEST:
        case SVW_BBG_KVPV_OST:
          return 40500;
          break;
        case SVW_SATZ_RV:
          return 19.1;
          break;
        case SVW_SATZ_AV:
          return 6.5;
          break;
        case SVW_SATZ_KVDS:
          return 13.5;
          break;
        case SVW_SATZ_PV:
          return 1.7;
          break;
        case SVW_AN_SATZ_RV:
          return 19.1 / 2;
          break;
        case SVW_AN_SATZ_AV:
          return 6.5 / 2;
          break;
        case SVW_AN_SATZ_KVDS:
          return 13.5 / 2;
          break;
        case SVW_AN_SATZ_PV:
          return 1.7 / 2;
          break;
        default:
          return 0;
          break;
        }

      case 2003:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST:
          return 61200;
          break;
        case SVW_BBG_RVAV_OST:
          return 51000;
          break;
        case SVW_BBG_KVPV_WEST:
        case SVW_BBG_KVPV_OST:
          return 41400;
          break;
        case SVW_SATZ_RV:
          return 19.5;
          break;
        case SVW_SATZ_AV:
          return 6.5;
          break;
        case SVW_SATZ_KVDS:
          return 14.3;
          break;
        case SVW_SATZ_PV:
          return 1.7;
          break;
        case SVW_AN_SATZ_RV:
          return 19.5 / 2;
          break;
        case SVW_AN_SATZ_AV:
          return 6.5 / 2;
          break;
        case SVW_AN_SATZ_KVDS:
          return 14.3 / 2;
          break;
        case SVW_AN_SATZ_PV:
          return 1.7 / 2;
          break;
        default:
          return 0;
          break;
        }

      case 2004:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST:
          return 61800;
          break;
        case SVW_BBG_RVAV_OST:
          return 52200;
          break;
        case SVW_BBG_KVPV_WEST:
        case SVW_BBG_KVPV_OST:
          return 41850;
          break;
        case SVW_SATZ_RV:
          return 19.5;
          break;
        case SVW_SATZ_AV:
          return 6.5;
          break;
        case SVW_SATZ_KVDS:
          return 14.3;
          break;
        case SVW_SATZ_PV:
          return 1.7;
          break;
        case SVW_AN_SATZ_RV:
          return 19.5 / 2;
          break;
        case SVW_AN_SATZ_AV:
          return 6.5 / 2;
          break;
        case SVW_AN_SATZ_KVDS:
          return 14.3 / 2;
          break;
        case SVW_AN_SATZ_PV:
          return 1.7 / 2;
          break;
        default:
          return 0;
          break;
        }

      case 2005:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST:
          return 62400;
          break;
        case SVW_BBG_RVAV_OST:
          return 52800;
          break;
        case SVW_BBG_KVPV_WEST:
        case SVW_BBG_KVPV_OST:
          return 42300;
          break;
        case SVW_SATZ_RV:
          return 19.5;
          break;
        case SVW_SATZ_AV:
          return 6.5;
          break;
        case SVW_SATZ_KVDS:
          return 14.3;
          break;
        case SVW_SATZ_PV:
          return 1.7;
          break;
        case SVW_AN_SATZ_RV:
          return 19.5 / 2;
          break;
        case SVW_AN_SATZ_AV:
          return 6.5 / 2;
          break;
        case SVW_AN_SATZ_KVDS:
          return 14.3 / 2 + 0.9;
          break;
        case SVW_AN_SATZ_PV:
          return 1.7 / 2;
          break;
        default:
          return 0;
          break;
        }

      case 2006:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST:
          return 63000;
          break;
        case SVW_BBG_RVAV_OST:
          return 52800;
          break;
        case SVW_BBG_KVPV_WEST:
        case SVW_BBG_KVPV_OST:
          return 42750;
          break;
        case SVW_SATZ_RV:
          return 19.5;
          break;
        case SVW_SATZ_AV:
          return 6.5;
          break;
        case SVW_SATZ_KVDS:
          return 14.2;
          break;
        case SVW_SATZ_PV:
          return 1.7;
          break;
        case SVW_AN_SATZ_RV:
          return 19.5 / 2;
          break;
        case SVW_AN_SATZ_AV:
          return 6.5 / 2;
          break;
        case SVW_AN_SATZ_KVDS:
          return 14.2 / 2 + 0.9;
          break;
        case SVW_AN_SATZ_PV:
          return 1.7 / 2;
          break;
        default:
          return 0;
          break;
        }

      case 2007:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST:
          return 63000;
          break;
        case SVW_BBG_RVAV_OST:
          return 54600;
          break;
        case SVW_BBG_KVPV_WEST:
        case SVW_BBG_KVPV_OST:
          return 42750;
          break;
        case SVW_SATZ_RV:
          return 19.9;
          break;
        case SVW_SATZ_AV:
          return 4.2;
          break;
        case SVW_SATZ_KVDS:
          return 14.2;
          break;
        case SVW_SATZ_PV:
          return 1.7;
          break;
        case SVW_AN_SATZ_RV:
          return 19.9 / 2;
          break;
        case SVW_AN_SATZ_AV:
          return 4.2 / 2;
          break;
        case SVW_AN_SATZ_KVDS:
          return 13.3 / 2 + 0.9;
          break;
        case SVW_AN_SATZ_PV:
          return 1.7 / 2;
          break;
        default:
          return 0;
          break;
        }
      case 2008:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST:
          return 63600;
          break;
        case SVW_BBG_RVAV_OST:
          return 54000;
          break;
        case SVW_BBG_KVPV_WEST:
        case SVW_BBG_KVPV_OST:
          return 43200;
          break;
        case SVW_SATZ_RV:
          return 19.9;
          break;
        case SVW_SATZ_AV:
          return 3.3;
          break;
        case SVW_SATZ_KVDS:
          return 13.9;
          break;
        case SVW_SATZ_PV:
          return 1.95;
          break;
        case SVW_AN_SATZ_RV:
          return 19.9 / 2;
          break;
        case SVW_AN_SATZ_AV:
          return 3.3 / 2;
          break;
        case SVW_AN_SATZ_KVDS:
          return 13.9 / 2 + 0.9;
          break;
        case SVW_AN_SATZ_PV:
          return 1.95 / 2;
          break;
        default:
          return 0;
          break;
        }

      case 2009:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST: // Betragsbemessungsgrenze RV u. AV West
          return 64800;
          break;
        case SVW_BBG_RVAV_OST: // Betragsbemessungsgrenze RV u. AV Ost
          return 54600;
          break;
        case SVW_BBG_KVPV_WEST: // Betragsbemessungsgrenze KV u. PV West
        case SVW_BBG_KVPV_OST: // Betragsbemessungsgrenze KV u. PV Ost
          return 44100;
          break;
        case SVW_SATZ_RV: // Rentenversicherungssatz Gesamt
          return 19.9;
          break;
        case SVW_SATZ_AV: // Arbeitslosenversicherungssatz Gesamt
          return 2.8;
          break;
        case SVW_SATZ_KVDS: // Krankenversicherungsdurchschnittssatz
          return 14.9;
          break;
        case SVW_SATZ_PV: // Pflegeversicherungssatz Gesamt
          return 1.95;
          break;
        case SVW_AN_SATZ_RV: // Rentenversicherungssatz Arbeitnehmer
          return GetWert(iVeranlagungsjahr, SVW_SATZ_RV) / 2;
          break;
        case SVW_AN_SATZ_AV: // Arbeitslosenversicherungssatz Arbeitnehmer
          return GetWert(iVeranlagungsjahr, SVW_SATZ_AV) / 2;
          break;
        case SVW_AN_SATZ_KVDS: // Krankenversicherungssatz Arbeitnehmer
          return 7.0 + 0.9;
          break;
        case SVW_AN_SATZ_PV: // Pflegeversicherungssatz Arbeitnehmer
          return 1.95 / 2;
          break;
        default:
          return 0;
          break;
        }

      case 2010:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST: // Betragsbemessungsgrenze RV u. AV West
          return 66000;
          break;
        case SVW_BBG_RVAV_OST: // Betragsbemessungsgrenze RV u. AV Ost
          return 55800;
          break;
        case SVW_BBG_KVPV_WEST: // Betragsbemessungsgrenze KV u. PV West
        case SVW_BBG_KVPV_OST: // Betragsbemessungsgrenze KV u. PV Ost
          return 45000;
          break;
        case SVW_SATZ_RV: // Rentenversicherungssatz Gesamt
          return 19.9;
          break;
        case SVW_SATZ_AV: // Arbeitslosenversicherungssatz Gesamt
          return 2.8;
          break;
        case SVW_SATZ_KVDS: // Krankenversicherungsdurchschnittssatz
          return 14.9;
          break;
        case SVW_SATZ_PV: // Pflegeversicherungssatz Gesamt
          return 1.95;
          break;
        case SVW_AN_SATZ_RV: // Rentenversicherungssatz Arbeitnehmer
          return GetWert(iVeranlagungsjahr, SVW_SATZ_RV) / 2;
          break;
        case SVW_AN_SATZ_AV: // Arbeitslosenversicherungssatz Arbeitnehmer
          return GetWert(iVeranlagungsjahr, SVW_SATZ_AV) / 2;
          break;
        case SVW_AN_SATZ_KVDS: // Krankenversicherungssatz Arbeitnehmer
          return 7.0 + 0.9;
          break;
        case SVW_AN_SATZ_PV: // Pflegeversicherungssatz Arbeitnehmer
          return 1.95 / 2;
          break;
        case SVW_AG_SATZ_KV: // erm��igter Beitragssatz des Arbeitgebers zur Krankenversicherung
          return 6.7;
          break;
        case SVW_AN_SATZ_KV: // erm��igter Beitragssatz des Arbeitnehmers zur Krankenversicherung
          return GetWert(iVeranlagungsjahr, SVW_AG_SATZ_KV) + 0.9;
          break;
        default:
          return 0;
          break;
        }

      case 2011:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST: // Betragsbemessungsgrenze RV u. AV West
          return 66000;
          break;
        case SVW_BBG_RVAV_OST: // Betragsbemessungsgrenze RV u. AV Ost
          return 57600;
          break;
        case SVW_BBG_KVPV_WEST: // Betragsbemessungsgrenze KV u. PV West
        case SVW_BBG_KVPV_OST: // Betragsbemessungsgrenze KV u. PV Ost
          return 44550;
          break;
        case SVW_SATZ_RV: // Rentenversicherungssatz Gesamt
          return 19.9;
          break;
        case SVW_SATZ_AV: // Arbeitslosenversicherungssatz Gesamt
          return 3.0;
          break;
        case SVW_SATZ_KVDS: // Krankenversicherungsdurchschnittssatz
          return 15.5;
          break;
        case SVW_SATZ_PV: // Pflegeversicherungssatz Gesamt
          return 1.95;
          break;
        case SVW_AN_SATZ_RV: // Rentenversicherungssatz Arbeitnehmer
          return GetWert(iVeranlagungsjahr, SVW_SATZ_RV) / 2;
          break;
        case SVW_AN_SATZ_AV: // Arbeitslosenversicherungssatz Arbeitnehmer
          return GetWert(iVeranlagungsjahr, SVW_SATZ_AV) / 2;
          break;
        case SVW_AN_SATZ_KVDS: // Krankenversicherungssatz Arbeitnehmer
          return 7.3 + 0.9;
          break;
        case SVW_AN_SATZ_PV: // Pflegeversicherungssatz Arbeitnehmer
          return 1.95 / 2;
          break;
        case SVW_AG_SATZ_KV: // erm��igter Beitragssatz des Arbeitgebers zur Krankenversicherung
          return 7.0;
          break;
        case SVW_AN_SATZ_KV: // erm��igter Beitragssatz des Arbeitnehmers zur Krankenversicherung
          return GetWert(iVeranlagungsjahr, SVW_AG_SATZ_KV) + 0.9;
          break;
        default:
          return 0;
          break;
        }
        break;

      case 2012:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST: // Betragsbemessungsgrenze RV u. AV West
          return 67200;
          break;
        case SVW_BBG_RVAV_OST: // Betragsbemessungsgrenze RV u. AV Ost
          return 57600;
          break;
        case SVW_BBG_KVPV_WEST: // Betragsbemessungsgrenze KV u. PV West
        case SVW_BBG_KVPV_OST: // Betragsbemessungsgrenze KV u. PV Ost
          return 45900;
          break;
        case SVW_SATZ_RV: // Rentenversicherungssatz Gesamt
          return 19.6;
          break;
        case SVW_SATZ_AV: // Arbeitslosenversicherungssatz Gesamt
          return 3.0;
          break;
        case SVW_SATZ_KVDS: // Krankenversicherungsdurchschnittssatz
          return 15.5;
          break;
        case SVW_SATZ_PV: // Pflegeversicherungssatz Gesamt
          return 1.95;
          break;
        case SVW_AN_SATZ_RV: // Rentenversicherungssatz Arbeitnehmer
          return GetWert(iVeranlagungsjahr, SVW_SATZ_RV) / 2;
          break;
        case SVW_AN_SATZ_AV: // Arbeitslosenversicherungssatz Arbeitnehmer
          return GetWert(iVeranlagungsjahr, SVW_SATZ_AV) / 2;
          break;
        case SVW_AN_SATZ_KVDS: // Krankenversicherungssatz Arbeitnehmer
          return 7.3 + 0.9;
          break;
        case SVW_AN_SATZ_PV: // Pflegeversicherungssatz Arbeitnehmer
          return 1.95 / 2;
          break;
        case SVW_AG_SATZ_KV: // erm��igter Beitragssatz des Arbeitgebers zur Krankenversicherung
          return 7.0;
          break;
        case SVW_AN_SATZ_KV: // erm��igter Beitragssatz des Arbeitnehmers zur Krankenversicherung
          return GetWert(iVeranlagungsjahr, SVW_AG_SATZ_KV) + 0.9;
          break;
        default:
          return 0;
          break;
        }

      case 2013:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST: // Betragsbemessungsgrenze RV u. AV West
          return 69600;
          break;
        case SVW_BBG_RVAV_OST: // Betragsbemessungsgrenze RV u. AV Ost
          return 58800;
          break;
        case SVW_BBG_KVPV_WEST: // Betragsbemessungsgrenze KV u. PV West
        case SVW_BBG_KVPV_OST: // Betragsbemessungsgrenze KV u. PV Ost
          return 47250;
          break;
        case SVW_SATZ_RV: // Rentenversicherungssatz Gesamt
          return 18.9;
          break;
        case SVW_SATZ_AV: // Arbeitslosenversicherungssatz Gesamt
          return 3.0;
          break;
        case SVW_SATZ_KVDS: // Krankenversicherungsdurchschnittssatz
          return 15.5;
          break;
        case SVW_SATZ_PV: // Pflegeversicherungssatz Gesamt
          return 2.05;
          break;
        case SVW_AN_SATZ_RV: // Rentenversicherungssatz Arbeitnehmer
          return GetWert(iVeranlagungsjahr, SVW_SATZ_RV) / 2;
          break;
        case SVW_AN_SATZ_AV: // Arbeitslosenversicherungssatz Arbeitnehmer
          return GetWert(iVeranlagungsjahr, SVW_SATZ_AV) / 2;
          break;
        case SVW_AN_SATZ_KVDS: // Krankenversicherungssatz Arbeitnehmer
          return 7.3 + 0.9;
          break;
        case SVW_AN_SATZ_PV: // Pflegeversicherungssatz Arbeitnehmer
          return 2.05 / 2;
          break;
        case SVW_AG_SATZ_KV: // erm��igter Beitragssatz des Arbeitgebers zur Krankenversicherung
          return 7.0;
          break;
        case SVW_AN_SATZ_KV: // erm��igter Beitragssatz des Arbeitnehmers zur Krankenversicherung
          return GetWert(iVeranlagungsjahr, SVW_AG_SATZ_KV) + 0.9;
          break;
        default:
          return 0;
          break;
        }
		
	  case 2014:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST: // Betragsbemessungsgrenze RV u. AV West
          return 71400;
          break;
        case SVW_BBG_RVAV_OST: // Betragsbemessungsgrenze RV u. AV Ost
          return 60000;
          break;
        case SVW_BBG_KVPV_WEST: // Betragsbemessungsgrenze KV u. PV West
        case SVW_BBG_KVPV_OST: // Betragsbemessungsgrenze KV u. PV Ost
          return 48600;
          break;
        case SVW_SATZ_RV: // Rentenversicherungssatz Gesamt
          return 18.9;
          break;
        case SVW_SATZ_AV: // Arbeitslosenversicherungssatz Gesamt
          return 3.0;
          break;
        case SVW_SATZ_KVDS: // Krankenversicherungsdurchschnittssatz
          return 15.5;
          break;
        case SVW_SATZ_PV: // Pflegeversicherungssatz Gesamt
          return 2.05;
          break;
        case SVW_AN_SATZ_RV: // Rentenversicherungssatz Arbeitnehmer
          return GetWert(iVeranlagungsjahr, SVW_SATZ_RV) / 2;
          break;
        case SVW_AN_SATZ_AV: // Arbeitslosenversicherungssatz Arbeitnehmer
          return GetWert(iVeranlagungsjahr, SVW_SATZ_AV) / 2;
          break;
        case SVW_AN_SATZ_KVDS: // Krankenversicherungssatz Arbeitnehmer
          return 7.3 + 0.9;
          break;
        case SVW_AN_SATZ_PV: // Pflegeversicherungssatz Arbeitnehmer
          return 2.05 / 2;
          break;
        case SVW_AG_SATZ_KV: // erm��igter Beitragssatz des Arbeitgebers zur Krankenversicherung
          return 7.0;
          break;
        case SVW_AN_SATZ_KV: // erm��igter Beitragssatz des Arbeitnehmers zur Krankenversicherung
          return GetWert(iVeranlagungsjahr, SVW_AG_SATZ_KV) + 0.9;
          break;
        default:
          return 0;
          break;
        }
      
      case 2015:
      default:
        switch (iWertID) {
        case SVW_BBG_RVAV_WEST: // Betragsbemessungsgrenze RV u. AV West
          return 72600;
          break;
        case SVW_BBG_RVAV_OST: // Betragsbemessungsgrenze RV u. AV Ost
          return 62400;
          break;
        case SVW_BBG_KVPV_WEST: // Betragsbemessungsgrenze KV u. PV West
        case SVW_BBG_KVPV_OST: // Betragsbemessungsgrenze KV u. PV Ost
          return 49500;
          break;
        case SVW_SATZ_RV: // Rentenversicherungssatz Gesamt
          return 18.7;
          break;
        case SVW_SATZ_AV: // Arbeitslosenversicherungssatz Gesamt
          return 3.0;
          break;
        case SVW_SATZ_PV: // Pflegeversicherungssatz Gesamt
          return 2.35;
          break;
        case SVW_AN_SATZ_RV: // Rentenversicherungssatz Arbeitnehmer
          return 9.35;
          break;
        case SVW_AN_SATZ_AV: // Arbeitslosenversicherungssatz Arbeitnehmer
          return 1.5;
          break;
        case SVW_AN_SATZ_KVDS: // Krankenversicherungssatz Arbeitnehmer
          return 7.3 + zusatzbeitragssatz_global;
          break;
        case SVW_AN_SATZ_PV: // Pflegeversicherungssatz Arbeitnehmer
          return 1.175;
          break;
        default:
          return 0;
          break;
        }
      
      }
    }
  };


});
