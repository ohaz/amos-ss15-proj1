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
                .findById('logout_modal0')
                    .click()
                    .end();
        },


        '1_2015_logout': function () {
            return this.remote
                .getPageTitle()
                .then(function (text) {
                    assert.strictEqual(text, 'Flask Intro - login page',
                        'Page Header should be "Flask Intro - login page" after logout.');
                });
        }
    });
});
