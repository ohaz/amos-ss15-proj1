define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    registerSuite({
        name: 'index-connect-to-google',

        // before the suite starts
        setup: function () {
            return this.remote
                .get(require.toUrl('http://104.197.49.52/'));
        }
    });
});