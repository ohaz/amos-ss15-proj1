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
                .setFindTimeout(5000)     
                .findById('shared_widgets_NumberInput_0')
                    .click()
                    .type('2000')
                    .pressKeys('\uE007')
                    .end()
                .findById('shared_widgets_NumberInput_1')
                    .click()
                    .type('1800')
                    .pressKeys('\uE007')
                    .end()
                .findById('shared_widgets_Link_3')
                    .click()
                    .end()
        },

        'III-V': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_24')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '450,71',
                        'III-V should be 450,71 for brutto 2000-1800');
                });
        },

        'V-III': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_25')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '491,60',
                        'V-III should be 491,60 for brutto 2000-1800');
                });
        },

        'IV-IV': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_26')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '418,89',
                        'IV-IV should be 418,89 for brutto 2000-1800');
                });
        },

        'IV-IV-2': function () {
            return this.remote
                .findById('shared_widgets_NumberOutput_28')
                .getVisibleText()
                .then(function (text) {
                    assert.strictEqual(text, '418,89',
                        'IV-IV F=1000 should be 418,89 for brutto 2000-1800');
                });
        },

        'terminate': function () {
            return this.remote
                .findByClassName('logo calc')
                    .click;
        }

    });
});
