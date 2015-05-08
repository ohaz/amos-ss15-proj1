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
                .get(require.toUrl('http://amos-proj1.elasticbeanstalk.com/'))
                //.get(require.toUrl('amos-proj1-flask.azurewebsites.net'))
                .setFindTimeout(5000)
                // login
                .findById('username')
                    .click()
                    .type('amostest')
                    .end()
                .findById('password')
                    .click()
                    .type('amostest')
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
