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

  function GetWert(iVeranlagungsjahr, iWertID) {
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
    default:
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
    }
  }

  return {
    RundeNachkommastellen: RundeNachkommastellen,
    Runde: Runde,
    GetWert: GetWert
  };

});
