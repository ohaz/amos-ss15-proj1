define([
    'intern!object',
    'intern/chai!assert',
    'require'
], function (registerSuite, assert, require) {
    registerSuite({
        name: 'index-connect-to-aws',

        // before the suite starts
        setup: function () {
            return this.remote
                .get(require.toUrl('http://amos-proj1.elasticbeanstalk.com/'));
        }
    });
});
