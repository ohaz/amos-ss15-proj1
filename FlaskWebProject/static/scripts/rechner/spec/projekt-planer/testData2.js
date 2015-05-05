define({

  input: {
    berechnungsziel: 3,
    berechnungsjahr: 2013,
    starttermin: new Date("Wed May 01 12:00:00 2013"),
    endtermin: new Date("Fri May 31 12:00:00 2013"),
    projektdauer: 60,
    bundesland: 4,
    konfession: 1,
    abzuegeInTagen: 1,
    abzuegeInProzent: 0.00,
    personenzahl: 2,
    personenzahl_schrittweite: 1
  },

  expectedOutput: [{
    Kalendertage: 49,
    SonSamstage: 14,
    Feiertage: 4,
    Brueckentage: 2,
    Arbeitstage: 31,
    Personenzahl: 2,
    ArbeitstageGesamt: 62,
    Abzuege: 1,
    Nettoarbeitstage: 61,
    DatumVon: new Date("Wed May 01 00:00:00 2013"),
    DatumBis: new Date("Tue Jun 18 00:00:00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00:00:00 2013")
    }, {
      feiertag: 'Himmelfahrt',
      datum: new Date("Thu May 09 00:00:00 2013")
    }, {
      feiertag: 'Pfingstmontag',
      datum: new Date("Mon May 20 00:00:00 2013")
    }, {
      feiertag: 'Fronleichnam',
      datum: new Date("Thu May 30 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 35,
    SonSamstage: 10,
    Feiertage: 4,
    Brueckentage: 2,
    Arbeitstage: 21,
    Personenzahl: 3,
    ArbeitstageGesamt: 63,
    Abzuege: 1,
    Nettoarbeitstage: 62,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Tue Jun 04 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }, {
      feiertag: 'Himmelfahrt',
      datum: new Date("Thu May 09 00: 00: 00 2013")
    }, {
      feiertag: 'Pfingstmontag',
      datum: new Date("Mon May 20 00: 00: 00 2013")
    }, {
      feiertag: 'Fronleichnam',
      datum: new Date("Thu May 30 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 27,
    SonSamstage: 8,
    Feiertage: 3,
    Brueckentage: 1,
    Arbeitstage: 16,
    Personenzahl: 4,
    ArbeitstageGesamt: 64,
    Abzuege: 1,
    Nettoarbeitstage: 63,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Mon May 27 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }, {
      feiertag: 'Himmelfahrt',
      datum: new Date("Thu May 09 00: 00: 00 2013")
    }, {
      feiertag: 'Pfingstmontag',
      datum: new Date("Mon May 20 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 22,
    SonSamstage: 6,
    Feiertage: 3,
    Brueckentage: 1,
    Arbeitstage: 13,
    Personenzahl: 5,
    ArbeitstageGesamt: 65,
    Abzuege: 1,
    Nettoarbeitstage: 64,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Wed May 22 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }, {
      feiertag: 'Himmelfahrt',
      datum: new Date("Thu May 09 00: 00: 00 2013")
    }, {
      feiertag: 'Pfingstmontag',
      datum: new Date("Mon May 20 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 17,
    SonSamstage: 4,
    Feiertage: 2,
    Brueckentage: 1,
    Arbeitstage: 11,
    Personenzahl: 6,
    ArbeitstageGesamt: 66,
    Abzuege: 1,
    Nettoarbeitstage: 65,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Fri May 17 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }, {
      feiertag: 'Himmelfahrt',
      datum: new Date("Thu May 09 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 15,
    SonSamstage: 4,
    Feiertage: 2,
    Brueckentage: 1,
    Arbeitstage: 9,
    Personenzahl: 7,
    ArbeitstageGesamt: 63,
    Abzuege: 1,
    Nettoarbeitstage: 62,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Wed May 15 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }, {
      feiertag: 'Himmelfahrt',
      datum: new Date("Thu May 09 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 14,
    SonSamstage: 4,
    Feiertage: 2,
    Brueckentage: 1,
    Arbeitstage: 8,
    Personenzahl: 8,
    ArbeitstageGesamt: 64,
    Abzuege: 1,
    Nettoarbeitstage: 63,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Tue May 14 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }, {
      feiertag: 'Himmelfahrt',
      datum: new Date("Thu May 09 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 13,
    SonSamstage: 4,
    Feiertage: 2,
    Brueckentage: 1,
    Arbeitstage: 7,
    Personenzahl: 9,
    ArbeitstageGesamt: 63,
    Abzuege: 1,
    Nettoarbeitstage: 62,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Mon May 13 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }, {
      feiertag: 'Himmelfahrt',
      datum: new Date("Thu May 09 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 13,
    SonSamstage: 4,
    Feiertage: 2,
    Brueckentage: 1,
    Arbeitstage: 7,
    Personenzahl: 10,
    ArbeitstageGesamt: 70,
    Abzuege: 1,
    Nettoarbeitstage: 69,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Mon May 13 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }, {
      feiertag: 'Himmelfahrt',
      datum: new Date("Thu May 09 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 10,
    SonSamstage: 2,
    Feiertage: 2,
    Brueckentage: 1,
    Arbeitstage: 6,
    Personenzahl: 11,
    ArbeitstageGesamt: 66,
    Abzuege: 1,
    Nettoarbeitstage: 65,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Fri May 10 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }, {
      feiertag: 'Himmelfahrt',
      datum: new Date("Thu May 09 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 10,
    SonSamstage: 2,
    Feiertage: 2,
    Brueckentage: 1,
    Arbeitstage: 6,
    Personenzahl: 12,
    ArbeitstageGesamt: 72,
    Abzuege: 1,
    Nettoarbeitstage: 71,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Fri May 10 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }, {
      feiertag: 'Himmelfahrt',
      datum: new Date("Thu May 09 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 8,
    SonSamstage: 2,
    Feiertage: 1,
    Brueckentage: 0,
    Arbeitstage: 5,
    Personenzahl: 13,
    ArbeitstageGesamt: 65,
    Abzuege: 1,
    Nettoarbeitstage: 64,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Wed May 08 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 8,
    SonSamstage: 2,
    Feiertage: 1,
    Brueckentage: 0,
    Arbeitstage: 5,
    Personenzahl: 14,
    ArbeitstageGesamt: 70,
    Abzuege: 1,
    Nettoarbeitstage: 69,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Wed May 08 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 8,
    SonSamstage: 2,
    Feiertage: 1,
    Brueckentage: 0,
    Arbeitstage: 5,
    Personenzahl: 15,
    ArbeitstageGesamt: 75,
    Abzuege: 1,
    Nettoarbeitstage: 74,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Wed May 08 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 7,
    SonSamstage: 2,
    Feiertage: 1,
    Brueckentage: 0,
    Arbeitstage: 4,
    Personenzahl: 16,
    ArbeitstageGesamt: 64,
    Abzuege: 1,
    Nettoarbeitstage: 63,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Tue May 07 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 7,
    SonSamstage: 2,
    Feiertage: 1,
    Brueckentage: 0,
    Arbeitstage: 4,
    Personenzahl: 17,
    ArbeitstageGesamt: 68,
    Abzuege: 1,
    Nettoarbeitstage: 67,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Tue May 07 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 7,
    SonSamstage: 2,
    Feiertage: 1,
    Brueckentage: 0,
    Arbeitstage: 4,
    Personenzahl: 18,
    ArbeitstageGesamt: 72,
    Abzuege: 1,
    Nettoarbeitstage: 71,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Tue May 07 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 7,
    SonSamstage: 2,
    Feiertage: 1,
    Brueckentage: 0,
    Arbeitstage: 4,
    Personenzahl: 19,
    ArbeitstageGesamt: 76,
    Abzuege: 1,
    Nettoarbeitstage: 75,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Tue May 07 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 7,
    SonSamstage: 2,
    Feiertage: 1,
    Brueckentage: 0,
    Arbeitstage: 4,
    Personenzahl: 20,
    ArbeitstageGesamt: 80,
    Abzuege: 1,
    Nettoarbeitstage: 79,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Tue May 07 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }]
  }, {
    Kalendertage: 6,
    SonSamstage: 2,
    Feiertage: 1,
    Brueckentage: 0,
    Arbeitstage: 3,
    Personenzahl: 21,
    ArbeitstageGesamt: 63,
    Abzuege: 1,
    Nettoarbeitstage: 62,
    DatumVon: new Date("Wed May 01 00: 00: 00 2013"),
    DatumBis: new Date("Mon May 06 00: 00: 00 2013"),
    FeiertageDetails: [{
      feiertag: 'Maifeiertag',
      datum: new Date("Wed May 01 00: 00: 00 2013")
    }]
  }]
});
