define({

  input: {
	Veranlagungsform: 0,
	Veranlagungszeitraum: 2012,
	Kirchensteuer: 9.00,
	Sonderausgaben: 0,
	ek_LuF: 0,
	ek_Gewerbebetrieb: 0,
	ek_Messbetrag: 0,
	ek_SelbstArbeit: 0,
	ek_NichtSelbstArbeit: 0,
	ek_Kapital: 0,
	ek_Vermietung: 0,
	ek_Sonstiges: 0
  },

  expectedOutput: {
	GesamtEinkuenfte: 0,
	abgeltungsteuer_22: 0,
	durchschn_steuersatz_24: 0,
	einkommen_12: 0,
	festzusetzende_est_16: 0,
	grenzsteuersatz_26: 0,
	kirchensteuer_20: 0,
	solidaritaetszuschlag_18: 0,
	tarifliche_est_14: 0
  }
});
