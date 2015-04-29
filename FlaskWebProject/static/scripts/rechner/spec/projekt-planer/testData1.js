define({

  input: {
    berechnungsziel: 0,
    berechnungsjahr: 2012,
    starttermin: new Date("Tue Jan 15 12:00:00 2013"),
    endtermin: new Date("Wed Jan 16 12:00:00 2013"),
    projektdauer: 1,
    bundesland: 4,
    konfession: 1,
    abzuegeInTagen: 1,
    abzuegeInProzent: 0.00,
    personenzahl: 1,
    personenzahl_schrittweite: 1
  },

  expectedOutput: [{
    Abzuege: 1,
    Arbeitstage: 249,
    ArbeitstageGesamt: 249,
    Brueckentage: 6,
    DatumBis: new Date("Mon Dec 31 00:00:00 2012"),
    DatumVon: new Date("Sun Jan 1 00:00:00 2012"),
    Feiertage: 12,
    FeiertageDetails: [{
      datum: new Date("Fri Jan 6 00:00:00 2012"),
      feiertag: "Hl. Drei Könige"
    }, {
      datum: new Date("Fri Apr 6 00:00:00 2012"),
      feiertag: "Karfreitag"
    }, {
      datum: new Date("Mon Apr 9 00:00:00 2012"),
      feiertag: "Ostermontag"
    }, {
      datum: new Date("Tue May 1 00:00:00 2012"),
      feiertag: "Maifeiertag"
    }, {
      datum: new Date("Thu May 17 00:00:00 2012"),
      feiertag: "Himmelfahrt"
    }, {
      datum: new Date("Mon May 28 00:00:00 2012"),
      feiertag: "Pfingstmontag"
    }, {
      datum: new Date("Thu Jun 7 00:00:00 2012"),
      feiertag: "Fronleichnam"
    }, {
      datum: new Date("Wed Aug 15 00:00:00 2012"),
      feiertag: "Maria Himmelfahrt"
    }, {
      datum: new Date("Wed Oct 3 00:00:00 2012"),
      feiertag: "Tag der Dt. Einheit"
    }, {
      datum: new Date("Thu Nov 1 00:00:00 2012"),
      feiertag: "Allerheiligen"
    }, {
      datum: new Date("Tue Dec 25 00:00:00 2012"),
      feiertag: "1. Weihnachtstag"
    }, {
      datum: new Date("Wed Dec 26 00:00:00 2012"),
      feiertag: "2. Weihnachtstag"
    }],
    Kalendertage: 366,
    Nettoarbeitstage: 248,
    Personenzahl: 1,
    SonSamstage: 105
  }, {
    Abzuege: 0,
    Arbeitstage: 21,
    ArbeitstageGesamt: 21,
    Brueckentage: 0,
    DatumBis: new Date("Tue Jan 31 00:00:00 2012"),
    DatumVon: new Date("Sun Jan 1 00:00:00 2012"),
    Feiertage: 1,
    FeiertageDetails: [{
      datum: new Date("Fri Jan 6 00:00:00 2012"),
      feiertag: "Hl. Drei Könige"
    }],
    Kalendertage: 31,
    Nettoarbeitstage: 21,
    Personenzahl: 1,
    SonSamstage: 9
  }, {
    Abzuege: 0,
    Arbeitstage: 21,
    ArbeitstageGesamt: 21,
    Brueckentage: 0,
    DatumBis: new Date("Wed Feb 29 00:00:00 2012"),
    DatumVon: new Date("Wed Feb 1 00:00:00 2012"),
    Feiertage: 0,
    FeiertageDetails: [],
    Kalendertage: 29,
    Nettoarbeitstage: 21,
    Personenzahl: 1,
    SonSamstage: 8
  }, {
    Abzuege: 0,
    Arbeitstage: 22,
    ArbeitstageGesamt: 22,
    Brueckentage: 0,
    DatumBis: new Date("Sat Mar 31 00:00:00 2012"),
    DatumVon: new Date("Thu Mar 1 00:00:00 2012"),
    Feiertage: 0,
    FeiertageDetails: [],
    Kalendertage: 31,
    Nettoarbeitstage: 22,
    Personenzahl: 1,
    SonSamstage: 9
  }, {
    Abzuege: 0,
    Arbeitstage: 19,
    ArbeitstageGesamt: 19,
    Brueckentage: 1,
    DatumBis: new Date("Mon Apr 30 00:00:00 2012"),
    DatumVon: new Date("Sun Apr 1 00:00:00 2012"),
    Feiertage: 2,
    FeiertageDetails: [{
      datum: new Date("Fri Apr 6 00:00:00 2012"),
      feiertag: "Karfreitag"
    }, {
      datum: new Date("Mon Apr 9 00:00:00 2012"),
      feiertag: "Ostermontag"
    }],
    Kalendertage: 30,
    Nettoarbeitstage: 19,
    Personenzahl: 1,
    SonSamstage: 9
  }, {
    Abzuege: 0,
    Arbeitstage: 20,
    ArbeitstageGesamt: 20,
    Brueckentage: 1,
    DatumBis: new Date("Thu May 31 00:00:00 2012"),
    DatumVon: new Date("Tue May 1 00:00:00 2012"),
    Feiertage: 3,
    FeiertageDetails: [{
      datum: new Date("Tue May 1 00:00:00 2012"),
      feiertag: "Maifeiertag"
    }, {
      datum: new Date("Thu May 17 00:00:00 2012"),
      feiertag: "Himmelfahrt"
    }, {
      datum: new Date("Mon May 28 00:00:00 2012"),
      feiertag: "Pfingstmontag"
    }],
    Kalendertage: 31,
    Nettoarbeitstage: 20,
    Personenzahl: 1,
    SonSamstage: 8
  }, {
    Abzuege: 0,
    Arbeitstage: 20,
    ArbeitstageGesamt: 20,
    Brueckentage: 1,
    DatumBis: new Date("Sat Jun 30 00:00:00 2012"),
    DatumVon: new Date("Fri Jun 1 00:00:00 2012"),
    Feiertage: 1,
    FeiertageDetails: [{
      datum: new Date("Thu Jun 7 00:00:00 2012"),
      feiertag: "Fronleichnam"
    }],
    Kalendertage: 30,
    Nettoarbeitstage: 20,
    Personenzahl: 1,
    SonSamstage: 9
  }, {
    Abzuege: 0,
    Arbeitstage: 22,
    ArbeitstageGesamt: 22,
    Brueckentage: 0,
    DatumBis: new Date("Tue Jul 31 00:00:00 2012"),
    DatumVon: new Date("Sun Jul 1 00:00:00 2012"),
    Feiertage: 0,
    FeiertageDetails: [],
    Kalendertage: 31,
    Nettoarbeitstage: 22,
    Personenzahl: 1,
    SonSamstage: 9
  }, {
    Abzuege: 0,
    Arbeitstage: 22,
    ArbeitstageGesamt: 22,
    Brueckentage: 0,
    DatumBis: new Date("Fri Aug 31 00:00:00 2012"),
    DatumVon: new Date("Wed Aug 1 00:00:00 2012"),
    Feiertage: 1,
    FeiertageDetails: [{
      datum: new Date("Wed Aug 15 00:00:00 2012"),
      feiertag: "Maria Himmelfahrt"
    }],
    Kalendertage: 31,
    Nettoarbeitstage: 22,
    Personenzahl: 1,
    SonSamstage: 8
  }, {
    Abzuege: 0,
    Arbeitstage: 20,
    ArbeitstageGesamt: 20,
    Brueckentage: 0,
    DatumBis: new Date("Sun Sep 30 00:00:00 2012"),
    DatumVon: new Date("Sat Sep 1 00:00:00 2012"),
    Feiertage: 0,
    FeiertageDetails: [],
    Kalendertage: 30,
    Nettoarbeitstage: 20,
    Personenzahl: 1,
    SonSamstage: 10
  }, {
    Abzuege: 0,
    Arbeitstage: 22,
    ArbeitstageGesamt: 22,
    Brueckentage: 0,
    DatumBis: new Date("Wed Oct 31 00:00:00 2012"),
    DatumVon: new Date("Mon Oct 1 00:00:00 2012"),
    Feiertage: 1,
    FeiertageDetails: [{
      datum: new Date("Wed Oct 3 00:00:00 2012"),
      feiertag: "Tag der Dt. Einheit"
    }],
    Kalendertage: 31,
    Nettoarbeitstage: 22,
    Personenzahl: 1,
    SonSamstage: 8
  }, {
    Abzuege: 0,
    Arbeitstage: 21,
    ArbeitstageGesamt: 21,
    Brueckentage: 1,
    DatumBis: new Date("Fri Nov 30 00:00:00 2012"),
    DatumVon: new Date("Thu Nov 1 00:00:00 2012"),
    Feiertage: 1,
    FeiertageDetails: [{
      datum: new Date("Thu Nov 1 00:00:00 2012"),
      feiertag: "Allerheiligen"
    }],
    Kalendertage: 30,
    Nettoarbeitstage: 21,
    Personenzahl: 1,
    SonSamstage: 8
  }, {
    Abzuege: 1,
    Arbeitstage: 19,
    ArbeitstageGesamt: 19,
    Brueckentage: 2,
    DatumBis: new Date("Mon Dec 31 00:00:00 2012"),
    DatumVon: new Date("Sat Dec 1 00:00:00 2012"),
    Feiertage: 2,
    FeiertageDetails: [{
      datum: new Date("Tue Dec 25 00:00:00 2012"),
      feiertag: "1. Weihnachtstag"
    }, {
      datum: new Date("Wed Dec 26 00:00:00 2012"),
      feiertag: "2. Weihnachtstag"
    }],
    Kalendertage: 31,
    Nettoarbeitstage: 18,
    Personenzahl: 1,
    SonSamstage: 10
  }]
});
