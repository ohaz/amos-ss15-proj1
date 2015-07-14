define([
  './RundeNachkommastellen'
], function (
  RundeNachkommastellen
) {

  function EuroUmrechnung() {
    // Rechnet aufgrund der übergebenen Werte den Zielbetrag aus
    this.KonvertEuroWaehrung = function (Orginalbetrag, Orginalwaehrung, Zielwaehrung) {
      var Zielbetrag = 0.0;
      var ZielKurs = 0.0;
      var BetragInEuro = 0.0;

      switch (Orginalwaehrung) {
      case this.WAEHRUNG_EUR:
        BetragInEuro = Orginalbetrag;
        break;
      case this.WAEHRUNG_BEF:
        BetragInEuro = (Orginalbetrag / this.KURS_BEF);
        break;
      case this.WAEHRUNG_DEM:
        BetragInEuro = (Orginalbetrag / this.KURS_DEM);
        break;
      case this.WAEHRUNG_FIM:
        BetragInEuro = (Orginalbetrag / this.KURS_FIM);
        break;
      case this.WAEHRUNG_FRF:
        BetragInEuro = (Orginalbetrag / this.KURS_FRF);
        break;
      case this.WAEHRUNG_NLG:
        BetragInEuro = (Orginalbetrag / this.KURS_NLG);
        break;
      case this.WAEHRUNG_IEP:
        BetragInEuro = (Orginalbetrag / this.KURS_IEP);
        break;
      case this.WAEHRUNG_ITL:
        BetragInEuro = (Orginalbetrag / this.KURS_ITL);
        break;
      case this.WAEHRUNG_LUF:
        BetragInEuro = (Orginalbetrag / this.KURS_LUF);
        break;
      case this.WAEHRUNG_PTE:
        BetragInEuro = (Orginalbetrag / this.KURS_PTE);
        break;
      case this.WAEHRUNG_ESP:
        BetragInEuro = (Orginalbetrag / this.KURS_ESP);
        break;
      case this.WAEHRUNG_ATS:
        BetragInEuro = (Orginalbetrag / this.KURS_ATS);
        break;
      default:
        break;
      }

      switch (Zielwaehrung) {
      case this.WAEHRUNG_BEF:
        ZielKurs = this.KURS_BEF;
        break;
      case this.WAEHRUNG_DEM:
        ZielKurs = this.KURS_DEM;
        break;
      case this.WAEHRUNG_FIM:
        ZielKurs = this.KURS_FIM;
        break;
      case this.WAEHRUNG_FRF:
        ZielKurs = this.KURS_FRF;
        break;
      case this.WAEHRUNG_NLG:
        ZielKurs = this.KURS_NLG;
        break;
      case this.WAEHRUNG_IEP:
        ZielKurs = this.KURS_IEP;
        break;
      case this.WAEHRUNG_ITL:
        ZielKurs = this.KURS_ITL;
        break;
      case this.WAEHRUNG_LUF:
        ZielKurs = this.KURS_LUF;
        break;
      case this.WAEHRUNG_PTE:
        ZielKurs = this.KURS_PTE;
        break;
      case this.WAEHRUNG_ESP:
        ZielKurs = this.KURS_ESP;
        break;
      case this.WAEHRUNG_ATS:
        ZielKurs = this.KURS_ATS;
        break;
      default:
        break;
      }

      if (Zielwaehrung == this.WAEHRUNG_EUR)
        Zielbetrag = RundeNachkommastellen(BetragInEuro, 2);
      else {
        Zielbetrag = (BetragInEuro * ZielKurs);

        Zielbetrag = RundeNachkommastellen(Zielbetrag, 2);
      }

      return Zielbetrag;
    };



    // Liefert je nach Währung den Kurz- bzw. Langtext zurück
    this.getWaehrungsText = function (Waehrung, Textart) {
      var Text = "";

      switch (Waehrung) {
      case this.WAEHRUNG_SKK:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_SKK_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_SKK_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      case this.WAEHRUNG_BEF:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_BEF_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_BEF_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      case this.WAEHRUNG_DEM:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_DEM_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_DEM_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      case this.WAEHRUNG_FIM:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_FIM_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_FIM_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      case this.WAEHRUNG_FRF:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_FRF_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_FRF_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      case this.WAEHRUNG_NLG:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_NLG_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_NLG_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      case this.WAEHRUNG_IEP:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_IEP_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_IEP_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      case this.WAEHRUNG_ITL:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_ITL_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_ITL_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      case this.WAEHRUNG_LUF:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_LUF_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_LUF_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      case this.WAEHRUNG_PTE:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_PTE_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_PTE_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      case this.WAEHRUNG_ESP:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_ESP_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_ESP_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      case this.WAEHRUNG_ATS:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_ATS_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_ATS_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      case this.WAEHRUNG_EUR:
        {
          switch (Textart) {
          case this.KURZ:
            Text = this.WAEHRUNG_EUR_KURZTEXT;
            break;
          case this.LANG:
            Text = this.WAEHRUNG_EUR_LANGTEXT;
            break;
          default:
            Text = " ";
            break;
          }
        }
        break;
      default:
        Text = " ";
        break;
      }
      return Text;
    };


    // Ermittelt den Kurs der übergebenen Währung
    this.getKursFromWaehrung = function (Waehrung) {
      var Kurs;

      switch (Waehrung) {
      case this.WAEHRUNG_SKK:
        Kurs = KURS_SKK;
        break;
      case this.WAEHRUNG_BEF:
        Kurs = KURS_BEF;
        break;
      case this.WAEHRUNG_DEM:
        Kurs = KURS_DEM;
        break;
      case this.WAEHRUNG_FIM:
        Kurs = KURS_FIM;
        break;
      case this.WAEHRUNG_FRF:
        Kurs = KURS_FRF;
        break;
      case this.WAEHRUNG_NLG:
        Kurs = KURS_NLG;
        break;
      case this.WAEHRUNG_IEP:
        Kurs = KURS_IEP;
        break;
      case this.WAEHRUNG_ITL:
        Kurs = KURS_ITL;
        break;
      case this.WAEHRUNG_LUF:
        Kurs = KURS_LUF;
        break;
      case this.WAEHRUNG_PTE:
        Kurs = KURS_PTE;
        break;
      case this.WAEHRUNG_ESP:
        Kurs = KURS_ESP;
        break;
      case this.WAEHRUNG_ATS:
        Kurs = KURS_ATS;
        break;
      case this.WAEHRUNG_EUR:
        Kurs = 1.0;;
        break;
      default:
        Kurs = 0.0;
        break;
      }

      return Kurs;
    };

    this.MAX_ANZAHL_EURO_WAEHRUNGEN = 13;

    this.WAEHRUNG_ATS = 0;
    this.WAEHRUNG_BEF = 1;
    this.WAEHRUNG_DEM = 2;
    this.WAEHRUNG_ESP = 3;
    this.WAEHRUNG_EUR = 4;
    this.WAEHRUNG_FIM = 5;
    this.WAEHRUNG_FRF = 6;
    this.WAEHRUNG_IEP = 7;
    this.WAEHRUNG_ITL = 8;
    this.WAEHRUNG_LUF = 9;
    this.WAEHRUNG_NLG = 10;
    this.WAEHRUNG_PTE = 11;
    this.WAEHRUNG_SKK = 12;

    // Belgische Francs
    this.KURS_BEF = 40.339;
    // Deutsche Mark
    this.KURS_DEM = 1.95583;
    // Finnische Mark
    this.KURS_FIM = 5.94573;
    // Französische Francs
    this.KURS_FRF = 6.55957;
    // Niederländische Gulden
    this.KURS_NLG = 2.20371;
    // Irische Pfund
    this.KURS_IEP = 0.787564;
    // Italienische Lire
    this.KURS_ITL = 1936.27;
    // Luxemburgische Francs
    this.KURS_LUF = 40.3399;
    // Portugiesische Escudos
    this.KURS_PTE = 200.482;
    // Spanische Pesetas
    this.KURS_ESP = 166.386;
    // Österreichische Schilling
    this.KURS_ATS = 13.7603;

    this.KURS_SKK = 30.126000;

    // Textdefinitionen Kurztext
    this.WAEHRUNG_BEF_KURZTEXT = "BEF";
    this.WAEHRUNG_DEM_KURZTEXT = "DEM";
    this.WAEHRUNG_FIM_KURZTEXT = "FIM";
    this.WAEHRUNG_FRF_KURZTEXT = "FRF";
    this.WAEHRUNG_NLG_KURZTEXT = "NLG";
    this.WAEHRUNG_IEP_KURZTEXT = "IEP";
    this.WAEHRUNG_ITL_KURZTEXT = "ITL";
    this.WAEHRUNG_LUF_KURZTEXT = "LUF";
    this.WAEHRUNG_PTE_KURZTEXT = "PTE";
    this.WAEHRUNG_ESP_KURZTEXT = "ESP";
    this.WAEHRUNG_ATS_KURZTEXT = "ATS";
    this.WAEHRUNG_EUR_KURZTEXT = "EUR";
    this.WAEHRUNG_SKK_KURZTEXT = "SKK";

    // Textdefinitionen Langtext
    this.WAEHRUNG_BEF_LANGTEXT = "Belgische Francs";
    this.WAEHRUNG_DEM_LANGTEXT = "Deutsche Mark";
    this.WAEHRUNG_FIM_LANGTEXT = "Finnische Mark";
    this.WAEHRUNG_FRF_LANGTEXT = "Französische Francs";
    this.WAEHRUNG_NLG_LANGTEXT = "Niederländische Gulden";
    this.WAEHRUNG_IEP_LANGTEXT = "Irische Pfund";
    this.WAEHRUNG_ITL_LANGTEXT = "Italienische Lire";
    this.WAEHRUNG_LUF_LANGTEXT = "Luxemburgische Francs";
    this.WAEHRUNG_PTE_LANGTEXT = "Portugiesische Escudos";
    this.WAEHRUNG_ESP_LANGTEXT = "Spanische Pesetas";
    this.WAEHRUNG_ATS_LANGTEXT = "Österreichische Schilling";
    this.WAEHRUNG_EUR_LANGTEXT = "Euro";
    this.WAEHRUNG_SKK_LANGTEXT = "Slowakische Kronen";

    // Kurz- oder Langtext?
    this.LANG = 0;
    this.KURZ = 1;
  }

  return EuroUmrechnung;

});
