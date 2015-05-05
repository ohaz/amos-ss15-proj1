define({

  input: {
	Veranlagungsform: 0,
	Veranlagungszeitraum: 2010,
	Kirchensteuer: 3.00,
	Sonderausgaben: 8800,
	ek_LuF: 1400,
	ek_Gewerbebetrieb: 224000,
	ek_Messbetrag: 4300,
	ek_SelbstArbeit: 196000,
	ek_NichtSelbstArbeit: 465000,
	ek_Kapital: 856890,
	ek_Vermietung: 44000,
	ek_Sonstiges: 17900
  },

  expectedOutput: {
	GesamtEinkuenfte: 948300,
	abgeltungsteuer_22: 212627.79156327542,
	durchschn_steuersatz_24: 43.32,
	einkommen_12: 939500,
	festzusetzende_est_16: 603368.7915632754,
	grenzsteuersatz_26: 45,
	kirchensteuer_20: 18590.833746898264,
	solidaritaetszuschlag_18: 33184.52853598015,
	tarifliche_est_14: 407081
  }
});
