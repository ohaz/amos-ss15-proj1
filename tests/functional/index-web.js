define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    registerSuite({
        name: 'index',

        'greeting form': function () {
			return this.remote
                .get(require.toUrl('rechner-brutto-netto/index~web.html'))
                .setFindTimeout(5000);
        }
    });
});