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
                .get(require.toUrl('http://brutto-netto-rechner.appspot.com'));
        }
    });
});