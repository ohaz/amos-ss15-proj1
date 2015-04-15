define(function () {
  return function CBruttoNettoErgebnis() {
    // CBruttoNettoErgebnis();
    // CBruttoNettoErgebnis( double dBMGKirchensteuer, double dLohnsteuer, double dKirchensteuer, double dSolidaritaetszuschlag, double dPauschabzug,double dNettolohn, double dNettolohnmitPauschAbzug);
    // CBruttoNettoErgebnis( double dBMGKirchensteuer, double dLohnsteuer, double dKirchensteuer, double dSolidaritaetszuschlag, double dNettolohn, double dRVBeitrag, double dAVBeitrag, double dKVBeitrag, double dPVBeitrag);

    this.getBMGKirchensteuer = function () {
      return this.m_dBMGKirchensteuer;
    };
    this.setBMGKirchensteuer = function (dBMGKirchensteuer) {
      this.m_dBMGKirchensteuer = dBMGKirchensteuer;
    };
    this.getLohnsteuer = function () {
      return this.m_dLohnsteuer;
    };
    this.setLohnsteuer = function (dLohnsteuer) {
      this.m_dLohnsteuer = dLohnsteuer;
    };
    this.getKirchensteuer = function () {
      return this.m_dKirchensteuer;
    };
    this.setKirchensteuer = function (dKirchensteuer) {
      this.m_dKirchensteuer = dKirchensteuer;
    };
    this.getSolidaritaetszuschlag = function () {
      return this.m_dSolidaritaetszuschlag;
    };
    this.setSolidaritaetszuschlag = function (dSolidaritaetszuschlag) {
      this.m_dSolidaritaetszuschlag = dSolidaritaetszuschlag;
    };
    this.getNettolohn = function () {
      return this.m_dNettolohn;
    };
    this.setNettolohn = function (dNettolohn) {
      this.m_dNettolohn = dNettolohn;
    };
    this.getTabellenOben = function () {
      return this.m_dTabellenOben;
    };
    this.setTabellenOben = function (dTabellenOben) {
      this.m_dTabellenOben = dTabellenOben;
    };
    this.getTabellenUnten = function () {
      return this.m_dTabellenUnten;
    };
    this.setTabellenUnten = function (dTabellenUnten) {
      this.m_dTabellenUnten = dTabellenUnten;
    };
    this.getPauschAbzug = function () {
      return this.m_dPauschAbzug;
    };
    this.setPauschAbzug = function (dPauschAbzug) {
      this.m_dPauschAbzug = dPauschAbzug;
    };
    this.getNettolohnmitPauschAbzug = function () {
      return this.m_dNettolohnmitPauschAbzug;
    };
    this.setNettolohnmitPauschAbzug = function (dNettolohnmitPauschAbzug) {
      this.m_dNettolohnmitPauschAbzug = dNettolohnmitPauschAbzug;
    };

    this.getRVBeitrag = function () {
      return this.m_dRVBeitrag;
    };
    this.setRVBeitrag = function (dRVBeitrag) {
      this.m_dRVBeitrag = dRVBeitrag;
    };
    this.getAVBeitrag = function () {
      return this.m_dAVBeitrag;
    };
    this.setAVBeitrag = function (dAVBeitrag) {
      this.m_dAVBeitrag = dAVBeitrag;
    };
    this.getKVBeitrag = function () {
      return this.m_dKVBeitrag;
    };
    this.setKVBeitrag = function (dKVBeitrag) {
      this.m_dKVBeitrag = dKVBeitrag;
    };
    this.getPVBeitrag = function () {
      return this.m_dPVBeitrag;
    };
    this.setPVBeitrag = function (dPVBeitrag) {
      this.m_dPVBeitrag = dPVBeitrag;
    };

    this.setBeitragPrivateKVPV = function (dBeitragPrivateKV) {
      this.m_dBeitragPrivateKV = dBeitragPrivateKV;
    };
    this.getBeitragPrivateKVPV = function () {
      return this.m_dBeitragPrivateKV;
    };

    this.setBruttoLohn = function (dBruttolohn) {
      this.m_dBruttolohn = dBruttolohn;
    };
    this.getBruttoLohn = function () {
      return this.m_dBruttolohn;
    };
    this.setSteuerklasse = function (dSteuerklasse) {
      this.m_dSteuerklasse = dSteuerklasse;
    };
    this.getSteuerklasse = function () {
      return this.m_dSteuerklasse;
    };


    // double m_dBMGKirchensteuer;
    // double m_dLohnsteuer;
    // double m_dKirchensteuer;
    // double m_dSolidaritaetszuschlag;
    // double m_dPauschAbzug;
    // double m_dNettolohn;
    // double m_dNettolohnmitPauschAbzug;
    // double m_dTabellenOben;
    // double m_dTabellenUnten;

    // double m_dRVBeitrag;
    // double m_dAVBeitrag;
    // double m_dKVBeitrag;
    // double m_dPVBeitrag;

  };

});

// function CBruttoNettoErgebnis()
// {
//   m_dBMGKirchensteuer = 0.0;
//   m_dKirchensteuer = 0.0;
//   m_dSolidaritaetszuschlag = 0.0;
//   m_dLohnsteuer = 0.0;
//   m_dNettolohn = 0.0;

// }

// function CBruttoNettoErgebnis(dBMGKirchensteuer, dLohnsteuer, dKirchensteuer, dSolidaritaetszuschlag, dPauschAbzug, dNettolohn, dNettolohnmitPauschAbzug)
// {
//   m_dBMGKirchensteuer = dBMGKirchensteuer;
//   m_dKirchensteuer = dKirchensteuer;
//   m_dSolidaritaetszuschlag = dSolidaritaetszuschlag;
//   m_dLohnsteuer = dLohnsteuer;
//   m_dNettolohn = dNettolohn;
//   m_dPauschAbzug = dPauschAbzug;
//   m_dNettolohnmitPauschAbzug = dNettolohnmitPauschAbzug;
// }

// function CBruttoNettoErgebnis(dBMGKirchensteuer, dLohnsteuer, dKirchensteuer, dSolidaritaetszuschlag, dNettolohn, dRVBeitrag, dAVBeitrag, dKVBeitrag, dPVBeitrag)
// {
//   m_dBMGKirchensteuer = dBMGKirchensteuer;
//   m_dKirchensteuer = dKirchensteuer;
//   m_dSolidaritaetszuschlag = dSolidaritaetszuschlag;
//   m_dLohnsteuer = dLohnsteuer;
//   m_dNettolohn = dNettolohn;

//   m_dRVBeitrag = dRVBeitrag;
//   m_dAVBeitrag = dAVBeitrag;
//   m_dKVBeitrag = dKVBeitrag;
//   m_dPVBeitrag = dPVBeitrag;
// }
