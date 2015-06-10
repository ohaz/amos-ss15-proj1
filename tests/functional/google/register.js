define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    registerSuite({
        name: 'index-register',

        // before the suite starts
        setup: function () {
            return this.remote
                .setFindTimeout(5000)
                // login
                .findByLinkText('Sign up')
                    .click()
                    .end()
                .findById('username')
                    .click()
                    .type('test_user' + Math.floor(Math.random() * 9999) + 1) // not the best way to generate a test user - but it works
                    .end()
                .findById('email')
                    .click()
                    .type('email@' + (Math.floor(Math.random() * 9999) + 1) + '.de')
                    .end()
                .findById('password')
                    .click()
                    .type('password')
                    .end()
                .findById('confirm')
                    .click()
                    .type('password')
                    .end()
               .findById('register_finish')
                    .click()
                    .end();
        },


        '1_2015_register': function () {
            return this.remote
                .getPageTitle()
                .then(function (text) {
                    assert.strictEqual(text, 'Netto-Lohn',
                        'Page Header should be "Netto-Lohn" after successfull register.');
                });
        }
    });
});