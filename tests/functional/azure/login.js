define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    registerSuite({
        name: 'index',

        // before the suite starts
        setup: function () {
            return this.remote
                .setFindTimeout(5000)
                // login
                .findById('username')
                    .click()
                    .type('test11')
                    .end()
                .findById('password')
                    .click()
                    .type('password')
                    .pressKeys('\uE007') // enter key
                    .end();
        },


        '1_2015_login': function () {
            return this.remote
                .getPageTitle()
                .then(function (text) {
                    assert.strictEqual(text, 'Netto-Lohn',
                        'Page Header should be "Netto-Lohn" after Login.');
                });
        }
    });
});
