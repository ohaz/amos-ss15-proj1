define({

  input: {
	Veranlagungsform: 1,
	Veranlagungszeitraum: 2012,
	Kirchensteuer: 12.00,
	Sonderausgaben: 400,
	ek_LuF: 12,
	ek_Gewerbebetrieb: 900,
	ek_Messbetrag: 400,
	ek_SelbstArbeit: 300,
	ek_NichtSelbstArbeit: 100,
	ek_Kapital: 5000,
	ek_Vermietung: 200,
	ek_Sonstiges: 75
  },

  expectedOutput: {
	GesamtEinkuenfte: 1587,
	abgeltungsteuer_22: 1213.5922330097087,
	durchschn_steuersatz_24: 0,
	einkommen_12: 1187,
	festzusetzende_est_16: 1213.5922330097087,
	grenzsteuersatz_26: 0,
	kirchensteuer_20: 145.63106796116506,
	solidaritaetszuschlag_18: 66.74757281553398,
	tarifliche_est_14: 0
  }
});
