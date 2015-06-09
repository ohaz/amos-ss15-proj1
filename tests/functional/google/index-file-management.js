define([
    'intern!object',
    'intern/chai!assert',
    'require',
    'intern/dojo/node!leadfoot/Command'
], function (registerSuite, assert, require, Command) {
    registerSuite({
        name: 'index',

        'saveFile': function () {
            return this.remote
                .setFindTimeout(5000)
                .findById('saveFile')
                .click()
                .end()
                .sleep(3000)
                .findById('filename').click()
                .type("test1")
                .end()
                .findById('saveresult')
                .click()
                .end()
                .sleep(5000);
        },

        'retrieveFiles': function () {
        return this.remote
            .setFindTimeout(5000)
            .findById('loadresult')
            .click()
            .end()
            .sleep(5000)
            .findById('resulttest1')
            .getVisibleText()
            .then(function (text) {
                assert.strictEqual(text, 'test1',
                    'file test1 should have been retrieved from server');
            });
        },
        'deleteFile': function () {
            return this.remote
                .setFindTimeout(5000)
                .findById('deletetest11_test1')
                .click()
                .end()
                .sleep(5000)
                .findById('test1')
                .catch(function (error) {
                    console.log("test1 file was not found anymore, because it was deleted before");
                });
        },
        'closeModal': function () {
            return this.remote
                .setFindTimeout(5000)
                .execute("");
        }

    });
});
