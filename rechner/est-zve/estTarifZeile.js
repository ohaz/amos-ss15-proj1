define(function () {
  "use strict";

  //-------------TarifzeilenObjekt-----------------------

  function Tarifzeile(zvE) {
    this.zvE = zvE; //ZuVersteuerndesEinkommen
    this.Tarif; //Tarif est
    this.Grenzsteuer; //Grenzsteuersatz
    this.Durchschnitt; //Durchschnittsteuersatz
    this.Soli; //Solidaritaetszuschlag
    this.m_Waehrung; //Waehrung
  }

  //----------------Setter---------------------------------------
  Tarifzeile.prototype.setzvE = function (value) { // Setter zvE
    this.zvE = value;
  };
  Tarifzeile.prototype.setTarif = function (value) { //Setter Tarif
    this.Tarif = value; //setTarif(Tarif);
  };
  Tarifzeile.prototype.setGrenzsteuer = function (value) { //Setter Grenzsteuer
    this.Grenzsteuer = value;
  };
  Tarifzeile.prototype.setDurchschnitt = function (value) { //Setter Durchschnitt
    this.Durchschnitt = value;
  };
  Tarifzeile.prototype.setSoli = function (value) { //Setter Soli
    this.Soli = value;
  };
  Tarifzeile.prototype.setWaehrung = function (value) { //Setter m_Waehrung
    this.m_Waehrung = value; //  m_Waehrung = WAEHRUNG_EUR;
  };

  Tarifzeile.prototype.getZuVersteuerndesEinkommen = function () {
    return this.zvE;
  };

  Tarifzeile.prototype.getTarif = function () {
    return this.Tarif;
  };

  Tarifzeile.prototype.getDurchschnittsteuersatz = function () {
    return this.Durchschnitt;
  };

  Tarifzeile.prototype.getGrenzsteuersatz = function () {
    return this.Grenzsteuer;
  };

  Tarifzeile.prototype.getSolidaritaetszuschlag = function () {
    return this.Soli;
  };

  return Tarifzeile;

});
