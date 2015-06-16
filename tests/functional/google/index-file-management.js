define([
    'intern!object',
    'intern/chai!assert',
    'require',
    'intern/dojo/node!leadfoot/Command'
], function (registerSuite, assert, require, Command) {
    registerSuite({
        name: 'index-file-management',
        
        //
        // User test11 is current user
        //
        
        'saveFile': function () {
            return this.remote
                .setFindTimeout(5000)
                .findById('shared_widgets_NumberInput_0')
                    .click()
                    .type('3000')
                    .pressKeys('\uE007')
                .end()
                .findById('saveFile')
                .click()
                .end()
                .sleep(5000)
                .findById('filename').click()
                .type("test1")
                .end()
                .sleep(5000)
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
            .findById('listing_read-resulttest11-test1')
            .getVisibleText()
            .then(function (text) {
                assert.strictEqual(text, '1.877,23',
                    'file test1 should have been retrieved from server');
            });
        },
        'deleteFile': function () {
            return this.remote
                .setFindTimeout(5000)
                .findById('listing_read-deletetest11-test1')
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
                .findById('close-list-files-modal')
                .click()
                .end()
                .sleep(300)
                .findById("logout_modal0")
                .click()
                .end()
                .sleep(500)
                .execute("");
        }

    });
});
