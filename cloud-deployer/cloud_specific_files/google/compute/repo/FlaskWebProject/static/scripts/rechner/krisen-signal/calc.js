//=============================================================================
//@MFUNC   Zeigt einen <c CQuoten> Dialog an. Dieser bekommt einen Pointer auf
// ein <c CInsoprog> Objekt mitgegeben, welches in dieser Methode
// ezeugt wurde und mit den Berechnungsdaten initalisiert wurde
//-----------------------------------------------------------------------------
define([
  './krisenSignalPrognose'
], function (
  Prognose
) {

  function calc(input) {

    var InputOrdentlErgebnis = input.InputOrdentlErgebnis,
      InputBankLieferVerbindlichkeiten = input.InputBankLieferVerbindlichkeiten,
      InputZinsaufwand = input.InputZinsaufwand,
      InputKurzFristVerbindlichkeiten = input.InputKurzFristVerbindlichkeiten,
      InputRatingEigenkapital = input.InputRatingEigenkapital,
      InputNettoBilanzsumme = input.InputNettoBilanzsumme,
      InputFremdkapital = input.InputFremdkapital,
      InputUmsatzerloese = input.InputUmsatzerloese,
      InputRatingBilanzsumme = input.InputRatingBilanzsumme,
      OutputOrdenlichesErgebnis = input.OutputOrdenlichesErgebnis,
      OutputBankLieferanten = input.OutputBankLieferanten,
      OutputFremdkapitalkosten = input.OutputFremdkapitalkosten,
      OutputKurzFristVerbindlichkeit = input.OutputKurzFristVerbindlichkeit,
      OutputEigenmittel = input.OutputEigenmittel;

    var MyPrognose = new Prognose();

    MyPrognose.SetBerechnungswerte(InputBankLieferVerbindlichkeiten,
      InputFremdkapital,
      InputKurzFristVerbindlichkeiten,
      InputNettoBilanzsumme,
      InputOrdentlErgebnis,
      InputRatingBilanzsumme,
      InputRatingEigenkapital,
      InputUmsatzerloese,
      InputZinsaufwand);

    var krisensignal_man = MyPrognose.GetKrisensignalw_man(OutputOrdenlichesErgebnis,
      OutputBankLieferanten,
      OutputFremdkapitalkosten,
      OutputKurzFristVerbindlichkeit,
      OutputEigenmittel);


    var quoten = {
      ordenlichesErgebnis: {
        ordenlichesErgebnis: MyPrognose.GetOrdentlErgebnis(),
        nettobilanzsumme: MyPrognose.GetNettoBilanzsumme(),
        quote: MyPrognose.GetQOrdentlErgebnis()
      },
      bankLieferanten: {
        bankLieferanten: MyPrognose.GetBankLieferVerbindlichkeiten(),
        nettobilanzsumme: MyPrognose.GetNettoBilanzsumme(),
        quote: MyPrognose.GetQBankLieferanten()
      },
      fremdkapitalkosten: {
        zinsaufwand: MyPrognose.GetZinsaufwand(),
        fremdkapital: MyPrognose.GetFremdkapital(),
        quote: MyPrognose.GetQFremdkapitalkosten()
      },
      kurzFristVerbindlichkeit: {
        kurzFristVerbindlichkeit: MyPrognose.GetKurzFristVerbindlichkeiten(),
        umsatzerloese: MyPrognose.GetUmsatzerloese(),
        quote: MyPrognose.GetQKurzFristVerbindlichkeiten()
      },
      eigenmittel: {
        ratingEigenkapital: MyPrognose.GetRatingEigenkapital(),
        ratingBilanzsumme: MyPrognose.GetRatingBilanzsumme(),
        quote: MyPrognose.GetQEigenmittel()
      },
      krisenSignalwert: {
        quote: MyPrognose.GetKrisensignalw(),
        ausfallwahrscheinlichkeit: MyPrognose.GetAusfallwahrscheinlichkeit(MyPrognose.GetKrisensignalw()),
        ausfallwahrscheinlichkeitNote: MyPrognose.GetAusfallwahrscheinlichkeitNote(MyPrognose.GetAusfallwahrscheinlichkeit(MyPrognose.GetKrisensignalw()))
      },
      krisenSignalwertBerechnet: krisensignal_man
    };

    return quoten;



  }

  return calc;

});
