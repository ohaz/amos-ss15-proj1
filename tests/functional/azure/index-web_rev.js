define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    registerSuite({
        name: 'index-web_rev',

        // before the suite starts
        setup: function () {
            return this.remote
                .setFindTimeout(5000)
                .findById('shared_widgets_NumberInput_2')
                    .click()
                    .type('1360,66')
                    .pressKeys('\uE007')
                    .end();
        },


        '1_2015_Lohnsteuer': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_0')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '206,91',
                        'Solidaritätszuschlag should be 206,91 for a netto 1360,66');
                });
        },

        '1_2015_Solidaritaetszuschlag': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_2')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '11,38',
                        'Solidaritaetszuschlag should be 11,38 for a netto 1360,66');
                });
        },

        '1_2015_Kirchensteuer': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_4')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '16,55',
                        'Kirchensteuer should be 16,55 for a netto 1360,66');
                });
        },

        '1_2015_ST-SUMME': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_6')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '234,84',
                        'ST-SUMME should be 234,84 for a netto 1360,66');
                });
        },

        '1_2015_Krankenversicherung': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_8')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '163,99',
                        'Krankenversicherung should be 164,00 for a netto 1360,66');
                });
        },

        '1_2015_Pflegeversicherung': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_10')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '23,50',
                        'Pflegeversicherung should be 23,50 for a netto 1360,66');
                });
        },

        '1_2015_Rentenversicherung': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_14')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '187,00',
                        'Rentenversicherung should be 187,00 for a netto 1360,66');
                });
        },

        '1_2015_Arbeitslosenversicherung': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_16')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '29,99',
                        'Arbeitslosenversicherung should be 30,00 for a netto 1360,66');
                });
        },

        '1_2015_SV-SUMME': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_18')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '404,48',
                        'SV-SUMME should be 404,48 for a netto 1360,66');
                });
        },

        '1_2015_brutto': function () {
            return this.remote
                .findById('shared_widgets_NumberInput_0')
                .getValue()
                .then(function (text) {
                    assert.strictEqual(text, '1.999,98',
                        'Brutto should be 1.999,98 for a netto 1360,66');
                });
        }

    });
});
