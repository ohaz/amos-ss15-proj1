define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    registerSuite({
        name: 'index',


        'Lohnsteuer': function () {
			return this.remote
                .get(require.toUrl('rechner-brutto-netto/index~web.html'))
                .setFindTimeout(5000)
                .findById('shared_widgets_NumberInput_0')
                    .click()
                    .type('2000')
                    .pressKeys('\uE007')
                    .end()
                .findById('shared_widgets_NumberOutput_0')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '206,91',
                        'Solidaritätszuschlag should be 206,91 for a brutto 2000');
                });
        },

        'Solidaritaetszuschlag': function () {
            return this.remote
                .get(require.toUrl('rechner-brutto-netto/index~web.html'))
                .setFindTimeout(5000)
                .findById('shared_widgets_NumberInput_0')
                .click()
                .type('2000')
                .pressKeys('\uE007')
                .end()
                .findById('shared_widgets_NumberOutput_2')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '11,38',
                        'Solidaritaetszuschlag should be 11,38 for a brutto 2000');
                });
        }
    });
});